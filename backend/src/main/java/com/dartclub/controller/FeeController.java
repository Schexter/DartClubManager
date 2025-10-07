package com.dartclub.controller;

import com.dartclub.model.dto.request.FeeAssignmentRequest;
import com.dartclub.model.dto.request.FeePaymentRequest;
import com.dartclub.model.dto.request.FeeRequest;
import com.dartclub.model.dto.response.FeeAssignmentResponse;
import com.dartclub.model.dto.response.FeePaymentResponse;
import com.dartclub.model.dto.response.FeeResponse;
import com.dartclub.model.dto.response.MemberFeeStatusResponse;
import com.dartclub.security.JwtTokenProvider;
import com.dartclub.service.FeeAssignmentService;
import com.dartclub.service.FeePaymentService;
import com.dartclub.service.FeeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Fee Controller - REST API für Beitragsverwaltung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
@Slf4j
public class FeeController {

    private final FeeService feeService;
    private final FeeAssignmentService feeAssignmentService;
    private final FeePaymentService feePaymentService;
    private final JwtTokenProvider jwtTokenProvider;

    // ==================== BEITRAGSSÄTZE ====================

    /**
     * GET /api/fees - Alle Beitragssätze
     */
    @GetMapping
    public ResponseEntity<List<FeeResponse>> getAllFees(
            @RequestParam(required = false, defaultValue = "false") boolean activeOnly,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        
        List<FeeResponse> fees = activeOnly ? 
                feeService.getActiveFeesByOrg(orgId) : 
                feeService.getAllFeesByOrg(orgId);
        
        return ResponseEntity.ok(fees);
    }

    /**
     * GET /api/fees/{id} - Einzelner Beitragssatz
     */
    @GetMapping("/{id}")
    public ResponseEntity<FeeResponse> getFeeById(
            @PathVariable UUID id,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        FeeResponse fee = feeService.getFeeById(id, orgId);
        return ResponseEntity.ok(fee);
    }

    /**
     * POST /api/fees - Neuen Beitragssatz erstellen
     */
    @PostMapping
    public ResponseEntity<FeeResponse> createFee(
            @Valid @RequestBody FeeRequest feeRequest,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        FeeResponse fee = feeService.createFee(feeRequest, orgId);
        return ResponseEntity.status(HttpStatus.CREATED).body(fee);
    }

    /**
     * PUT /api/fees/{id} - Beitragssatz aktualisieren
     */
    @PutMapping("/{id}")
    public ResponseEntity<FeeResponse> updateFee(
            @PathVariable UUID id,
            @Valid @RequestBody FeeRequest feeRequest,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        FeeResponse fee = feeService.updateFee(id, feeRequest, orgId);
        return ResponseEntity.ok(fee);
    }

    /**
     * DELETE /api/fees/{id}/deactivate - Beitragssatz deaktivieren
     */
    @DeleteMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateFee(
            @PathVariable UUID id,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        feeService.deactivateFee(id, orgId);
        return ResponseEntity.noContent().build();
    }

    /**
     * DELETE /api/fees/{id} - Beitragssatz löschen
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFee(
            @PathVariable UUID id,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        feeService.deleteFee(id, orgId);
        return ResponseEntity.noContent().build();
    }

    // ==================== ZUWEISUNGEN ====================

    /**
     * GET /api/fees/assignments/member/{memberId} - Alle Zuweisungen eines Mitglieds
     */
    @GetMapping("/assignments/member/{memberId}")
    public ResponseEntity<List<FeeAssignmentResponse>> getMemberAssignments(
            @PathVariable UUID memberId,
            @RequestParam(required = false) LocalDate date,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        
        List<FeeAssignmentResponse> assignments = date != null ?
                feeAssignmentService.getActiveAssignmentsByMemberAtDate(memberId, date, orgId) :
                feeAssignmentService.getAssignmentsByMember(memberId, orgId);
        
        return ResponseEntity.ok(assignments);
    }

    /**
     * GET /api/fees/{feeId}/assignments - Alle Mitglieder mit diesem Beitragssatz
     */
    @GetMapping("/{feeId}/assignments")
    public ResponseEntity<List<FeeAssignmentResponse>> getFeeAssignments(
            @PathVariable UUID feeId,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        List<FeeAssignmentResponse> assignments = feeAssignmentService.getAssignmentsByFee(feeId, orgId);
        return ResponseEntity.ok(assignments);
    }

