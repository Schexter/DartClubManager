package com.dartclub.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Create Team Request DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTeamRequest {

    @NotBlank(message = "Teamname ist erforderlich")
    @Size(min = 2, max = 255, message = "Teamname muss zwischen 2 und 255 Zeichen lang sein")
    private String name;

    private String season; // z.B. "2024/25"

    private String description;

    private String league; // z.B. "Kreisliga A"

    private String logoUrl;

    private UUID captainId; // Optional: Captain festlegen
}
