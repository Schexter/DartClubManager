package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.entity.Event;
import com.dartclub.model.entity.EventParticipant;
import com.dartclub.model.entity.Member;
import com.dartclub.model.enums.EventType;
import com.dartclub.repository.EventParticipantRepository;
import com.dartclub.repository.EventRepository;
import com.dartclub.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

/**
 * EventService - Business Logic für Event-Management (Kalender)
 * 
 * Features:
 * - CRUD Operations für Events
 * - Teilnehmer-Management (Zu-/Absagen)
 * - Filter nach Typ, Datum, Team
 * - Kapazitäts-Management
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepository eventRepository;
    private final EventParticipantRepository participantRepository;
    private final MemberRepository memberRepository;

    /**
     * Findet alle Events eines Vereins
     */
    @Transactional(readOnly = true)
    public List<Event> findAll(UUID orgId) {
        log.debug("Finding all events for organization: {}", orgId);
        return eventRepository.findByOrgIdOrderByStartTimeDesc(orgId);
    }

    /**
     * Findet ein Event anhand ID
     */
    @Transactional(readOnly = true)
    public Event findById(UUID orgId, UUID eventId) {
        log.debug("Finding event: {} for organization: {}", eventId, orgId);
        return eventRepository.findByIdAndOrgId(eventId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Event nicht gefunden: " + eventId));
    }

    /**
     * Findet alle kommenden Events
     */
    @Transactional(readOnly = true)
    public List<Event> findUpcoming(UUID orgId) {
        log.debug("Finding upcoming events for organization: {}", orgId);
        return eventRepository.findUpcomingEvents(orgId, ZonedDateTime.now());
    }

    /**
     * Findet alle vergangenen Events
     */
    @Transactional(readOnly = true)
    public List<Event> findPast(UUID orgId) {
        log.debug("Finding past events for organization: {}", orgId);
        return eventRepository.findPastEvents(orgId, ZonedDateTime.now());
    }

    /**
     * Findet alle Events eines bestimmten Typs
     */
    @Transactional(readOnly = true)
    public List<Event> findByType(UUID orgId, EventType eventType) {
        log.debug("Finding events of type: {} for organization: {}", eventType, orgId);
        return eventRepository.findByOrgIdAndEventTypeOrderByStartTimeAsc(orgId, eventType);
    }

    /**
     * Findet alle Events in einem Zeitraum
     */
    @Transactional(readOnly = true)
    public List<Event> findByDateRange(UUID orgId, ZonedDateTime start, ZonedDateTime end) {
        log.debug("Finding events between {} and {} for organization: {}", start, end, orgId);
        return eventRepository.findByDateRange(orgId, start, end);
    }

    /**
     * Findet alle Events eines Teams
     */
    @Transactional(readOnly = true)
    public List<Event> findByTeam(UUID orgId, UUID teamId) {
        log.debug("Finding events for team: {} in organization: {}", teamId, orgId);
        return eventRepository.findByOrgIdAndTeamIdOrderByStartTimeDesc(orgId, teamId);
    }

    /**
     * Findet alle Events an denen ein Member teilnimmt
     */
    @Transactional(readOnly = true)
    public List<Event> findByParticipant(UUID orgId, UUID memberId) {
        log.debug("Finding events for participant: {} in organization: {}", memberId, orgId);
        return eventRepository.findByOrgIdAndParticipantId(orgId, memberId);
    }

    /**
     * Findet alle Events an denen ein Member zugesagt hat
     */
    @Transactional(readOnly = true)
    public List<Event> findConfirmedByParticipant(UUID orgId, UUID memberId) {
        log.debug("Finding confirmed events for participant: {} in organization: {}", memberId, orgId);
        return eventRepository.findByOrgIdAndConfirmedParticipant(orgId, memberId);
    }

    /**
     * Sucht Events nach Titel
     */
    @Transactional(readOnly = true)
    public List<Event> searchByTitle(UUID orgId, String title) {
        log.debug("Searching events with title: {} in organization: {}", title, orgId);
        return eventRepository.searchByTitle(orgId, title);
    }

    /**
     * Erstellt ein neues Event
     */
    public Event create(Event event) {
        log.info("Creating new event: {} for organization: {}", event.getTitle(), event.getOrgId());
        
        // Validierungen
        if (event.getStartTime() == null) {
            throw new IllegalArgumentException("Start-Zeit muss angegeben werden");
        }
        
        if (event.getEndTime() != null && event.getEndTime().isBefore(event.getStartTime())) {
            throw new IllegalArgumentException("End-Zeit muss nach Start-Zeit liegen");
        }
        
        if (event.getCapacity() != null && event.getCapacity() < 0) {
            throw new IllegalArgumentException("Kapazität darf nicht negativ sein");
        }
        
        Event savedEvent = eventRepository.save(event);
        log.info("Event created successfully: {}", savedEvent.getId());
        return savedEvent;
    }

    /**
     * Aktualisiert ein Event
     */
    public Event update(UUID orgId, UUID eventId, Event eventUpdates) {
        log.info("Updating event: {} for organization: {}", eventId, orgId);
        
        Event existingEvent = findById(orgId, eventId);
        
        // Update Felder
        if (eventUpdates.getTitle() != null) {
            existingEvent.setTitle(eventUpdates.getTitle());
        }
        
        if (eventUpdates.getDescription() != null) {
            existingEvent.setDescription(eventUpdates.getDescription());
        }
        
        if (eventUpdates.getEventType() != null) {
            existingEvent.setEventType(eventUpdates.getEventType());
        }
        
        if (eventUpdates.getStartTime() != null) {
            existingEvent.setStartTime(eventUpdates.getStartTime());
        }
        
        if (eventUpdates.getEndTime() != null) {
            if (eventUpdates.getEndTime().isBefore(existingEvent.getStartTime())) {
                throw new IllegalArgumentException("End-Zeit muss nach Start-Zeit liegen");
            }
            existingEvent.setEndTime(eventUpdates.getEndTime());
        }
        
        if (eventUpdates.getLocation() != null) {
            existingEvent.setLocation(eventUpdates.getLocation());
        }
        
        if (eventUpdates.getCapacity() != null) {
            if (eventUpdates.getCapacity() < 0) {
                throw new IllegalArgumentException("Kapazität darf nicht negativ sein");
            }
            // Prüfen ob neue Kapazität ausreicht für bestehende Zusagen
            int confirmedCount = existingEvent.getConfirmedCount();
            if (eventUpdates.getCapacity() < confirmedCount) {
                throw new IllegalArgumentException(
                    String.format("Neue Kapazität (%d) ist kleiner als Anzahl Zusagen (%d)", 
                        eventUpdates.getCapacity(), confirmedCount)
                );
            }
            existingEvent.setCapacity(eventUpdates.getCapacity());
        }
        
        if (eventUpdates.getNotes() != null) {
            existingEvent.setNotes(eventUpdates.getNotes());
        }
        
        if (eventUpdates.getTeamId() != null) {
            existingEvent.setTeamId(eventUpdates.getTeamId());
        }
        
        Event updatedEvent = eventRepository.save(existingEvent);
        log.info("Event updated successfully: {}", updatedEvent.getId());
        return updatedEvent;
    }

    /**
     * Löscht ein Event
     */
    public void delete(UUID orgId, UUID eventId) {
        log.info("Deleting event: {} from organization: {}", eventId, orgId);
        
        Event event = findById(orgId, eventId);
        eventRepository.delete(event);
        
        log.info("Event deleted successfully: {}", eventId);
    }

    /**
     * Fügt einen Teilnehmer zum Event hinzu (Status: PENDING)
     */
    public EventParticipant addParticipant(UUID orgId, UUID eventId, UUID memberId) {
        log.info("Adding participant: {} to event: {}", memberId, eventId);
        
        Event event = findById(orgId, eventId);
        Member member = memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member nicht gefunden: " + memberId));
        
        // Prüfen ob Member bereits teilnimmt
        if (participantRepository.existsByEventIdAndMemberId(eventId, memberId)) {
            throw new IllegalArgumentException("Member nimmt bereits am Event teil");
        }
        
        EventParticipant participant = EventParticipant.builder()
                .eventId(eventId)
                .memberId(memberId)
                .status("PENDING")
                .build();
        
        EventParticipant savedParticipant = participantRepository.save(participant);
        log.info("Participant added successfully");
        return savedParticipant;
    }

    /**
     * Zusagen (Status: YES)
     */
    public EventParticipant confirmParticipation(UUID orgId, UUID eventId, UUID memberId, String comment) {
        log.info("Member {} confirms participation in event: {}", memberId, eventId);
        
        Event event = findById(orgId, eventId);
        
        // Prüfen ob Event voll ist
        if (event.isFull()) {
            throw new IllegalArgumentException("Event ist ausgebucht");
        }
        
        EventParticipant participant = participantRepository.findByEventIdAndMemberId(eventId, memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Teilnahme nicht gefunden"));
        
        participant.confirm(comment);
        EventParticipant updatedParticipant = participantRepository.save(participant);
        
        log.info("Participation confirmed successfully");
        return updatedParticipant;
    }

    /**
     * Absagen (Status: NO)
     */
    public EventParticipant declineParticipation(UUID orgId, UUID eventId, UUID memberId, String comment) {
        log.info("Member {} declines participation in event: {}", memberId, eventId);
        
        findById(orgId, eventId); // Validierung dass Event existiert
        
        EventParticipant participant = participantRepository.findByEventIdAndMemberId(eventId, memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Teilnahme nicht gefunden"));
        
        participant.decline(comment);
        EventParticipant updatedParticipant = participantRepository.save(participant);
        
        log.info("Participation declined successfully");
        return updatedParticipant;
    }

    /**
     * Vielleicht (Status: MAYBE)
     */
    public EventParticipant maybeParticipation(UUID orgId, UUID eventId, UUID memberId, String comment) {
        log.info("Member {} sets participation to maybe for event: {}", memberId, eventId);
        
        findById(orgId, eventId); // Validierung dass Event existiert
        
        EventParticipant participant = participantRepository.findByEventIdAndMemberId(eventId, memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Teilnahme nicht gefunden"));
        
        participant.maybe(comment);
        EventParticipant updatedParticipant = participantRepository.save(participant);
        
        log.info("Participation set to maybe successfully");
        return updatedParticipant;
    }

    /**
     * Entfernt einen Teilnehmer aus einem Event
     */
    public void removeParticipant(UUID orgId, UUID eventId, UUID memberId) {
        log.info("Removing participant: {} from event: {}", memberId, eventId);
        
        findById(orgId, eventId); // Validierung dass Event existiert
        
        EventParticipant participant = participantRepository.findByEventIdAndMemberId(eventId, memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Teilnahme nicht gefunden"));
        
        participantRepository.delete(participant);
        log.info("Participant removed successfully");
    }

    /**
     * Gibt alle Teilnehmer eines Events zurück
     */
    @Transactional(readOnly = true)
    public List<EventParticipant> findParticipants(UUID orgId, UUID eventId) {
        log.debug("Finding participants for event: {}", eventId);
        findById(orgId, eventId); // Validierung dass Event existiert
        return participantRepository.findByEventId(eventId);
    }

    /**
     * Gibt Anzahl Events pro Verein zurück
     */
    @Transactional(readOnly = true)
    public long countByOrganization(UUID orgId) {
        return eventRepository.countByOrgId(orgId);
    }

    /**
     * Gibt Anzahl kommender Events zurück
     */
    @Transactional(readOnly = true)
    public long countUpcoming(UUID orgId) {
        return eventRepository.countUpcomingEvents(orgId, ZonedDateTime.now());
    }
}
