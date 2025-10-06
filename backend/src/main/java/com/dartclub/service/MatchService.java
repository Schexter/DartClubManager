package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
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
        createSet(matchId, 1);
        
        log.info("Match {} gestartet", matchId);
        return match;
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
}
