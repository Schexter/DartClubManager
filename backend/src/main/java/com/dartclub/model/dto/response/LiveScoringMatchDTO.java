package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO für Live-Scoring Match-Daten
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveScoringMatchDTO {
    
    private UUID id;
    private TeamBasicDTO homeTeam;
    private TeamBasicDTO awayTeam;
    private Integer homeScore;
    private Integer awayScore;
    private Integer currentSet;
    private Integer currentLeg;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TeamBasicDTO {
        private UUID id;
        private String name;
    }
}
