package com.dartclub.service;

import com.dartclub.model.dto.request.CreateMemberRequest;
import com.dartclub.model.dto.request.UpdateMemberRequest;
import com.dartclub.model.dto.response.MemberResponse;
import com.dartclub.model.entity.Member;
import com.dartclub.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
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
                .build();
        member = memberRepository.save(member);
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
                .createdAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                .build();
    }
}
