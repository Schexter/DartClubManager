package com.dartclub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Member Entity - Vereinsmitglieder
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "org_id", nullable = false)
    private UUID orgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id", insertable = false, updatable = false)
    private Organization organization;

    @Column(name = "user_id")
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name = "license_no")
    private String licenseNo;

    @Column(name = "handedness")
    private String handedness; // 'left' or 'right'

    @Column(name = "player_name")
    private String playerName; // Optional display name for matches

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "role", nullable = false)
    private String role; // 'ADMIN', 'TRAINER', 'CAPTAIN', 'PLAYER'

    @Column(name = "status", nullable = false)
    private String status; // 'ACTIVE', 'INACTIVE'

    @Column(name = "joined_at")
    private LocalDate joinedAt;

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

    // Helper method für vollständigen Namen
    @Transient
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
