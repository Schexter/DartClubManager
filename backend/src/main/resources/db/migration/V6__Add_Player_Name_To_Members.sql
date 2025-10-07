-- Add player_name field to members table
-- This allows members to have a custom display name for matches (optional, can be reused)

ALTER TABLE members ADD COLUMN player_name VARCHAR(100);

-- Add index for faster lookups
CREATE INDEX idx_members_player_name ON members(player_name);

COMMENT ON COLUMN members.player_name IS 'Optional display name for matches, can be reused by multiple members';
