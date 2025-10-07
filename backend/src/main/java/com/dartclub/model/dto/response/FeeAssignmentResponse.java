package com.dartclub.model.dto.response;

import com.dartclub.model.enums.FeeAssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Response DTO für Beitragszuweisungen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeeAssignmentResponse {

    private UUID id;
    private UUID memberId;
    private String memberName; // firstName + lastName
    private UUID feeId;
    private String feeName;
    private LocalDate startDate;
    private LocalDate endDate;
    private FeeAssignmentStatus status;
    private String notes;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
