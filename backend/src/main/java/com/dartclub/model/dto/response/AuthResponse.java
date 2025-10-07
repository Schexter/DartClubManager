package com.dartclub.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Auth Response DTO
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    
    @Builder.Default
    private String type = "Bearer";
    
    private UserResponse user;
    
    // ⭐ Multi-Tenancy: Aktuelle Organisation
    private UUID orgId;
    private String orgName;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserResponse {
        private UUID id;
        private String email;
        private String displayName;
        private String role;
        private Boolean isActive;
    }
}
