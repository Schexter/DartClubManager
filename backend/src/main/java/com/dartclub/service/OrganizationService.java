package com.dartclub.service;

import com.dartclub.model.dto.request.CreateOrganizationRequest;
import com.dartclub.model.dto.response.OrganizationResponse;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.Membership;
import com.dartclub.model.entity.Organization;
import com.dartclub.model.entity.User;
import com.dartclub.model.enums.UserRole;
import com.dartclub.repository.MemberRepository;
import com.dartclub.repository.MembershipRepository;
import com.dartclub.repository.OrganizationRepository;
import com.dartclub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * OrganizationService - Business Logic für Organisationen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

    /**
     * Alle Organisationen eines Users abrufen
     */
    public List<OrganizationResponse> getUserOrganizations(UUID userId) {
        List<Membership> memberships = membershipRepository.findByUserId(userId);
        
        return memberships.stream()
                .map(membership -> {
                    Organization org = organizationRepository.findById(membership.getOrgId())
                            .orElseThrow(() -> new RuntimeException("Organisation nicht gefunden"));
                    
                    return OrganizationResponse.builder()
                            .id(org.getId())
                            .name(org.getName())
                            .slug(org.getSlug())
                            .logoUrl(org.getLogoUrl())
                            .primaryColor(org.getPrimaryColor())
                            .secondaryColor(org.getSecondaryColor())
                            .role(membership.getRole().getValue())
                            .createdAt(org.getCreatedAt())
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * Einzelne Organisation abrufen (mit Berechtigung-Check)
     */
    public OrganizationResponse getOrganizationById(UUID orgId, UUID userId) {
        // Check: Ist User Mitglied dieser Organisation?
        Membership membership = membershipRepository.findByUserIdAndOrgId(userId, orgId)
                .orElseThrow(() -> new RuntimeException("Keine Berechtigung für diese Organisation"));
        
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organisation nicht gefunden"));
        
        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .slug(org.getSlug())
                .logoUrl(org.getLogoUrl())
                .primaryColor(org.getPrimaryColor())
                .secondaryColor(org.getSecondaryColor())
                .role(membership.getRole().getValue())
                .createdAt(org.getCreatedAt())
                .build();
    }

    /**
     * Neue Organisation erstellen
     */
    @Transactional
    public OrganizationResponse createOrganization(CreateOrganizationRequest request, UUID userId) {
        // User laden
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nicht gefunden"));

        // Prüfen ob Slug bereits existiert
        if (organizationRepository.findBySlug(request.getSlug()).isPresent()) {
            throw new RuntimeException("Slug bereits vergeben");
        }

        // Organisation erstellen
        Organization org = Organization.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .primaryColor(request.getPrimaryColor())
                .secondaryColor(request.getSecondaryColor())
                .build();
        org = organizationRepository.save(org);

        // Member-Profil für den Creator erstellen (als ADMIN)
        String[] nameParts = user.getDisplayName().split(" ", 2);
        String firstName = nameParts.length > 0 ? nameParts[0] : user.getDisplayName();
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        Member member = Member.builder()
                .orgId(org.getId())
                .userId(user.getId())
                .firstName(firstName)
                .lastName(lastName)
                .email(user.getEmail())
                .role("ADMIN")
                .status("ACTIVE")
                .joinedAt(java.time.LocalDate.now())
                .build();
        memberRepository.save(member);

        // Membership erstellen (User als Admin der neuen Organisation)
        Membership membership = Membership.builder()
                .userId(userId)
                .orgId(org.getId())
                .role(UserRole.ADMIN)
                .status("active")
                .build();
        membershipRepository.save(membership);

        // Response erstellen
        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .slug(org.getSlug())
                .logoUrl(org.getLogoUrl())
                .primaryColor(org.getPrimaryColor())
                .secondaryColor(org.getSecondaryColor())
                .role(UserRole.ADMIN.getValue())
                .createdAt(org.getCreatedAt())
                .build();
    }

    /**
     * Organisation löschen (Nur für ADMIN)
     */
    @Transactional
    public void deleteOrganization(UUID orgId, UUID userId) {
        // Prüfen ob Organisation existiert
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organisation nicht gefunden"));

        // Prüfen ob User Admin dieser Organisation ist
        Membership membership = membershipRepository.findByUserIdAndOrgId(userId, orgId)
                .orElseThrow(() -> new RuntimeException("Keine Berechtigung für diese Organisation"));

        if (membership.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Nur Admins können die Organisation löschen");
        }

        // Alle Members der Organisation löschen
        List<Member> members = memberRepository.findByOrgId(orgId);
        memberRepository.deleteAll(members);

        // Alle Memberships der Organisation löschen
        List<Membership> memberships = membershipRepository.findByOrgId(orgId);
        membershipRepository.deleteAll(memberships);

        // Organisation löschen
        organizationRepository.delete(org);
    }
}
