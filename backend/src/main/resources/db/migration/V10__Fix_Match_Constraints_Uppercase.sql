/**
 * V9 - Fix Match Constraints für UPPERCASE Enum-Werte
 *
 * Problem: Java Enums werden als UPPERCASE gespeichert, aber DB-Constraints
 * erwarten lowercase. Dies führt zu Constraint-Violations.
 *
 * Lösung: Constraints auf UPPERCASE ändern
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

-- Drop old constraints
ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_match_type_check;
ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_status_check;

-- Add new constraints with UPPERCASE values
ALTER TABLE matches
ADD CONSTRAINT matches_match_type_check
CHECK (match_type IN ('LEAGUE', 'FRIENDLY', 'CUP', 'PRACTICE', 'TOURNAMENT'));

ALTER TABLE matches
ADD CONSTRAINT matches_status_check
CHECK (status IN ('SCHEDULED', 'LIVE', 'FINISHED', 'CANCELLED'));

-- Update default values to UPPERCASE
ALTER TABLE matches ALTER COLUMN match_type SET DEFAULT 'LEAGUE';
ALTER TABLE matches ALTER COLUMN status SET DEFAULT 'SCHEDULED';

-- Update existing data to UPPERCASE (if any exists)
UPDATE matches SET match_type = UPPER(match_type);
UPDATE matches SET status = UPPER(status);
