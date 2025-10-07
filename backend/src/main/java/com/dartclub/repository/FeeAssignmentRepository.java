package com.dartclub.repository;

import com.dartclub.model.entity.FeeAssignment;
import com.dartclub.model.enums.FeeAssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * FeeAssignment Repository
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface FeeAssignmentRepository extends JpaRepository<FeeAssignment, UUID> {

    /**
     * Alle Zuweisungen für ein Mitglied
     */
    List<FeeAssignment> findByMemberId(UUID memberId);

    /**
     * Aktive Zuweisungen für ein Mitglied
     */
    List<FeeAssignment> findByMemberIdAndStatus(UUID memberId, FeeAssignmentStatus status);

    /**
     * Alle Zuweisungen für einen Beitragssatz
     */
    List<FeeAssignment> findByFeeId(UUID feeId);

    /**
     * Aktive Zuweisungen mit Gültigkeitsprüfung
     */
    @Query("SELECT fa FROM FeeAssignment fa WHERE fa.memberId = :memberId " +
           "AND fa.status = 'ACTIVE' " +
           "AND fa.startDate <= :date " +
           "AND (fa.endDate IS NULL OR fa.endDate >= :date)")
    List<FeeAssignment> findActiveFeeAssignmentsForMemberAtDate(
            @Param("memberId") UUID memberId,
            @Param("date") LocalDate date
    );

    /**
     * Alle Mitglieder mit einem bestimmten Beitragssatz
     */
    @Query("SELECT fa FROM FeeAssignment fa " +
           "JOIN FETCH fa.member m " +
           "WHERE fa.feeId = :feeId " +
           "AND fa.status = 'ACTIVE'")
    List<FeeAssignment> findActiveAssignmentsWithMembersByFeeId(@Param("feeId") UUID feeId);

    /**
     * Prüfe ob Mitglied bereits eine aktive Zuweisung für diesen Beitragssatz hat
     */
    boolean existsByMemberIdAndFeeIdAndStatus(UUID memberId, UUID feeId, FeeAssignmentStatus status);
}
