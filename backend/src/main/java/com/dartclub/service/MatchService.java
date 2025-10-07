package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.dto.response.*;
import com.dartclub.model.entity.*;
import com.dartclub.model.enums.MatchStatus;
import com.dartclub.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

/**
 * MatchService - Match-Management & Lifecycle
 * 
 * Funktionen:
 * - CRUD Operations für Matches
 * - Match starten/beenden
 * - Set/Leg Management
 * - Live-Scoring Integration
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MatchService {

    private final MatchRepository matchRepository;
    private final SetRepository setRepository;
    private final LegRepository legRepository;
    private final ThrowRepository throwRepository;
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final ScoringEngine scoringEngine;

    /**
     * Alle Matches einer Organisation
     */
    public List<Match> getAllMatches(UUID orgId) {
        return matchRepository.findByOrgId(orgId);
    }

    /**
     * Match nach ID abrufen
     */
    public Match getMatchById(UUID id, UUID orgId) {
        return matchRepository.findByIdAndOrgId(id, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Match nicht gefunden"));
    }

    /**
     * Neues Match anlegen
     */
    @Transactional
    public Match createMatch(Match match) {
        match.setStatus(MatchStatus.SCHEDULED);
        match.setHomeSets(0);
        match.setAwaySets(0);
        return matchRepository.save(match);
    }

    /**
     * Match aktualisieren
     */
    @Transactional
    public Match updateMatch(UUID id, Match updatedMatch, UUID orgId) {
        Match match = getMatchById(id, orgId);
        
        // Update erlaubte Felder
        match.setMatchDate(updatedMatch.getMatchDate());
        match.setVenue(updatedMatch.getVenue());
        match.setLeague(updatedMatch.getLeague());
        match.setMatchType(updatedMatch.getMatchType());
        match.setHomeTeamId(updatedMatch.getHomeTeamId());
        match.setAwayTeamId(updatedMatch.getAwayTeamId());
        match.setBestOfSets(updatedMatch.getBestOfSets());
        match.setBestOfLegs(updatedMatch.getBestOfLegs());
        match.setStartingScore(updatedMatch.getStartingScore());
        match.setDoubleOut(updatedMatch.getDoubleOut());
        
        return matchRepository.save(match);
    }

    /**
     * Match löschen
     */
    @Transactional
    public void deleteMatch(UUID id, UUID orgId) {
        Match match = getMatchById(id, orgId);
        matchRepository.delete(match);
    }

    /**
     * Match starten
     */
    @Transactional
    public Match startMatch(UUID matchId, UUID orgId) {
        Match match = getMatchById(matchId, orgId);
        
        if (match.getStatus() != MatchStatus.SCHEDULED) {
            throw new IllegalStateException("Match kann nur gestartet werden wenn Status = SCHEDULED");
        }
        
        match.setStatus(MatchStatus.LIVE);
        match = matchRepository.save(match);
        
        // Erstes Set erstellen
        Set firstSet = createSet(matchId, 1);
        
        // Erstes Leg erstellen mit ersten Spielern aus den Teams
        createFirstLeg(match, firstSet);
        
        log.info("Match {} gestartet", matchId);
        return match;
    }
    
    /**
     * Erstes Leg mit Spielern aus Teams erstellen
     */
    @Transactional
    protected void createFirstLeg(Match match, Set set) {
        Member homePlayer = null;
        Member awayPlayer = null;

        // Versuche Spieler aus den Teams zu holen
        if (match.getHomeTeamId() != null && match.getAwayTeamId() != null) {
            Team homeTeam = teamRepository.findById(match.getHomeTeamId()).orElse(null);
            Team awayTeam = teamRepository.findById(match.getAwayTeamId()).orElse(null);

            if (homeTeam != null && !homeTeam.getMembers().isEmpty()) {
                homePlayer = homeTeam.getMembers().iterator().next();
            }

            if (awayTeam != null && !awayTeam.getMembers().isEmpty()) {
                awayPlayer = awayTeam.getMembers().iterator().next();
            }
        }

        // Fallback: Nimm die ersten beiden Mitglieder der Organisation (inklusive Gastspieler)
        if (homePlayer == null || awayPlayer == null) {
            // Hole ALLE Members der Organisation (status = ACTIVE, inklusive user_id = NULL für Gastspieler)
            List<Member> members = memberRepository.findByOrgId(match.getOrgId());

            if (members.isEmpty()) {
                throw new IllegalStateException("Keine Spieler verfügbar. Bitte erstelle mindestens einen Spieler (Mitglied oder Gastspieler).");
            }

            if (members.size() < 2) {
                // Wenn nur 1 Spieler vorhanden: Erstelle Dummy-Gastspieler
                log.warn("Nur 1 Spieler verfügbar. Match wird mit Dummy-Gegner gestartet.");

                Member dummyPlayer = Member.builder()
                        .orgId(match.getOrgId())
                        .firstName("Gegner")
                        .lastName("(Platzhalter)")
                        .role("PLAYER")
                        .status("ACTIVE")
                        .joinedAt(java.time.LocalDate.now())
                        .build();
                dummyPlayer = memberRepository.save(dummyPlayer);

                if (homePlayer == null) {
                    homePlayer = members.get(0);
                    awayPlayer = dummyPlayer;
                } else {
                    awayPlayer = dummyPlayer;
                }
            } else {
                // Normal: Mindestens 2 Spieler verfügbar
                if (homePlayer == null) {
                    homePlayer = members.get(0);
                }
                if (awayPlayer == null) {
                    // Nimm einen anderen Spieler als homePlayer
                    final UUID homePlayerId = homePlayer.getId();
                    awayPlayer = members.stream()
                            .filter(m -> !m.getId().equals(homePlayerId))
                            .findFirst()
                            .orElse(members.get(1));
                }
            }
        }

        createLeg(set.getId(), 1, homePlayer.getId(), awayPlayer.getId(), match.getStartingScore());

        log.info("Erstes Leg erstellt: {} vs {}",
                homePlayer.getFirstName() + " " + homePlayer.getLastName(),
                awayPlayer.getFirstName() + " " + awayPlayer.getLastName());
    }

    /**
     * Aktuelles Leg eines Matches holen
     */
    public Leg getCurrentLeg(UUID matchId, UUID orgId) {
        Match match = getMatchById(matchId, orgId);

        // Hole das neueste Set des Matches
        List<Set> sets = setRepository.findByMatchIdOrderBySetNoDesc(matchId);
        if (sets.isEmpty()) {
            throw new IllegalStateException("Match hat noch keine Sets");
        }

        Set currentSet = sets.get(0); // Neuestes Set

        // Hole das neueste nicht-beendete Leg des Sets
        List<Leg> legs = legRepository.findBySetIdOrderByLegNoAsc(currentSet.getId());
        return legs.stream()
                .filter(leg -> leg.getFinishedAt() == null)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Kein aktives Leg gefunden"));
    }

    /**
     * Match beenden
     */
    @Transactional
    public Match finalizeMatch(UUID matchId, UUID orgId) {
        Match match = getMatchById(matchId, orgId);

        if (match.getStatus() != MatchStatus.LIVE) {
            throw new IllegalStateException("Nur LIVE Matches können beendet werden");
        }

        match.setStatus(MatchStatus.FINISHED);
        match.setFinishedAt(ZonedDateTime.now());
        match = matchRepository.save(match);

        log.info("Match {} beendet. Ergebnis: {} : {} Sets",
                matchId, match.getHomeSets(), match.getAwaySets());

        return match;
    }

    /**
     * Neues Set erstellen
     */
    @Transactional
    public Set createSet(UUID matchId, Integer setNo) {
        Set set = Set.builder()
                .matchId(matchId)
                .setNo(setNo)
                .homeLegs(0)
                .awayLegs(0)
                .build();
        
        set = setRepository.save(set);
        
        log.info("Set {} für Match {} erstellt", setNo, matchId);
        return set;
    }

    /**
     * Neues Leg erstellen
     */
    @Transactional
    public Leg createLeg(UUID setId, Integer legNo, UUID homeMemberId, UUID awayMemberId, Integer startingScore) {
        Leg leg = Leg.builder()
                .setId(setId)
                .legNo(legNo)
                .startingScore(startingScore)
                .homeMemberId(homeMemberId)
                .awayMemberId(awayMemberId)
                .startedAt(ZonedDateTime.now())
                .build();
        
        leg = legRepository.save(leg);
        
        log.info("Leg {} für Set {} erstellt", legNo, setId);
        return leg;
    }

    /**
     * Wurf verarbeiten (Live-Scoring)
     */
    @Transactional
    public Throw submitThrow(UUID legId, Throw throwData) {
        Leg leg = legRepository.findById(legId)
                .orElseThrow(() -> new ResourceNotFoundException("Leg nicht gefunden"));
        
        // Validiere Wurf
        if (!scoringEngine.validateThrow(throwData)) {
            throw new IllegalArgumentException("Ungültiger Wurf");
        }
        
        // Berechne Ergebnis
        ScoringEngine.ThrowResult result = scoringEngine.processThrow(leg, throwData);
        
        // Speichere Wurf
        throwData.setLegId(legId);
        throwData = throwRepository.save(throwData);
        
        // Event-Detection
        String event = scoringEngine.detectEvent(throwData);
        if (event != null) {
            log.info("Event detected: {} in Leg {}", event, legId);
        }
        
        // Leg beenden bei Checkout
        if (result.isCheckout()) {
            finalizeLeg(leg, throwData.getMemberId(), throwData.getThrowNo() * 3, throwData.getThrowTotal());
        }
        
        return throwData;
    }

    /**
     * Leg beenden
     */
    @Transactional
    public Leg finalizeLeg(Leg leg, UUID winnerId, Integer totalDarts, Integer checkoutScore) {
        leg.setWinnerMemberId(winnerId);
        leg.setTotalDarts(totalDarts);
        leg.setCheckoutScore(checkoutScore);
        leg.setFinishedAt(ZonedDateTime.now());
        leg = legRepository.save(leg);
        
        // Set-Status aktualisieren
        updateSetAfterLeg(leg);
        
        log.info("Leg {} beendet. Winner: {} in {} Darts", leg.getId(), winnerId, totalDarts);
        return leg;
    }

    /**
     * Set-Status nach Leg-Ende aktualisieren
     */
    @Transactional
    protected void updateSetAfterLeg(Leg leg) {
        Set set = setRepository.findById(leg.getSetId())
                .orElseThrow(() -> new ResourceNotFoundException("Set nicht gefunden"));
        
        // Determine if home or away won
        if (leg.getWinnerMemberId().equals(leg.getHomeMemberId())) {
            set.setHomeLegs(set.getHomeLegs() + 1);
        } else {
            set.setAwayLegs(set.getAwayLegs() + 1);
        }
        
        set = setRepository.save(set);
        
        // Check if set is won
        Match match = getMatchById(set.getMatchId(), null);
        if (set.isFinished(match.getBestOfLegs())) {
            finalizeSet(set, match);
        }
    }

    /**
     * Set beenden und Match-Status aktualisieren
     */
    @Transactional
    protected void finalizeSet(Set set, Match match) {
        // Update Match Set-Score
        if (set.isHomeWinner(match.getBestOfLegs())) {
            match.setHomeSets(match.getHomeSets() + 1);
        } else {
            match.setAwaySets(match.getAwaySets() + 1);
        }
        
        match = matchRepository.save(match);
        
        log.info("Set {} beendet. Match Score: {} : {}", 
                set.getSetNo(), match.getHomeSets(), match.getAwaySets());
        
        // Check if match is won
        int setsToWin = (match.getBestOfSets() / 2) + 1;
        if (match.getHomeSets() >= setsToWin || match.getAwaySets() >= setsToWin) {
            finalizeMatch(match.getId(), match.getOrgId());
        } else {
            // Create next set
            createSet(match.getId(), set.getSetNo() + 1);
        }
    }

    /**
     * Statistiken für ein Match abrufen
     */
    public MatchStats getMatchStats(UUID matchId, UUID orgId) {
        Match match = getMatchById(matchId, orgId);
        List<Set> sets = setRepository.findByMatchIdOrderBySetNoAsc(matchId);
        
        // Weitere Statistik-Berechnungen hier...
        
        return MatchStats.builder()
                .match(match)
                .sets(sets)
                .build();
    }

    /**
     * Helper-Klasse für Match-Statistiken
     */
    @lombok.Data
    @lombok.Builder
    public static class MatchStats {
        private Match match;
        private List<Set> sets;
    }

    /**
     * Live-Scoring Daten abrufen
     */
    public LiveScoringResponseDTO getLiveData(UUID matchId, UUID orgId) {
        Match match = getMatchById(matchId, orgId);
        
        if (match.getStatus() != MatchStatus.LIVE) {
            throw new IllegalStateException("Match ist nicht live. Bitte Match zuerst starten.");
        }
        
        // Team-Namen abrufen
        Team homeTeam = teamRepository.findById(match.getHomeTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("Home Team nicht gefunden"));
        Team awayTeam = teamRepository.findById(match.getAwayTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("Away Team nicht gefunden"));
        
        // Aktuelles Set finden
        List<Set> sets = setRepository.findByMatchIdOrderBySetNoAsc(matchId);
        Set currentSet = sets.stream()
                .filter(s -> !s.isFinished(match.getBestOfLegs()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Kein aktives Set gefunden"));
        
        // Aktuelles Leg finden
        List<Leg> legs = legRepository.findBySetIdOrderByLegNoAsc(currentSet.getId());
        Leg currentLeg = legs.stream()
                .filter(l -> l.getFinishedAt() == null)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Kein aktives Leg gefunden"));
        
        // Spieler-Daten abrufen
        Member homeMember = memberRepository.findById(currentLeg.getHomeMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Home Player nicht gefunden"));
        Member awayMember = memberRepository.findById(currentLeg.getAwayMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Away Player nicht gefunden"));
        
        // Würfe für Average-Berechnung
        List<Throw> homeThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(currentLeg.getId(), homeMember.getId());
        List<Throw> awayThrows = throwRepository.findByLegIdAndMemberIdOrderByThrowNoAsc(currentLeg.getId(), awayMember.getId());
        
        Double homeAverage = calculateAverage(homeThrows);
        Double awayAverage = calculateAverage(awayThrows);
        
        String homeLastThrow = getLastThrowString(homeThrows);
        String awayLastThrow = getLastThrowString(awayThrows);
        
        // DTOs erstellen
        LiveScoringMatchDTO matchDTO = LiveScoringMatchDTO.builder()
                .id(match.getId())
                .homeTeam(LiveScoringMatchDTO.TeamBasicDTO.builder()
                        .id(homeTeam.getId())
                        .name(homeTeam.getName())
                        .build())
                .awayTeam(LiveScoringMatchDTO.TeamBasicDTO.builder()
                        .id(awayTeam.getId())
                        .name(awayTeam.getName())
                        .build())
                .homeScore(match.getHomeSets())
                .awayScore(match.getAwaySets())
                .currentSet(currentSet.getSetNo())
                .currentLeg(currentLeg.getLegNo())
                .build();
        
        LiveScoringLegDTO legDTO = LiveScoringLegDTO.builder()
                .id(currentLeg.getId())
                .setNumber(currentSet.getSetNo())
                .legNumber(currentLeg.getLegNo())
                .homePlayer(LiveScoringPlayerDTO.builder()
                        .id(homeMember.getId())
                        .name(homeMember.getFirstName() + " " + homeMember.getLastName())
                        .remainingScore(currentLeg.getStartingScore()) // TODO: Calculate from throws
                        .average(homeAverage)
                        .lastThrow(homeLastThrow)
                        .build())
                .awayPlayer(LiveScoringPlayerDTO.builder()
                        .id(awayMember.getId())
                        .name(awayMember.getFirstName() + " " + awayMember.getLastName())
                        .remainingScore(currentLeg.getStartingScore()) // TODO: Calculate from throws
                        .average(awayAverage)
                        .lastThrow(awayLastThrow)
                        .build())
                .currentPlayer(determineCurrentPlayer(homeThrows.size(), awayThrows.size()))
                .build();
        
        return LiveScoringResponseDTO.builder()
                .match(matchDTO)
                .currentLeg(legDTO)
                .build();
    }
    
    private Double calculateAverage(List<Throw> throwsList) {
        if (throwsList.isEmpty()) {
            return 0.0;
        }
        int totalScore = throwsList.stream().mapToInt(Throw::getThrowTotal).sum();
        return (double) totalScore / throwsList.size();
    }
    
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
    
    private String determineCurrentPlayer(int homeThrowCount, int awayThrowCount) {
        return homeThrowCount <= awayThrowCount ? "home" : "away";
    }
}
