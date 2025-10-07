package com.dartclub.model.entity;

import com.dartclub.model.enums.FeeAssignmentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * FeeAssignment Entity - Zuweisung von Beiträgen zu Mitgliedern
 * Definiert welches Mitglied welchen Beitragssatz zahlen muss
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "fee_assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "member_id", nullable = false)
    private UUID memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    @Column(name = "fee_id", nullable = false)
    private UUID feeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fee_id", insertable = false, updatable = false)
    private Fee fee;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate; // Ab wann gilt diese Zuweisung

    @Column(name = "end_date")
    private LocalDate endDate; // Optional: Bis wann gilt sie

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private FeeAssignmentStatus status;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
        if (status == null) {
            status = FeeAssignmentStatus.ACTIVE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}
