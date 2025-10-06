package com.dartclub.controller;

import com.dartclub.model.dto.request.LoginRequest;
import com.dartclub.model.dto.request.RegisterRequest;
import com.dartclub.model.dto.response.AuthResponse;
import com.dartclub.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
     * Benutzer ausloggen
     * POST /api/auth/logout
     * (JWT ist stateless, daher wird nur client-seitig der Token entfernt)
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
}
