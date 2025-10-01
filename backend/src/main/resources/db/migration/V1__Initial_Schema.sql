-- V1__Initial_Schema.sql

-- Define custom enum types
CREATE TYPE role AS ENUM ('ADMIN', 'PLAYER');
CREATE TYPE membership_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');
CREATE TYPE handedness AS ENUM ('LEFT', 'RIGHT', 'AMBIDEXTROUS');
CREATE TYPE match_type AS ENUM ('LEAGUE', 'FRIENDLY', 'CUP', 'TOURNAMENT');
CREATE TYPE match_status AS ENUM ('SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED', 'CANCELLED');

-- Core Tables
CREATE TABLE organizations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- User and Membership Tables
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE memberships (
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    role role NOT NULL,
    status membership_status NOT NULL,
    joined_at DATE,
    created_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (user_id, organization_id)
);

-- Player and Team Tables
CREATE TABLE player_profiles (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    user_id UUID UNIQUE REFERENCES users(id),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    email VARCHAR(255),
    birthdate DATE,
    handedness handedness,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE teams (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    season VARCHAR(50),
    captain_id UUID REFERENCES player_profiles(id),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE team_members (
    team_id UUID REFERENCES teams(id),
    player_profile_id UUID REFERENCES player_profiles(id),
    position INT,
    created_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (team_id, player_profile_id)
);

-- Match and Scoring Tables
CREATE TABLE matches (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    home_team_id UUID NOT NULL REFERENCES teams(id),
    away_team_id UUID NOT NULL REFERENCES teams(id),
    match_date TIMESTAMPTZ NOT NULL,
    venue VARCHAR(255),
    league VARCHAR(255),
    match_type match_type NOT NULL,
    status match_status NOT NULL,
    home_sets INT,
    away_sets INT,
    best_of_sets INT,
    best_of_legs INT,
    starting_score INT NOT NULL,
    double_out BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE match_participants (
    match_id UUID REFERENCES matches(id),
    player_profile_id UUID REFERENCES player_profiles(id),
    team_id UUID NOT NULL REFERENCES teams(id),
    position INT,
    PRIMARY KEY (match_id, player_profile_id)
);

CREATE TABLE legs (
    id UUID PRIMARY KEY,
    match_id UUID NOT NULL REFERENCES matches(id),
    leg_number INT NOT NULL,
    winner_id UUID REFERENCES player_profiles(id),
    starting_score INT NOT NULL,
    total_darts INT,
    checkout_score INT,
    started_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ
);

CREATE TABLE throws (
    id UUID PRIMARY KEY,
    leg_id UUID NOT NULL REFERENCES legs(id),
    player_profile_id UUID NOT NULL REFERENCES player_profiles(id),
    throw_number INT NOT NULL,
    score INT NOT NULL,
    remaining_score INT NOT NULL,
    is_bust BOOLEAN NOT NULL DEFAULT false,
    is_checkout BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL
);
