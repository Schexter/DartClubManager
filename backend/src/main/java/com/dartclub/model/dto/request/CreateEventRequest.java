package com.dartclub.model.dto.request;

import com.dartclub.model.enums.EventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Create Event Request DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEventRequest {

    @NotBlank(message = "Titel ist erforderlich")
    @Size(min = 3, max = 255, message = "Titel muss zwischen 3 und 255 Zeichen lang sein")
    private String title;

    private String description;

    @NotNull(message = "Event-Typ ist erforderlich")
    private EventType eventType;

    @NotNull(message = "Start-Zeit ist erforderlich")
    private ZonedDateTime startTime;

    private ZonedDateTime endTime;

    private String location;

    @Positive(message = "Kapazität muss positiv sein")
    private Integer capacity; // null = unbegrenzt

    private String notes;

    private UUID teamId; // Optional: Team-spezifisches Event

    private UUID matchId; // Optional: Verknüpftes Match

    @NotNull(message = "Ersteller (createdBy) ist erforderlich")
    private UUID createdBy;
}
