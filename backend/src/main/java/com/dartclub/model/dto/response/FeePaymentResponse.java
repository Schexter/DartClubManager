package com.dartclub.model.dto.response;

import com.dartclub.model.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Response DTO für Zahlungen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeePaymentResponse {

    private UUID id;
    private UUID feeAssignmentId;
    private BigDecimal amountPaid;
    private LocalDate paymentDate;
    private PaymentMethod paymentMethod;
    private LocalDate periodStart;
    private LocalDate periodEnd;
    private String referenceNumber;
    private String notes;
    private UUID recordedByUserId;
    private String recordedByUserName;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
