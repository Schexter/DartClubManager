package com.dartclub.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * SwitchOrganizationRequest - DTO für Organisation-Wechsel
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SwitchOrganizationRequest {
    @NotNull(message = "Organisation ID ist erforderlich")
    private UUID orgId;
}
