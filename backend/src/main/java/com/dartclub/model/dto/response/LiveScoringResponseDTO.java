package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO für Live-Scoring Gesamt-Response
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveScoringResponseDTO {
    
    private LiveScoringMatchDTO match;
    private LiveScoringLegDTO currentLeg;
}
