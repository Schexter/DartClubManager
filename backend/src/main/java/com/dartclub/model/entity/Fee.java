package com.dartclub.model.entity;

import com.dartclub.model.enums.FeePeriod;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Fee Entity - Beitragssätze
 * Definiert verschiedene Arten von Beiträgen (z.B. Jahresbeitrag, Monatsbeitrag)
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Entity
@Table(name = "fees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "org_id", nullable = false)
    private UUID orgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id", insertable = false, updatable = false)
    private Organization organization;

    @Column(name = "name", nullable = false)
    private String name; // z.B. "Jahresbeitrag Erwachsene"

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount; // z.B. 120.00

    @Enumerated(EnumType.STRING)
    @Column(name = "period", nullable = false)
    private FeePeriod period; // YEARLY, MONTHLY, QUARTERLY, ONCE

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}