    /**
     * POST /api/fees/assignments - Neue Zuweisung erstellen
     */
    @PostMapping("/assignments")
    public ResponseEntity<FeeAssignmentResponse> createAssignment(
            @Valid @RequestBody FeeAssignmentRequest assignmentRequest,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        FeeAssignmentResponse assignment = feeAssignmentService.createAssignment(assignmentRequest, orgId);
        return ResponseEntity.status(HttpStatus.CREATED).body(assignment);
    }

    /**
     * PUT /api/fees/assignments/{id} - Zuweisung aktualisieren
     */
    @PutMapping("/assignments/{id}")
    public ResponseEntity<FeeAssignmentResponse> updateAssignment(
            @PathVariable UUID id,
            @Valid @RequestBody FeeAssignmentRequest assignmentRequest,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        FeeAssignmentResponse assignment = feeAssignmentService.updateAssignment(id, assignmentRequest, orgId);
        return ResponseEntity.ok(assignment);
    }

    /**
     * DELETE /api/fees/assignments/{id} - Zuweisung deaktivieren
     */
    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<Void> deactivateAssignment(
            @PathVariable UUID id,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        feeAssignmentService.deactivateAssignment(id, orgId);
        return ResponseEntity.noContent().build();
    }

    // ==================== ZAHLUNGEN ====================

    /**
     * GET /api/fees/payments/assignment/{assignmentId} - Alle Zahlungen einer Zuweisung
     */
    @GetMapping("/payments/assignment/{assignmentId}")
    public ResponseEntity<List<FeePaymentResponse>> getAssignmentPayments(
            @PathVariable UUID assignmentId,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        List<FeePaymentResponse> payments = feePaymentService.getPaymentsByAssignment(assignmentId, orgId);
        return ResponseEntity.ok(payments);
    }

    /**
     * GET /api/fees/payments/member/{memberId} - Alle Zahlungen eines Mitglieds
     */
    @GetMapping("/payments/member/{memberId}")
    public ResponseEntity<List<FeePaymentResponse>> getMemberPayments(
            @PathVariable UUID memberId,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        List<FeePaymentResponse> payments = feePaymentService.getPaymentsByMember(memberId, orgId);
        return ResponseEntity.ok(payments);
    }

    /**
     * POST /api/fees/payments - Neue Zahlung erfassen
     */
    @PostMapping("/payments")
    public ResponseEntity<FeePaymentResponse> recordPayment(
            @Valid @RequestBody FeePaymentRequest paymentRequest,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        UUID userId = jwtTokenProvider.getUserIdFromRequest(request);
        FeePaymentResponse payment = feePaymentService.recordPayment(paymentRequest, userId, orgId);
        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }

    /**
     * PUT /api/fees/payments/{id} - Zahlung aktualisieren
     */
    @PutMapping("/payments/{id}")
    public ResponseEntity<FeePaymentResponse> updatePayment(
            @PathVariable UUID id,
            @Valid @RequestBody FeePaymentRequest paymentRequest,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        FeePaymentResponse payment = feePaymentService.updatePayment(id, paymentRequest, orgId);
        return ResponseEntity.ok(payment);
    }

    /**
     * DELETE /api/fees/payments/{id} - Zahlung löschen
     */
    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable UUID id,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        feePaymentService.deletePayment(id, orgId);
        return ResponseEntity.noContent().build();
    }

    // ==================== ÜBERSICHTEN ====================

    /**
     * GET /api/fees/status - Beitragsstatus für alle Mitglieder
     */
    @GetMapping("/status")
    public ResponseEntity<List<MemberFeeStatusResponse>> getFeeStatusOverview(
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        List<MemberFeeStatusResponse> statusList = feePaymentService.getFeeStatusOverview(orgId);
        return ResponseEntity.ok(statusList);
    }

    /**
     * GET /api/fees/status/member/{memberId} - Beitragsstatus für ein Mitglied
     */
    @GetMapping("/status/member/{memberId}")
    public ResponseEntity<List<MemberFeeStatusResponse>> getMemberFeeStatus(
            @PathVariable UUID memberId,
            HttpServletRequest request) {
        UUID orgId = jwtTokenProvider.getOrgIdFromRequest(request);
        List<MemberFeeStatusResponse> statusList = feePaymentService.getMemberFeeStatus(memberId, orgId);
        return ResponseEntity.ok(statusList);
    }
}
