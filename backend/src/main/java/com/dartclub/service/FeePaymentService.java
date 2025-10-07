package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.dto.request.FeePaymentRequest;
import com.dartclub.model.dto.response.FeePaymentResponse;
import com.dartclub.model.dto.response.MemberFeeStatusResponse;
import com.dartclub.model.entity.FeeAssignment;
import com.dartclub.model.entity.FeePayment;
import com.dartclub.model.entity.Member;
import com.dartclub.model.entity.User;
import com.dartclub.repository.FeeAssignmentRepository;
import com.dartclub.repository.FeePaymentRepository;
import com.dartclub.repository.FeeRepository;
import com.dartclub.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * FeePayment Service - Business Logic für Zahlungen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FeePaymentService {

    private final FeePaymentRepository feePaymentRepository;
    private final FeeAssignmentRepository feeAssignmentRepository;
    private final FeeRepository feeRepository;
    private final MemberRepository memberRepository;

    /**
     * Alle Zahlungen für eine Zuweisung
     */
    @Transactional(readOnly = true)
    public List<FeePaymentResponse> getPaymentsByAssignment(UUID assignmentId, UUID orgId) {
        log.debug("Getting payments for assignment: {}", assignmentId);
        
        // Prüfe ob Assignment zu dieser Org gehört
        FeeAssignment assignment = feeAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee assignment not found"));
        
        memberRepository.findByIdAndOrgId(assignment.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        
        return feePaymentRepository.findByFeeAssignmentIdOrderByPaymentDateDesc(assignmentId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Alle Zahlungen eines Mitglieds
     */
    @Transactional(readOnly = true)
    public List<FeePaymentResponse> getPaymentsByMember(UUID memberId, UUID orgId) {
        log.debug("Getting payments for member: {}", memberId);
        
        memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        
        return feePaymentRepository.findPaymentsByMemberId(memberId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Neue Zahlung erfassen
     */
    @Transactional
    public FeePaymentResponse recordPayment(FeePaymentRequest request, UUID recordedByUserId, UUID orgId) {
        log.info("Recording payment for assignment: {}, amount: {}", 
                request.getFeeAssignmentId(), request.getAmountPaid());
        
        // Validierung: Assignment existiert
        FeeAssignment assignment = feeAssignmentRepository.findById(request.getFeeAssignmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Fee assignment not found"));
        
        // Prüfe ob Member zu Org gehört
        memberRepository.findByIdAndOrgId(assignment.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        FeePayment payment = FeePayment.builder()
                .feeAssignmentId(request.getFeeAssignmentId())
                .amountPaid(request.getAmountPaid())
                .paymentDate(request.getPaymentDate())
                .paymentMethod(request.getPaymentMethod())
                .periodStart(request.getPeriodStart())
                .periodEnd(request.getPeriodEnd())
                .referenceNumber(request.getReferenceNumber())
                .notes(request.getNotes())
                .recordedByUserId(recordedByUserId)
                .build();

        payment = feePaymentRepository.save(payment);
        log.info("Payment recorded: {}", payment.getId());
        
        return toResponse(payment);
    }

    /**
     * Zahlung aktualisieren
     */
    @Transactional
    public FeePaymentResponse updatePayment(UUID paymentId, FeePaymentRequest request, UUID orgId) {
        log.info("Updating payment: {}", paymentId);
        
        FeePayment payment = feePaymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
        
        // Prüfe ob Member zu Org gehört
        FeeAssignment assignment = feeAssignmentRepository.findById(payment.getFeeAssignmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Fee assignment not found"));
        
        memberRepository.findByIdAndOrgId(assignment.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        payment.setAmountPaid(request.getAmountPaid());
        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPeriodStart(request.getPeriodStart());
        payment.setPeriodEnd(request.getPeriodEnd());
        payment.setReferenceNumber(request.getReferenceNumber());
        payment.setNotes(request.getNotes());

        payment = feePaymentRepository.save(payment);
        log.info("Payment updated: {}", payment.getId());
        
        return toResponse(payment);
    }

    /**
     * Zahlung löschen
     */
    @Transactional
    public void deletePayment(UUID paymentId, UUID orgId) {
        log.info("Deleting payment: {}", paymentId);
        
        FeePayment payment = feePaymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
        
        // Prüfe ob Member zu Org gehört
        FeeAssignment assignment = feeAssignmentRepository.findById(payment.getFeeAssignmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Fee assignment not found"));
        
        memberRepository.findByIdAndOrgId(assignment.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        feePaymentRepository.delete(payment);
        log.info("Payment deleted: {}", paymentId);
    }

    /**
     * Beitragsstatus-Übersicht für alle Mitglieder einer Organisation
     */
    @Transactional(readOnly = true)
    public List<MemberFeeStatusResponse> getFeeStatusOverview(UUID orgId) {
        log.debug("Getting fee status overview for org: {}", orgId);
        
        List<Member> members = memberRepository.findByOrgId(orgId);
        List<MemberFeeStatusResponse> statusList = new ArrayList<>();
        
        for (Member member : members) {
            // Hole aktive Zuweisungen für dieses Mitglied
            List<FeeAssignment> activeAssignments = feeAssignmentRepository
                    .findActiveFeeAssignmentsForMemberAtDate(member.getId(), LocalDate.now());
            
            for (FeeAssignment assignment : activeAssignments) {
                MemberFeeStatusResponse status = calculateFeeStatus(member, assignment);
                statusList.add(status);
            }
        }
        
        return statusList;
    }

    /**
     * Beitragsstatus für ein einzelnes Mitglied
     */
    @Transactional(readOnly = true)
    public List<MemberFeeStatusResponse> getMemberFeeStatus(UUID memberId, UUID orgId) {
        log.debug("Getting fee status for member: {}", memberId);
        
        Member member = memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        
        List<FeeAssignment> activeAssignments = feeAssignmentRepository
                .findActiveFeeAssignmentsForMemberAtDate(memberId, LocalDate.now());
        
        List<MemberFeeStatusResponse> statusList = new ArrayList<>();
        
        for (FeeAssignment assignment : activeAssignments) {
            MemberFeeStatusResponse status = calculateFeeStatus(member, assignment);
            statusList.add(status);
        }
        
        return statusList;
    }

    /**
     * Berechne Zahlungsstatus für ein Mitglied
     */
    private MemberFeeStatusResponse calculateFeeStatus(Member member, FeeAssignment assignment) {
        // Lade Fee
        assignment.setFee(feeRepository.findById(assignment.getFeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found")));
        
        BigDecimal feeAmount = assignment.getFee().getAmount();
        
        // Summe aller Zahlungen
        BigDecimal totalPaid = feePaymentRepository.sumPaymentsByFeeAssignmentId(assignment.getId());
        if (totalPaid == null) {
            totalPaid = BigDecimal.ZERO;
        }
        
        BigDecimal remainingAmount = feeAmount.subtract(totalPaid);
        
        // Letzte Zahlung
        List<FeePayment> payments = feePaymentRepository
                .findByFeeAssignmentIdOrderByPaymentDateDesc(assignment.getId());
        LocalDate lastPaymentDate = payments.isEmpty() ? null : payments.get(0).getPaymentDate();
        
        // Berechne nächstes Fälligkeitsdatum basierend auf Periode
        LocalDate nextDueDate = calculateNextDueDate(assignment);
        
        // Bestimme Status
        String status;
        boolean isOverdue = false;
        
        if (remainingAmount.compareTo(BigDecimal.ZERO) <= 0) {
            status = "PAID";
        } else if (totalPaid.compareTo(BigDecimal.ZERO) > 0) {
            status = "PARTIAL";
        } else {
            status = "OPEN";
        }
        
        // Überfällig?
        if (nextDueDate != null && LocalDate.now().isAfter(nextDueDate) && 
            remainingAmount.compareTo(BigDecimal.ZERO) > 0) {
            status = "OVERDUE";
            isOverdue = true;
        }
        
        return MemberFeeStatusResponse.builder()
                .memberId(member.getId())
                .memberName(member.getFullName())
                .email(member.getEmail())
                .feeId(assignment.getFee().getId())
                .feeName(assignment.getFee().getName())
                .feeAmount(feeAmount)
                .totalPaid(totalPaid)
                .remainingAmount(remainingAmount)
                .lastPaymentDate(lastPaymentDate)
                .nextDueDate(nextDueDate)
                .status(status)
                .isOverdue(isOverdue)
                .build();
    }

    /**
     * Berechne nächstes Fälligkeitsdatum basierend auf Beitragsperiode
     */
    private LocalDate calculateNextDueDate(FeeAssignment assignment) {
        switch (assignment.getFee().getPeriod()) {
            case YEARLY:
                return LocalDate.of(LocalDate.now().getYear(), 1, 31); // 31. Januar
            case QUARTERLY:
                int currentMonth = LocalDate.now().getMonthValue();
                int quarter = (currentMonth - 1) / 3;
                int nextQuarterMonth = (quarter + 1) * 3 + 1;
                if (nextQuarterMonth > 12) {
                    return LocalDate.of(LocalDate.now().getYear() + 1, 1, 31);
                }
                return LocalDate.of(LocalDate.now().getYear(), nextQuarterMonth, 1);
            case MONTHLY:
                return LocalDate.now().plusMonths(1).withDayOfMonth(1);
            case ONCE:
                return assignment.getStartDate().plusDays(30); // 30 Tage nach Start
            default:
                return null;
        }
    }

    /**
     * Mapping: Entity → Response DTO
     */
    private FeePaymentResponse toResponse(FeePayment payment) {
        String recordedByUserName = null;
        
        if (payment.getRecordedByUser() != null) {
            recordedByUserName = payment.getRecordedByUser().getDisplayName();
        }
        
        return FeePaymentResponse.builder()
                .id(payment.getId())
                .feeAssignmentId(payment.getFeeAssignmentId())
                .amountPaid(payment.getAmountPaid())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .periodStart(payment.getPeriodStart())
                .periodEnd(payment.getPeriodEnd())
                .referenceNumber(payment.getReferenceNumber())
                .notes(payment.getNotes())
                .recordedByUserId(payment.getRecordedByUserId())
                .recordedByUserName(recordedByUserName)
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }
}
