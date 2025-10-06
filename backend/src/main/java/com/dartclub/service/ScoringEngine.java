package com.dartclub.service;

import com.dartclub.model.entity.Leg;
import com.dartclub.model.entity.Throw;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

/**
 * ScoringEngine - Dart-Wurf-Validierung und Punkteberechnung
 * 
 * Funktionen:
 * - Wurf-Validierung (Bust, Checkout)
 * - Punkteberechnung pro Dart
 * - Event-Detection (180, 171, 140+, High-Checkout)
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@Service
public class ScoringEngine {
    
    /**
     * Verarbeitet einen Wurf (3 Darts) und berechnet das Ergebnis
     * 
     * @param leg Aktuelles Leg
     * @param throwData Wurf-Daten (3 Darts)
     * @return ThrowResult mit Bust/Checkout-Flags
     */
    public ThrowResult processThrow(Leg leg, Throw throwData) {
        // Berechne Score pro Dart
        int dart1Score = calculateDartScore(throwData.getDart1Multiplier(), throwData.getDart1Segment());
        int dart2Score = calculateDartScore(throwData.getDart2Multiplier(), throwData.getDart2Segment());
        int dart3Score = calculateDartScore(throwData.getDart3Multiplier(), throwData.getDart3Segment());
        
        throwData.setDart1Score(dart1Score);
        throwData.setDart2Score(dart2Score);
        throwData.setDart3Score(dart3Score);
        
        int throwTotal = dart1Score + dart2Score + dart3Score;
        throwData.setThrowTotal(throwTotal);
        
        int newRemainingScore = throwData.getRemainingScore() - throwTotal;
        
        // Bust-Check (Double-Out)
        if (leg.isDoubleOut()) {
            // Bust wenn:
            // - Restpunkte negativ
            // - Restpunkte = 1 (kann nicht mit Double ausgecheckt werden)
            if (newRemainingScore < 0 || newRemainingScore == 1) {
                // Bust!
                throwData.setIsBust(true);
                throwData.setRemainingScore(throwData.getRemainingScore()); // Punkte bleiben
                return new ThrowResult(throwData, false, true);
            }
            
            // Checkout-Check (muss mit Double enden)
            if (newRemainingScore == 0 && isDouble(throwData.getDart3Multiplier())) {
                throwData.setIsCheckout(true);
                throwData.setRemainingScore(0);
                return new ThrowResult(throwData, true, false);
            }
        } else {
            // Kein Double-Out
            if (newRemainingScore < 0) {
                throwData.setIsBust(true);
                throwData.setRemainingScore(throwData.getRemainingScore());
                return new ThrowResult(throwData, false, true);
            }
            
            if (newRemainingScore == 0) {
                throwData.setIsCheckout(true);
                throwData.setRemainingScore(0);
                return new ThrowResult(throwData, true, false);
            }
        }
        
        // Normaler Wurf (kein Bust, kein Checkout)
        throwData.setRemainingScore(newRemainingScore);
        return new ThrowResult(throwData, false, false);
    }
    
    /**
     * Berechnet den Score für einen einzelnen Dart
     * 
     * @param multiplier 0 (Miss), 1 (Single), 2 (Double), 3 (Triple)
     * @param segment Segment-Nummer (1-25, wobei 25 = Bull)
     * @return Score des Darts
     */
    private int calculateDartScore(int multiplier, int segment) {
        if (multiplier == 0) return 0; // Miss
        
        if (segment == 25) {
            // Bull: Single = 25, Double (Bull's Eye) = 50
            return multiplier == 2 ? 50 : 25;
        }
        
        return multiplier * segment;
    }
    
    /**
     * Prüft ob ein Dart ein Double ist
     * 
     * @param multiplier Multiplikator
     * @return true wenn Double
     */
    private boolean isDouble(int multiplier) {
        return multiplier == 2;
    }
    
    /**
     * Erkennt spezielle Events (180, 171, 140+, High-Checkout)
     * 
     * @param throwData Wurf-Daten
     * @return Event-Name oder null
     */
    public String detectEvent(Throw throwData) {
        int total = throwData.getThrowTotal();
        
        // Perfect Game (180)
        if (total == 180) return "180";
        
        // Maximum with Trebles (171)
        if (total == 171) return "171";
        
        // High Score (140+)
        if (total >= 140) return "140_plus";
        
        // High Checkout (100+)
        if (throwData.getIsCheckout() && throwData.getDart3Score() >= 100) {
            return "high_checkout";
        }
        
        return null;
    }
    
    /**
     * Validiert ob ein Wurf regelkonform ist
     * 
     * @param throwData Wurf-Daten
     * @return true wenn valide
     */
    public boolean validateThrow(Throw throwData) {
        // Multiplier muss 0-3 sein
        if (!isValidMultiplier(throwData.getDart1Multiplier()) ||
            !isValidMultiplier(throwData.getDart2Multiplier()) ||
            !isValidMultiplier(throwData.getDart3Multiplier())) {
            return false;
        }
        
        // Segment muss 1-25 sein
        if (!isValidSegment(throwData.getDart1Segment()) ||
            !isValidSegment(throwData.getDart2Segment()) ||
            !isValidSegment(throwData.getDart3Segment())) {
            return false;
        }
        
        // Bull (25) kann nur Single oder Double sein
        if (throwData.getDart1Segment() == 25 && throwData.getDart1Multiplier() == 3) return false;
        if (throwData.getDart2Segment() == 25 && throwData.getDart2Multiplier() == 3) return false;
        if (throwData.getDart3Segment() == 25 && throwData.getDart3Multiplier() == 3) return false;
        
        return true;
    }
    
    /**
     * Prüft ob Multiplier valide ist (0-3)
     */
    private boolean isValidMultiplier(Integer multiplier) {
        return multiplier != null && multiplier >= 0 && multiplier <= 3;
    }
    
    /**
     * Prüft ob Segment valide ist (1-25)
     */
    private boolean isValidSegment(Integer segment) {
        return segment != null && segment >= 1 && segment <= 25;
    }
    
    /**
     * Result-Objekt für einen Wurf
     */
    @Data
    @AllArgsConstructor
    public static class ThrowResult {
        private Throw throwData;
        private boolean isCheckout;
        private boolean isBust;
    }
}
