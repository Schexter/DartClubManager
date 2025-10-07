package com.dartclub.model.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

/**
 * DTO für einen kompletten Wurf (3 Darts)
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThrowRequest {
    
    /**
     * Leg ID, zu dem dieser Wurf gehört
     */
    @NotNull(message = "Leg ID ist erforderlich")
    private UUID legId;
    
    /**
     * Liste der 3 Darts (genau 3 Einträge)
     */
    @NotNull(message = "Darts-Liste ist erforderlich")
    @NotEmpty(message = "Darts-Liste darf nicht leer sein")
    @Size(min = 3, max = 3, message = "Es müssen genau 3 Darts eingegeben werden")
    @Valid
    private List<DartInput> darts;
}
