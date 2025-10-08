package com.dartclub.model.dto.response;

import com.dartclub.model.enums.FeeAssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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
    
    // Fee Details (für Anzeige)
    private FeeResponse fee; // Vollständiges Fee-Objekt
    
    private LocalDate startDate;
    private LocalDate endDate;
    private FeeAssignmentStatus status;
    private String notes;
    
    // Zahlungsinformationen
    private BigDecimal totalPaid;
    private BigDecimal remainingAmount;
    private LocalDate lastPaymentDate;
    private String paymentStatus; // "PAID", "PARTIAL", "OPEN", "OVERDUE"
    
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
