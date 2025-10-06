package com.dartclub.controller;

import com.dartclub.model.dto.request.CreateMemberRequest;
import com.dartclub.model.dto.request.UpdateMemberRequest;
import com.dartclub.model.dto.response.MemberResponse;
import com.dartclub.service.MemberService;
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
     * Alle Mitglieder einer Organisation abrufen
     * GET /api/members
     */
    @GetMapping
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            @RequestHeader("X-Org-Id") UUID orgId) {
        return ResponseEntity.ok(memberService.getAllMembers(orgId));
    }

    /**
     * Einzelnes Mitglied abrufen
     * GET /api/members/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> getMemberById(
            @PathVariable UUID id,
            @RequestHeader("X-Org-Id") UUID orgId) {
        return ResponseEntity.ok(memberService.getMemberById(id, orgId));
    }

    /**
     * Neues Mitglied anlegen
     * POST /api/members
     */
    @PostMapping
    public ResponseEntity<MemberResponse> createMember(
            @Valid @RequestBody CreateMemberRequest request,
            @RequestHeader("X-Org-Id") UUID orgId) {
        return ResponseEntity.ok(memberService.createMember(request, orgId));
    }

    /**
     * Mitglied aktualisieren
     * PUT /api/members/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<MemberResponse> updateMember(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateMemberRequest request,
            @RequestHeader("X-Org-Id") UUID orgId) {
        return ResponseEntity.ok(memberService.updateMember(id, request, orgId));
    }

    /**
     * Mitglied löschen
     * DELETE /api/members/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable UUID id,
            @RequestHeader("X-Org-Id") UUID orgId) {
        memberService.deleteMember(id, orgId);
        return ResponseEntity.noContent().build();
    }
}
