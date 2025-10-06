package com.dartclub.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO für Organisation erstellen
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrganizationRequest {

    @NotBlank(message = "Organisationsname ist erforderlich")
    @Size(min = 3, max = 100, message = "Organisationsname muss zwischen 3 und 100 Zeichen lang sein")
    private String name;

    @Pattern(regexp = "^[a-z0-9-]+$", message = "Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten")
    @Size(min = 3, max = 50, message = "Slug muss zwischen 3 und 50 Zeichen lang sein")
    private String slug;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Primärfarbe muss ein gültiger Hex-Code sein (z.B. #FF5733)")
    private String primaryColor;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Sekundärfarbe muss ein gültiger Hex-Code sein (z.B. #FF5733)")
    private String secondaryColor;
}
