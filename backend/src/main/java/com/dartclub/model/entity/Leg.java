package com.dartclub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Leg Entity - Einzelnes Leg in einem Dart-Match
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "legs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Leg {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "set_id", nullable = false)
    private UUID setId;

    @Column(name = "leg_no", nullable = false)
    private Integer legNo;

    @Builder.Default
    @Column(name = "starting_score", nullable = false)
    private Integer startingScore = 501;

    @Column(name = "home_member_id")
    private UUID homeMemberId;

    @Column(name = "away_member_id")
    private UUID awayMemberId;

    // Namen für Gastspieler (wenn kein Member)
    @Column(name = "home_player_name")
    private String homePlayerName;

    @Column(name = "away_player_name")
    private String awayPlayerName;

    @Column(name = "winner_team_id")
    private UUID winnerTeamId;

    @Column(name = "winner_member_id")
    private UUID winnerMemberId;

    @Column(name = "total_darts")
    private Integer totalDarts;

    @Column(name = "checkout_score")
    private Integer checkoutScore;

    @Column(name = "started_at")
    private ZonedDateTime startedAt;

    @Column(name = "finished_at")
    private ZonedDateTime finishedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }

    /**
     * Check if Double-Out is required
     * (This should come from the parent Match, but can be cached here)
     */
    @Builder.Default
    @Transient
    private boolean doubleOut = true;

    public boolean isDoubleOut() {
        return doubleOut;
    }

    public void setDoubleOut(boolean doubleOut) {
        this.doubleOut = doubleOut;
    }

    /**
     * Check if leg is finished
     */
    public boolean isFinished() {
        return finishedAt != null && winnerMemberId != null;
    }

    /**
     * Get display name for home player
     */
    @Transient
    public String getHomePlayerDisplayName() {
        if (homePlayerName != null) return homePlayerName;
        return "Spieler Heim"; // Wird vom Service mit Member-Namen aufgelöst
    }

    /**
     * Get display name for away player
     */
    @Transient
    public String getAwayPlayerDisplayName() {
        if (awayPlayerName != null) return awayPlayerName;
        return "Spieler Auswärts"; // Wird vom Service mit Member-Namen aufgelöst
    }
}
