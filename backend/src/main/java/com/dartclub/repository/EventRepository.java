package com.dartclub.repository;

import com.dartclub.model.entity.Event;
import com.dartclub.model.enums.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * EventRepository - Data Access für Events (Termine)
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

    /**
     * Findet alle Events eines Vereins (sortiert nach Start-Zeit)
     */
    List<Event> findByOrgIdOrderByStartTimeDesc(UUID orgId);

    /**
     * Findet ein Event anhand ID und Vereins-ID (für org_id Security)
     */
    Optional<Event> findByIdAndOrgId(UUID id, UUID orgId);

    /**
     * Findet alle kommenden Events (ab jetzt)
     */
    @Query("SELECT e FROM Event e WHERE e.orgId = :orgId AND e.startTime >= :now ORDER BY e.startTime ASC")
    List<Event> findUpcomingEvents(@Param("orgId") UUID orgId, @Param("now") ZonedDateTime now);

    /**
     * Findet alle vergangenen Events
     */
    @Query("SELECT e FROM Event e WHERE e.orgId = :orgId AND e.startTime < :now ORDER BY e.startTime DESC")
    List<Event> findPastEvents(@Param("orgId") UUID orgId, @Param("now") ZonedDateTime now);

    /**
     * Findet alle Events eines bestimmten Typs
     */
    List<Event> findByOrgIdAndEventTypeOrderByStartTimeAsc(UUID orgId, EventType eventType);

    /**
     * Findet alle Events in einem Zeitraum
     */
    @Query("SELECT e FROM Event e WHERE e.orgId = :orgId AND e.startTime BETWEEN :start AND :end ORDER BY e.startTime ASC")
    List<Event> findByDateRange(@Param("orgId") UUID orgId, @Param("start") ZonedDateTime start, @Param("end") ZonedDateTime end);

    /**
     * Findet alle Events eines Teams
     */
    List<Event> findByOrgIdAndTeamIdOrderByStartTimeDesc(UUID orgId, UUID teamId);

    /**
     * Findet alle Events an einem bestimmten Ort
     */
    List<Event> findByOrgIdAndLocationIgnoreCaseOrderByStartTimeAsc(UUID orgId, String location);

    /**
     * Findet alle Events die ein Member erstellt hat
     */
    List<Event> findByOrgIdAndCreatedByOrderByStartTimeDesc(UUID orgId, UUID createdBy);

    /**
     * Findet alle Events an denen ein Member teilnimmt
     */
    @Query("SELECT e FROM Event e JOIN e.participants p WHERE e.orgId = :orgId AND p.memberId = :memberId ORDER BY e.startTime ASC")
    List<Event> findByOrgIdAndParticipantId(@Param("orgId") UUID orgId, @Param("memberId") UUID memberId);

    /**
     * Findet alle Events an denen ein Member zugesagt hat
     */
    @Query("SELECT e FROM Event e JOIN e.participants p WHERE e.orgId = :orgId AND p.memberId = :memberId AND p.status = 'YES' ORDER BY e.startTime ASC")
    List<Event> findByOrgIdAndConfirmedParticipant(@Param("orgId") UUID orgId, @Param("memberId") UUID memberId);

    /**
     * Zählt Anzahl Events pro Verein
     */
    long countByOrgId(UUID orgId);

    /**
     * Zählt kommende Events
     */
    @Query("SELECT COUNT(e) FROM Event e WHERE e.orgId = :orgId AND e.startTime >= :now")
    long countUpcomingEvents(@Param("orgId") UUID orgId, @Param("now") ZonedDateTime now);

    /**
     * Zählt Events eines Typs
     */
    long countByOrgIdAndEventType(UUID orgId, EventType eventType);

    /**
     * Sucht Events nach Titel
     */
    @Query("SELECT e FROM Event e WHERE e.orgId = :orgId AND LOWER(e.title) LIKE LOWER(CONCAT('%', :title, '%')) ORDER BY e.startTime ASC")
    List<Event> searchByTitle(@Param("orgId") UUID orgId, @Param("title") String title);

    /**
     * Löscht alle Events eines Vereins (Cascade Delete)
     */
    void deleteByOrgId(UUID orgId);

    /**
     * Löscht alle Events eines Teams
     */
    void deleteByOrgIdAndTeamId(UUID orgId, UUID teamId);
}
