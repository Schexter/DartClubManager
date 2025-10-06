package com.dartclub.service;

import com.dartclub.model.dto.request.CreateOrganizationRequest;
import com.dartclub.model.dto.request.JoinOrganizationRequest;
import com.dartclub.model.dto.response.OrganizationResponse;
import com.dartclub.model.entity.Membership;
import com.dartclub.model.entity.Organization;
import com.dartclub.model.entity.User;
import com.dartclub.model.enums.UserRole;
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
 * Organization Service
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrganizationResponse createOrganization(UUID userId, CreateOrganizationRequest request) {
        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nicht gefunden"));

        // Check if slug is already taken
        if (organizationRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Organisation mit diesem Slug existiert bereits");
        }

        // Create Organization
        Organization org = Organization.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .primaryColor(request.getPrimaryColor() != null ? request.getPrimaryColor() : "#3B82F6")
                .secondaryColor(request.getSecondaryColor() != null ? request.getSecondaryColor() : "#F59E0B")
                .build();
        org = organizationRepository.save(org);

        // Create Membership (User as Admin)
        Membership membership = Membership.builder()
                .userId(user.getId())
                .orgId(org.getId())
                .role(UserRole.ADMIN)
                .status("active")
                .build();
        membershipRepository.save(membership);

        // Build Response
        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .slug(org.getSlug())
                .logoUrl(org.getLogoUrl())
                .primaryColor(org.getPrimaryColor())
                .secondaryColor(org.getSecondaryColor())
                .createdAt(org.getCreatedAt())
                .build();
    }

    public OrganizationResponse getOrganizationByUserId(UUID userId) {
        // Get first membership
        Membership membership = membershipRepository.findByUserId(userId)
                .stream()
                .findFirst()
                .orElse(null);

        if (membership == null) {
            return null; // User has no organization
        }

        // Get Organization
        Organization org = organizationRepository.findById(membership.getOrgId())
                .orElseThrow(() -> new RuntimeException("Organisation nicht gefunden"));

        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .slug(org.getSlug())
                .logoUrl(org.getLogoUrl())
                .primaryColor(org.getPrimaryColor())
                .secondaryColor(org.getSecondaryColor())
                .createdAt(org.getCreatedAt())
                .build();
    }

    public List<OrganizationResponse> getAllOrganizationsByUserId(UUID userId) {
        // Get all memberships
        List<Membership> memberships = membershipRepository.findByUserId(userId);

        // Map to OrganizationResponse
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
                            .createdAt(org.getCreatedAt())
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * Organisation beitreten über Slug oder Einladungscode
     * 
     * @param userId User ID des beitretenden Users
     * @param request JoinOrganizationRequest mit slug oder inviteCode
     * @return OrganizationResponse der beigetretenen Organisation
     */
    @Transactional
    public OrganizationResponse joinOrganization(UUID userId, JoinOrganizationRequest request) {
        // Validierung
        if (!request.isValid()) {
            throw new RuntimeException("Entweder slug oder inviteCode muss angegeben sein");
        }

        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nicht gefunden"));

        // Find Organization by slug or inviteCode
        Organization org = null;
        
        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            org = organizationRepository.findBySlug(request.getSlug())
                    .orElseThrow(() -> new RuntimeException("Organisation mit diesem Slug nicht gefunden"));
        } else if (request.getInviteCode() != null && !request.getInviteCode().isBlank()) {
            // TODO: Implement invite code logic later
            throw new RuntimeException("Einladungscode-Funktion ist noch nicht implementiert");
        }

        // Check if user is already a member
        boolean alreadyMember = membershipRepository.existsByUserIdAndOrgId(userId, org.getId());
        if (alreadyMember) {
            throw new RuntimeException("Du bist bereits Mitglied dieser Organisation");
        }

        // Create Membership (User as Player by default)
        Membership membership = Membership.builder()
                .userId(user.getId())
                .orgId(org.getId())
                .role(UserRole.PLAYER) // Default role when joining
                .status("active")
                .build();
        membershipRepository.save(membership);

        // Build Response
        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .slug(org.getSlug())
                .logoUrl(org.getLogoUrl())
                .primaryColor(org.getPrimaryColor())
                .secondaryColor(org.getSecondaryColor())
                .createdAt(org.getCreatedAt())
                .build();
    }
}
