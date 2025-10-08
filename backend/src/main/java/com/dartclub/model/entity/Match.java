package com.dartclub.model.entity;

import com.dartclub.model.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Match Entity - Dart-Match zwischen zwei Teams
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "org_id", nullable = false)
    private UUID orgId;

    @Column(name = "home_team_id")
    private UUID homeTeamId;

    @Column(name = "away_team_id")
    private UUID awayTeamId;

    // Einzelspieler-Matches (optional)
    @Column(name = "home_player_id")
    private UUID homePlayerId; // Mitglied aus der Org

    @Column(name = "away_player_id")
    private UUID awayPlayerId; // Mitglied aus der Org

    @Column(name = "home_player_name")
    private String homePlayerName; // Gastspieler (wenn nicht homePlayerId)

    @Column(name = "away_player_name")
    private String awayPlayerName; // Gastspieler (wenn nicht awayPlayerId)

    @Column(name = "match_date", nullable = false)
    private ZonedDateTime matchDate;

    @Column(name = "venue")
    private String venue;

    @Column(name = "league")
    private String league;

    @Builder.Default
    @Column(name = "match_type")
    private String matchType = "league"; // league, friendly, cup, practice

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MatchStatus status = MatchStatus.SCHEDULED;

    @Builder.Default
    @Column(name = "home_sets")
    private Integer homeSets = 0;

    @Builder.Default
    @Column(name = "away_sets")
    private Integer awaySets = 0;

    @Builder.Default
    @Column(name = "best_of_sets")
    private Integer bestOfSets = 5;

    @Builder.Default
    @Column(name = "best_of_legs")
    private Integer bestOfLegs = 5;

    @Builder.Default
    @Column(name = "starting_score")
    private Integer startingScore = 501;

    @Builder.Default
    @Column(name = "double_out")
    private Boolean doubleOut = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Column(name = "finished_at")
    private ZonedDateTime finishedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }

    /**
     * Check if match is finished
     */
    public boolean isFinished() {
        return status == MatchStatus.FINISHED;
    }

    /**
     * Check if match is live
     */
    public boolean isLive() {
        return status == MatchStatus.LIVE;
    }

    /**
     * Check if this is a team match (vs individual player match)
     */
    public boolean isTeamMatch() {
        return homeTeamId != null || awayTeamId != null;
    }

    /**
     * Check if this is an individual player match
     */
    public boolean isPlayerMatch() {
        return homePlayerId != null || awayPlayerId != null || 
               homePlayerName != null || awayPlayerName != null;
    }

    /**
     * Get display name for home side
     */
    @Transient
    public String getHomeDisplayName() {
        if (homePlayerName != null) return homePlayerName;
        if (homePlayerId != null) return "Spieler (ID: " + homePlayerId + ")"; // Wird vom Service aufgelöst
        return "Heim-Team";
    }

    /**
     * Get display name for away side
     */
    @Transient
    public String getAwayDisplayName() {
        if (awayPlayerName != null) return awayPlayerName;
        if (awayPlayerId != null) return "Spieler (ID: " + awayPlayerId + ")"; // Wird vom Service aufgelöst
        return "Auswärts-Team";
    }
}
