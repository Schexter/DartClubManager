package com.dartclub.model.enums;

/**
 * User Role Enum - Rollen in einer Organisation
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
public enum UserRole {
    ADMIN("admin"),
    TRAINER("trainer"),
    CAPTAIN("captain"),
    PLAYER("player");

    private final String value;

    UserRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserRole fromValue(String value) {
        for (UserRole role : UserRole.values()) {
            if (role.value.equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown role: " + value);
    }
}
