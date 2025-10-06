package com.dartclub.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO für Organisation beitreten
 * 
 * Ermöglicht das Beitreten über Slug oder Einladungscode
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinOrganizationRequest {

    /**
     * Organisation-Slug (z.B. "falcons-dartclub")
     * Optional, wenn inviteCode angegeben ist
     */
    @Size(min = 3, max = 50, message = "Slug muss zwischen 3 und 50 Zeichen lang sein")
    private String slug;

    /**
     * Einladungscode (für später, wenn Invite-System implementiert ist)
     * Optional, wenn slug angegeben ist
     */
    @Size(min = 6, max = 20, message = "Einladungscode muss zwischen 6 und 20 Zeichen lang sein")
    private String inviteCode;

    /**
     * Validierung: Entweder slug oder inviteCode muss angegeben sein
     */
    public boolean isValid() {
        return (slug != null && !slug.isBlank()) || (inviteCode != null && !inviteCode.isBlank());
    }
}
