-- V8: Add color column to teams table
-- Adds hex color for team visualization

ALTER TABLE teams
ADD COLUMN color VARCHAR(7); -- Hex color format: #RRGGBB

-- Create index for better query performance
CREATE INDEX idx_teams_color ON teams(color);

-- Optional: Set default colors for existing teams (if any)
-- COMMENT: You can set random colors for existing teams here if needed
