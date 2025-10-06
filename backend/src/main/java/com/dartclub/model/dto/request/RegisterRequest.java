package com.dartclub.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Register Request DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @Email(message = "Ungültige E-Mail-Adresse")
    @NotBlank(message = "E-Mail ist erforderlich")
    private String email;

    @NotBlank(message = "Passwort ist erforderlich")
    @Size(min = 6, max = 100, message = "Passwort muss zwischen 6 und 100 Zeichen lang sein")
    private String password;

    @NotBlank(message = "Anzeigename ist erforderlich")
    @Size(min = 2, max = 255, message = "Anzeigename muss zwischen 2 und 255 Zeichen lang sein")
    private String displayName;

    private String organizationName;

    private String organizationSlug;
}
