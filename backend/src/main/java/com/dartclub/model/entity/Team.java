package com.dartclub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Team Entity - Dart-Teams
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "teams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "org_id", nullable = false)
    private UUID orgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id", insertable = false, updatable = false)
    private Organization organization;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "season")
    private String season; // z.B. "2024/25"

    @Column(name = "captain_id")
    private UUID captainId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "captain_id", insertable = false, updatable = false)
    private Member captain;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "league")
    private String league; // z.B. "Kreisliga A"

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "color")
    private String color; // Hex-Farbe für Team-Visualisierung, z.B. "#FF5733"

    // Many-to-Many Beziehung zu Mitgliedern
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "team_members",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    @Builder.Default
    private Set<Member> members = new HashSet<>();

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
     * Fügt ein Mitglied zum Team hinzu
     */
    public void addMember(Member member) {
        this.members.add(member);
    }

    /**
     * Entfernt ein Mitglied aus dem Team
     */
    public void removeMember(Member member) {
        this.members.remove(member);
    }

    /**
     * Prüft ob ein Mitglied im Team ist
     */
    public boolean hasMember(Member member) {
        return this.members.contains(member);
    }

    /**
     * Gibt die Anzahl der Mitglieder zurück
     */
    @Transient
    public int getMemberCount() {
        return this.members.size();
    }
}
