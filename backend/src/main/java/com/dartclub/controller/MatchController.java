package com.dartclub.controller;

import com.dartclub.model.entity.Match;
import com.dartclub.service.MatchService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * MatchController - REST API fuer Match-Management
 *
 * Endpoints:
 * - GET    /api/matches              - Alle Matches
 * - GET    /api/matches/{id}         - Match by ID
 * - POST   /api/matches              - Match erstellen
 * - PUT    /api/matches/{id}         - Match aktualisieren
 * - DELETE /api/matches/{id}         - Match loeschen
 * - POST   /api/matches/{id}/start   - Match starten
 * - POST   /api/matches/{id}/finalize - Match beenden
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class MatchController {

    private final MatchService matchService;

    /**
     * Helper: Extract orgId from JWT (via request attribute) or header
     */
    private UUID getOrgId(HttpServletRequest request, @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = (UUID) request.getAttribute("orgId");
        return orgId != null ? orgId : headerOrgId;
    }

    /**
     * Gibt alle Matches der Organisation zurueck
     */
    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("GET /api/matches - orgId: {}", orgId);

        try {
            List<Match> matches = matchService.getAllMatches(orgId);
            log.info("Returning {} matches", matches.size());
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            log.error("Fehler beim Laden der Matches für orgId: {}", orgId, e);
            throw e;
        }
    }

    /**
     * Gibt ein Match anhand ID zurueck
     */
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID id) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("GET /api/matches/{} - orgId: {}", id, orgId);

        Match match = matchService.getMatchById(id, orgId);
        return ResponseEntity.ok(match);
    }

    /**
     * Erstellt ein neues Match
     */
    @PostMapping
    public ResponseEntity<Match> createMatch(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @Valid @RequestBody Match match) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("POST /api/matches - orgId: {}, matchData: {}", orgId, match);

        try {
            match.setOrgId(orgId);
            Match created = matchService.createMatch(match);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            log.error("Fehler beim Erstellen des Matches", e);
            throw e;
        }
    }

    /**
     * Aktualisiert ein bestehendes Match
     */
    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID id,
            @Valid @RequestBody Match match) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("PUT /api/matches/{} - orgId: {}", id, orgId);

        Match updated = matchService.updateMatch(id, match, orgId);
        return ResponseEntity.ok(updated);
    }

    /**
     * Loescht ein Match
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID id) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("DELETE /api/matches/{} - orgId: {}", id, orgId);

        matchService.deleteMatch(id, orgId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Startet ein Match
     */
    @PostMapping("/{id}/start")
    public ResponseEntity<Match> startMatch(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID id,
            @RequestBody(required = false) com.dartclub.model.dto.request.StartMatchRequestDTO request) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("POST /api/matches/{}/start - orgId: {}", id, orgId);

        Match match = matchService.startMatch(id, orgId, request);
        return ResponseEntity.ok(match);
    }

    /**
     * Beendet ein Match
     */
    @PostMapping("/{id}/finalize")
    public ResponseEntity<Match> finalizeMatch(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID id) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("POST /api/matches/{}/finalize - orgId: {}", id, orgId);

        Match match = matchService.finalizeMatch(id, orgId);
        return ResponseEntity.ok(match);
    }

    /**
     * Live-Scoring Daten abrufen
     */
    @GetMapping("/{id}/live")
    public ResponseEntity<com.dartclub.model.dto.response.LiveScoringResponseDTO> getLiveData(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId,
            @PathVariable UUID id) {

        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }

        log.info("GET /api/matches/{}/live - orgId: {}", id, orgId);

        com.dartclub.model.dto.response.LiveScoringResponseDTO liveData = matchService.getLiveData(id, orgId);
        return ResponseEntity.ok(liveData);
    }
}
