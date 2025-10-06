package com.dartclub.model.dto.request;

import com.dartclub.model.enums.EventType;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Update Event Request DTO
 * 
 * Alle Felder sind optional - nur gesetzte Felder werden aktualisiert
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEventRequest {

    @Size(min = 3, max = 255, message = "Titel muss zwischen 3 und 255 Zeichen lang sein")
    private String title;

    private String description;

    private EventType eventType;

    private ZonedDateTime startTime;

    private ZonedDateTime endTime;

    private String location;

    @Positive(message = "Kapazität muss positiv sein")
    private Integer capacity;

    private String notes;

    private UUID teamId;

    private UUID matchId;
}
