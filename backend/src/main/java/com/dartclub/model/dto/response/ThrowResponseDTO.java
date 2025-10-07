package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO für Wurf-Response
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThrowResponseDTO {
    
    private UUID throwId;
    private Integer throwTotal;
    private Integer remainingScore;
    private Boolean isCheckout;
    private Boolean isBust;
    private String event; // z.B. "180", "171", "140_plus", "high_checkout"
    private Boolean legFinished;
    private LiveScoringLegDTO leg; // Aktualisierte Leg-Daten
}
