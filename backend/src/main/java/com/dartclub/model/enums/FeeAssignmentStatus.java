package com.dartclub.model.enums;

/**
 * Status einer Beitragszuweisung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
public enum FeeAssignmentStatus {
    ACTIVE("Aktiv"),
    INACTIVE("Inaktiv"),
    CANCELLED("Storniert");

    private final String displayName;

    FeeAssignmentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
