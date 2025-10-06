package com.dartclub.repository;

import com.dartclub.model.entity.EventParticipant;
import com.dartclub.model.entity.EventParticipant.EventParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * EventParticipantRepository - Data Access für Event-Teilnahmen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, EventParticipantId> {

    /**
     * Findet alle Teilnehmer eines Events
     */
    List<EventParticipant> findByEventId(UUID eventId);

    /**
     * Findet eine spezifische Teilnahme
     */
    Optional<EventParticipant> findByEventIdAndMemberId(UUID eventId, UUID memberId);

    /**
     * Findet alle Teilnahmen eines Members
     */
    List<EventParticipant> findByMemberId(UUID memberId);

    /**
     * Findet alle zugesagten Teilnehmer eines Events
     */
    List<EventParticipant> findByEventIdAndStatus(UUID eventId, String status);

    /**
     * Zählt Teilnehmer eines Events nach Status
     */
    @Query("SELECT COUNT(ep) FROM EventParticipant ep WHERE ep.eventId = :eventId AND ep.status = :status")
    long countByEventIdAndStatus(@Param("eventId") UUID eventId, @Param("status") String status);

    /**
     * Zählt zugesagte Teilnehmer
     */
    @Query("SELECT COUNT(ep) FROM EventParticipant ep WHERE ep.eventId = :eventId AND ep.status = 'YES'")
    long countConfirmedByEventId(@Param("eventId") UUID eventId);

    /**
     * Prüft ob ein Member bereits bei einem Event eingetragen ist
     */
    boolean existsByEventIdAndMemberId(UUID eventId, UUID memberId);

    /**
     * Löscht alle Teilnahmen eines Events
     */
    void deleteByEventId(UUID eventId);

    /**
     * Löscht alle Teilnahmen eines Members
     */
    void deleteByMemberId(UUID memberId);
}
