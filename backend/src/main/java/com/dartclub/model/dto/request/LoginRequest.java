package com.dartclub.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Login Request DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @Email(message = "Ungültige E-Mail-Adresse")
    @NotBlank(message = "E-Mail ist erforderlich")
    private String email;

    @NotBlank(message = "Passwort ist erforderlich")
    @Size(min = 6, message = "Passwort muss mindestens 6 Zeichen lang sein")
    private String password;
}
