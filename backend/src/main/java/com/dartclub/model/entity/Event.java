package com.dartclub.model.entity;

import com.dartclub.model.enums.EventType;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Event Entity - Termine (Training, Matches, Meetings)
 * 
 * Features:
 * - Verschiedene Event-Typen (Training, Match, Meeting, Other)
 * - Start- und End-Zeit
 * - Ort/Location
 * - Teilnehmer-Management (Zu-/Absagen)
 * - Kapazitätsbegrenzung
 * - Beschreibung & Notizen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "org_id", nullable = false)
    private UUID orgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id", insertable = false, updatable = false)
    private Organization organization;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    @Builder.Default
    private EventType eventType = EventType.TRAINING;

    @Column(name = "start_time", nullable = false)
    private ZonedDateTime startTime;

    @Column(name = "end_time")
    private ZonedDateTime endTime;

    @Column(name = "location")
    private String location;

    @Column(name = "capacity")
    private Integer capacity; // Max. Anzahl Teilnehmer (null = unbegrenzt)

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    // Verknüpftes Match (falls Event-Type = MATCH)
    @Column(name = "match_id")
    private UUID matchId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", insertable = false, updatable = false)
    private Match match;

    // Verknüpftes Team (falls Event-Type = TRAINING und team-spezifisch)
    @Column(name = "team_id")
    private UUID teamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    private Team team;

    // Erstellt von
    @Column(name = "created_by", nullable = false)
    private UUID createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", insertable = false, updatable = false)
    private Member creator;

    // Teilnehmer (Many-to-Many über event_participants)
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<EventParticipant> participants = new HashSet<>();

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
    }

    // Helper Methods
    
    /**
     * Fügt einen Teilnehmer hinzu
     */
    public void addParticipant(EventParticipant participant) {
        this.participants.add(participant);
        participant.setEvent(this);
    }

    /**
     * Entfernt einen Teilnehmer
     */
    public void removeParticipant(EventParticipant participant) {
        this.participants.remove(participant);
        participant.setEvent(null);
    }

    /**
     * Gibt die Anzahl der zugesagten Teilnehmer zurück
     */
    @Transient
    public int getConfirmedCount() {
        return (int) this.participants.stream()
                .filter(p -> "YES".equals(p.getStatus()))
                .count();
    }

    /**
     * Gibt die Anzahl der abgesagten Teilnehmer zurück
     */
    @Transient
    public int getDeclinedCount() {
        return (int) this.participants.stream()
                .filter(p -> "NO".equals(p.getStatus()))
                .count();
    }

    /**
     * Gibt die Anzahl der "Vielleicht"-Teilnehmer zurück
     */
    @Transient
    public int getMaybeCount() {
        return (int) this.participants.stream()
                .filter(p -> "MAYBE".equals(p.getStatus()))
                .count();
    }

    /**
     * Prüft ob Event ausgebucht ist
     */
    @Transient
    public boolean isFull() {
        if (capacity == null) {
            return false; // Unbegrenzte Kapazität
        }
        return getConfirmedCount() >= capacity;
    }

    /**
     * Prüft ob Event in der Vergangenheit liegt
     */
    @Transient
    public boolean isPast() {
        return ZonedDateTime.now().isAfter(startTime);
    }

    /**
     * Prüft ob Event aktuell läuft
     */
    @Transient
    public boolean isOngoing() {
        ZonedDateTime now = ZonedDateTime.now();
        if (endTime == null) {
            return false;
        }
        return now.isAfter(startTime) && now.isBefore(endTime);
    }
}
