package com.dartclub.controller;

import com.dartclub.model.dto.request.CreateMemberRequest;
import com.dartclub.model.dto.request.CreateMemberWithAccountRequest;
import com.dartclub.model.dto.request.UpdateMemberRequest;
import com.dartclub.model.dto.response.MemberResponse;
import com.dartclub.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * MemberController - REST API für Mitgliederverwaltung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MemberController {

    private final MemberService memberService;

    /**
     * Helper: Extract orgId from JWT (via request attribute) or header
     */
    private UUID getOrgId(HttpServletRequest request, @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = (UUID) request.getAttribute("orgId");
        return orgId != null ? orgId : headerOrgId;
    }

    /**
     * Alle Mitglieder einer Organisation abrufen
     * GET /api/members
     */
    @GetMapping
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        return ResponseEntity.ok(memberService.getAllMembers(orgId));
    }

    /**
     * Einzelnes Mitglied abrufen
     * GET /api/members/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> getMemberById(
            @PathVariable UUID id,
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        return ResponseEntity.ok(memberService.getMemberById(id, orgId));
    }

    /**
     * Neues Mitglied anlegen
     * POST /api/members
     */
    @PostMapping
    public ResponseEntity<MemberResponse> createMember(
            @Valid @RequestBody CreateMemberRequest request,
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        return ResponseEntity.ok(memberService.createMember(request, orgId));
    }

    /**
     * Mitglied mit User-Account direkt anlegen
     * POST /api/members/create-with-account
     */
    @PostMapping("/create-with-account")
    public ResponseEntity<MemberResponse> createMemberWithAccount(
            @Valid @RequestBody CreateMemberWithAccountRequest request,
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        return ResponseEntity.ok(memberService.createMemberWithAccount(request, orgId));
    }

    /**
     * Mitglied aktualisieren
     * PUT /api/members/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<MemberResponse> updateMember(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateMemberRequest request,
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        return ResponseEntity.ok(memberService.updateMember(id, request, orgId));
    }

    /**
     * Mitglied löschen
     * DELETE /api/members/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable UUID id,
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-Org-Id", required = false) UUID headerOrgId) {
        UUID orgId = getOrgId(servletRequest, headerOrgId);
        if (orgId == null) {
            throw new RuntimeException("Organization ID nicht gefunden. Bitte neu einloggen.");
        }
        memberService.deleteMember(id, orgId);
        return ResponseEntity.noContent().build();
    }
}
