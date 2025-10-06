package com.dartclub.exception;

/**
 * Exception für nicht gefundene Ressourcen (404)
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s nicht gefunden mit %s: '%s'", resourceName, fieldName, fieldValue));
    }
}
