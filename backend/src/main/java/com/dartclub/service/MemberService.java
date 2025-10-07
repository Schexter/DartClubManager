package com.dartclub.service;

import com.dartclub.model.dto.request.CreateMemberRequest;
import com.dartclub.model.dto.request.CreateMemberWithAccountRequest;
import com.dartclub.model.dto.request.UpdateMemberRequest;
import com.dartclub.model.dto.response.MemberResponse;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.Membership;
import com.dartclub.model.entity.User;
import com.dartclub.model.enums.UserRole;
import com.dartclub.repository.MemberRepository;
import com.dartclub.repository.MembershipRepository;
import com.dartclub.repository.TeamRepository;
import com.dartclub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * MemberService - Mitgliederverwaltung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeamRepository teamRepository;

    /**
     * Alle Mitglieder einer Organisation abrufen
     */
    public List<MemberResponse> getAllMembers(UUID orgId) {
        return memberRepository.findByOrgId(orgId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Einzelnes Mitglied abrufen
     */
    public MemberResponse getMemberById(UUID id, UUID orgId) {
        Member member = memberRepository.findByIdAndOrgId(id, orgId)
                .orElseThrow(() -> new RuntimeException("Mitglied nicht gefunden"));
        return toResponse(member);
    }

    /**
     * Neues Mitglied anlegen
     */
    @Transactional
    public MemberResponse createMember(CreateMemberRequest request, UUID orgId) {
        Member member = Member.builder()
                .orgId(orgId)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .birthdate(request.getBirthdate())
                .licenseNo(request.getLicenseNo())
                .handedness(request.getHandedness())
                .notes(request.getNotes())
                .role(request.getRole() != null ? request.getRole() : "PLAYER")
                .status("ACTIVE")
                .joinedAt(java.time.LocalDate.now())
                .build();
        member = memberRepository.save(member);
        return toResponse(member);
    }

    /**
     * Mitglied mit User-Account direkt anlegen
     * Erstellt User + Member + Membership in einem Schritt
     */
    @Transactional
    public MemberResponse createMemberWithAccount(CreateMemberWithAccountRequest request, UUID orgId) {
        // 1. Prüfen ob E-Mail bereits existiert
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("E-Mail bereits registriert");
        }

        // 2. User anlegen
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getFirstName() + " " + request.getLastName())
                .organizationId(orgId)
                .isActive(true)
                .build();
        user = userRepository.save(user);

        // 3. Member anlegen (verlinkt mit User)
        Member member = Member.builder()
                .orgId(orgId)
                .userId(user.getId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .birthdate(request.getBirthdate())
                .licenseNo(request.getLicenseNo())
                .handedness(request.getHandedness())
                .playerName(request.getPlayerName())
                .notes(request.getNotes())
                .role("PLAYER")
                .status("ACTIVE")
                .joinedAt(java.time.LocalDate.now())
                .build();
        member = memberRepository.save(member);

        // 4. Membership anlegen (User <-> Organization mit Rolle PLAYER)
        Membership membership = Membership.builder()
                .userId(user.getId())
                .orgId(orgId)
                .role(UserRole.PLAYER)
                .status("active")
                .build();
        membershipRepository.save(membership);

        return toResponse(member);
    }

    /**
     * Mitglied aktualisieren
     */
    @Transactional
    public MemberResponse updateMember(UUID id, UpdateMemberRequest request, UUID orgId) {
        Member member = memberRepository.findByIdAndOrgId(id, orgId)
                .orElseThrow(() -> new RuntimeException("Mitglied nicht gefunden"));

        // Nur gesetzte Felder aktualisieren
        if (request.getFirstName() != null) member.setFirstName(request.getFirstName());
        if (request.getLastName() != null) member.setLastName(request.getLastName());
        if (request.getEmail() != null) member.setEmail(request.getEmail());
        if (request.getPhone() != null) member.setPhone(request.getPhone());
        if (request.getBirthdate() != null) member.setBirthdate(request.getBirthdate());
        if (request.getLicenseNo() != null) member.setLicenseNo(request.getLicenseNo());
        if (request.getHandedness() != null) member.setHandedness(request.getHandedness());
        if (request.getNotes() != null) member.setNotes(request.getNotes());
        if (request.getRole() != null) member.setRole(request.getRole());
        if (request.getStatus() != null) member.setStatus(request.getStatus());

        member = memberRepository.save(member);
        return toResponse(member);
    }

    /**
     * Mitglied löschen
     */
    @Transactional
    public void deleteMember(UUID id, UUID orgId) {
        Member member = memberRepository.findByIdAndOrgId(id, orgId)
                .orElseThrow(() -> new RuntimeException("Mitglied nicht gefunden"));
        memberRepository.delete(member);
    }

    /**
     * Konvertiert Member Entity zu Response DTO
     */
    private MemberResponse toResponse(Member member) {
        // Teams des Members laden
        var teams = teamRepository.findByOrgIdAndMemberId(member.getOrgId(), member.getId())
                .stream()
                .map(team -> MemberResponse.TeamSummary.builder()
                        .id(team.getId())
                        .name(team.getName())
                        .color(team.getColor())
                        .build())
                .collect(Collectors.toList());

        return MemberResponse.builder()
                .id(member.getId())
                .orgId(member.getOrgId())
                .userId(member.getUserId())
                .firstName(member.getFirstName())
                .lastName(member.getLastName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .birthdate(member.getBirthdate())
                .licenseNo(member.getLicenseNo())
                .handedness(member.getHandedness())
                .notes(member.getNotes())
                .role(member.getRole())
                .status(member.getStatus())
                .joinedAt(member.getJoinedAt())
                .teams(teams)
                .createdAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                .build();
    }
}
