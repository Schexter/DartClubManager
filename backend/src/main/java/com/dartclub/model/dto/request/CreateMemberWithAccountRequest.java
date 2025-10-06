package com.dartclub.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Create Member With Account Request DTO
 * Erstellt User + Member + Membership in einem Schritt
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMemberWithAccountRequest {

    @NotBlank(message = "Vorname ist erforderlich")
    @Size(min = 2, max = 100, message = "Vorname muss zwischen 2 und 100 Zeichen lang sein")
    private String firstName;

    @NotBlank(message = "Nachname ist erforderlich")
    @Size(min = 2, max = 100, message = "Nachname muss zwischen 2 und 100 Zeichen lang sein")
    private String lastName;

    @NotBlank(message = "E-Mail ist erforderlich")
    @Email(message = "Ungültige E-Mail-Adresse")
    private String email;

    private String phone;

    private LocalDate birthdate;

    @NotBlank(message = "Passwort ist erforderlich")
    @Size(min = 6, message = "Passwort muss mindestens 6 Zeichen lang sein")
    private String password;

    private String licenseNo;

    private String handedness; // 'left' or 'right'

    private String notes;
}
