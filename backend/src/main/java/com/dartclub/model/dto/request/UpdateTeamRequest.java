package com.dartclub.model.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Update Team Request DTO
 * 
 * Alle Felder sind optional - nur gesetzte Felder werden aktualisiert
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTeamRequest {

    @Size(min = 2, max = 255, message = "Teamname muss zwischen 2 und 255 Zeichen lang sein")
    private String name;

    private String season;

    private String description;

    private String league;

    private String logoUrl;

    private UUID captainId;
}
