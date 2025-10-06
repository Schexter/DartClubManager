package com.dartclub.repository;

import com.dartclub.model.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Membership Repository
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface MembershipRepository extends JpaRepository<Membership, Membership.MembershipId> {

    List<Membership> findByUserId(UUID userId);

    List<Membership> findByOrgId(UUID orgId);

    Optional<Membership> findByUserIdAndOrgId(UUID userId, UUID orgId);

    boolean existsByUserIdAndOrgId(UUID userId, UUID orgId);
}
