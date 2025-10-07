package com.dartclub.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO für Bust-Markierung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BustRequest {
    
    /**
     * Leg ID, in dem der Bust aufgetreten ist
     */
    @NotNull(message = "Leg ID ist erforderlich")
    private UUID legId;
}
