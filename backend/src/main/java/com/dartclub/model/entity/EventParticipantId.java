package com.dartclub.model.entity;

import lombok.*;
import java.io.Serializable;
import java.util.UUID;
import java.util.Objects;

/**
 * Composite Primary Key für EventParticipant
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventParticipantId implements Serializable {
    
    private UUID eventId;
    private UUID memberId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventParticipantId that = (EventParticipantId) o;
        return Objects.equals(eventId, that.eventId) && 
               Objects.equals(memberId, that.memberId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventId, memberId);
    }
}
