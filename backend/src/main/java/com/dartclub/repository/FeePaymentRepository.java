package com.dartclub.repository;

import com.dartclub.model.entity.FeePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * FeePayment Repository
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Repository
public interface FeePaymentRepository extends JpaRepository<FeePayment, UUID> {

    /**
     * Alle Zahlungen für eine Zuweisung
     */
    List<FeePayment> findByFeeAssignmentId(UUID feeAssignmentId);

    /**
     * Zahlungen für eine Zuweisung, sortiert nach Datum
     */
    List<FeePayment> findByFeeAssignmentIdOrderByPaymentDateDesc(UUID feeAssignmentId);

    /**
     * Alle Zahlungen für einen Zeitraum
     */
    @Query("SELECT fp FROM FeePayment fp WHERE fp.paymentDate BETWEEN :startDate AND :endDate")
    List<FeePayment> findPaymentsBetweenDates(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    /**
     * Summe aller Zahlungen für eine Zuweisung
     */
    @Query("SELECT COALESCE(SUM(fp.amountPaid), 0) FROM FeePayment fp " +
           "WHERE fp.feeAssignmentId = :feeAssignmentId")
    BigDecimal sumPaymentsByFeeAssignmentId(@Param("feeAssignmentId") UUID feeAssignmentId);

    /**
     * Summe aller Zahlungen für einen Zeitraum (für eine Organisation)
     */
    @Query("SELECT COALESCE(SUM(fp.amountPaid), 0) FROM FeePayment fp " +
           "JOIN FeeAssignment fa ON fp.feeAssignmentId = fa.id " +
           "JOIN Member m ON fa.memberId = m.id " +
           "WHERE m.orgId = :orgId " +
           "AND fp.paymentDate BETWEEN :startDate AND :endDate")
    BigDecimal sumPaymentsByOrgIdAndDateRange(
            @Param("orgId") UUID orgId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    /**
     * Alle Zahlungen eines Mitglieds
     */
    @Query("SELECT fp FROM FeePayment fp " +
           "JOIN FeeAssignment fa ON fp.feeAssignmentId = fa.id " +
           "WHERE fa.memberId = :memberId " +
           "ORDER BY fp.paymentDate DESC")
    List<FeePayment> findPaymentsByMemberId(@Param("memberId") UUID memberId);
}
