package com.dartclub.repository;

import com.dartclub.model.entity.Throw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository für Throw-Entitäten (einzelne Würfe)
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface ThrowRepository extends JpaRepository<Throw, UUID> {
    
    /**
     * Finde alle Würfe eines Legs
     */
    List<Throw> findByLegIdOrderByThrowNoAsc(UUID legId);
    
    /**
     * Finde alle Würfe eines Spielers in einem Leg
     */
    List<Throw> findByLegIdAndMemberIdOrderByThrowNoAsc(UUID legId, UUID memberId);
    
    /**
     * Finde alle Würfe eines Spielers
     */
    List<Throw> findByMemberId(UUID memberId);
    
    /**
     * Finde 180er-Würfe eines Spielers
     */
    @Query("SELECT t FROM Throw t WHERE t.memberId = :memberId AND t.throwTotal = 180")
    List<Throw> find180sByMemberId(UUID memberId);
    
    /**
     * Finde Checkout-Würfe eines Spielers
     */
    List<Throw> findByMemberIdAndIsCheckoutTrue(UUID memberId);
}
