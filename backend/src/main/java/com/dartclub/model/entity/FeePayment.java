package com.dartclub.model.entity;

import com.dartclub.model.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * FeePayment Entity - Zahlungseingänge
 * Dokumentiert alle Zahlungen die von Mitgliedern eingehen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "fee_payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "fee_assignment_id", nullable = false)
    private UUID feeAssignmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fee_assignment_id", insertable = false, updatable = false)
    private FeeAssignment feeAssignment;

    @Column(name = "amount_paid", nullable = false, precision = 10, scale = 2)
    private BigDecimal amountPaid;

    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "period_start")
    private LocalDate periodStart; // Für welchen Zeitraum

    @Column(name = "period_end")
    private LocalDate periodEnd;

    @Column(name = "reference_number")
    private String referenceNumber; // Überweisungsreferenz, Rechnungsnummer

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "recorded_by_user_id")
    private UUID recordedByUserId; // Wer hat die Zahlung erfasst

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recorded_by_user_id", insertable = false, updatable = false)
    private User recordedByUser;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}
