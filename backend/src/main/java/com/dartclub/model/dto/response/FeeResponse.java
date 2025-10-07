package com.dartclub.model.dto.response;

import com.dartclub.model.enums.FeePeriod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Response DTO für Beitragssätze
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeeResponse {

    private UUID id;
    private UUID orgId;
    private String name;
    private BigDecimal amount;
    private FeePeriod period;
    private String description;
    private Boolean isActive;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
