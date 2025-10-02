package com.dartclub.controller;

import com.dartclub.backend.model.User;
import com.dartclub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Prüfen ob E-Mail bereits existiert
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "E-Mail-Adresse ist bereits registriert");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Passwort hashen
            String hashedPassword = passwordEncoder.encode(request.getPassword());

            // Neuen User erstellen
            User newUser = new User(
                request.getEmail(),
                hashedPassword,
                request.getDisplayName()
            );

            // User speichern
            User savedUser = userRepository.save(newUser);

            // Response erstellen (ohne Passwort-Hash)
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("email", savedUser.getEmail());
            response.put("displayName", savedUser.getDisplayName());
            response.put("message", "Registrierung erfolgreich");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Registrierung fehlgeschlagen: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // User suchen
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Ungültige E-Mail oder Passwort"));

            // Passwort prüfen
            if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                throw new RuntimeException("Ungültige E-Mail oder Passwort");
            }

            // User aktiv?
            if (!user.getIsActive()) {
                throw new RuntimeException("Ihr Account wurde deaktiviert");
            }

            // Response erstellen
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("displayName", user.getDisplayName());
            response.put("message", "Login erfolgreich");
            // TODO: JWT Token generieren und zurückgeben

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    // DTOs
    public static class RegisterRequest {
        private String email;
        private String password;
        private String displayName;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getDisplayName() {
            return displayName;
        }

        public void setDisplayName(String displayName) {
            this.displayName = displayName;
        }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
