package com.dartclub.repository;

import com.dartclub.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * TeamRepository - Data Access für Teams
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {

    /**
     * Findet alle Teams eines Vereins
     */
    List<Team> findByOrgIdOrderByNameAsc(UUID orgId);

    /**
     * Findet ein Team anhand ID und Vereins-ID (für org_id Security)
     */
    Optional<Team> findByIdAndOrgId(UUID id, UUID orgId);

    /**
     * Findet alle Teams einer Saison
     */
    List<Team> findByOrgIdAndSeasonOrderByNameAsc(UUID orgId, String season);

    /**
     * Findet alle Teams einer Liga
     */
    List<Team> findByOrgIdAndLeagueOrderByNameAsc(UUID orgId, String league);

    /**
     * Findet alle Teams eines Captains
     */
    List<Team> findByOrgIdAndCaptainId(UUID orgId, UUID captainId);

    /**
     * Sucht Teams nach Name (LIKE Search)
     */
    @Query("SELECT t FROM Team t WHERE t.orgId = :orgId AND LOWER(t.name) LIKE LOWER(CONCAT('%', :name, '%')) ORDER BY t.name ASC")
    List<Team> searchByName(@Param("orgId") UUID orgId, @Param("name") String name);

    /**
     * Findet alle Teams in denen ein Member Mitglied ist
     */
    @Query("SELECT t FROM Team t JOIN t.members m WHERE t.orgId = :orgId AND m.id = :memberId ORDER BY t.name ASC")
    List<Team> findByOrgIdAndMemberId(@Param("orgId") UUID orgId, @Param("memberId") UUID memberId);

    /**
     * Zählt Anzahl Teams pro Verein
     */
    long countByOrgId(UUID orgId);

    /**
     * Zählt Anzahl Mitglieder in einem Team
     */
    @Query("SELECT COUNT(m) FROM Team t JOIN t.members m WHERE t.id = :teamId")
    long countMembersByTeamId(@Param("teamId") UUID teamId);

    /**
     * Prüft ob ein Team mit diesem Namen bereits existiert (für Validierung)
     */
    boolean existsByOrgIdAndNameIgnoreCase(UUID orgId, String name);

    /**
     * Löscht alle Teams eines Vereins (Cascade Delete)
     */
    void deleteByOrgId(UUID orgId);
}
