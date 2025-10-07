package com.dartclub.service;

import com.dartclub.model.dto.request.LoginRequest;
import com.dartclub.model.dto.request.RegisterRequest;
import com.dartclub.model.dto.response.AuthResponse;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.Membership;
import com.dartclub.model.entity.Organization;
import com.dartclub.model.entity.User;
import com.dartclub.model.enums.UserRole;
import com.dartclub.repository.MemberRepository;
import com.dartclub.repository.MembershipRepository;
import com.dartclub.repository.OrganizationRepository;
import com.dartclub.repository.UserRepository;
import com.dartclub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Auth Service - Login, Register, JWT, Organization-Switch
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final MembershipRepository membershipRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("E-Mail bereits registriert");
        }

        // Create Organization FIRST (required for user.organization_id)
        String orgName = request.getOrganizationName() != null
            ? request.getOrganizationName()
            : request.getDisplayName() + "'s Organization";

        String slug = request.getOrganizationSlug() != null
            ? request.getOrganizationSlug()
            : generateSlug(orgName) + "-" + System.currentTimeMillis();

        Organization org = Organization.builder()
                .name(orgName)
                .slug(slug)
                .build();
        org = organizationRepository.save(org);

        // Create User with organization_id (NOT NULL constraint)
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .organizationId(org.getId())
                .role(UserRole.ADMIN)
                .isActive(true)
                .build();
        user = userRepository.save(user);

        // Create Member for this User (so they appear in members list!)
        String[] nameParts = request.getDisplayName().split(" ", 2);
        String firstName = nameParts.length > 0 ? nameParts[0] : request.getDisplayName();
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        Member member = Member.builder()
                .orgId(org.getId())
                .userId(user.getId())
                .firstName(firstName)
                .lastName(lastName)
                .email(request.getEmail())
                .role("ADMIN")
                .status("ACTIVE")
                .joinedAt(java.time.LocalDate.now())
                .build();
        memberRepository.save(member);

        // Create Membership (User as Admin)
        Membership membership = Membership.builder()
                .userId(user.getId())
                .orgId(org.getId())
                .role(UserRole.ADMIN)
                .status("active")
                .build();
        membershipRepository.save(membership);

        // Generate JWT Token
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                org.getId(),
                UserRole.ADMIN.getValue());

        // Build Response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .orgId(org.getId()) // ⭐ Organisation mitgeben!
                .orgName(org.getName())
                .user(AuthResponse.UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .displayName(user.getDisplayName())
                        .role(UserRole.ADMIN.getValue())
                        .isActive(user.getIsActive())
                        .build())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Ungültige Anmeldedaten"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Ungültige Anmeldedaten");
        }

        if (!user.getIsActive()) {
            throw new RuntimeException("Account ist deaktiviert");
        }

        // Get first membership (optional - user may not have an org yet)
        Membership membership = membershipRepository.findByUserId(user.getId())
                .stream()
                .findFirst()
                .orElse(null);

        // Generate JWT Token (with or without org)
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                membership != null ? membership.getOrgId() : null,
                membership != null ? membership.getRole().getValue() : UserRole.ADMIN.getValue());

        // Get Organization Name
        String orgName = null;
        UUID orgId = membership != null ? membership.getOrgId() : null;
        if (orgId != null) {
            Organization org = organizationRepository.findById(orgId).orElse(null);
            if (org != null) {
                orgName = org.getName();
            }
        }

        // Build Response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .orgId(orgId) // ⭐ Organisation mitgeben!
                .orgName(orgName)
                .user(AuthResponse.UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .displayName(user.getDisplayName())
                        .role(membership != null ? membership.getRole().getValue() : UserRole.ADMIN.getValue())
                        .isActive(user.getIsActive())
                        .build())
                .build();
    }

    /**
     * Organisation wechseln - Generiert neues JWT-Token mit neuer org_id
     */
    public AuthResponse switchOrganization(UUID userId, UUID newOrgId) {
        // Check: Ist User Mitglied dieser Organisation?
        Membership membership = membershipRepository.findByUserIdAndOrgId(userId, newOrgId)
                .orElseThrow(() -> new RuntimeException("Sie sind kein Mitglied dieser Organisation"));

        // Get User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nicht gefunden"));

        // Get Organization
        Organization org = organizationRepository.findById(newOrgId)
                .orElseThrow(() -> new RuntimeException("Organisation nicht gefunden"));

        // Generate new JWT Token with new org_id
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                newOrgId,
                membership.getRole().getValue());

        // Build Response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .orgId(org.getId()) // ⭐ Organisation mitgeben!
                .orgName(org.getName())
                .user(AuthResponse.UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .displayName(user.getDisplayName())
                        .role(membership.getRole().getValue())
                        .isActive(user.getIsActive())
                        .build())
                .build();
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}
