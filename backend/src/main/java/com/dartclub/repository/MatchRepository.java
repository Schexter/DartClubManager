package com.dartclub.repository;

import com.dartclub.model.entity.Match;
import com.dartclub.model.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository für Match-Entitäten
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface MatchRepository extends JpaRepository<Match, UUID> {
    
    /**
     * Finde alle Matches einer Organisation
     */
    List<Match> findByOrgId(UUID orgId);
    
    /**
     * Finde Match nach ID und Organisation (für Multi-Tenancy)
     */
    Optional<Match> findByIdAndOrgId(UUID id, UUID orgId);
    
    /**
     * Finde Matches nach Status
     */
    List<Match> findByOrgIdAndStatus(UUID orgId, MatchStatus status);
    
    /**
     * Finde Matches nach Team (Heim oder Auswärts)
     */
    List<Match> findByOrgIdAndHomeTeamIdOrAwayTeamId(UUID orgId, UUID homeTeamId, UUID awayTeamId);
    
    /**
     * Finde Matches in einem bestimmten Zeitraum
     */
    List<Match> findByOrgIdAndMatchDateBetween(UUID orgId, LocalDateTime start, LocalDateTime end);
}
