package com.dartclub.controller;

import com.dartclub.model.dto.request.LoginRequest;
import com.dartclub.model.dto.request.RegisterRequest;
import com.dartclub.model.dto.request.SwitchOrganizationRequest;
import com.dartclub.model.dto.response.AuthResponse;
import com.dartclub.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * AuthController - REST API für Authentifizierung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Helper: Extract userId from JWT (via request attribute)
     */
    private UUID getUserId(HttpServletRequest request) {
        UUID userId = (UUID) request.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User ID nicht gefunden. Bitte neu einloggen.");
        }
        return userId;
    }

    /**
     * Neuen Benutzer registrieren
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Benutzer einloggen
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Organisation wechseln (generiert neues JWT-Token)
     * POST /api/auth/switch-organization
     */
    @PostMapping("/switch-organization")
    public ResponseEntity<AuthResponse> switchOrganization(
            @Valid @RequestBody SwitchOrganizationRequest request,
            HttpServletRequest servletRequest) {
        UUID userId = getUserId(servletRequest);
        return ResponseEntity.ok(authService.switchOrganization(userId, request.getOrgId()));
    }

    /**
     * Benutzer ausloggen
     * POST /api/auth/logout
     * (JWT ist stateless, daher wird nur client-seitig der Token entfernt)
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
}
