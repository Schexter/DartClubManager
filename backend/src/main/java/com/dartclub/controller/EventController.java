package com.dartclub.controller;

import com.dartclub.model.dto.request.CreateEventRequest;
import com.dartclub.model.dto.request.EventParticipationRequest;
import com.dartclub.model.dto.request.UpdateEventRequest;
import com.dartclub.model.dto.response.EventResponse;
import com.dartclub.model.entity.Event;
import com.dartclub.model.entity.EventParticipant;
import com.dartclub.model.enums.EventType;
import com.dartclub.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * EventController - REST API für Event-Management (Kalender)
 * 
 * Endpoints:
 * - GET    /api/events                             - Alle Events
 * - GET    /api/events/{id}                        - Event by ID
 * - GET    /api/events/upcoming                    - Kommende Events
 * - GET    /api/events/past                        - Vergangene Events
 * - GET    /api/events/type/{type}                 - Events nach Typ
 * - GET    /api/events/team/{teamId}               - Events eines Teams
 * - GET    /api/events/member/{memberId}           - Events eines Members
 * - POST   /api/events                             - Event erstellen
 * - PUT    /api/events/{id}                        - Event aktualisieren
 * - DELETE /api/events/{id}                        - Event löschen
 * - POST   /api/events/{id}/participants           - Teilnehmer hinzufügen
 * - PUT    /api/events/{id}/participants/{memberId}/confirm   - Zusagen
 * - PUT    /api/events/{id}/participants/{memberId}/decline   - Absagen
 * - PUT    /api/events/{id}/participants/{memberId}/maybe     - Vielleicht
 * - DELETE /api/events/{id}/participants/{memberId}           - Teilnehmer entfernen
 * - GET    /api/events/{id}/participants           - Alle Teilnehmer
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService eventService;

    /**
     * Gibt alle Events des Vereins zurück
     */
    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents(
            @RequestHeader("X-Org-Id") UUID orgId) {
        
        log.info("GET /api/events - orgId: {}", orgId);
        
        List<Event> events = eventService.findAll(orgId);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt ein Event anhand ID zurück
     */
    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id) {
        
        log.info("GET /api/events/{} - orgId: {}", id, orgId);
        
        Event event = eventService.findById(orgId, id);
        EventResponse response = toDetailResponse(event);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt alle kommenden Events zurück
     */
    @GetMapping("/upcoming")
    public ResponseEntity<List<EventResponse>> getUpcomingEvents(
            @RequestHeader("X-Org-Id") UUID orgId) {
        
        log.info("GET /api/events/upcoming - orgId: {}", orgId);
        
        List<Event> events = eventService.findUpcoming(orgId);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt alle vergangenen Events zurück
     */
    @GetMapping("/past")
    public ResponseEntity<List<EventResponse>> getPastEvents(
            @RequestHeader("X-Org-Id") UUID orgId) {
        
        log.info("GET /api/events/past - orgId: {}", orgId);
        
        List<Event> events = eventService.findPast(orgId);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt Events nach Typ zurück
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<EventResponse>> getEventsByType(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable EventType type) {
        
        log.info("GET /api/events/type/{} - orgId: {}", type, orgId);
        
        List<Event> events = eventService.findByType(orgId, type);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt Events in einem Zeitraum zurück
     */
    @GetMapping("/range")
    public ResponseEntity<List<EventResponse>> getEventsByDateRange(
            @RequestHeader("X-Org-Id") UUID orgId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime end) {
        
        log.info("GET /api/events/range?start={}&end={} - orgId: {}", start, end, orgId);
        
        List<Event> events = eventService.findByDateRange(orgId, start, end);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt Events eines Teams zurück
     */
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<EventResponse>> getEventsByTeam(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID teamId) {
        
        log.info("GET /api/events/team/{} - orgId: {}", teamId, orgId);
        
        List<Event> events = eventService.findByTeam(orgId, teamId);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt Events eines Members zurück
     */
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<EventResponse>> getEventsByMember(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID memberId) {
        
        log.info("GET /api/events/member/{} - orgId: {}", memberId, orgId);
        
        List<Event> events = eventService.findByParticipant(orgId, memberId);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Sucht Events nach Titel
     */
    @GetMapping("/search")
    public ResponseEntity<List<EventResponse>> searchEvents(
            @RequestHeader("X-Org-Id") UUID orgId,
            @RequestParam String title) {
        
        log.info("GET /api/events/search?title={} - orgId: {}", title, orgId);
        
        List<Event> events = eventService.searchByTitle(orgId, title);
        List<EventResponse> response = events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Erstellt ein neues Event
     */
    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestHeader("X-Org-Id") UUID orgId,
            @Valid @RequestBody CreateEventRequest request) {
        
        log.info("POST /api/events - orgId: {}, title: {}", orgId, request.getTitle());
        
        Event event = Event.builder()
                .orgId(orgId)
                .title(request.getTitle())
                .description(request.getDescription())
                .eventType(request.getEventType())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .location(request.getLocation())
                .capacity(request.getCapacity())
                .notes(request.getNotes())
                .teamId(request.getTeamId())
                .matchId(request.getMatchId())
                .createdBy(request.getCreatedBy())
                .build();
        
        Event createdEvent = eventService.create(event);
        EventResponse response = toResponse(createdEvent);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Aktualisiert ein Event
     */
    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEventRequest request) {
        
        log.info("PUT /api/events/{} - orgId: {}", id, orgId);
        
        Event eventUpdates = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .eventType(request.getEventType())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .location(request.getLocation())
                .capacity(request.getCapacity())
                .notes(request.getNotes())
                .teamId(request.getTeamId())
                .matchId(request.getMatchId())
                .build();
        
        Event updatedEvent = eventService.update(orgId, id, eventUpdates);
        EventResponse response = toResponse(updatedEvent);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Löscht ein Event
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id) {
        
        log.info("DELETE /api/events/{} - orgId: {}", id, orgId);
        
        eventService.delete(orgId, id);
        
        return ResponseEntity.noContent().build();
    }

    /**
     * Fügt einen Teilnehmer hinzu
     */
    @PostMapping("/{id}/participants")
    public ResponseEntity<Void> addParticipant(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @Valid @RequestBody EventParticipationRequest request) {
        
        log.info("POST /api/events/{}/participants - orgId: {}, memberId: {}", id, orgId, request.getMemberId());
        
        eventService.addParticipant(orgId, id, request.getMemberId());
        
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * Zusagen (Status: YES)
     */
    @PutMapping("/{id}/participants/{memberId}/confirm")
    public ResponseEntity<Void> confirmParticipation(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId,
            @RequestBody(required = false) String comment) {
        
        log.info("PUT /api/events/{}/participants/{}/confirm - orgId: {}", id, memberId, orgId);
        
        eventService.confirmParticipation(orgId, id, memberId, comment);
        
        return ResponseEntity.ok().build();
    }

    /**
     * Absagen (Status: NO)
     */
    @PutMapping("/{id}/participants/{memberId}/decline")
    public ResponseEntity<Void> declineParticipation(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId,
            @RequestBody(required = false) String comment) {
        
        log.info("PUT /api/events/{}/participants/{}/decline - orgId: {}", id, memberId, orgId);
        
        eventService.declineParticipation(orgId, id, memberId, comment);
        
        return ResponseEntity.ok().build();
    }

    /**
     * Vielleicht (Status: MAYBE)
     */
    @PutMapping("/{id}/participants/{memberId}/maybe")
    public ResponseEntity<Void> maybeParticipation(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId,
            @RequestBody(required = false) String comment) {
        
        log.info("PUT /api/events/{}/participants/{}/maybe - orgId: {}", id, memberId, orgId);
        
        eventService.maybeParticipation(orgId, id, memberId, comment);
        
        return ResponseEntity.ok().build();
    }

    /**
     * Entfernt einen Teilnehmer
     */
    @DeleteMapping("/{id}/participants/{memberId}")
    public ResponseEntity<Void> removeParticipant(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId) {
        
        log.info("DELETE /api/events/{}/participants/{} - orgId: {}", id, memberId, orgId);
        
        eventService.removeParticipant(orgId, id, memberId);
        
        return ResponseEntity.noContent().build();
    }

    /**
     * Gibt alle Teilnehmer eines Events zurück
     */
    @GetMapping("/{id}/participants")
    public ResponseEntity<List<EventResponse.ParticipantSummary>> getParticipants(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id) {
        
        log.info("GET /api/events/{}/participants - orgId: {}", id, orgId);
        
        List<EventParticipant> participants = eventService.findParticipants(orgId, id);
        List<EventResponse.ParticipantSummary> response = participants.stream()
                .map(this::toParticipantSummary)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    // Helper Methods

    private EventResponse toResponse(Event event) {
        String teamName = event.getTeam() != null ? event.getTeam().getName() : null;
        String createdByName = event.getCreator() != null 
                ? event.getCreator().getFirstName() + " " + event.getCreator().getLastName() 
                : null;
        
        return EventResponse.builder()
                .id(event.getId())
                .orgId(event.getOrgId())
                .title(event.getTitle())
                .description(event.getDescription())
                .eventType(event.getEventType())
                .startTime(event.getStartTime())
                .endTime(event.getEndTime())
                .location(event.getLocation())
                .capacity(event.getCapacity())
                .notes(event.getNotes())
                .teamId(event.getTeamId())
                .teamName(teamName)
                .matchId(event.getMatchId())
                .createdBy(event.getCreatedBy())
                .createdByName(createdByName)
                .confirmedCount(event.getConfirmedCount())
                .declinedCount(event.getDeclinedCount())
                .maybeCount(event.getMaybeCount())
                .isFull(event.isFull())
                .isPast(event.isPast())
                .isOngoing(event.isOngoing())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }

    private EventResponse toDetailResponse(Event event) {
        EventResponse response = toResponse(event);
        
        // Füge Teilnehmer hinzu
        List<EventResponse.ParticipantSummary> participants = event.getParticipants().stream()
                .map(this::toParticipantSummary)
                .collect(Collectors.toList());
        response.setParticipants(participants);
        
        return response;
    }

    private EventResponse.ParticipantSummary toParticipantSummary(EventParticipant participant) {
        String memberName = participant.getMember() != null
                ? participant.getMember().getFirstName() + " " + participant.getMember().getLastName()
                : null;
        
        return EventResponse.ParticipantSummary.builder()
                .memberId(participant.getMemberId())
                .memberName(memberName)
                .status(participant.getStatus())
                .comment(participant.getComment())
                .respondedAt(participant.getRespondedAt())
                .build();
    }
}
