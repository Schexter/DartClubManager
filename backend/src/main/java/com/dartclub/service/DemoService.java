package com.dartclub.service;

import com.dartclub.model.dto.response.AuthResponse;
import com.dartclub.model.entity.*;
import com.dartclub.model.enums.UserRole;
import com.dartclub.repository.*;
import com.dartclub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Service für Demo-Account-Verwaltung
 * Erstellt vollständigen Demo-Account mit Beispieldaten
 * 
 * @author Hans Hahn
 * @version 1.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DemoService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Erstellt einen vollständigen Demo-Account mit:
     * - Organisation
     * - Admin-User + zugehöriger Member-Eintrag ⭐
     * - 5 Beispiel-Mitglieder
     * - 1 Team
     * 
     * @return AuthResponse mit Token und User-Daten
     */
    @Transactional
    public AuthResponse createDemoAccount() {
        log.info("Starting demo account creation...");

        // 1. Organisation erstellen
        Organization org = createDemoOrganization();
        log.info("Demo organization created: {} (id: {})", org.getName(), org.getId());

        // 2. Admin-User erstellen
        User user = createDemoUser(org);
        log.info("Demo user created: {} (id: {})", user.getEmail(), user.getId());

        // ⭐ 2.5. Member-Eintrag für Admin-User erstellen (damit er sich selbst sieht!)
        Member adminMember = createAdminMember(org, user);
        log.info("Admin member created: {} {} (id: {})", 
            adminMember.getFirstName(), adminMember.getLastName(), adminMember.getId());

        // 3. Beispiel-Mitglieder erstellen
        List<Member> members = createDemoMembers(org);
        log.info("Created {} demo members", members.size());

        // 4. Beispiel-Team erstellen (mit Admin als Captain)
        Team team = createDemoTeam(org, adminMember, members);
        log.info("Demo team created: {} (id: {})", team.getName(), team.getId());

        // 5. JWT Token generieren
        String token = jwtTokenProvider.generateToken(
            user.getId(),
            org.getId(),
            UserRole.ADMIN.name()
        );

        // 6. Response zusammenbauen
        AuthResponse.UserResponse userResponse = AuthResponse.UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .displayName(user.getDisplayName())
            .isActive(true)
            .build();

        return AuthResponse.builder()
            .token(token)
            .user(userResponse)
            .build();
    }

    /**
     * Erstellt Demo-Organisation
     */
    private Organization createDemoOrganization() {
        // Eindeutigen Slug generieren (mit Timestamp)
        String timestamp = String.valueOf(System.currentTimeMillis());
        String slug = "demo-club-" + timestamp;
        
        Organization org = Organization.builder()
            .name("Demo Dart Club " + timestamp.substring(timestamp.length() - 6))
            .slug(slug)
            .primaryColor("#1976D2")
            .secondaryColor("#FF6F00")
            .build();

        return organizationRepository.save(org);
    }

    /**
     * ⭐ Erstellt Member-Eintrag für Admin-User
     * (Damit der User sich selbst in der Mitgliederliste sieht)
     */
    private Member createAdminMember(Organization org, User user) {
        Member adminMember = Member.builder()
            .orgId(org.getId())
            .userId(user.getId()) // ⭐ Verknüpfung zum User!
            .firstName("Demo")
            .lastName("Admin")
            .email(user.getEmail())
            .handedness("Rechts")
            .licenseNo("ADMIN-001")
            .birthdate(LocalDate.of(1990, 1, 1))
            .build();

        return memberRepository.save(adminMember);
    }

    /**
     * Erstellt Demo-User (Admin)
     */
    private User createDemoUser(Organization org) {
        // Eindeutige E-Mail mit Timestamp
        String timestamp = String.valueOf(System.currentTimeMillis());
        String email = "demo" + timestamp.substring(timestamp.length() - 6) + "@dartclub.demo";
        
        User user = User.builder()
            .email(email)
            .passwordHash(passwordEncoder.encode("demo123"))
            .displayName("Demo Admin")
            .organizationId(org.getId())
            .role(UserRole.ADMIN)
            .isActive(true)
            .build();

        return userRepository.save(user);
    }

    /**
     * Erstellt 5 Demo-Mitglieder
     */
    private List<Member> createDemoMembers(Organization org) {
        List<Member> members = new ArrayList<>();

        String[][] memberData = {
            {"Max", "Mustermann", "Rechts", "12345"},
            {"Anna", "Schmidt", "Links", "12346"},
            {"Tom", "Weber", "Rechts", "12347"},
            {"Lisa", "Müller", "Rechts", "12348"},
            {"Jan", "Fischer", "Links", "12349"}
        };

        for (String[] data : memberData) {
            Member member = Member.builder()
                .orgId(org.getId())
                .firstName(data[0])
                .lastName(data[1])
                .email(data[0].toLowerCase() + "." + data[1].toLowerCase() + "@example.com")
                .handedness(data[2])
                .licenseNo(data[3])
                .birthdate(LocalDate.of(1990, 1, 1).plusYears((long) (Math.random() * 20)))
                .build();

            members.add(memberRepository.save(member));
        }

        return members;
    }

    /**
     * Erstellt Demo-Team mit Admin als Captain + allen Mitgliedern
     */
    private Team createDemoTeam(Organization org, Member adminMember, List<Member> members) {
        Team team = Team.builder()
            .orgId(org.getId())
            .name("Demo Team")
            .season("2024/25")
            .captainId(adminMember.getId()) // ⭐ Admin ist Captain
            .build();

        return teamRepository.save(team);
    }
}
