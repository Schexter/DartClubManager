package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.dto.request.FeeAssignmentRequest;
import com.dartclub.model.dto.response.FeeAssignmentResponse;
import com.dartclub.model.entity.Fee;
import com.dartclub.model.entity.FeeAssignment;
import com.dartclub.model.entity.Member;
import com.dartclub.model.enums.FeeAssignmentStatus;
import com.dartclub.repository.FeeAssignmentRepository;
import com.dartclub.repository.FeeRepository;
import com.dartclub.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .map(this::toResponse)
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
                .map(this::toResponse)
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
                .map(this::toResponse)
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
        
        return toResponse(assignment);
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
        
        return toResponse(assignment);
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
     * Mapping: Entity → Response DTO
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
}
