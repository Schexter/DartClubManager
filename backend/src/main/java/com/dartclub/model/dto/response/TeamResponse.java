package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Team Response DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamResponse {

    private UUID id;
    private UUID orgId;
    private String name;
    private String season;
    private String description;
    private String league;
    private String logoUrl;
    private String color;
    private UUID captainId;
    private String captainName; // Vor- und Nachname des Captains
    private int memberCount;
    private List<MemberSummary> members; // Nur bei Detail View
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    /**
     * Nested DTO für Mitglieder-Übersicht
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberSummary {
        private UUID id;
        private String firstName;
        private String lastName;
        private String email;
    }
}
