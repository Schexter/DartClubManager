package com.dartclub.controller;

import com.dartclub.model.dto.request.CreateTeamRequest;
import com.dartclub.model.dto.request.UpdateTeamRequest;
import com.dartclub.model.dto.response.TeamResponse;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.Team;
import com.dartclub.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * TeamController - REST API für Team-Management
 * 
 * Endpoints:
 * - GET    /api/teams                    - Alle Teams
 * - GET    /api/teams/{id}               - Team by ID
 * - POST   /api/teams                    - Team erstellen
 * - PUT    /api/teams/{id}               - Team aktualisieren
 * - DELETE /api/teams/{id}               - Team löschen
 * - GET    /api/teams/season/{season}    - Teams nach Saison
 * - GET    /api/teams/league/{league}    - Teams nach Liga
 * - GET    /api/teams/member/{memberId}  - Teams eines Members
 * - POST   /api/teams/{id}/members/{memberId}    - Member hinzufügen
 * - DELETE /api/teams/{id}/members/{memberId}    - Member entfernen
 * - PUT    /api/teams/{id}/captain/{memberId}    - Captain setzen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class TeamController {

    private final TeamService teamService;

    /**
     * Gibt alle Teams des Vereins zurück
     */
    @GetMapping
    public ResponseEntity<List<TeamResponse>> getAllTeams(
            @RequestHeader("X-Org-Id") UUID orgId) {
        
        log.info("GET /api/teams - orgId: {}", orgId);
        
        List<Team> teams = teamService.findAll(orgId);
        List<TeamResponse> response = teams.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Gibt ein Team anhand ID zurück
     */
    @GetMapping("/{id}")
    public ResponseEntity<TeamResponse> getTeamById(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id) {
        
        log.info("GET /api/teams/{} - orgId: {}", id, orgId);
        
        Team team = teamService.findById(orgId, id);
        TeamResponse response = toDetailResponse(team);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Findet Teams nach Saison
     */
    @GetMapping("/season/{season}")
    public ResponseEntity<List<TeamResponse>> getTeamsBySeason(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable String season) {
        
        log.info("GET /api/teams/season/{} - orgId: {}", season, orgId);
        
        List<Team> teams = teamService.findBySeason(orgId, season);
        List<TeamResponse> response = teams.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Findet Teams nach Liga
     */
    @GetMapping("/league/{league}")
    public ResponseEntity<List<TeamResponse>> getTeamsByLeague(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable String league) {
        
        log.info("GET /api/teams/league/{} - orgId: {}", league, orgId);
        
        List<Team> teams = teamService.findByLeague(orgId, league);
        List<TeamResponse> response = teams.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Findet alle Teams eines Members
     */
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<TeamResponse>> getTeamsByMember(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID memberId) {
        
        log.info("GET /api/teams/member/{} - orgId: {}", memberId, orgId);
        
        List<Team> teams = teamService.findByMember(orgId, memberId);
        List<TeamResponse> response = teams.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Sucht Teams nach Name
     */
    @GetMapping("/search")
    public ResponseEntity<List<TeamResponse>> searchTeams(
            @RequestHeader("X-Org-Id") UUID orgId,
            @RequestParam String name) {
        
        log.info("GET /api/teams/search?name={} - orgId: {}", name, orgId);
        
        List<Team> teams = teamService.searchByName(orgId, name);
        List<TeamResponse> response = teams.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Erstellt ein neues Team
     */
    @PostMapping
    public ResponseEntity<TeamResponse> createTeam(
            @RequestHeader("X-Org-Id") UUID orgId,
            @Valid @RequestBody CreateTeamRequest request) {
        
        log.info("POST /api/teams - orgId: {}, name: {}", orgId, request.getName());
        
        Team team = Team.builder()
                .orgId(orgId)
                .name(request.getName())
                .season(request.getSeason())
                .description(request.getDescription())
                .league(request.getLeague())
                .logoUrl(request.getLogoUrl())
                .captainId(request.getCaptainId())
                .build();
        
        Team createdTeam = teamService.create(team);
        TeamResponse response = toResponse(createdTeam);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Aktualisiert ein Team
     */
    @PutMapping("/{id}")
    public ResponseEntity<TeamResponse> updateTeam(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTeamRequest request) {
        
        log.info("PUT /api/teams/{} - orgId: {}", id, orgId);
        
        Team teamUpdates = Team.builder()
                .name(request.getName())
                .season(request.getSeason())
                .description(request.getDescription())
                .league(request.getLeague())
                .logoUrl(request.getLogoUrl())
                .captainId(request.getCaptainId())
                .build();
        
        Team updatedTeam = teamService.update(orgId, id, teamUpdates);
        TeamResponse response = toResponse(updatedTeam);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Löscht ein Team
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id) {
        
        log.info("DELETE /api/teams/{} - orgId: {}", id, orgId);
        
        teamService.delete(orgId, id);
        
        return ResponseEntity.noContent().build();
    }

    /**
     * Fügt einen Member zum Team hinzu
     */
    @PostMapping("/{id}/members/{memberId}")
    public ResponseEntity<TeamResponse> addMember(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId) {
        
        log.info("POST /api/teams/{}/members/{} - orgId: {}", id, memberId, orgId);
        
        Team updatedTeam = teamService.addMember(orgId, id, memberId);
        TeamResponse response = toDetailResponse(updatedTeam);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Entfernt einen Member aus dem Team
     */
    @DeleteMapping("/{id}/members/{memberId}")
    public ResponseEntity<TeamResponse> removeMember(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId) {
        
        log.info("DELETE /api/teams/{}/members/{} - orgId: {}", id, memberId, orgId);
        
        Team updatedTeam = teamService.removeMember(orgId, id, memberId);
        TeamResponse response = toDetailResponse(updatedTeam);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Setzt einen neuen Captain
     */
    @PutMapping("/{id}/captain/{memberId}")
    public ResponseEntity<TeamResponse> setCaptain(
            @RequestHeader("X-Org-Id") UUID orgId,
            @PathVariable UUID id,
            @PathVariable UUID memberId) {
        
        log.info("PUT /api/teams/{}/captain/{} - orgId: {}", id, memberId, orgId);
        
        Team updatedTeam = teamService.setCaptain(orgId, id, memberId);
        TeamResponse response = toResponse(updatedTeam);
        
        return ResponseEntity.ok(response);
    }

    // Helper Methods

    private TeamResponse toResponse(Team team) {
        String captainName = null;
        if (team.getCaptain() != null) {
            captainName = team.getCaptain().getFirstName() + " " + team.getCaptain().getLastName();
        }
        
        return TeamResponse.builder()
                .id(team.getId())
                .orgId(team.getOrgId())
                .name(team.getName())
                .season(team.getSeason())
                .description(team.getDescription())
                .league(team.getLeague())
                .logoUrl(team.getLogoUrl())
                .captainId(team.getCaptainId())
                .captainName(captainName)
                .memberCount(team.getMemberCount())
                .createdAt(team.getCreatedAt())
                .updatedAt(team.getUpdatedAt())
                .build();
    }

    private TeamResponse toDetailResponse(Team team) {
        TeamResponse response = toResponse(team);
        
        // Füge Members hinzu
        List<TeamResponse.MemberSummary> members = team.getMembers().stream()
                .map(this::toMemberSummary)
                .collect(Collectors.toList());
        response.setMembers(members);
        
        return response;
    }

    private TeamResponse.MemberSummary toMemberSummary(Member member) {
        return TeamResponse.MemberSummary.builder()
                .id(member.getId())
                .firstName(member.getFirstName())
                .lastName(member.getLastName())
                .email(member.getEmail())
                .build();
    }
}
