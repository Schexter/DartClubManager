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
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
