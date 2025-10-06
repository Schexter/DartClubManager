package com.dartclub.repository;

import com.dartclub.model.entity.Leg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository für Leg-Entitäten (einzelne Legs innerhalb eines Sets)
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface LegRepository extends JpaRepository<Leg, UUID> {
    
    /**
     * Finde alle Legs eines Sets
     */
    List<Leg> findBySetId(UUID setId);
    
    /**
     * Finde Legs nach Spieler (Home oder Away)
     */
    List<Leg> findByHomeMemberIdOrAwayMemberId(UUID homeMemberId, UUID awayMemberId);
    
    /**
     * Finde gewonnene Legs eines Spielers in einem Set
     */
    List<Leg> findBySetIdAndWinnerMemberId(UUID setId, UUID winnerMemberId);
}
