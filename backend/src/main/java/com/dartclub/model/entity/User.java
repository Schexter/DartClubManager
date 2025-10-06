package com.dartclub.model.entity;

import com.dartclub.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * User Entity - Authentifizierung & Account Management
 * 
 * Multi-Tenancy Unterstützung:
 * - organizationId: Verknüpfung zum Verein
 * - role: Rolle des Users im Verein (ADMIN, TRAINER, CAPTAIN, PLAYER)
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "display_name")
    private String displayName;

    /**
     * Organisation/Verein ID für Multi-Tenancy
     * Jeder User gehört zu genau einer Organisation
     */
    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    /**
     * Beziehung zur Organisation (Lazy Loading)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", insertable = false, updatable = false)
    private Organization organization;

    /**
     * Rolle des Users in der Organisation
     * Default: PLAYER (normale Mitglieder)
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    @Builder.Default
    private UserRole role = UserRole.PLAYER;

    /**
     * Account aktiv/inaktiv
     * Inaktive Accounts können sich nicht einloggen
     */
    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

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
     * Prüft ob User Admin ist
     */
    @Transient
    public boolean isAdmin() {
        return role == UserRole.ADMIN;
    }

    /**
     * Prüft ob User Trainer ist
     */
    @Transient
    public boolean isTrainer() {
        return role == UserRole.TRAINER;
    }

    /**
     * Prüft ob User Captain ist
     */
    @Transient
    public boolean isCaptain() {
        return role == UserRole.CAPTAIN;
    }

    /**
     * Prüft ob User mindestens Trainer-Rechte hat
     */
    @Transient
    public boolean hasTrainerRights() {
        return role == UserRole.ADMIN || role == UserRole.TRAINER;
    }

    /**
     * Prüft ob User mindestens Captain-Rechte hat
     */
    @Transient
    public boolean hasCaptainRights() {
        return role == UserRole.ADMIN || role == UserRole.TRAINER || role == UserRole.CAPTAIN;
    }
}
