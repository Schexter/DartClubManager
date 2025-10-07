package com.dartclub.service;

import com.dartclub.exception.ResourceNotFoundException;
import com.dartclub.model.dto.request.FeeRequest;
import com.dartclub.model.dto.response.FeeResponse;
import com.dartclub.model.entity.Fee;
import com.dartclub.repository.FeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Fee Service - Business Logic für Beitragssätze
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FeeService {

    private final FeeRepository feeRepository;

    /**
     * Alle Beitragssätze einer Organisation
     */
    @Transactional(readOnly = true)
    public List<FeeResponse> getAllFeesByOrg(UUID orgId) {
        log.debug("Getting all fees for org: {}", orgId);
        return feeRepository.findByOrgId(orgId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Nur aktive Beitragssätze
     */
    @Transactional(readOnly = true)
    public List<FeeResponse> getActiveFeesByOrg(UUID orgId) {
        log.debug("Getting active fees for org: {}", orgId);
        return feeRepository.findByOrgIdAndIsActiveTrue(orgId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Einzelner Beitragssatz
     */
    @Transactional(readOnly = true)
    public FeeResponse getFeeById(UUID feeId, UUID orgId) {
        log.debug("Getting fee: {} for org: {}", feeId, orgId);
        Fee fee = feeRepository.findByIdAndOrgId(feeId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found"));
        return toResponse(fee);
    }

    /**
     * Neuen Beitragssatz erstellen
     */
    @Transactional
    public FeeResponse createFee(FeeRequest request, UUID orgId) {
        log.info("Creating fee: {} for org: {}", request.getName(), orgId);
        
        // Prüfe ob Name bereits existiert
        if (feeRepository.existsByNameAndOrgId(request.getName(), orgId)) {
            throw new IllegalArgumentException("Ein Beitragssatz mit diesem Namen existiert bereits");
        }

        Fee fee = Fee.builder()
                .orgId(orgId)
                .name(request.getName())
                .amount(request.getAmount())
                .period(request.getPeriod())
                .description(request.getDescription())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();

        fee = feeRepository.save(fee);
        log.info("Fee created: {}", fee.getId());
        return toResponse(fee);
    }

    /**
     * Beitragssatz aktualisieren
     */
    @Transactional
    public FeeResponse updateFee(UUID feeId, FeeRequest request, UUID orgId) {
        log.info("Updating fee: {} for org: {}", feeId, orgId);
        
        Fee fee = feeRepository.findByIdAndOrgId(feeId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found"));

        // Prüfe ob Name geändert wurde und bereits existiert
        if (!fee.getName().equals(request.getName()) && 
            feeRepository.existsByNameAndOrgId(request.getName(), orgId)) {
            throw new IllegalArgumentException("Ein Beitragssatz mit diesem Namen existiert bereits");
        }

        fee.setName(request.getName());
        fee.setAmount(request.getAmount());
        fee.setPeriod(request.getPeriod());
        fee.setDescription(request.getDescription());
        fee.setIsActive(request.getIsActive());

        fee = feeRepository.save(fee);
        log.info("Fee updated: {}", fee.getId());
        return toResponse(fee);
    }

    /**
     * Beitragssatz deaktivieren (soft delete)
     */
    @Transactional
    public void deactivateFee(UUID feeId, UUID orgId) {
        log.info("Deactivating fee: {} for org: {}", feeId, orgId);
        
        Fee fee = feeRepository.findByIdAndOrgId(feeId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found"));

        fee.setIsActive(false);
        feeRepository.save(fee);
        log.info("Fee deactivated: {}", fee.getId());
    }

    /**
     * Beitragssatz löschen (hard delete)
     * Nur möglich wenn keine Zuweisungen existieren
     */
    @Transactional
    public void deleteFee(UUID feeId, UUID orgId) {
        log.info("Deleting fee: {} for org: {}", feeId, orgId);
        
        Fee fee = feeRepository.findByIdAndOrgId(feeId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found"));

        // TODO: Prüfe ob Zuweisungen existieren (später mit FeeAssignmentRepository)
        
        feeRepository.delete(fee);
        log.info("Fee deleted: {}", fee.getId());
    }

    /**
     * Mapping: Entity → Response DTO
     */
    private FeeResponse toResponse(Fee fee) {
        return FeeResponse.builder()
                .id(fee.getId())
                .orgId(fee.getOrgId())
                .name(fee.getName())
                .amount(fee.getAmount())
                .period(fee.getPeriod())
                .description(fee.getDescription())
                .isActive(fee.getIsActive())
                .createdAt(fee.getCreatedAt())
                .updatedAt(fee.getUpdatedAt())
                .build();
    }
}
