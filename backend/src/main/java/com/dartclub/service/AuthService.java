package com.dartclub.service;

import com.dartclub.model.dto.request.LoginRequest;
import com.dartclub.model.dto.request.RegisterRequest;
import com.dartclub.model.dto.response.AuthResponse;
import com.dartclub.model.entity.Membership;
import com.dartclub.model.entity.Organization;
import com.dartclub.model.entity.User;
import com.dartclub.model.enums.UserRole;
import com.dartclub.repository.MembershipRepository;
import com.dartclub.repository.OrganizationRepository;
import com.dartclub.repository.UserRepository;
import com.dartclub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Auth Service - Login, Register, JWT
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final MembershipRepository membershipRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("E-Mail bereits registriert");
        }

        // Create User
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .isActive(true)
                .build();
        user = userRepository.save(user);

        // Create Organization (if provided)
        Organization org = null;
        if (request.getOrganizationName() != null) {
            String slug = request.getOrganizationSlug() != null 
                ? request.getOrganizationSlug() 
                : generateSlug(request.getOrganizationName());

            org = Organization.builder()
                    .name(request.getOrganizationName())
                    .slug(slug)
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
        }

        // Generate JWT Token
        String token = jwtTokenProvider.generateToken(user.getId(), 
                org != null ? org.getId() : null, 
                UserRole.ADMIN.getValue());

        // Build Response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(AuthResponse.UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .displayName(user.getDisplayName())
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

        // Get first membership (assume user has at least one org)
        Membership membership = membershipRepository.findByUserId(user.getId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Keine Organisation gefunden"));

        // Generate JWT Token
        String token = jwtTokenProvider.generateToken(
                user.getId(), 
                membership.getOrgId(), 
                membership.getRole().getValue());

        // Build Response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(AuthResponse.UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .displayName(user.getDisplayName())
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
