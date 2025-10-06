package com.dartclub.controller;

import com.dartclub.model.dto.request.CreateOrganizationRequest;
import com.dartclub.model.dto.request.JoinOrganizationRequest;
import com.dartclub.model.dto.response.OrganizationResponse;
import com.dartclub.security.JwtTokenProvider;
import com.dartclub.service.OrganizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * OrganizationController - REST API für Organisationen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Organisation erstellen
     * POST /api/organizations
     */
    @PostMapping
    public ResponseEntity<OrganizationResponse> createOrganization(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody CreateOrganizationRequest request) {
        
        UUID userId = jwtTokenProvider.extractUserId(token.substring(7)); // Remove "Bearer "
        OrganizationResponse response = organizationService.createOrganization(userId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Organisation des aktuellen Users abrufen
     * GET /api/organizations/me
     */
    @GetMapping("/me")
    public ResponseEntity<List<OrganizationResponse>> getMyOrganizations(
            @RequestHeader("Authorization") String token) {

        UUID userId = jwtTokenProvider.extractUserId(token.substring(7));
        List<OrganizationResponse> organizations = organizationService.getAllOrganizationsByUserId(userId);

        return ResponseEntity.ok(organizations);
    }

    /**
     * Organisation beitreten (über Slug)
     * POST /api/organizations/join
     */
    @PostMapping("/join")
    public ResponseEntity<OrganizationResponse> joinOrganization(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody JoinOrganizationRequest request) {

        UUID userId = jwtTokenProvider.extractUserId(token.substring(7)); // Remove "Bearer "
        OrganizationResponse response = organizationService.joinOrganization(userId, request);

        return ResponseEntity.ok(response);
    }
}
