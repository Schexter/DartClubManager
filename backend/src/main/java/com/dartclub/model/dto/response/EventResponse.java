package com.dartclub.model.dto.response;

import com.dartclub.model.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Event Response DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private UUID id;
    private UUID orgId;
    private String title;
    private String description;
    private EventType eventType;
    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
    private String location;
    private Integer capacity;
    private String notes;
    
    // Verknüpfungen
    private UUID teamId;
    private String teamName;
    private UUID matchId;
    private UUID createdBy;
    private String createdByName;
    
    // Statistiken
    private int confirmedCount;
    private int declinedCount;
    private int maybeCount;
    private int pendingCount;
    private boolean isFull;
    private boolean isPast;
    private boolean isOngoing;
    
    // Teilnehmer (nur bei Detail View)
    private List<ParticipantSummary> participants;
    
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    /**
     * Nested DTO für Teilnehmer-Übersicht
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ParticipantSummary {
        private UUID memberId;
        private String memberName;
        private String status; // YES, NO, MAYBE, PENDING
        private String comment;
        private ZonedDateTime respondedAt;
    }
}
