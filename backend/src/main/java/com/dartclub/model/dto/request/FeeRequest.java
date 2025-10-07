package com.dartclub.model.dto.request;

import com.dartclub.model.enums.FeePeriod;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Request DTO zum Erstellen/Aktualisieren eines Beitragssatzes
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
public class FeeRequest {

    @NotBlank(message = "Name ist erforderlich")
    @Size(max = 255, message = "Name darf maximal 255 Zeichen lang sein")
    private String name;

    @NotNull(message = "Betrag ist erforderlich")
    @DecimalMin(value = "0.0", inclusive = false, message = "Betrag muss größer als 0 sein")
    @Digits(integer = 8, fraction = 2, message = "Betrag darf maximal 8 Vorkomma- und 2 Nachkommastellen haben")
    private BigDecimal amount;

    @NotNull(message = "Periode ist erforderlich")
    private FeePeriod period;

    @Size(max = 1000, message = "Beschreibung darf maximal 1000 Zeichen lang sein")
    private String description;

    private Boolean isActive = true;
}
