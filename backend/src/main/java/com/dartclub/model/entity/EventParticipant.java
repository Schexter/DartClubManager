package com.dartclub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * EventParticipant Entity - Teilnahme an Events (Zu-/Absagen)
 * 
 * Status-Werte:
 * - YES: Zugesagt
 * - NO: Abgesagt
 * - MAYBE: Vielleicht
 * - PENDING: Noch nicht beantwortet
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "event_participants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(EventParticipantId.class)
public class EventParticipant {

    @Id
    @Column(name = "event_id", nullable = false)
    private UUID eventId;

    @Id
    @Column(name = "member_id", nullable = false)
    private UUID memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", insertable = false, updatable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    /**
     * Status: YES, NO, MAYBE, PENDING
     */
    @Column(name = "status", nullable = false)
    @Builder.Default
    private String status = "PENDING";

    @Column(name = "comment")
    private String comment; // Optionaler Kommentar vom Teilnehmer

    @Column(name = "responded_at")
    private ZonedDateTime respondedAt; // Wann wurde die Zu-/Absage gegeben

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
        if (!status.equals("PENDING") && respondedAt == null) {
            respondedAt = ZonedDateTime.now();
        }
    }

    // Helper Methods

    /**
     * Setzt Status auf YES (Zusage)
     */
    public void confirm(String comment) {
        this.status = "YES";
        this.comment = comment;
        this.respondedAt = ZonedDateTime.now();
    }

    /**
     * Setzt Status auf NO (Absage)
     */
    public void decline(String comment) {
        this.status = "NO";
        this.comment = comment;
        this.respondedAt = ZonedDateTime.now();
    }

    /**
     * Setzt Status auf MAYBE (Vielleicht)
     */
    public void maybe(String comment) {
        this.status = "MAYBE";
        this.comment = comment;
        this.respondedAt = ZonedDateTime.now();
    }

    /**
     * Prüft ob Teilnehmer zugesagt hat
     */
    @Transient
    public boolean isConfirmed() {
        return "YES".equals(status);
    }

    /**
     * Prüft ob Teilnehmer abgesagt hat
     */
    @Transient
    public boolean isDeclined() {
        return "NO".equals(status);
    }

    /**
     * Prüft ob Teilnehmer noch nicht geantwortet hat
     */
    @Transient
    public boolean isPending() {
        return "PENDING".equals(status);
    }

    // Composite Key Class
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventParticipantId implements java.io.Serializable {
        private UUID eventId;
        private UUID memberId;
    }
}
