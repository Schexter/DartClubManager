package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO für Live-Scoring Leg-Daten
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveScoringLegDTO {
    
    private UUID id;
    private Integer setNumber;
    private Integer legNumber;
    private LiveScoringPlayerDTO homePlayer;
    private LiveScoringPlayerDTO awayPlayer;
    private String currentPlayer; // "home" oder "away"
}
