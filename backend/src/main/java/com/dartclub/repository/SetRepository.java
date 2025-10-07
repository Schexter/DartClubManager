package com.dartclub.repository;

import com.dartclub.model.entity.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * SetRepository - Repository für Sets
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface SetRepository extends JpaRepository<Set, UUID> {
    
    /**
     * Alle Sets eines Matches
     */
    List<Set> findByMatchId(UUID matchId);

    /**
     * Alle Sets eines Matches sortiert nach Set-Nummer aufsteigend
     */
    List<Set> findByMatchIdOrderBySetNoAsc(UUID matchId);

    /**
     * Alle Sets eines Matches sortiert nach Set-Nummer absteigend
     */
    List<Set> findByMatchIdOrderBySetNoDesc(UUID matchId);
}
