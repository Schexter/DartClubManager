-- V7: Add missing columns to members table
-- Adds role, status, and joined_at columns to match Member entity

-- Add role column with default value
ALTER TABLE members
ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'PLAYER'
CHECK (role IN ('ADMIN', 'TRAINER', 'CAPTAIN', 'PLAYER'));

-- Add status column with default value
ALTER TABLE members
ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE'
CHECK (status IN ('ACTIVE', 'INACTIVE'));

-- Add joined_at column
ALTER TABLE members
ADD COLUMN joined_at DATE DEFAULT CURRENT_DATE;

-- Create indexes for filtering
CREATE INDEX idx_members_role ON members(role);
CREATE INDEX idx_members_status ON members(status);
