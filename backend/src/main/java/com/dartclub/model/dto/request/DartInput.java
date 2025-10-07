package com.dartclub.model.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO für einen einzelnen Dart
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DartInput {
    
    /**
     * Multiplier: 0 (Miss), 1 (Single), 2 (Double), 3 (Triple)
     */
    @NotNull(message = "Multiplier ist erforderlich")
    @Min(value = 0, message = "Multiplier muss zwischen 0 und 3 liegen")
    @Max(value = 3, message = "Multiplier muss zwischen 0 und 3 liegen")
    private Integer multiplier;
    
    /**
     * Segment: 1-25 (wobei 25 = Bull)
     */
    @NotNull(message = "Segment ist erforderlich")
    @Min(value = 0, message = "Segment muss zwischen 0 und 25 liegen")
    @Max(value = 25, message = "Segment muss zwischen 0 und 25 liegen")
    private Integer segment;
}
