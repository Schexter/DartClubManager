package com.dartclub.model.enums;

/**
 * Status eines Dart-Matches
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */
public enum MatchStatus {
    /**
     * Match ist geplant, aber noch nicht gestartet
     */
    SCHEDULED,
    
    /**
     * Match läuft gerade (Live-Scoring aktiv)
     */
    LIVE,
    
    /**
     * Match ist abgeschlossen
     */
    FINISHED,
    
    /**
     * Match wurde abgesagt
     */
    CANCELLED
}
