package com.dartclub.controller;

import com.dartclub.model.dto.request.CreateOrganizationRequest;
import com.dartclub.model.dto.response.OrganizationResponse;
import com.dartclub.service.OrganizationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * OrganizationController - REST API für Organisationsverwaltung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrganizationController {

    private final OrganizationService organizationService;

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
     * Alle Organisationen des eingeloggten Users abrufen
     * GET /api/organizations/my-organizations
     */
    @GetMapping("/my-organizations")
    public ResponseEntity<List<OrganizationResponse>> getMyOrganizations(
            HttpServletRequest servletRequest) {
        UUID userId = getUserId(servletRequest);
        return ResponseEntity.ok(organizationService.getUserOrganizations(userId));
    }

    /**
     * Einzelne Organisation abrufen
     * GET /api/organizations/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrganizationResponse> getOrganizationById(
            @PathVariable UUID id,
            HttpServletRequest servletRequest) {
        UUID userId = getUserId(servletRequest);
        return ResponseEntity.ok(organizationService.getOrganizationById(id, userId));
    }

    /**
     * Neue Organisation erstellen
     * POST /api/organizations
     */
    @PostMapping
    public ResponseEntity<OrganizationResponse> createOrganization(
            @Valid @RequestBody CreateOrganizationRequest request,
            HttpServletRequest servletRequest) {
        UUID userId = getUserId(servletRequest);
        return ResponseEntity.ok(organizationService.createOrganization(request, userId));
    }

    /**
     * Organisation löschen (Nur für ADMIN)
     * DELETE /api/organizations/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganization(
            @PathVariable UUID id,
            HttpServletRequest servletRequest) {
        UUID userId = getUserId(servletRequest);
        organizationService.deleteOrganization(id, userId);
        return ResponseEntity.noContent().build();
    }
}
