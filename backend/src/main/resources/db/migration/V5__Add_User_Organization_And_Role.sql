-- V5__Add_User_Organization_And_Role.sql
-- Fügt organization_id und role Spalten zur users Tabelle hinzu

-- Füge organization_id Spalte hinzu (nullable erstmal, wird später befüllt)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- Füge role Spalte hinzu
ALTER TABLE users
ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'PLAYER' CHECK (role IN ('ADMIN', 'TRAINER', 'CAPTAIN', 'PLAYER'));

-- Migriere bestehende Daten: Setze organization_id aus memberships
-- Nimm die erste aktive Membership für jeden User
UPDATE users u
SET organization_id = (
    SELECT m.org_id
    FROM memberships m
    WHERE m.user_id = u.id
    AND m.status = 'active'
    ORDER BY m.created_at ASC
    LIMIT 1
)
WHERE u.organization_id IS NULL;

-- Migriere bestehende Daten: Setze role aus memberships (uppercase)
-- Nimm die Rolle mit der höchsten Priorität (admin > trainer > captain > player)
UPDATE users u
SET role = (
    SELECT UPPER(m.role)
    FROM memberships m
    WHERE m.user_id = u.id
    AND m.status = 'active'
    ORDER BY
        CASE UPPER(m.role)
            WHEN 'ADMIN' THEN 1
            WHEN 'TRAINER' THEN 2
            WHEN 'CAPTAIN' THEN 3
            WHEN 'PLAYER' THEN 4
            ELSE 5
        END ASC
    LIMIT 1
)
WHERE EXISTS (
    SELECT 1 FROM memberships m2
    WHERE m2.user_id = u.id
    AND m2.status = 'active'
);

-- Jetzt mache organization_id NOT NULL (nachdem alle Daten migriert wurden)
-- Hinweis: Benutzer ohne Organization werden bei dieser Migration ignoriert
ALTER TABLE users
ALTER COLUMN organization_id SET NOT NULL;

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
