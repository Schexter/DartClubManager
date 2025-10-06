package com.dartclub.model.enums;

/**
 * EventType Enum - Terminarten
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
public enum EventType {
    TRAINING("Training"),
    MATCH("Ligaspiel"),
    FRIENDLY_MATCH("Freundschaftsspiel"),
    MEETING("Vereinstreffen"),
    TOURNAMENT("Turnier"),
    OTHER("Sonstiges");

    private final String displayName;

    EventType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
