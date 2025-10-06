package com.dartclub.model.entity;

import com.dartclub.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Membership Entity - User <-> Organization Relationship mit Rolle
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "memberships")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(Membership.MembershipId.class)
public class Membership {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Id
    @Column(name = "org_id")
    private UUID orgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id", insertable = false, updatable = false)
    private Organization organization;

    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "status")
    @Builder.Default
    private String status = "active";

    @Column(name = "joined_at")
    private LocalDate joinedAt;

    @Column(name = "left_at")
    private LocalDate leftAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        if (joinedAt == null) {
            joinedAt = LocalDate.now();
        }
    }

    // Composite Key Class
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MembershipId implements Serializable {
        private UUID userId;
        private UUID orgId;
    }
}
