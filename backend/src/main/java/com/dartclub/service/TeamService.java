package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.Team;
import com.dartclub.repository.MemberRepository;
import com.dartclub.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * TeamService - Business Logic für Team-Management
 * 
 * Features:
 * - CRUD Operations für Teams
 * - Member-Management (Hinzufügen/Entfernen)
 * - Team-Statistiken
 * - Suche & Filter
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    /**
     * Findet alle Teams eines Vereins
     */
    @Transactional(readOnly = true)
    public List<Team> findAll(UUID orgId) {
        log.debug("Finding all teams for organization: {}", orgId);
        return teamRepository.findByOrgIdOrderByNameAsc(orgId);
    }

    /**
     * Findet ein Team anhand ID
     */
    @Transactional(readOnly = true)
    public Team findById(UUID orgId, UUID teamId) {
        log.debug("Finding team: {} for organization: {}", teamId, orgId);
        return teamRepository.findByIdAndOrgId(teamId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Team nicht gefunden: " + teamId));
    }

    /**
     * Findet alle Teams einer Saison
     */
    @Transactional(readOnly = true)
    public List<Team> findBySeason(UUID orgId, String season) {
        log.debug("Finding teams for season: {} in organization: {}", season, orgId);
        return teamRepository.findByOrgIdAndSeasonOrderByNameAsc(orgId, season);
    }

    /**
     * Findet alle Teams einer Liga
     */
    @Transactional(readOnly = true)
    public List<Team> findByLeague(UUID orgId, String league) {
        log.debug("Finding teams for league: {} in organization: {}", league, orgId);
        return teamRepository.findByOrgIdAndLeagueOrderByNameAsc(orgId, league);
    }

    /**
     * Findet alle Teams eines Members
     */
    @Transactional(readOnly = true)
    public List<Team> findByMember(UUID orgId, UUID memberId) {
        log.debug("Finding teams for member: {} in organization: {}", memberId, orgId);
        return teamRepository.findByOrgIdAndMemberId(orgId, memberId);
    }

    /**
     * Sucht Teams nach Name
     */
    @Transactional(readOnly = true)
    public List<Team> searchByName(UUID orgId, String name) {
        log.debug("Searching teams with name: {} in organization: {}", name, orgId);
        return teamRepository.searchByName(orgId, name);
    }

    /**
     * Erstellt ein neues Team
     */
    public Team create(Team team) {
        log.info("Creating new team: {} for organization: {}", team.getName(), team.getOrgId());
        
        // Validierung: Name bereits vergeben?
        if (teamRepository.existsByOrgIdAndNameIgnoreCase(team.getOrgId(), team.getName())) {
            throw new IllegalArgumentException("Team mit diesem Namen existiert bereits: " + team.getName());
        }
        
        Team savedTeam = teamRepository.save(team);
        log.info("Team created successfully: {}", savedTeam.getId());
        return savedTeam;
    }

    /**
     * Aktualisiert ein Team
     */
    public Team update(UUID orgId, UUID teamId, Team teamUpdates) {
        log.info("Updating team: {} for organization: {}", teamId, orgId);
        
        Team existingTeam = findById(orgId, teamId);
        
        // Update Felder
        if (teamUpdates.getName() != null) {
            // Prüfen ob neuer Name bereits vergeben (außer für dieses Team)
            if (!existingTeam.getName().equalsIgnoreCase(teamUpdates.getName()) &&
                teamRepository.existsByOrgIdAndNameIgnoreCase(orgId, teamUpdates.getName())) {
                throw new IllegalArgumentException("Team mit diesem Namen existiert bereits: " + teamUpdates.getName());
            }
            existingTeam.setName(teamUpdates.getName());
        }
        
        if (teamUpdates.getSeason() != null) {
            existingTeam.setSeason(teamUpdates.getSeason());
        }
        
        if (teamUpdates.getDescription() != null) {
            existingTeam.setDescription(teamUpdates.getDescription());
        }
        
        if (teamUpdates.getLeague() != null) {
            existingTeam.setLeague(teamUpdates.getLeague());
        }
        
        if (teamUpdates.getLogoUrl() != null) {
            existingTeam.setLogoUrl(teamUpdates.getLogoUrl());
        }
        
        if (teamUpdates.getCaptainId() != null) {
            // Validiere dass Captain existiert und im Verein ist
            Member captain = memberRepository.findByIdAndOrgId(teamUpdates.getCaptainId(), orgId)
                    .orElseThrow(() -> new ResourceNotFoundException("Captain nicht gefunden: " + teamUpdates.getCaptainId()));
            existingTeam.setCaptainId(captain.getId());
        }
        
        Team updatedTeam = teamRepository.save(existingTeam);
        log.info("Team updated successfully: {}", updatedTeam.getId());
        return updatedTeam;
    }

    /**
     * Löscht ein Team
     */
    public void delete(UUID orgId, UUID teamId) {
        log.info("Deleting team: {} from organization: {}", teamId, orgId);
        
        Team team = findById(orgId, teamId);
        teamRepository.delete(team);
        
        log.info("Team deleted successfully: {}", teamId);
    }

    /**
     * Fügt ein Mitglied zum Team hinzu
     */
    public Team addMember(UUID orgId, UUID teamId, UUID memberId) {
        log.info("Adding member: {} to team: {}", memberId, teamId);
        
        Team team = findById(orgId, teamId);
        Member member = memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member nicht gefunden: " + memberId));
        
        // Prüfen ob Member bereits im Team ist
        if (team.hasMember(member)) {
            throw new IllegalArgumentException("Member ist bereits im Team: " + member.getFirstName() + " " + member.getLastName());
        }
        
        team.addMember(member);
        Team updatedTeam = teamRepository.save(team);
        
        log.info("Member added to team successfully");
        return updatedTeam;
    }

    /**
     * Entfernt ein Mitglied aus dem Team
     */
    public Team removeMember(UUID orgId, UUID teamId, UUID memberId) {
        log.info("Removing member: {} from team: {}", memberId, teamId);
        
        Team team = findById(orgId, teamId);
        Member member = memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member nicht gefunden: " + memberId));
        
        // Prüfen ob Member Captain ist
        if (team.getCaptainId() != null && team.getCaptainId().equals(memberId)) {
            throw new IllegalArgumentException("Captain kann nicht aus Team entfernt werden. Bitte zuerst neuen Captain zuweisen.");
        }
        
        team.removeMember(member);
        Team updatedTeam = teamRepository.save(team);
        
        log.info("Member removed from team successfully");
        return updatedTeam;
    }

    /**
     * Setzt einen neuen Captain für das Team
     */
    public Team setCaptain(UUID orgId, UUID teamId, UUID memberId) {
        log.info("Setting captain: {} for team: {}", memberId, teamId);
        
        Team team = findById(orgId, teamId);
        Member member = memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member nicht gefunden: " + memberId));
        
        // Prüfen ob Member im Team ist
        if (!team.hasMember(member)) {
            // Member automatisch zum Team hinzufügen
            team.addMember(member);
        }
        
        team.setCaptainId(memberId);
        Team updatedTeam = teamRepository.save(team);
        
        log.info("Captain set successfully");
        return updatedTeam;
    }

    /**
     * Gibt Anzahl Teams pro Verein zurück
     */
    @Transactional(readOnly = true)
    public long countByOrganization(UUID orgId) {
        return teamRepository.countByOrgId(orgId);
    }

    /**
     * Gibt Anzahl Mitglieder in einem Team zurück
     */
    @Transactional(readOnly = true)
    public long countMembers(UUID teamId) {
        return teamRepository.countMembersByTeamId(teamId);
    }
}
