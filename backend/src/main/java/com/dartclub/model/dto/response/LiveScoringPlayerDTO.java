package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO für Live-Scoring Player-Daten
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveScoringPlayerDTO {
    
    private UUID id;
    private String name;
    private Integer remainingScore;
    private String lastThrow;
    private Double average;
}
