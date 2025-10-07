package com.dartclub.model.dto.request;

import com.dartclub.model.enums.FeeAssignmentStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Request DTO zum Erstellen/Aktualisieren einer Beitragszuweisung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
public class FeeAssignmentRequest {

    @NotNull(message = "Mitglieds-ID ist erforderlich")
    private UUID memberId;

    @NotNull(message = "Beitrags-ID ist erforderlich")
    private UUID feeId;

    @NotNull(message = "Startdatum ist erforderlich")
    private LocalDate startDate;

    private LocalDate endDate;

    private FeeAssignmentStatus status = FeeAssignmentStatus.ACTIVE;

    @Size(max = 1000, message = "Notizen dürfen maximal 1000 Zeichen lang sein")
    private String notes;
}
