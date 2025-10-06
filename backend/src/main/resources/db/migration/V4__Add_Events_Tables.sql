-- V4__Add_Events_Tables.sql
-- Fügt fehlende Spalten zur Events Tabelle hinzu und erstellt EventParticipants Tabelle

-- Füge fehlende Spalten zur Events Tabelle hinzu
ALTER TABLE events
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES teams(id) ON DELETE SET NULL;

-- Ändere created_by zu member reference (falls es auf users zeigt)
-- Erst prüfen ob die Spalte created_by existiert und vom Typ user ist
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'events'
        AND column_name = 'created_by'
    ) THEN
        -- Entferne alte Foreign Key Constraint falls vorhanden
        ALTER TABLE events DROP CONSTRAINT IF EXISTS events_created_by_fkey;
        -- Füge neue Foreign Key Constraint hinzu
        ALTER TABLE events ADD CONSTRAINT events_created_by_fkey
            FOREIGN KEY (created_by) REFERENCES members(id) ON DELETE CASCADE;
    ELSE
        -- Spalte existiert nicht, füge sie hinzu
        ALTER TABLE events ADD COLUMN created_by UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Event Participants Tabelle (Teilnahmen an Events)
CREATE TABLE IF NOT EXISTS event_participants (
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    comment TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, member_id)
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_events_org_id ON events(org_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_team_id ON events(team_id);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_event_participants_member_id ON event_participants(member_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_status ON event_participants(status);
