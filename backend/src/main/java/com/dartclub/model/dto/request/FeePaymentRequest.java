package com.dartclub.model.dto.request;

import com.dartclub.model.enums.PaymentMethod;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Request DTO zum Erfassen einer Zahlung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
public class FeePaymentRequest {

    @NotNull(message = "Zuweisungs-ID ist erforderlich")
    private UUID feeAssignmentId;

    @NotNull(message = "Betrag ist erforderlich")
    @DecimalMin(value = "0.0", inclusive = false, message = "Betrag muss größer als 0 sein")
    @Digits(integer = 8, fraction = 2, message = "Betrag darf maximal 8 Vorkomma- und 2 Nachkommastellen haben")
    private BigDecimal amountPaid;

    @NotNull(message = "Zahlungsdatum ist erforderlich")
    private LocalDate paymentDate;

    @NotNull(message = "Zahlungsmethode ist erforderlich")
    private PaymentMethod paymentMethod;

    private LocalDate periodStart;

    private LocalDate periodEnd;

    @Size(max = 255, message = "Referenznummer darf maximal 255 Zeichen lang sein")
    private String referenceNumber;

    @Size(max = 1000, message = "Notizen dürfen maximal 1000 Zeichen lang sein")
    private String notes;
}
