package com.dartclub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Throw Entity - Ein Wurf (3 Darts) in einem Leg
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "throws")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Throw {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "leg_id", nullable = false)
    private UUID legId;

    @Column(name = "member_id", nullable = false)
    private UUID memberId;

    @Column(name = "throw_no", nullable = false)
    private Integer throwNo;

    // Dart 1
    @Column(name = "dart1_multiplier")
    private Integer dart1Multiplier; // 0=Miss, 1=Single, 2=Double, 3=Triple

    @Column(name = "dart1_segment")
    private Integer dart1Segment; // 1-25 (25=Bull)

    @Builder.Default
    @Column(name = "dart1_score")
    private Integer dart1Score = 0;

    // Dart 2
    @Column(name = "dart2_multiplier")
    private Integer dart2Multiplier;

    @Column(name = "dart2_segment")
    private Integer dart2Segment;

    @Builder.Default
    @Column(name = "dart2_score")
    private Integer dart2Score = 0;

    // Dart 3
    @Column(name = "dart3_multiplier")
    private Integer dart3Multiplier;

    @Column(name = "dart3_segment")
    private Integer dart3Segment;

    @Builder.Default
    @Column(name = "dart3_score")
    private Integer dart3Score = 0;

    // Throw Summary
    @Builder.Default
    @Column(name = "throw_total", nullable = false)
    private Integer throwTotal = 0;

    @Column(name = "remaining_score", nullable = false)
    private Integer remainingScore;

    @Builder.Default
    @Column(name = "is_bust")
    private Boolean isBust = false;

    @Builder.Default
    @Column(name = "is_checkout")
    private Boolean isCheckout = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }
}
