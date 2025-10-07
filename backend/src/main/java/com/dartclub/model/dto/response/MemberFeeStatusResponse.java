package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Response DTO für Mitglieds-Beitragsstatus (Übersicht)
 * Zeigt ob ein Mitglied bezahlt hat oder nicht
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberFeeStatusResponse {

    private UUID memberId;
    private String memberName;
    private String email;
    
    private UUID feeId;
    private String feeName;
    private BigDecimal feeAmount;
    
    private BigDecimal totalPaid;
    private BigDecimal remainingAmount;
    
    private LocalDate lastPaymentDate;
    private LocalDate nextDueDate;
    
    private String status; // "PAID", "PARTIAL", "OPEN", "OVERDUE"
    private Boolean isOverdue;
}
