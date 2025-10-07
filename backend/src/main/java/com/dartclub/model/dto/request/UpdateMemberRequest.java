package com.dartclub.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Update Member Request DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemberRequest {

    @Size(min = 2, max = 100, message = "Vorname muss zwischen 2 und 100 Zeichen lang sein")
    private String firstName;

    @Size(min = 2, max = 100, message = "Nachname muss zwischen 2 und 100 Zeichen lang sein")
    private String lastName;

    @Email(message = "Ungültige E-Mail-Adresse")
    private String email;

    private String phone;

    private LocalDate birthdate;

    private String licenseNo;

    private String handedness; // 'left' or 'right'

    private String notes;

    private String role; // 'ADMIN', 'TRAINER', 'CAPTAIN', 'PLAYER'

    private String status; // 'ACTIVE', 'INACTIVE'
}
