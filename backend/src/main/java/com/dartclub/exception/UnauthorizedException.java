package com.dartclub.exception;

/**
 * UnauthorizedException - Wird geworfen bei unautorisierten Zugriffen
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
