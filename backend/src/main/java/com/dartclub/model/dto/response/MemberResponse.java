package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Member Response DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private UUID id;
    private UUID orgId;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate birthdate;
    private String licenseNo;
    private String handedness;
    private String notes;
    private String role;
    private String status;
    private LocalDate joinedAt;
    private java.util.List<TeamSummary> teams; // Teams des Mitglieds
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    /**
     * Nested DTO für Team-Übersicht beim Member
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TeamSummary {
        private UUID id;
        private String name;
        private String color;
    }
}
