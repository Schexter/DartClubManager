package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.dto.request.FeeAssignmentRequest;
import com.dartclub.model.dto.response.FeeAssignmentResponse;
import com.dartclub.model.dto.response.FeeResponse;
import com.dartclub.model.entity.Fee;
import com.dartclub.model.entity.FeeAssignment;
import com.dartclub.model.entity.Member;
import com.dartclub.model.enums.FeeAssignmentStatus;
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
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * FeeAssignment Service - Business Logic für Beitragszuweisungen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FeeAssignmentService {

    private final FeeAssignmentRepository feeAssignmentRepository;
    private final FeeRepository feeRepository;
    private final MemberRepository memberRepository;
    private final FeePaymentRepository feePaymentRepository;
    private final FeeService feeService;

    /**
     * Alle Zuweisungen für ein Mitglied
     */
    @Transactional(readOnly = true)
    public List<FeeAssignmentResponse> getAssignmentsByMember(UUID memberId, UUID orgId) {
        log.debug("Getting fee assignments for member: {}", memberId);
        
        // Prüfe ob Member zu dieser Org gehört
        Member member = memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        
        return feeAssignmentRepository.findByMemberId(memberId)
                .stream()
                .map(this::toResponseWithPaymentInfo)
                .collect(Collectors.toList());
    }

    /**
     * Aktive Zuweisungen für ein Mitglied zu einem bestimmten Datum
     */
    @Transactional(readOnly = true)
    public List<FeeAssignmentResponse> getActiveAssignmentsByMemberAtDate(UUID memberId, LocalDate date, UUID orgId) {
        log.debug("Getting active fee assignments for member: {} at date: {}", memberId, date);
        
        memberRepository.findByIdAndOrgId(memberId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        
        return feeAssignmentRepository.findActiveFeeAssignmentsForMemberAtDate(memberId, date)
                .stream()
                .map(this::toResponseWithPaymentInfo)
                .collect(Collectors.toList());
    }

    /**
     * Alle Mitglieder mit einem bestimmten Beitragssatz
     */
    @Transactional(readOnly = true)
    public List<FeeAssignmentResponse> getAssignmentsByFee(UUID feeId, UUID orgId) {
        log.debug("Getting assignments for fee: {}", feeId);
        
        // Prüfe ob Fee zu dieser Org gehört
        feeRepository.findByIdAndOrgId(feeId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found"));
        
        return feeAssignmentRepository.findActiveAssignmentsWithMembersByFeeId(feeId)
                .stream()
                .map(this::toResponseWithPaymentInfo)
                .collect(Collectors.toList());
    }

    /**
     * Neue Zuweisung erstellen
     */
    @Transactional
    public FeeAssignmentResponse createAssignment(FeeAssignmentRequest request, UUID orgId) {
        log.info("Creating fee assignment: member={}, fee={}", request.getMemberId(), request.getFeeId());
        
        // Validierung: Member gehört zu Org
        Member member = memberRepository.findByIdAndOrgId(request.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        
        // Validierung: Fee gehört zu Org
        Fee fee = feeRepository.findByIdAndOrgId(request.getFeeId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found"));

        // Prüfe ob bereits eine aktive Zuweisung existiert
        boolean exists = feeAssignmentRepository.existsByMemberIdAndFeeIdAndStatus(
                request.getMemberId(), 
                request.getFeeId(), 
                FeeAssignmentStatus.ACTIVE
        );
        
        if (exists) {
            throw new IllegalArgumentException("Dieses Mitglied hat bereits eine aktive Zuweisung für diesen Beitragssatz");
        }

        FeeAssignment assignment = FeeAssignment.builder()
                .memberId(request.getMemberId())
                .feeId(request.getFeeId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus() != null ? request.getStatus() : FeeAssignmentStatus.ACTIVE)
                .notes(request.getNotes())
                .build();

        assignment = feeAssignmentRepository.save(assignment);
        log.info("Fee assignment created: {}", assignment.getId());
        
        // Lade Member und Fee für Response
        assignment.setMember(member);
        assignment.setFee(fee);
        
        return toResponseWithPaymentInfo(assignment);
    }

    /**
     * Zuweisung aktualisieren
     */
    @Transactional
    public FeeAssignmentResponse updateAssignment(UUID assignmentId, FeeAssignmentRequest request, UUID orgId) {
        log.info("Updating fee assignment: {}", assignmentId);
        
        FeeAssignment assignment = feeAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee assignment not found"));

        // Prüfe ob Member zu Org gehört
        memberRepository.findByIdAndOrgId(assignment.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        assignment.setStartDate(request.getStartDate());
        assignment.setEndDate(request.getEndDate());
        assignment.setStatus(request.getStatus());
        assignment.setNotes(request.getNotes());

        assignment = feeAssignmentRepository.save(assignment);
        log.info("Fee assignment updated: {}", assignment.getId());
        
        return toResponseWithPaymentInfo(assignment);
    }

    /**
     * Zuweisung deaktivieren
     */
    @Transactional
    public void deactivateAssignment(UUID assignmentId, UUID orgId) {
        log.info("Deactivating fee assignment: {}", assignmentId);
        
        FeeAssignment assignment = feeAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee assignment not found"));

        // Prüfe ob Member zu Org gehört
        memberRepository.findByIdAndOrgId(assignment.getMemberId(), orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        assignment.setStatus(FeeAssignmentStatus.INACTIVE);
        assignment.setEndDate(LocalDate.now());
        
        feeAssignmentRepository.save(assignment);
        log.info("Fee assignment deactivated: {}", assignment.getId());
    }

    /**
     * Mapping: Entity → Response DTO (ohne Zahlungsinformationen)
     */
    private FeeAssignmentResponse toResponse(FeeAssignment assignment) {
        String memberName = null;
        String feeName = null;
        
        if (assignment.getMember() != null) {
            memberName = assignment.getMember().getFullName();
        }
        
        if (assignment.getFee() != null) {
            feeName = assignment.getFee().getName();
        }
        
        return FeeAssignmentResponse.builder()
                .id(assignment.getId())
                .memberId(assignment.getMemberId())
                .memberName(memberName)
                .feeId(assignment.getFeeId())
                .feeName(feeName)
                .startDate(assignment.getStartDate())
                .endDate(assignment.getEndDate())
                .status(assignment.getStatus())
                .notes(assignment.getNotes())
                .createdAt(assignment.getCreatedAt())
                .updatedAt(assignment.getUpdatedAt())
                .build();
    }
    
    /**
     * Mapping: Entity → Response DTO (MIT Zahlungsinformationen)
     */
    private FeeAssignmentResponse toResponseWithPaymentInfo(FeeAssignment assignment) {
        String memberName = null;
        String feeName = null;
        FeeResponse feeResponse = null;
        
        // Lade Member
        if (assignment.getMember() != null) {
            memberName = assignment.getMember().getFullName();
        }
        
        // Lade Fee
        Fee fee = null;
        if (assignment.getFee() != null) {
            fee = assignment.getFee();
            feeName = fee.getName();
        } else {
            // Lade Fee aus DB falls nicht geladen
            fee = feeRepository.findById(assignment.getFeeId())
                    .orElse(null);
            if (fee != null) {
                feeName = fee.getName();
                assignment.setFee(fee); // Cache für weitere Verwendung
            }
        }
        
        // Erstelle FeeResponse
        if (fee != null) {
            feeResponse = feeService.toResponse(fee);
        }
        
        // Berechne Zahlungsinformationen
        BigDecimal totalPaid = feePaymentRepository.sumPaymentsByFeeAssignmentId(assignment.getId());
        if (totalPaid == null) {
            totalPaid = BigDecimal.ZERO;
        }
        
        BigDecimal feeAmount = fee != null ? fee.getAmount() : BigDecimal.ZERO;
        BigDecimal remainingAmount = feeAmount.subtract(totalPaid);
        
        // Letzte Zahlung
        LocalDate lastPaymentDate = feePaymentRepository
                .findByFeeAssignmentIdOrderByPaymentDateDesc(assignment.getId())
                .stream()
                .findFirst()
                .map(payment -> payment.getPaymentDate())
                .orElse(null);
        
        // Bestimme Zahlungsstatus
        String paymentStatus;
        if (remainingAmount.compareTo(BigDecimal.ZERO) <= 0) {
            paymentStatus = "PAID";
        } else if (totalPaid.compareTo(BigDecimal.ZERO) > 0) {
            paymentStatus = "PARTIAL";
        } else {
            paymentStatus = "OPEN";
        }
        
        // Überfällig?
        // Berechne nächstes Fälligkeitsdatum
        LocalDate nextDueDate = calculateNextDueDate(fee, assignment);
        if (nextDueDate != null && LocalDate.now().isAfter(nextDueDate) && 
            remainingAmount.compareTo(BigDecimal.ZERO) > 0) {
            paymentStatus = "OVERDUE";
        }
        
        return FeeAssignmentResponse.builder()
                .id(assignment.getId())
                .memberId(assignment.getMemberId())
                .memberName(memberName)
                .feeId(assignment.getFeeId())
                .feeName(feeName)
                .fee(feeResponse) // Vollständiges Fee-Objekt
                .startDate(assignment.getStartDate())
                .endDate(assignment.getEndDate())
                .status(assignment.getStatus())
                .notes(assignment.getNotes())
                .totalPaid(totalPaid)
                .remainingAmount(remainingAmount)
                .lastPaymentDate(lastPaymentDate)
                .paymentStatus(paymentStatus)
                .createdAt(assignment.getCreatedAt())
                .updatedAt(assignment.getUpdatedAt())
                .build();
    }
    
    /**
     * Berechne nächstes Fälligkeitsdatum basierend auf Beitragsperiode
     */
    private LocalDate calculateNextDueDate(Fee fee, FeeAssignment assignment) {
        if (fee == null) return null;
        
        switch (fee.getPeriod()) {
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
}
