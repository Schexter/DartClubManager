package com.dartclub.controller;

import com.dartclub.model.dto.request.BustRequest;
import com.dartclub.model.dto.request.DartInput;
import com.dartclub.model.dto.request.ThrowRequest;
import com.dartclub.model.dto.response.LiveScoringLegDTO;
import com.dartclub.model.dto.response.LiveScoringPlayerDTO;
import com.dartclub.model.dto.response.ThrowResponseDTO;
import com.dartclub.model.entity.Leg;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.Throw;
import com.dartclub.repository.LegRepository;
import com.dartclub.repository.MemberRepository;
import com.dartclub.repository.ThrowRepository;
import com.dartclub.service.MatchService;
import com.dartclub.service.ScoringEngine;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * ScoringController - Live-Scoring API
 * 
 * Endpoints:
 * - POST /api/matches/{matchId}/throws - Wurf eintragen
 * - POST /api/matches/{matchId}/bust   - Bust markieren
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ScoringController {
    
    private final MatchService matchService;
    private final ScoringEngine scoringEngine;
    private final LegRepository legRepository;
    private final ThrowRepository throwRepository;
    private final MemberRepository memberRepository;
    
    /**
     * Helper: Extract orgId from JWT (via request attribute) or header
     */
    private UUID getOrgId(HttpServletRequest request, @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = (UUID) request.getAttribute("orgId");
        return orgId != null ? orgId : headerOrgId;
    }
    
    /**
     * Wurf eintragen (3 Darts)
     * 
     * POST /api/matches/{matchId}/throws
     * 
     * Request Body:
     * {
     *   "legId": "uuid",
     *   "darts": [
     *     { "multiplier": 3, "segment": 20 },
     *     { "multiplier": 3, "segment": 20 },
     *     { "multiplier": 1, "segment": 20 }
     *   ]
     * }
     * 
     * Response:
     * {
     *   "throwId": "uuid",
     *   "throwTotal": 140,
     *   "remainingScore": 361,
     *   "isCheckout": false,
     *   "isBust": false,
     *   "event": "140_plus",
     *   "legFinished": false,
     *   "leg": { ... }
     * }
     */
    @PostMapping("/{matchId}/throws")
    public ResponseEntity<ThrowResponseDTO> submitThrow(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID matchId,
            @Valid @RequestBody ThrowRequest request) {
        
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        
        log.info("POST /api/matches/{}/throws - legId: {}", matchId, request.getLegId());
        
        // Leg laden
        Leg leg = legRepository.findById(request.getLegId())
                .orElseThrow(() -> new RuntimeException("Leg nicht gefunden"));
        
        // Prüfe ob Leg bereits beendet
        if (leg.getFinishedAt() != null) {
            throw new RuntimeException("Leg ist bereits beendet");
        }
        
        // Bestimme aktuellen Spieler
        List<Throw> homeThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(leg.getId(), leg.getHomeMemberId());
        List<Throw> awayThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(leg.getId(), leg.getAwayMemberId());
        
        boolean isHomeTurn = homeThrows.size() <= awayThrows.size();
        UUID currentMemberId = isHomeTurn ? leg.getHomeMemberId() : leg.getAwayMemberId();
        
        // Berechne Restpunkte des aktuellen Spielers
        List<Throw> playerThrows = isHomeTurn ? homeThrows : awayThrows;
        Integer remainingScore = calculateRemainingScore(leg.getStartingScore(), playerThrows);
        
        // Erstelle Throw-Entity
        DartInput dart1 = request.getDarts().get(0);
        DartInput dart2 = request.getDarts().get(1);
        DartInput dart3 = request.getDarts().get(2);
        
        Throw throwEntity = Throw.builder()
                .legId(request.getLegId())
                .memberId(currentMemberId)
                .throwNo(playerThrows.size() + 1)
                .dart1Multiplier(dart1.getMultiplier())
                .dart1Segment(dart1.getSegment())
                .dart2Multiplier(dart2.getMultiplier())
                .dart2Segment(dart2.getSegment())
                .dart3Multiplier(dart3.getMultiplier())
                .dart3Segment(dart3.getSegment())
                .remainingScore(remainingScore)
                .build();
        
        // Validiere Wurf
        if (!scoringEngine.validateThrow(throwEntity)) {
            throw new RuntimeException("Ungültiger Wurf");
        }
        
        // Verarbeite Wurf mit ScoringEngine
        ScoringEngine.ThrowResult result = scoringEngine.processThrow(leg, throwEntity);
        
        // Speichere Wurf
        throwEntity = throwRepository.save(throwEntity);
        
        // Event-Detection
        String event = scoringEngine.detectEvent(throwEntity);
        if (event != null) {
            log.info("Event detected: {} in Leg {}", event, leg.getId());
        }
        
        // Leg beenden bei Checkout
        boolean legFinished = false;
        if (result.isCheckout()) {
            matchService.finalizeLeg(leg, currentMemberId, throwEntity.getThrowNo() * 3, throwEntity.getThrowTotal());
            legFinished = true;
            log.info("Leg {} beendet durch Checkout von Member {}", leg.getId(), currentMemberId);
        }
        
        // Aktualisierte Leg-Daten laden
        LiveScoringLegDTO legDTO = buildLegDTO(leg);
        
        // Response erstellen
        ThrowResponseDTO response = ThrowResponseDTO.builder()
                .throwId(throwEntity.getId())
                .throwTotal(throwEntity.getThrowTotal())
                .remainingScore(throwEntity.getRemainingScore())
                .isCheckout(throwEntity.getIsCheckout())
                .isBust(throwEntity.getIsBust())
                .event(event)
                .legFinished(legFinished)
                .leg(legDTO)
                .build();
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Bust markieren
     * 
     * POST /api/matches/{matchId}/bust
     * 
     * Request Body:
     * {
     *   "legId": "uuid"
     * }
     * 
     * Response:
     * {
     *   "leg": { ... }
     * }
     */
    @PostMapping("/{matchId}/bust")
    public ResponseEntity<ThrowResponseDTO> markBust(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID matchId,
            @Valid @RequestBody BustRequest request) {
        
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        
        log.info("POST /api/matches/{}/bust - legId: {}", matchId, request.getLegId());
        
        // Leg laden
        Leg leg = legRepository.findById(request.getLegId())
                .orElseThrow(() -> new RuntimeException("Leg nicht gefunden"));
        
        // Prüfe ob Leg bereits beendet
        if (leg.getFinishedAt() != null) {
            throw new RuntimeException("Leg ist bereits beendet");
        }
        
        // Bestimme aktuellen Spieler
        List<Throw> homeThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(leg.getId(), leg.getHomeMemberId());
        List<Throw> awayThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(leg.getId(), leg.getAwayMemberId());
        
        boolean isHomeTurn = homeThrows.size() <= awayThrows.size();
        UUID currentMemberId = isHomeTurn ? leg.getHomeMemberId() : leg.getAwayMemberId();
        
        // Berechne Restpunkte des aktuellen Spielers
        List<Throw> playerThrows = isHomeTurn ? homeThrows : awayThrows;
        Integer remainingScore = calculateRemainingScore(leg.getStartingScore(), playerThrows);
        
        // Erstelle Bust-Wurf (0, 0, 0)
        Throw bustThrow = Throw.builder()
                .legId(request.getLegId())
                .memberId(currentMemberId)
                .throwNo(playerThrows.size() + 1)
                .dart1Multiplier(0)
                .dart1Segment(0)
                .dart1Score(0)
                .dart2Multiplier(0)
                .dart2Segment(0)
                .dart2Score(0)
                .dart3Multiplier(0)
                .dart3Segment(0)
                .dart3Score(0)
                .throwTotal(0)
                .remainingScore(remainingScore) // Punkte bleiben gleich
                .isBust(true)
                .isCheckout(false)
                .build();
        
        bustThrow = throwRepository.save(bustThrow);
        log.info("Bust markiert für Member {} in Leg {}", currentMemberId, leg.getId());
        
        // Aktualisierte Leg-Daten laden
        LiveScoringLegDTO legDTO = buildLegDTO(leg);
        
        // Response erstellen
        ThrowResponseDTO response = ThrowResponseDTO.builder()
                .throwId(bustThrow.getId())
                .throwTotal(0)
                .remainingScore(remainingScore)
                .isCheckout(false)
                .isBust(true)
                .event(null)
                .legFinished(false)
                .leg(legDTO)
                .build();
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Berechnet die Restpunkte eines Spielers basierend auf seinen Würfen
     */
    private Integer calculateRemainingScore(Integer startingScore, List<Throw> throwsList) {
        int remaining = startingScore;
        for (Throw t : throwsList) {
            if (!t.getIsBust()) {
                remaining -= t.getThrowTotal();
            }
        }
        return remaining;
    }
    
    /**
     * Erstellt ein LiveScoringLegDTO mit aktuellen Daten
     */
    private LiveScoringLegDTO buildLegDTO(Leg leg) {
        // Spieler-Daten laden
        Member homeMember = memberRepository.findById(leg.getHomeMemberId())
                .orElseThrow(() -> new RuntimeException("Home Player nicht gefunden"));
        Member awayMember = memberRepository.findById(leg.getAwayMemberId())
                .orElseThrow(() -> new RuntimeException("Away Player nicht gefunden"));
        
        // Würfe laden
        List<Throw> homeThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(leg.getId(), homeMember.getId());
        List<Throw> awayThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(leg.getId(), awayMember.getId());
        
        // Restpunkte berechnen
        Integer homeRemaining = calculateRemainingScore(leg.getStartingScore(), homeThrows);
        Integer awayRemaining = calculateRemainingScore(leg.getStartingScore(), awayThrows);
        
        // Average berechnen
        Double homeAverage = calculateAverage(homeThrows);
        Double awayAverage = calculateAverage(awayThrows);
        
        // Letzter Wurf
        String homeLastThrow = getLastThrowString(homeThrows);
        String awayLastThrow = getLastThrowString(awayThrows);
        
        // Aktueller Spieler
        String currentPlayer = homeThrows.size() <= awayThrows.size() ? "home" : "away";
        
        return LiveScoringLegDTO.builder()
                .id(leg.getId())
                .setNumber(1) // TODO: Get from Set entity
                .legNumber(leg.getLegNo())
                .homePlayer(LiveScoringPlayerDTO.builder()
                        .id(homeMember.getId())
                        .name(homeMember.getFirstName() + " " + homeMember.getLastName())
                        .remainingScore(homeRemaining)
                        .average(homeAverage)
                        .lastThrow(homeLastThrow)
                        .build())
                .awayPlayer(LiveScoringPlayerDTO.builder()
                        .id(awayMember.getId())
                        .name(awayMember.getFirstName() + " " + awayMember.getLastName())
                        .remainingScore(awayRemaining)
                        .average(awayAverage)
                        .lastThrow(awayLastThrow)
                        .build())
                .currentPlayer(currentPlayer)
                .build();
    }
    
    /**
     * Berechnet den 3-Dart-Average
     */
    private Double calculateAverage(List<Throw> throwsList) {
        if (throwsList.isEmpty()) {
            return 0.0;
        }
        int totalScore = throwsList.stream()
                .filter(t -> !t.getIsBust())
                .mapToInt(Throw::getThrowTotal)
                .sum();
        return (double) totalScore / throwsList.size();
    }
    
    /**
     * Formatiert den letzten Wurf als String
     */
    private String getLastThrowString(List<Throw> throwsList) {
        if (throwsList.isEmpty()) {
            return null;
        }
        Throw lastThrow = throwsList.get(throwsList.size() - 1);
        return String.format("%d, %d, %d (%d)",
                lastThrow.getDart1Score(),
                lastThrow.getDart2Score(),
                lastThrow.getDart3Score(),
                lastThrow.getThrowTotal());
    }
}
