package com.dartclub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Set Entity - Ein Set in einem Dart-Match (Best-of-Legs)
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "sets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Set {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "match_id", nullable = false)
    private UUID matchId;

    @Column(name = "set_no", nullable = false)
    private Integer setNo;

    @Builder.Default
    @Column(name = "home_legs")
    private Integer homeLegs = 0;

    @Builder.Default
    @Column(name = "away_legs")
    private Integer awayLegs = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }

    /**
     * Check if home team won this set
     */
    public boolean isHomeWinner(int bestOfLegs) {
        int legsToWin = (bestOfLegs / 2) + 1;
        return homeLegs >= legsToWin;
    }

    /**
     * Check if away team won this set
     */
    public boolean isAwayWinner(int bestOfLegs) {
        int legsToWin = (bestOfLegs / 2) + 1;
        return awayLegs >= legsToWin;
    }

    /**
     * Check if set is finished
     */
    public boolean isFinished(int bestOfLegs) {
        return isHomeWinner(bestOfLegs) || isAwayWinner(bestOfLegs);
    }
}
