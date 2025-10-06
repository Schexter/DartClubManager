package com.dartclub.model.converter;

import com.dartclub.model.enums.UserRole;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * JPA Converter für UserRole Enum
 * Konvertiert zwischen UserRole (ADMIN, TRAINER, etc.) und lowercase String (admin, trainer, etc.)
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Converter(autoApply = true)
public class UserRoleConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(UserRole role) {
        if (role == null) {
            return null;
        }
        return role.getValue();
    }

    @Override
    public UserRole convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }
        return UserRole.fromValue(value);
    }
}
