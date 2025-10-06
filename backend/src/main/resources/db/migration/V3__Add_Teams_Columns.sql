-- V3__Add_Teams_Columns.sql
-- Fügt fehlende Spalten zur teams Tabelle hinzu

ALTER TABLE teams
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS league VARCHAR(100),
ADD COLUMN IF NOT EXISTS logo_url TEXT;
