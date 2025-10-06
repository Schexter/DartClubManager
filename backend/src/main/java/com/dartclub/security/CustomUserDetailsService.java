package com.dartclub.security;

import com.dartclub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String emailOrId) throws UsernameNotFoundException {
        com.dartclub.model.entity.User user;

        // Try to parse as UUID first (for JWT tokens)
        try {
            UUID userId = UUID.fromString(emailOrId);
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + emailOrId));
        } catch (IllegalArgumentException e) {
            // Not a UUID, try as email
            user = userRepository.findByEmail(emailOrId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + emailOrId));
        }

        return User.builder()
                .username(user.getId().toString()) // Use ID as username for consistency
                .password(user.getPasswordHash())
                .authorities(new ArrayList<>())
                .accountExpired(false)
                .accountLocked(!user.getIsActive())
                .credentialsExpired(false)
                .disabled(!user.getIsActive())
                .build();
    }
}
