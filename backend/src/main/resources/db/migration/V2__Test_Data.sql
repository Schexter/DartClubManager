-- V2__Test_Data.sql
-- Test-Daten für Entwicklung
-- Erstellt von Hans Hahn - Alle Rechte vorbehalten

-- Test Organizations
INSERT INTO organizations (id, name, slug, primary_color, secondary_color, created_at, updated_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Dart Falcons Wuppertal', 'falcons-wuppertal', '#1976D2', '#FF6F00', NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'Eagles Dart Club', 'eagles-dart-club', '#D32F2F', '#FFA000', NOW(), NOW());

-- Test Users (Passwort für alle: "Test123!" - BCrypt Hash mit Stärke 12)
INSERT INTO users (id, email, password_hash, display_name, is_active, created_at, updated_at)
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'admin@falcons.de', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIp3o3h.4e', 'Admin Falcons', true, NOW(), NOW()),
    ('44444444-4444-4444-4444-444444444444', 'player@falcons.de', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIp3o3h.4e', 'Max Mustermann', true, NOW(), NOW()),
    ('55555555-5555-5555-5555-555555555555', 'admin@eagles.de', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIp3o3h.4e', 'Admin Eagles', true, NOW(), NOW());

-- Memberships (Verknüpfung User ↔ Organization)
INSERT INTO memberships (user_id, org_id, role, status, joined_at, created_at)
VALUES 
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'admin', 'active', '2025-01-01', NOW()),
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'player', 'active', '2025-01-15', NOW()),
    ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'admin', 'active', '2025-02-01', NOW());

-- Test Members
INSERT INTO members (id, org_id, user_id, first_name, last_name, email, phone, handedness, created_at, updated_at)
VALUES 
    ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Max', 'Mustermann', 'max@example.com', '+49 123 456789', 'right', NOW(), NOW()),
    ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', NULL, 'Hans', 'Hahn', 'hans@example.com', '+49 987 654321', 'right', NOW(), NOW()),
    ('88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', NULL, 'Anna', 'Schmidt', 'anna@example.com', '+49 555 123456', 'left', NOW(), NOW());

-- Test Team
INSERT INTO teams (id, org_id, name, season, captain_id, created_at, updated_at)
VALUES 
    ('99999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111', 'Falcons A-Team', '2024/25', '77777777-7777-7777-7777-777777777777', NOW(), NOW());

-- Team Members
INSERT INTO team_members (team_id, member_id, position, created_at)
VALUES 
    ('99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666', 1, NOW()),
    ('99999999-9999-9999-9999-999999999999', '77777777-7777-7777-7777-777777777777', 2, NOW()),
    ('99999999-9999-9999-9999-999999999999', '88888888-8888-8888-8888-888888888888', 3, NOW());
