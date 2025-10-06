package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Response DTO für Organisation
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationResponse {

    private UUID id;
    private String name;
    private String slug;
    private String logoUrl;
    private String primaryColor;
    private String secondaryColor;
    private ZonedDateTime createdAt;
}
