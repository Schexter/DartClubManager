package com.dartclub.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Event Participation Request DTO
 * 
 * Für Zu-/Absagen zu Events
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventParticipationRequest {

    @NotNull(message = "Member-ID ist erforderlich")
    private UUID memberId;

    @NotBlank(message = "Status ist erforderlich")
    @Pattern(regexp = "YES|NO|MAYBE|PENDING", message = "Status muss YES, NO, MAYBE oder PENDING sein")
    private String status;

    private String comment; // Optionaler Kommentar
}
