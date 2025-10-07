package com.dartclub.model.enums;

/**
 * Zahlungsmethoden Enum
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
public enum PaymentMethod {
    CASH("Bar"),
    BANK_TRANSFER("Überweisung"),
    SEPA("SEPA-Lastschrift"),
    PAYPAL("PayPal"),
    OTHER("Sonstiges");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
