package com.dartclub.repository;

import com.dartclub.model.entity.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Fee Repository
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface FeeRepository extends JpaRepository<Fee, UUID> {

    /**
     * Alle Beitragssätze einer Organisation
     */
    List<Fee> findByOrgId(UUID orgId);

    /**
     * Alle aktiven Beitragssätze einer Organisation
     */
    List<Fee> findByOrgIdAndIsActiveTrue(UUID orgId);

    /**
     * Beitragssatz mit org_id Prüfung
     */
    Optional<Fee> findByIdAndOrgId(UUID id, UUID orgId);

    /**
     * Suche nach Name
     */
    @Query("SELECT f FROM Fee f WHERE f.orgId = :orgId AND " +
           "LOWER(f.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Fee> searchByOrgId(@Param("orgId") UUID orgId, @Param("search") String search);

    /**
     * Anzahl Beitragssätze
     */
    long countByOrgId(UUID orgId);

    /**
     * Prüfe ob Name bereits existiert
     */
    boolean existsByNameAndOrgId(String name, UUID orgId);
}
