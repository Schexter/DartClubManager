package com.dartclub.model.enums;

/**
 * Beitrags-Periode Enum
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
public enum FeePeriod {
    YEARLY("Jährlich"),
    QUARTERLY("Vierteljährlich"),
    MONTHLY("Monatlich"),
    ONCE("Einmalig");

    private final String displayName;

    FeePeriod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
