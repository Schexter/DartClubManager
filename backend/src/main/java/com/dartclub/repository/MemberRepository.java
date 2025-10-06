package com.dartclub.repository;

import com.dartclub.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Member Repository
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {

    List<Member> findByOrgId(UUID orgId);

    Optional<Member> findByIdAndOrgId(UUID id, UUID orgId);

    @Query("SELECT m FROM Member m WHERE m.orgId = :orgId AND " +
           "(LOWER(m.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(m.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(m.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Member> searchByOrgId(@Param("orgId") UUID orgId, @Param("search") String search);

    long countByOrgId(UUID orgId);

    boolean existsByEmailAndOrgId(String email, UUID orgId);
}
