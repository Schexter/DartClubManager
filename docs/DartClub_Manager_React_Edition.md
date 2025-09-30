# 🎯 DartClub Manager - Vollständige Projektdokumentation

**Version:** 2.0  
**Datum:** 30.09.2025  
**Team:** 6 Entwickler  
**Projektdauer:** 16 Wochen  
**Erstellt von:** Hans Hahn - Alle Rechte vorbehalten

---

## 📋 INHALTSVERZEICHNIS

1. [Executive Summary](#1-executive-summary)
2. [Soll-Ist-Analyse](#2-soll-ist-analyse)
3. [Technologie-Stack & Begründungen](#3-technologie-stack--begründungen)
4. [System-Architektur](#4-system-architektur)
5. [Datenmodell](#5-datenmodell)
6. [Design-Konzept](#6-design-konzept)
7. [Feature-Spezifikation](#7-feature-spezifikation)
8. [Sprint-Planung](#8-sprint-planung)
9. [User Stories](#9-user-stories)
10. [Implementierungs-Snippets](#10-implementierungs-snippets)
11. [Testing-Strategie](#11-testing-strategie)
12. [Deployment-Strategie](#12-deployment-strategie)
13. [Risiken & Mitigation](#13-risiken--mitigation)
14. [Roadmap](#14-roadmap)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Projektvision

Eine mandantenfähige Web-Applikation zur Verwaltung von Dartvereinen mit Fokus auf:

- Mitgliederverwaltung
- Match-Management mit Live-Scoring (Einzelwurf-Erfassung)
- Terminverwaltung & Terminfindung
- Beitragsverwaltung
- Statistiken & Analytics

### 1.2 Zielgruppe

- **Primär:** Dartvereine in Deutschland
- **Sekundär:** Hobby-Dart-Gruppen, Ligabetreiber
- **Später:** Internationale Vereine (Multi-Language)

### 1.3 Geschäftsziele

- **MVP in 16 Wochen** (4 Monate)
- **3-5 Pilotvereine** als Testnutzer gewinnen
- **Skalierbar auf 50+ Vereine** innerhalb 12 Monaten
- **White-Label-fähig** für andere Sportarten (Phase 2)

### 1.4 Erfolgsmetriken

- ✅ Funktionierendes Live-Scoring mit Einzelwurf-Erfassung
- ✅ Mindestens 30 aktive Nutzer im Pilotverein
- ✅ 90% Uptime im Produktivbetrieb
- ✅ <500ms API Response Time (P95)
- ✅ Positives Feedback von Vereinsvorständen

---

## 2. SOLL-IST-ANALYSE

### 2.1 IST-Zustand (aktuell in Dartvereinen)

| **Bereich** | **Aktueller Zustand** | **Probleme** |
|---|---|---|
| **Mitgliederverwaltung** | Excel-Tabellen, Papier | ❌ Keine Versionierung, fehleranfällig |
| **Match-Verwaltung** | Zettelwirtschaft, WhatsApp | ❌ Verlust von Daten, keine Historie |
| **Live-Scoring** | Kreide, Papier, manuelle Eintragung | ❌ Keine digitale Erfassung, keine Statistiken |
| **Termine** | WhatsApp-Gruppen, Excel | ❌ Unübersichtlich, keine Zusagen-Verwaltung |
| **Terminfindung** | Doodle (extern), WhatsApp-Umfragen | ❌ Mehrere Tools, keine Integration |
| **Beiträge** | Excel, Kontoauszüge | ❌ Manuelle Abgleiche, fehleranfällig |
| **Statistiken** | Nicht vorhanden oder manuell | ❌ Zeitaufwändig, ungenau |
| **Kommunikation** | WhatsApp, E-Mail (zersplittert) | ❌ Informationen gehen verloren |

### 2.2 SOLL-Zustand (Ziel)

| **Bereich** | **Geplanter Zustand** | **Nutzen** |
|---|---|---|
| **Mitgliederverwaltung** | Zentrale Datenbank, Rollen, Teams | ✅ Single Source of Truth, DSGVO-konform |
| **Match-Verwaltung** | Digitale Erfassung, Historie | ✅ Vollständige Nachvollziehbarkeit |
| **Live-Scoring** | Einzelwurf-Erfassung, Echtzeitstatistiken | ✅ Professionelle Datengrundlage |
| **Termine** | Kalender mit Zu-/Absagen, iCal-Export | ✅ Übersichtlich, automatische Erinnerungen |
| **Terminfindung** | Integriertes Doodle-System | ✅ Alles in einer App |
| **Beiträge** | Digitale Übersicht, Mahnwesen | ✅ Transparenz, weniger Aufwand |
| **Statistiken** | Automatisch berechnet, exportierbar | ✅ Datenbasierte Entscheidungen |
| **Kommunikation** | Push-Notifications, In-App-Ankündigungen | ✅ Zentral, kein Informationsverlust |

### 2.3 Gap-Analyse

**Muss entwickelt werden:**

1. ✅ Multi-Tenancy-System (Mandantenfähigkeit)
2. ✅ Authentifizierung & Autorisierung
3. ✅ Mitgliederverwaltung inkl. Rollensystem
4. ✅ Match-Engine mit Live-Scoring (Einzelwurf)
5. ✅ Statistik-Berechnungen
6. ✅ Termin-Management
7. ✅ Terminfindungs-System
8. ✅ Beitragsverwaltung
9. ✅ Push-Notification-System
10. ✅ PDF-Export (Match-Reports)

**Kann integriert werden (externe Services):**

- iCal-Export (Standard-Protokoll)
- Payment-Provider (später für automatische Beiträge)

---

## 3. TECHNOLOGIE-STACK & BEGRÜNDUNGEN

### 3.1 Backend: Spring Boot

**Entscheidung:** Spring Boot 3.2+ mit Java 21

**Begründungen:**

| **Aspekt** | **Begründung** |
|---|---|
| **Maturity** | Bewährt, stabile APIs, große Community |
| **Skalierbarkeit** | Hervorragend für Multi-Tenancy, hohe Last |
| **Sicherheit** | Spring Security sehr ausgereift (JWT, OAuth2, RLS) |
| **Ökosystem** | Hibernate/JPA, Spring Data, Testcontainers |
| **Team-Skill** | Java-Expertise im Team vorhanden |
| **Long-Term-Support** | Enterprise-ready, lange Wartungszyklen |

**Alternativen & warum abgelehnt:**

- ❌ **NestJS/TypeScript**: Weniger ausgereift für Enterprise, Type-Safety schwächer
- ❌ **Django/Python**: Nicht optimal für Realtime (WebSockets)
- ❌ **Go**: Kleineres Ökosystem, steile Lernkurve

### 3.2 Frontend: React + TypeScript

**Entscheidung:** React 18+ mit TypeScript 5+

**Begründungen:**

| **Aspekt** | **Begründung** |
|---|---|
| **Community** | Größte Frontend-Community weltweit |
| **Markt** | Beste Job-Chancen für Entwickler |
| **Type-Safety** | TypeScript verhindert Laufzeitfehler |
| **Ökosystem** | Riesiges Ökosystem an Libraries |
| **Performance** | Vite: Schnellste Build-Performance |
| **Web-First** | Optimiert für Web-Anwendungen |
| **PWA-fähig** | Progressive Web App möglich |

**Alternativen & warum abgelehnt:**

- ❌ **Flutter**: Schwerere Bundles für Web, weniger Web-optimiert
- ❌ **Angular**: Steile Lernkurve, kleinere Community
- ❌ **Vue**: Kleinere Community, weniger Enterprise-Einsatz

### 3.3 Datenbank: PostgreSQL 15+

**Entscheidung:** PostgreSQL 16 mit Row Level Security (RLS)

**Begründungen:**

| **Aspekt** | **Begründung** |
|---|---|
| **Multi-Tenancy** | RLS für org_id-basierte Isolation perfekt |
| **Skalierbarkeit** | Millionen Rows kein Problem, Partitionierung möglich |
| **JSON-Support** | JSONB für flexible Felder (Branding, Metadata) |
| **Transaktionen** | ACID-Garantien für kritische Match-Daten |
| **Tooling** | pgAdmin, DBeaver, Migrations (Flyway/Liquibase) |
| **Open Source** | Kein Vendor-Lock-in, kostenlos |

**Alternativen & warum abgelehnt:**

- ❌ **MySQL**: RLS nicht vorhanden, weniger Features
- ❌ **MongoDB**: Keine Transaktionen (vor v4), Schema-lose Struktur riskant für Finanzdaten
- ❌ **SQLite**: Nicht für Multi-User-Szenarien geeignet

### 3.4 Deployment & Infrastructure

| **Komponente** | **Technologie** | **Begründung** |
|---|---|---|
| **Containerisierung** | Docker | Standard, einfache lokale Entwicklung |
| **Orchestrierung** | Docker Compose (Dev/Staging) | Simpel, ausreichend für MVP |
| **CI/CD** | GitHub Actions | Kostenlos, gute Integration, YAML-Config |
| **Hosting** | Hetzner Cloud (initial) | Preis/Leistung, EU-DSGVO, schnell provisioniert |
| **Reverse Proxy** | Caddy | Automatisches HTTPS, einfache Config |
| **File Storage** | MinIO (S3-kompatibel) | Selbst-gehostet, günstig, später zu AWS S3 migrierbar |
| **Monitoring** | Prometheus + Grafana | Open Source, Industrie-Standard |
| **Logging** | Loki + Grafana | Strukturierte Logs, gute Query-Sprache |
| **Error Tracking** | Sentry (SaaS) | Kostenlos bis 5k Events/Monat, beste UX |

### 3.5 Zusätzliche Libraries & Tools

**Backend:**

```xml
<!-- Spring Boot Dependencies -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>

<!-- PDF Generation -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext7-core</artifactId>
    <version>8.0.2</version>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <scope>test</scope>
</dependency>
```

**Frontend:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "@reduxjs/toolkit": "^2.2.1",
    "react-redux": "^9.1.0",
    "axios": "^1.6.8",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "@typescript-eslint/eslint-plugin": "^7.1.1",
    "@typescript-eslint/parser": "^7.1.1",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.6",
    "vitest": "^1.3.1"
  }
}
```

---

## 4. SYSTEM-ARCHITEKTUR

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                        │
├─────────────────────────────────────────────────────────┤
│          React Web App (Browser - Desktop/Mobile)       │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTPS/REST + WebSocket
                   ▼
┌─────────────────────────────────────────────────────────┐
│                     API GATEWAY                          │
│                (Caddy Reverse Proxy)                     │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                       │
├─────────────────────────────────────────────────────────┤
│           Spring Boot Backend (REST API)                 │
│  ├─ REST Controllers                                     │
│  ├─ Service Layer (Business Logic)                      │
│  ├─ Security (JWT, RLS)                                 │
│  ├─ WebSocket (Live-Scoring)                            │
│  └─ Background Jobs (Statistics, Notifications)         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                     DATA LAYER                           │
├─────────────────────────────────────────────────────────┤
│         PostgreSQL 16 (Primary Database)                 │
│  ├─ Organizations (Mandanten)                            │
│  ├─ Users, Members, Teams                               │
│  ├─ Matches, Legs, Throws                               │
│  ├─ Events, Polls, Fees                                 │
│  └─ Row Level Security (org_id)                         │
│                                                          │
│    MinIO (S3-Compatible Object Storage)                  │
│  └─ Logos, Documents, Match-Reports (PDFs)              │
└─────────────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                       │
├─────────────────────────────────────────────────────────┤
│  Sentry (Error Tracking)                                 │
│  Prometheus/Grafana (Monitoring)                         │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Backend-Architektur (Spring Boot Layered)

```
src/main/java/com/dartclub/
├── config/
│   ├── SecurityConfig.java        # JWT, CORS, Security
│   ├── WebSocketConfig.java       # WebSocket für Live-Scoring
│   └── AsyncConfig.java           # Async Tasks
│
├── controller/
│   ├── AuthController.java        # Login, Register
│   ├── OrganizationController.java # Vereinsverwaltung
│   ├── MemberController.java      # Mitglieder CRUD
│   ├── TeamController.java        # Teams CRUD
│   ├── MatchController.java       # Match-Management
│   ├── ScoringController.java     # Live-Scoring (WebSocket)
│   ├── EventController.java       # Termine
│   ├── PollController.java        # Terminfindung
│   ├── FeeController.java         # Beitragsverwaltung
│   └── StatisticsController.java  # Statistiken
│
├── service/
│   ├── AuthService.java
│   ├── OrganizationService.java
│   ├── MemberService.java
│   ├── MatchService.java
│   ├── ScoringEngine.java         # Wurf-Validierung, Punkteberechnung
│   ├── StatisticsService.java     # Average, Checkout-%, etc.
│   ├── NotificationService.java   # Push-Notifications
│   └── PdfService.java            # PDF-Generierung
│
├── repository/
│   ├── OrganizationRepository.java
│   ├── UserRepository.java
│   ├── MemberRepository.java
│   ├── TeamRepository.java
│   ├── MatchRepository.java
│   ├── LegRepository.java
│   ├── ThrowRepository.java
│   ├── EventRepository.java
│   ├── PollRepository.java
│   └── FeeRepository.java
│
├── model/
│   ├── entity/
│   │   ├── Organization.java
│   │   ├── User.java
│   │   ├── Member.java
│   │   ├── Team.java
│   │   ├── Match.java
│   │   ├── Set.java
│   │   ├── Leg.java
│   │   ├── Throw.java
│   │   ├── Event.java
│   │   ├── Poll.java
│   │   └── Fee.java
│   │
│   ├── dto/
│   │   ├── request/
│   │   └── response/
│   │
│   └── enums/
│       ├── Role.java
│       ├── MatchStatus.java
│       └── EventType.java
│
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   ├── OrgScopeFilter.java        # org_id Enforcement
│   └── CustomUserDetailsService.java
│
└── exception/
    ├── GlobalExceptionHandler.java
    ├── ResourceNotFoundException.java
    └── UnauthorizedException.java
```

### 4.3 Frontend-Architektur (React Feature-First)

```
frontend/src/
├── main.tsx                       # App-Einstiegspunkt
├── App.tsx                        # Haupt-Komponente, Routing
│
├── components/                    # Wiederverwendbare UI-Komponenten
│   ├── ui/                        # Basis-Komponenten
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   │
│   └── layout/                    # Layout-Komponenten
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── features/                      # Feature-basierte Struktur
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── authSlice.ts           # Redux State
│   │   └── authApi.ts             # API Calls
│   │
│   ├── dashboard/
│   │   └── DashboardScreen.tsx
│   │
│   ├── members/
│   │   ├── MemberListScreen.tsx
│   │   ├── MemberDetailScreen.tsx
│   │   ├── MemberFormScreen.tsx
│   │   └── membersSlice.ts
│   │
│   ├── teams/
│   │   ├── TeamListScreen.tsx
│   │   ├── TeamFormScreen.tsx
│   │   └── teamsSlice.ts
│   │
│   ├── matches/
│   │   ├── MatchListScreen.tsx
│   │   ├── MatchDetailScreen.tsx
│   │   ├── MatchFormScreen.tsx
│   │   ├── LiveScoringScreen.tsx
│   │   └── matchesSlice.ts
│   │
│   ├── events/
│   │   ├── EventListScreen.tsx
│   │   ├── EventFormScreen.tsx
│   │   └── eventsSlice.ts
│   │
│   ├── polls/
│   │   ├── PollListScreen.tsx
│   │   ├── PollFormScreen.tsx
│   │   └── pollsSlice.ts
│   │
│   ├── fees/
│   │   ├── FeeListScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   └── feesSlice.ts
│   │
│   └── statistics/
│       ├── PlayerStatsScreen.tsx
│       ├── TeamStatsScreen.tsx
│       └── statisticsSlice.ts
│
├── lib/                           # Utilities & Services
│   ├── api/
│   │   ├── client.ts              # Axios Instance
│   │   └── endpoints.ts           # API Endpoints
│   │
│   └── utils/
│       ├── validators.ts
│       ├── formatters.ts
│       └── constants.ts
│
├── hooks/                         # Custom React Hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── store/                         # Redux Store
│   ├── store.ts                   # Store Configuration
│   └── rootReducer.ts             # Root Reducer
│
├── types/                         # TypeScript Types
│   ├── api.ts                     # API Response Types
│   ├── models.ts                  # Domain Models
│   └── index.ts
│
└── styles/                        # Global Styles
    └── index.css                  # Tailwind CSS Imports
```

---

## 5. DATENMODELL

### 5.1 ER-Diagramm (konzeptionell)

```
┌──────────────┐     ┌──────────────┐
│Organization │◄────┬───│ User         │
└──────────────┘     │   └──────────────┘
        │            │            │
        │            │            │
        │     ┌──────┴────────┐   │
        │     │ Membership    │◄──┘
        │     └───────────────┘
        │
        ├────►┌──────────────┐
        │     │ Member       │
        │     └──────────────┘
        │            │
        │            │
        ├────►┌──────────────┐
        │     │ Team         │◄──────┐
        │     └──────────────┘       │
        │            │               │
        │            │               │
        ├────►┌──────────────┐       │
        │     │ Match        │───────┤
        │     └──────────────┘       │
        │            │               │
        │            ▼               │
        │     ┌──────────────┐       │
        │     │ Set          │       │
        │     └──────────────┘       │
        │            │               │
        │            ▼               │
        │     ┌──────────────┐       │
        │     │ Leg          │───────┘
        │     └──────────────┘
        │            │
        │            ▼
        │     ┌──────────────┐
        │     │ Throw        │
        │     └──────────────┘
        │
        ├────►┌──────────────┐
        │     │ Event        │
        │     └──────────────┘
        │            │
        │            ▼
        │     ┌──────────────┐
        │     │ EventPart.   │
        │     └──────────────┘
        │
        ├────►┌──────────────┐
        │     │ Poll         │
        │     └──────────────┘
        │            │
        │            ├──►┌──────────────┐
        │            │   │ PollOption   │
        │            │   └──────────────┘
        │            │            │
        │            │            ▼
        │            └──►┌──────────────┐
        │                │ PollVote     │
        │                └──────────────┘
        │
        └────►┌──────────────┐
              │ Fee          │
              └──────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ FeePayment   │
              └──────────────┘
```

### 5.2 PostgreSQL Schema (Kern-Tabellen)

Das vollständige Datenbankschema befindet sich in `docs/database_schema.md`. Hier die wichtigsten Tabellen:

```sql
-- Core: Organizations & Users
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    primary_color VARCHAR(7) DEFAULT '#1976D2',
    secondary_color VARCHAR(7) DEFAULT '#424242',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE memberships (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'trainer', 'captain', 'player')),
    status VARCHAR(50) DEFAULT 'active',
    joined_at DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, org_id)
);

-- Members & Teams
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    birthdate DATE,
    license_no VARCHAR(50),
    handedness VARCHAR(10) CHECK (handedness IN ('left', 'right')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    season VARCHAR(20),
    captain_id UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches & Scoring
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    home_team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    away_team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    match_date TIMESTAMP NOT NULL,
    venue VARCHAR(255),
    league VARCHAR(100),
    match_type VARCHAR(50) DEFAULT 'league',
    status VARCHAR(50) DEFAULT 'scheduled',
    home_sets INTEGER DEFAULT 0,
    away_sets INTEGER DEFAULT 0,
    starting_score INTEGER DEFAULT 501,
    double_out BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE throws (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    leg_id UUID NOT NULL REFERENCES legs(id) ON DELETE CASCADE,
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    throw_no INTEGER NOT NULL,
    dart1_multiplier INTEGER CHECK (dart1_multiplier BETWEEN 0 AND 3),
    dart1_segment INTEGER CHECK (dart1_segment BETWEEN 1 AND 25),
    dart1_score INTEGER DEFAULT 0,
    dart2_multiplier INTEGER CHECK (dart2_multiplier BETWEEN 0 AND 3),
    dart2_segment INTEGER CHECK (dart2_segment BETWEEN 1 AND 25),
    dart2_score INTEGER DEFAULT 0,
    dart3_multiplier INTEGER CHECK (dart3_multiplier BETWEEN 0 AND 3),
    dart3_segment INTEGER CHECK (dart3_segment BETWEEN 1 AND 25),
    dart3_score INTEGER DEFAULT 0,
    throw_total INTEGER NOT NULL DEFAULT 0,
    remaining_score INTEGER NOT NULL,
    is_bust BOOLEAN DEFAULT FALSE,
    is_checkout BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. DESIGN-KONZEPT

### 6.1 Design-Prinzipien

| **Prinzip** | **Beschreibung** |
|---|---|
| **Mandantenfähigkeit** | Jeder Verein hat eigenes Branding (Logo, Farben) |
| **Web-First** | Optimiert für Desktop & Mobile Browser |
| **Accessibility** | Mindestens WCAG 2.1 Level AA (Kontraste, Fonts) |
| **Offline-Ready** | Service Worker für Offline-Funktionalität (PWA) |
| **Dark Mode** | Automatisch je nach System-Einstellung |
| **Responsive** | Funktioniert auf Desktop, Tablet & Mobile |

### 6.2 Farbschema (Standard-Theme)

**Primary Colors:**
- **Primary**: #1976D2 (Material Blue 700)
- **Primary Light**: #63A4FF
- **Primary Dark**: #004BA0

**Secondary Colors:**
- **Secondary**: #FF6F00 (Orange 800)
- **Secondary Light**: #FFA040
- **Secondary Dark**: #C43E00

**Neutral Colors:**
- **Background**: #FAFAFA (Light Mode) / #121212 (Dark Mode)
- **Surface**: #FFFFFF (Light) / #1E1E1E (Dark)
- **Error**: #D32F2F
- **Success**: #388E3C
- **Warning**: #F57C00

### 6.3 Typography

**Font:** Inter (Google Fonts) - Moderner Sans-Serif

| **Element** | **Font Size** | **Weight** | **Usage** |
|---|---|---|---|
| H1 | 32px | Bold | Seiten-Titel |
| H2 | 24px | Semi-Bold | Sektionen |
| H3 | 20px | Medium | Cards, Listen-Header |
| Body1 | 16px | Regular | Standard-Text |
| Body2 | 14px | Regular | Sekundär-Text |
| Caption | 12px | Regular | Labels, Timestamps |
| Button | 14px | Medium (Uppercase) | Buttons |

### 6.4 UI-Komponenten (React + Tailwind CSS)

**Buttons:**

```tsx
// Primary Button (für Hauptaktionen)
<button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
  Speichern
</button>

// Secondary Button (für sekundäre Aktionen)
<button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary-light">
  Abbrechen
</button>

// Text Button (für tertiäre Aktionen)
<button className="text-primary px-4 py-2 hover:underline">
  Mehr erfahren
</button>
```

**Cards:**

```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
  <h3 className="text-xl font-semibold mb-2">Titel</h3>
  <p className="text-gray-600 dark:text-gray-300">Inhalt...</p>
</div>
```

**Lists:**

```tsx
<div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
    H
  </div>
  <div className="ml-4 flex-1">
    <h4 className="font-medium">Hans Hahn</h4>
    <p className="text-sm text-gray-500">Captain • Lizenz: 12345</p>
  </div>
  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
</div>
```

### 6.5 Navigation

**Desktop Navigation (Sidebar):**

```
┌────────┬───────────────────────────┐
│ Logo   │                           │
│        │                           │
│ Home   │    Content Area           │
│ Teams  │                           │
│ Matches│                           │
│ Events │                           │
│ Fees   │                           │
│ Stats  │                           │
│ Profile│                           │
└────────┴───────────────────────────┘
```

**Mobile Navigation (Bottom Bar):**

```
┌─────────────────────────────────────┐
│                                     │
│         Content Area                │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Teams] [Matches] [Profile]  │
└─────────────────────────────────────┘
```

### 6.6 Screen-Layouts (Key Screens)

**Login Screen:**

```tsx
function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img src="/logo.svg" alt="Logo" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Anmelden</h2>
        </div>
        
        <form className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="E-Mail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Passwort"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
          >
            Anmelden
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Noch kein Konto? <a href="/register" className="text-primary hover:underline">Registrieren</a>
        </p>
      </div>
    </div>
  );
}
```

**Match List Screen:**

```tsx
function MatchListScreen() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Matches</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          + Neues Match
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Match Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Falcons vs Eagles</h3>
              <p className="text-gray-500 text-sm mt-1">29.09.2025 • 19:00</p>
              <p className="text-gray-500 text-sm">🏆 Kreisliga A</p>
            </div>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              ⚡ LIVE
            </span>
          </div>
        </div>
        
        {/* Weitere Match Cards... */}
      </div>
    </div>
  );
}
```

**Live Scoring Screen:**

```tsx
function LiveScoringScreen() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Match Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-center text-2xl font-bold mb-2">Set 1, Leg 3</h2>
        <div className="flex justify-center items-center space-x-4 text-3xl">
          <span>🏠 Falcons</span>
          <span className="font-bold">2 : 1</span>
          <span>✈️ Eagles</span>
        </div>
      </div>
      
      {/* Current Player */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">🏠 Hans Hahn</h3>
        <p className="text-4xl font-bold text-primary mb-2">Restpunkte: 301</p>
        <p className="text-gray-600">Letzter Wurf: T20, T20, 20 (140)</p>
      </div>
      
      {/* Dart Input */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-medium mb-4">Wurf eingeben:</h4>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium">T20</button>
          <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium">T19</button>
          <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium">T18</button>
          <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium">D20</button>
          <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium">D19</button>
          <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium">D18</button>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-red-500 text-white py-3 rounded-md font-medium">
            BUST
          </button>
          <button className="flex-1 bg-green-500 text-white py-3 rounded-md font-medium">
            ✓ LEG GEWONNEN
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. FEATURE-SPEZIFIKATION

### 7.1 Authentifizierung & Autorisierung

**Funktionen:**
- ✅ Registrierung (E-Mail + Passwort)
- ✅ Login (JWT-Token)
- ✅ Passwort vergessen (E-Mail-Reset)
- ✅ Refresh-Token (Auto-Logout nach 7 Tagen)
- ✅ Vereinsauswahl nach Login

**Rollen:**

| **Rolle** | **Berechtigungen** |
|---|---|
| **Admin** | Alle Rechte (Mitglieder, Teams, Matches, Beiträge, Einstellungen) |
| **Trainer** | Mitglieder verwalten, Teams verwalten, Matches anlegen, Statistiken |
| **Captain** | Aufstellungen festlegen, Matches starten, Live-Scoring |
| **Player** | Eigene Daten sehen, Termine zu-/absagen, Statistiken ansehen |

### 7.2 Mitgliederverwaltung

**User Stories:**
- Als Admin kann ich Mitglieder anlegen, bearbeiten und löschen
- Als Admin kann ich Rollen zuweisen (Admin, Trainer, Captain, Player)
- Als Admin kann ich Mitglieder zu Teams zuordnen
- Als Admin kann ich Mitgliederliste exportieren (CSV)
- Als Mitglied kann ich mein Profil bearbeiten

**Datenfelder:**
- Vorname, Nachname (Pflicht)
- E-Mail, Telefon
- Geburtsdatum
- Lizenznummer
- Handedness (Links/Rechts-Werfer)
- Notizen (Freitext)

### 7.3 Team-Management

**User Stories:**
- Als Admin/Trainer kann ich Teams erstellen und bearbeiten
- Als Admin/Trainer kann ich Spieler zu Teams zuordnen
- Als Admin/Trainer kann ich Captain festlegen
- Als Captain kann ich Aufstellungen für Matches definieren

**Datenfelder:**
- Teamname (Pflicht)
- Saison (z.B. "2024/25")
- Captain (Auswahl aus Mitgliedern)
- Mitglieder (Multi-Select)

### 7.4 Match-Management

**User Stories:**
- Als Admin/Trainer kann ich Matches anlegen
- Als Captain kann ich Aufstellung festlegen
- Als Scorer kann ich Live-Scoring durchführen
- Als User kann ich Match-Historie ansehen
- Als Admin kann ich Match-Reports als PDF exportieren

**Datenfelder:**
- Heim-Team, Gast-Team (Pflicht)
- Datum, Uhrzeit (Pflicht)
- Ort/Halle
- Liga/Wettbewerb
- Match-Typ (Liga, Freundschaftsspiel, Pokal)
- Best-of-Sets, Best-of-Legs
- Startpunkte (301, 501, 701)
- Double-Out (Ja/Nein)

**Match-Status:**
- **Scheduled**: Geplant, noch nicht gestartet
- **Live**: Läuft gerade
- **Finished**: Abgeschlossen
- **Cancelled**: Abgesagt

### 7.5 Live-Scoring (Einzelwurf-Erfassung)

**User Stories:**
- Als Scorer kann ich Würfe eintragen (Dart 1, 2, 3)
- Als Scorer kann ich Bust markieren
- Als Scorer kann ich Leg als gewonnen markieren
- Als Scorer sehe ich Live-Statistiken (Average, Checkout-Quote)
- Als Zuschauer kann ich Live-Scoring verfolgen (Read-Only)

**Funktionen:**
- ✅ Wurf-Eingabe (Tastatur oder Dartboard-Grafik)
- ✅ Automatische Punkteberechnung
- ✅ Bust-Erkennung
- ✅ Checkout-Erkennung (Double-Out)
- ✅ Event-Detection (180, 171, 140+, High-Checkout)
- ✅ Live-Statistiken (Average, Checkout-%, Doppel-%)
- ✅ Wurf-Historie anzeigen

**Validierungen:**
- Restpunkte dürfen nicht negativ werden
- Checkout nur mit Double
- Bust bei Restpunkten < 2 oder Überwerfen ohne Double

### 7.6 Statistiken

**User Stories:**
- Als Spieler kann ich meine persönlichen Statistiken sehen
- Als Trainer kann ich Team-Statistiken analysieren
- Als Admin kann ich Statistiken exportieren (CSV)

**Metriken:**

**Pro Spieler:**
- Matches gespielt, gewonnen, verloren (W/L)
- Legs gewonnen/verloren
- 3-Dart-Average (Ø Score pro 3 Darts)
- Checkout-Quote (Erfolgreiche Checkouts / Versuche)
- Doppel-Quote (Doppel-Treffer / Doppel-Versuche)
- Anzahl 180er, 171er, 140+
- Höchster Checkout
- Best-Leg (wenigste Darts)
- Formkurve (letzte 5/10 Matches)

**Pro Team:**
- Matches gespielt, gewonnen, verloren
- Punkte (bei Liga-Betrieb)
- Team-Average
- Top-Scorer (höchster Ø-Average im Team)

### 7.7 Terminverwaltung

**User Stories:**
- Als Admin/Trainer kann ich Trainingstermine anlegen
- Als Spieler kann ich zu-/absagen
- Als Spieler kann ich Termine in meinen Kalender exportieren (iCal)
- Als Admin/Trainer sehe ich, wer zugesagt hat

**Datenfelder:**
- Titel (z.B. "Training Kreisliga")
- Datum, Uhrzeit (Start & Ende)
- Ort/Halle
- Kapazität (max. Teilnehmer)
- Beschreibung

**Status:**
- **Yes**: Zugesagt
- **No**: Abgesagt
- **Maybe**: Vielleicht
- **Pending**: Noch nicht beantwortet

### 7.8 Terminfindung (Doodle-Style)

**User Stories:**
- Als Admin/Trainer kann ich Umfrage erstellen (3-5 Terminvorschläge)
- Als Spieler kann ich abstimmen
- Als Admin/Trainer sehe ich Ergebnis (welcher Termin die meisten Stimmen hat)
- Als Admin/Trainer kann ich Termin aus Umfrage übernehmen

**Datenfelder:**
- Titel (z.B. "Wann passt Training?")
- Beschreibung
- Terminoptionen (Datum + Uhrzeit)
- Deadline (bis wann abstimmen)

### 7.9 Beitragsverwaltung

**User Stories:**
- Als Admin kann ich Beitragssätze definieren (Jahresbeitrag, Monatsbeitrag)
- Als Admin kann ich Zahlungen manuell erfassen
- Als Admin sehe ich, wer bezahlt hat und wer nicht
- Als Admin kann ich Mahnliste exportieren
- Als Mitglied sehe ich meinen Beitragsstatus

**Datenfelder:**
- Beitragsart (Name, z.B. "Jahresbeitrag Erwachsene")
- Betrag (€)
- Periode (Jährlich, Monatlich, Einmalig)
- Fälligkeitsdatum
- Zahlungsdatum (falls bezahlt)
- Zahlungsmethode (Bar, Überweisung, Lastschrift)
- Status (Offen, Bezahlt, Überfällig)

---

## 8. SPRINT-PLANUNG

### 8.1 Sprint-Übersicht (16 Wochen)

| **Sprint** | **Wochen** | **Fokus** | **Story Points** |
|---|---|---|---|
| **Sprint 0** | 1-2 | Setup, Architektur | 0 (Keine User Stories) |
| **Sprint 1** | 3-4 | Auth & Multi-Tenancy | 21 |
| **Sprint 2** | 5-6 | Mitglieder & Teams | 26 |
| **Sprint 3** | 7-8 | Match-Management Basic | 24 |
| **Sprint 4** | 9-10 | Live-Scoring | 34 (komplex!) |
| **Sprint 5** | 11-12 | Termine & Terminfindung | 21 |
| **Sprint 6** | 13-14 | Beitragsverwaltung | 18 |
| **Sprint 7** | 15-16 | Statistiken & Polish | 26 |

**Gesamt: ~170 Story Points über 7 Sprints (Ø 24 SP/Sprint)**

### 8.2 SPRINT 0: Setup & Architektur (Woche 1-2)

**Ziel:** Entwicklungsumgebung aufsetzen, Architektur finalisieren

**Tasks:**

**Backend (Spring Boot):**
- Spring Boot Projekt initialisieren (Spring Initializr)
- PostgreSQL via Docker Compose
- Flyway Migrations Setup
- Security Config (JWT)
- Base Entity Classes (Organization, User)
- Health Check Endpoint (/actuator/health)

**Frontend (React):**
- React Projekt initialisieren (Vite + TypeScript)
- Ordnerstruktur (Feature-First)
- Redux Toolkit Setup
- React Router Setup
- Axios API Service
- Tailwind CSS Setup

**DevOps:**
- GitHub Repository erstellen
- Branching-Strategy (main, develop, feature/*)
- GitHub Actions CI/CD Pipeline
  - Backend: Build, Test, Lint
  - Frontend: Build, Test, Lint
- Docker Compose für lokale Entwicklung
- README.md mit Setup-Anleitung

**Definition of Done:**
- ✅ Jeder Dev kann Projekt lokal starten
- ✅ Backend läuft auf localhost:8080
- ✅ Frontend läuft auf localhost:5173
- ✅ PostgreSQL läuft und ist erreichbar
- ✅ CI/CD Pipeline läuft grün

### 8.3 SPRINT 1: Auth & Multi-Tenancy (Woche 3-4)

**Sprint Goal:** User kann sich registrieren, einloggen und Verein auswählen

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-1.1 | Als neuer User kann ich mich registrieren (E-Mail + Passwort) | 5 | MUST |
| US-1.2 | Als User kann ich mich einloggen und erhalte JWT-Token | 5 | MUST |
| US-1.3 | Als Admin kann ich einen neuen Verein anlegen | 3 | MUST |
| US-1.4 | Als User sehe ich nach Login Vereinsauswahl (wenn in mehreren Vereinen) | 3 | MUST |
| US-1.5 | Als Admin kann ich Vereinsbranding festlegen (Name, Logo, Farben) | 5 | SHOULD |

**Gesamt: 21 Story Points**

**Technische Tasks:**
- User Entity + Repository
- Organization Entity + Repository
- Membership Entity (User ↔ Organization)
- JWT Token Provider
- Auth Controller (Register, Login, Refresh)
- Security Filter (JWT Validation)
- org_id Context (ThreadLocal oder Request-Scope)
- React: Login Screen
- React: Register Screen
- React: Org Selector Screen
- React: Auth Slice (Redux)
- React: Protected Routes

### 8.4 SPRINT 2: Mitglieder & Teams (Woche 5-6)

**Sprint Goal:** Admin kann Mitglieder und Teams verwalten

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-2.1 | Als Admin kann ich Mitglieder anlegen (Vorname, Nachname, E-Mail, etc.) | 5 | MUST |
| US-2.2 | Als Admin kann ich Mitglieder bearbeiten und löschen | 3 | MUST |
| US-2.3 | Als Admin kann ich Rollen zuweisen (Admin, Trainer, Captain, Player) | 3 | MUST |
| US-2.4 | Als Admin kann ich Mitgliederliste sehen und filtern | 3 | MUST |
| US-2.5 | Als Admin kann ich Teams erstellen (Name, Saison, Captain) | 5 | MUST |
| US-2.6 | Als Admin kann ich Spieler zu Teams zuordnen | 5 | MUST |
| US-2.7 | Als Admin kann ich Mitgliederliste als CSV exportieren | 2 | NICE |

**Gesamt: 26 Story Points**

**Technische Tasks:**
- Member Entity + Repository
- Team Entity + Repository
- TeamMember Relation
- Member Controller (CRUD)
- Team Controller (CRUD)
- CSV Export Service
- React: Member List Screen
- React: Member Form Screen (Add/Edit)
- React: Member Detail Screen
- React: Team List Screen
- React: Team Form Screen

### 8.5 SPRINT 3: Match-Management Basic (Woche 7-8)

**Sprint Goal:** Admin/Trainer kann Matches anlegen und Aufstellungen festlegen

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-3.1 | Als Admin/Trainer kann ich Match anlegen (Teams, Datum, Ort, Liga) | 5 | MUST |
| US-3.2 | Als Captain kann ich Aufstellung festlegen (welcher Spieler auf Position) | 8 | MUST |
| US-3.3 | Als User kann ich Match-Liste sehen (kommende & vergangene) | 3 | MUST |
| US-3.4 | Als User kann ich Match-Details ansehen (Teams, Aufstellung, Ergebnis) | 5 | MUST |
| US-3.5 | Als Admin kann ich Match bearbeiten oder löschen | 3 | SHOULD |

**Gesamt: 24 Story Points**

### 8.6 SPRINT 4: Live-Scoring (Woche 9-10)

**Sprint Goal:** Live-Scoring mit Einzelwurf-Erfassung funktioniert

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-4.1 | Als Scorer kann ich Match starten und Live-Scoring-Screen öffnen | 5 | MUST |
| US-4.2 | Als Scorer kann ich Wurf eintragen (Dart 1, 2, 3) | 13 | MUST (komplex!) |
| US-4.3 | Als Scorer kann ich Bust markieren | 3 | MUST |
| US-4.4 | Als Scorer kann ich Leg als gewonnen markieren (Checkout) | 5 | MUST |
| US-4.5 | Als Scorer sehe ich Live-Statistiken (Average, Checkout-Quote) | 5 | MUST |
| US-4.6 | Als Zuschauer kann ich Live-Scoring verfolgen (Read-Only) | 3 | NICE |

**Gesamt: 34 Story Points** (höchster Sprint wegen Komplexität!)

### 8.7 SPRINT 5: Termine & Terminfindung (Woche 11-12)

**Sprint Goal:** Terminkalender und Terminfindung (Doodle-Style) funktionieren

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-5.1 | Als Admin/Trainer kann ich Trainingstermine anlegen | 5 | MUST |
| US-5.2 | Als Spieler kann ich zu-/absagen | 3 | MUST |
| US-5.3 | Als Admin/Trainer sehe ich, wer zugesagt hat | 3 | MUST |
| US-5.4 | Als Spieler erhalte ich Push-Notification bei neuem Termin | 3 | SHOULD |
| US-5.5 | Als Admin/Trainer kann ich Terminfindung (Poll) erstellen | 5 | MUST |
| US-5.6 | Als Spieler kann ich bei Poll abstimmen | 2 | MUST |

**Gesamt: 21 Story Points**

### 8.8 SPRINT 6: Beitragsverwaltung (Woche 13-14)

**Sprint Goal:** Admin kann Beiträge verwalten und Zahlungen erfassen

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-6.1 | Als Admin kann ich Beitragssätze definieren (Name, Betrag, Periode) | 5 | MUST |
| US-6.2 | Als Admin kann ich Zahlungen manuell erfassen | 5 | MUST |
| US-6.3 | Als Admin sehe ich Übersicht: Wer hat bezahlt, wer nicht? | 5 | MUST |
| US-6.4 | Als Admin kann ich Mahnliste exportieren (CSV) | 3 | SHOULD |

**Gesamt: 18 Story Points**

### 8.9 SPRINT 7: Statistiken & Polish (Woche 15-16)

**Sprint Goal:** Statistiken anzeigen, Bugs fixen, App polieren

**User Stories:**

| **ID** | **Story** | **Story Points** | **Priorität** |
|---|---|---|---|
| US-7.1 | Als Spieler sehe ich meine persönlichen Statistiken | 8 | MUST |
| US-7.2 | Als Trainer sehe ich Team-Statistiken | 5 | MUST |
| US-7.3 | Als Admin kann ich Match-Report als PDF exportieren | 5 | MUST |
| US-7.4 | Als User kann ich zwischen Light/Dark Mode wechseln | 2 | NICE |
| US-7.5 | Bug-Fixing & Performance-Optimierung | 6 | MUST |

**Gesamt: 26 Story Points**

---

## 9. USER STORIES

### 9.1 Template für User Stories

```
**ID:** US-X.Y
**Titel:** [Kurzbeschreibung]

**Als** [Rolle]
**möchte ich** [Funktionalität]
**damit** [Nutzen/Ziel]

**Akzeptanzkriterien:**
- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3

**Story Points:** X
**Priorität:** MUST / SHOULD / NICE
**Sprint:** X
**Abhängigkeiten:** US-X.Y (falls vorhanden)
```

### 9.2 Beispiel-User-Story (detailliert)

**ID:** US-4.2  
**Titel:** Live-Scoring: Wurf eintragen

**Als** Scorer  
**möchte ich** einen Wurf (3 Darts) eintragen  
**damit** die Restpunkte automatisch berechnet werden und Statistiken erfasst werden

**Akzeptanzkriterien:**

- Scorer sieht aktuellen Spieler und Restpunkte
- Scorer kann Wurf eintragen:
  - Option 1: Tastatur-Eingabe (z.B. "T20" für Triple 20)
  - Option 2: Dartboard-Grafik (Tap auf Segment)
- Pro Dart wird Score berechnet:
  - Single: 1× Segment-Wert
  - Double: 2× Segment-Wert
  - Triple: 3× Segment-Wert
  - Bull: 25 (Single), 50 (Double)
- Nach 3 Darts: Gesamtscore wird angezeigt (z.B. "140")
- Scorer bestätigt Wurf → Restpunkte werden aktualisiert
- Wurf wird in DB gespeichert (throws-Tabelle)
- Bei 180 (T20-T20-T20): Automatisch Event "180" erstellt
- Bei Bust: Button "BUST" setzt Restpunkte zurück
- Bei Checkout: Leg wird beendet, Gewinner markiert

**Technische Details:**

- Endpoint: `POST /api/matches/{matchId}/legs/{legId}/throws`
- Request Body:

```json
{
  "member_id": "uuid",
  "dart1": { "multiplier": 3, "segment": 20 },
  "dart2": { "multiplier": 3, "segment": 20 },
  "dart3": { "multiplier": 1, "segment": 20 },
  "is_bust": false
}
```

- Response:

```json
{
  "throw_id": "uuid",
  "throw_total": 140,
  "remaining_score": 361,
  "is_checkout": false,
  "events": ["140_plus"]
}
```

**Story Points:** 13 (komplex wegen Logik!)  
**Priorität:** MUST  
**Sprint:** 4  
**Abhängigkeiten:** US-4.1 (Match starten)

---

## 10. IMPLEMENTIERUNGS-SNIPPETS

### 10.1 Backend (Spring Boot)

#### 10.1.1 JWT Token Provider

```java
package com.dartclub.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private Long jwtExpiration; // 24h in milliseconds
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    
    public String generateToken(UUID userId, UUID orgId, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);
        
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("org_id", orgId.toString())
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }
    
    public UUID getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return UUID.fromString(claims.getSubject());
    }
    
    public UUID getOrgIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return UUID.fromString(claims.get("org_id", String.class));
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

#### 10.1.2 Scoring Engine (Wurf-Validierung)

```java
package com.dartclub.service;

import com.dartclub.model.entity.Leg;
import com.dartclub.model.entity.Throw;
import org.springframework.stereotype.Service;

@Service
public class ScoringEngine {
    
    public ThrowResult processThrow(Leg leg, Throw throwData) {
        // Berechne Score pro Dart
        int dart1Score = calculateDartScore(throwData.getDart1Multiplier(), throwData.getDart1Segment());
        int dart2Score = calculateDartScore(throwData.getDart2Multiplier(), throwData.getDart2Segment());
        int dart3Score = calculateDartScore(throwData.getDart3Multiplier(), throwData.getDart3Segment());
        
        throwData.setDart1Score(dart1Score);
        throwData.setDart2Score(dart2Score);
        throwData.setDart3Score(dart3Score);
        
        int throwTotal = dart1Score + dart2Score + dart3Score;
        throwData.setThrowTotal(throwTotal);
        
        int newRemainingScore = throwData.getRemainingScore() - throwTotal;
        
        // Bust-Check (Double-Out)
        if (leg.isDoubleOut()) {
            if (newRemainingScore < 0 || newRemainingScore == 1) {
                // Bust!
                throwData.setIsBust(true);
                throwData.setRemainingScore(throwData.getRemainingScore()); // Punkte bleiben
                return new ThrowResult(throwData, false, false);
            }
            
            // Checkout-Check (muss mit Double enden)
            if (newRemainingScore == 0 && isDouble(throwData.getDart3Multiplier())) {
                throwData.setIsCheckout(true);
                throwData.setRemainingScore(0);
                return new ThrowResult(throwData, true, false);
            }
        } else {
            // Kein Double-Out
            if (newRemainingScore < 0) {
                throwData.setIsBust(true);
                throwData.setRemainingScore(throwData.getRemainingScore());
                return new ThrowResult(throwData, false, false);
            }
            
            if (newRemainingScore == 0) {
                throwData.setIsCheckout(true);
                throwData.setRemainingScore(0);
                return new ThrowResult(throwData, true, false);
            }
        }
        
        throwData.setRemainingScore(newRemainingScore);
        return new ThrowResult(throwData, false, false);
    }
    
    private int calculateDartScore(int multiplier, int segment) {
        if (multiplier == 0) return 0; // Miss
        if (segment == 25) {
            // Bull
            return multiplier == 2 ? 50 : 25; // Double Bull = 50, Single Bull = 25
        }
        return multiplier * segment;
    }
    
    private boolean isDouble(int multiplier) {
        return multiplier == 2;
    }
    
    // Event-Detection
    public String detectEvent(Throw throwData) {
        int total = throwData.getThrowTotal();
        if (total == 180) return "180";
        if (total == 171) return "171";
        if (total >= 140) return "140_plus";
        if (throwData.getIsCheckout() && throwData.getDart3Score() >= 100) {
            return "high_checkout";
        }
        return null;
    }
    
    public static class ThrowResult {
        private Throw throwData;
        private boolean isCheckout;
        private boolean isBust;
        
        public ThrowResult(Throw throwData, boolean isCheckout, boolean isBust) {
            this.throwData = throwData;
            this.isCheckout = isCheckout;
            this.isBust = isBust;
        }
        
        // Getters
        public Throw getThrowData() { return throwData; }
        public boolean isCheckout() { return isCheckout; }
        public boolean isBust() { return isBust; }
    }
}
```

### 10.2 Frontend (React + TypeScript)

#### 10.2.1 API Client (Axios Setup)

```typescript
// src/lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor für JWT-Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor für Fehlerbehandlung
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token abgelaufen → Logout
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### 10.2.2 Auth Slice (Redux Toolkit)

```typescript
// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../lib/api/client';

interface User {
  id: string;
  email: string;
  displayName?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,
};

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Token speichern
      localStorage.setItem('auth_token', token);
      
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login fehlgeschlagen');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password, displayName }: { email: string; password: string; displayName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post('/auth/register', { email, password, displayName });
      const { token, user } = response.data;
      
      localStorage.setItem('auth_token', token);
      
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registrierung fehlgeschlagen');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('auth_token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

#### 10.2.3 Live Scoring Screen

```tsx
// src/features/matches/LiveScoringScreen.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Dart {
  multiplier: number;
  segment: number;
  score: number;
}

export function LiveScoringScreen() {
  const { matchId } = useParams<{ matchId: string }>();
  const [currentThrow, setCurrentThrow] = useState<Dart[]>([]);
  const [remainingScore, setRemainingScore] = useState(501);
  
  const addDart = (multiplier: number, segment: number) => {
    if (currentThrow.length < 3) {
      const score = multiplier * segment;
      setCurrentThrow([...currentThrow, { multiplier, segment, score }]);
    }
  };
  
  const submitThrow = async () => {
    if (currentThrow.length !== 3) return;
    
    try {
      const response = await apiClient.post(`/matches/${matchId}/throws`, {
        darts: currentThrow,
      });
      
      setRemainingScore(response.data.remaining_score);
      setCurrentThrow([]);
    } catch (error) {
      console.error('Fehler beim Wurf:', error);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Match Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-center text-2xl font-bold mb-2">Set 1, Leg 3</h2>
        <div className="flex justify-center items-center space-x-4 text-3xl">
          <span>🏠 Falcons</span>
          <span className="font-bold">2 : 1</span>
          <span>✈️ Eagles</span>
        </div>
      </div>
      
      {/* Current Player */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">🏠 Hans Hahn</h3>
        <p className="text-4xl font-bold text-blue-600 mb-2">
          Restpunkte: {remainingScore}
        </p>
        <p className="text-gray-600">
          Aktueller Wurf: {currentThrow.map(d => d.score).join(', ')}
        </p>
      </div>
      
      {/* Dart Input */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-medium mb-4">Wurf eingeben:</h4>
        
        {/* Quick Select Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => addDart(3, 20)}
            className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
          >
            T20
          </button>
          <button
            onClick={() => addDart(3, 19)}
            className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
          >
            T19
          </button>
          <button
            onClick={() => addDart(3, 18)}
            className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
          >
            T18
          </button>
          <button
            onClick={() => addDart(2, 20)}
            className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
          >
            D20
          </button>
          <button
            onClick={() => addDart(2, 19)}
            className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
          >
            D19
          </button>
          <button
            onClick={() => addDart(2, 18)}
            className="bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
          >
            D18
          </button>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={submitThrow}
            disabled={currentThrow.length !== 3}
            className="flex-1 bg-green-500 text-white py-3 rounded-md font-medium disabled:opacity-50"
          >
            WURF BESTÄTIGEN
          </button>
          <button
            onClick={() => setCurrentThrow([])}
            className="flex-1 bg-red-500 text-white py-3 rounded-md font-medium"
          >
            ZURÜCKSETZEN
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 11. TESTING-STRATEGIE

### 11.1 Testing-Pyramide

```
      ┌─────────┐
      │  E2E    │ ← 10% (Happy Path, kritische Flows)
      └─────────┘
   ┌─────────────┐
   │ Integration │ ← 30% (API + DB, Auth)
   └─────────────┘
┌───────────────────┐
│   Unit Tests      │ ← 60% (Business Logic, Validierung)
└───────────────────┘
```

### 11.2 Backend-Testing (Spring Boot)

**Unit Tests:**
- Service-Layer (ScoringEngine, StatisticsService)
- Validatoren
- JWT Token Provider

**Integration Tests:**
- Controller + Repository (mit Testcontainers)
- Auth-Flow (Login, Register)
- RLS-Enforcement (org_id)

**Beispiel (Unit Test - ScoringEngine):**

```java
package com.dartclub.service;

import com.dartclub.model.entity.Leg;
import com.dartclub.model.entity.Throw;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ScoringEngineTest {
    
    private final ScoringEngine scoringEngine = new ScoringEngine();
    
    @Test
    void testNormalThrow() {
        Leg leg = new Leg();
        leg.setStartingScore(501);
        leg.setDoubleOut(true);
        
        Throw throwData = new Throw();
        throwData.setRemainingScore(501);
        throwData.setDart1Multiplier(3);
        throwData.setDart1Segment(20); // T20
        throwData.setDart2Multiplier(3);
        throwData.setDart2Segment(20); // T20
        throwData.setDart3Multiplier(1);
        throwData.setDart3Segment(20); // 20
        
        ScoringEngine.ThrowResult result = scoringEngine.processThrow(leg, throwData);
        
        assertEquals(140, throwData.getThrowTotal());
        assertEquals(361, throwData.getRemainingScore());
        assertFalse(result.isBust());
        assertFalse(result.isCheckout());
    }
    
    @Test
    void testBust() {
        Leg leg = new Leg();
        leg.setDoubleOut(true);
        
        Throw throwData = new Throw();
        throwData.setRemainingScore(40);
        throwData.setDart1Multiplier(3);
        throwData.setDart1Segment(20); // T20 = 60 → Bust!
        
        ScoringEngine.ThrowResult result = scoringEngine.processThrow(leg, throwData);
        
        assertTrue(result.isBust());
        assertEquals(40, throwData.getRemainingScore()); // Punkte bleiben
    }
    
    @Test
    void testCheckout() {
        Leg leg = new Leg();
        leg.setDoubleOut(true);
        
        Throw throwData = new Throw();
        throwData.setRemainingScore(40);
        throwData.setDart1Multiplier(0);
        throwData.setDart1Segment(0); // Miss
        throwData.setDart2Multiplier(0);
        throwData.setDart2Segment(0); // Miss
        throwData.setDart3Multiplier(2);
        throwData.setDart3Segment(20); // D20 = 40 → Checkout!
        
        ScoringEngine.ThrowResult result = scoringEngine.processThrow(leg, throwData);
        
        assertTrue(result.isCheckout());
        assertEquals(0, throwData.getRemainingScore());
    }
}
```

### 11.3 Frontend-Testing (React + Vitest)

**Unit Tests:**
- Type Definitions & Interfaces
- Utility Functions
- Redux Slices

**Component Tests:**
- Einzelne UI-Komponenten
- State-Änderungen

**Integration Tests:**
- Komplette Flows (Login → Dashboard → Match)

**Beispiel (Component Test):**

```tsx
// src/features/auth/LoginScreen.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginScreen } from './LoginScreen';

describe('LoginScreen', () => {
  it('renders login form', () => {
    render(<LoginScreen />);
    
    expect(screen.getByPlaceholderText('E-Mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /anmelden/i })).toBeInTheDocument();
  });
  
  it('disables submit button when fields are empty', () => {
    render(<LoginScreen />);
    
    const submitButton = screen.getByRole('button', { name: /anmelden/i });
    expect(submitButton).toBeDisabled();
  });
  
  it('enables submit button when fields are filled', () => {
    render(<LoginScreen />);
    
    fireEvent.change(screen.getByPlaceholderText('E-Mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Passwort'), {
      target: { value: 'password123' },
    });
    
    const submitButton = screen.getByRole('button', { name: /anmelden/i });
    expect(submitButton).not.toBeDisabled();
  });
});
```

---

## 12. DEPLOYMENT-STRATEGIE

### 12.1 Umgebungen

| **Umgebung** | **Zweck** | **URL** | **Deployment** |
|---|---|---|---|
| **Development** | Lokale Entwicklung | localhost | Manuell (Docker Compose) |
| **Staging** | Testing, QA, Demo | staging.dartclub.app | Automatisch (Push auf develop) |
| **Production** | Live-System | dartclub.app | Manuell (Tag + Release) |

### 12.2 Docker Compose (lokal & Staging)

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: dartclub
      POSTGRES_USER: dartclub
      POSTGRES_PASSWORD: dartclub_dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dartclub"]
      interval: 10s
      timeout: 5s
      retries: 5
  
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/dartclub
      SPRING_DATASOURCE_USERNAME: dartclub
      SPRING_DATASOURCE_PASSWORD: dartclub_dev_password
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRATION: 86400000
    ports:
      - "8080:8080"
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
  
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
  
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: adminadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

### 12.3 Dockerfile (Backend)

```dockerfile
# backend/Dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts ./
COPY src src

RUN ./gradlew build -x test

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 12.4 Dockerfile (Frontend)

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 12.5 GitHub Actions CI/CD

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: dartclub_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      
      - name: Cache Gradle packages
        uses: actions/cache@v3
        with:
          path: ~/.gradle/caches
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*') }}
      
      - name: Build and Test
        working-directory: ./backend
        run: ./gradlew test
      
      - name: Build JAR
        working-directory: ./backend
        run: ./gradlew build -x test
  
  frontend-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Lint
        working-directory: ./frontend
        run: npm run lint
      
      - name: Test
        working-directory: ./frontend
        run: npm run test
      
      - name: Build
        working-directory: ./frontend
        run: npm run build
  
  deploy-staging:
    needs: [backend-test, frontend-test]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Staging
        run: |
          echo "Deploying to staging..."
          # TODO: SSH commands
  
  deploy-production:
    needs: [backend-test, frontend-test]
    if: startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Production
        run: |
          echo "Deploying to production..."
          # TODO: SSH commands
```

---

## 13. RISIKEN & MITIGATION

| **Risiko** | **Wahrscheinlichkeit** | **Impact** | **Mitigation** |
|---|---|---|---|
| **Scope Creep** | HOCH | HOCH | ✅ Strikte Backlog-Priorisierung, "NEIN" zu neuen Features im MVP |
| **Technische Komplexität (Live-Scoring)** | MITTEL | HOCH | ✅ Spike in Sprint 0, Prototyp bauen, früh testen |
| **Team-Kapazität** | MITTEL | MITTEL | ✅ Buffer einplanen (Sprint 7 = Polish), regelmäßige Retros |
| **Performance-Issues (DB)** | NIEDRIG | MITTEL | ✅ Indices auf org_id, Pagination, Caching |
| **Sicherheitslücken** | MITTEL | HOCH | ✅ SAST in CI/CD, Security-Review vor Prod-Deployment |
| **Hosting-Kosten** | NIEDRIG | NIEDRIG | ✅ Hetzner statt AWS spart 70%, Monitoring für Ressourcen |
| **Datenverlust** | NIEDRIG | HOCH | ✅ Tägliche Backups (pgBackRest), Restore-Tests monatlich |

---

## 14. ROADMAP

### 14.1 Phase 1: MVP (Monat 1-4)

**Ziel:** Funktionierendes Produkt für 3-5 Pilotvereine

| **Sprint** | **Wochen** | **Deliverables** |
|---|---|---|
| Sprint 0 | 1-2 | Setup, Architektur, CI/CD |
| Sprint 1 | 3-4 | Auth, Multi-Tenancy |
| Sprint 2 | 5-6 | Mitglieder, Teams |
| Sprint 3 | 7-8 | Match-Management |
| Sprint 4 | 9-10 | Live-Scoring |
| Sprint 5 | 11-12 | Termine, Terminfindung |
| Sprint 6 | 13-14 | Beitragsverwaltung |
| Sprint 7 | 15-16 | Statistiken, Polish, Launch |

### 14.2 Phase 2: Growth (Monat 5-8)

**Ziel:** 20+ Vereine, erweiterte Features

- ✅ **Turnier-Modus** (Bracket-Generator, Single/Double Elimination)
- ✅ **Erweiterte Statistiken** (Formkurven, Vergleiche)
- ✅ **In-App-Chat** (Team-Kommunikation)
- ✅ **Subdomain-Routing** (falcons.dartclub.app)
- ✅ **PDF-Verbesserungen** (Branding, Multi-Page-Reports)
- ✅ **Kalender-Integration** (Google Calendar, Outlook)
- ✅ **Multi-Language** (Englisch, Französisch, Niederländisch)

### 14.3 Phase 3: Scale (Monat 9-12)

**Ziel:** 50+ Vereine, Monetarisierung

- ✅ **Premium-Features** (Advanced Analytics, Video-Archiv)
- ✅ **White-Label** (komplett eigenes Branding pro Verein)
- ✅ **API für Drittanbieter** (Ligasoftware-Integration)
- ✅ **Automatische SEPA-Lastschrift** (Beitragsverwaltung)
- ✅ **Merchandising-Integration** (In-App-Shop)
- ✅ **Smart-Board-Integration** (elektronische Dartboards)

### 14.4 Phase 4: Diversification (Monat 12+)

**Ziel:** Multi-Sport-Plattform

- ✅ **Plugin-System** (andere Sportarten: Tischtennis, Billard, Bowling)
- ✅ **Franchise-Modell** (Verbände können White-Label nutzen)
- ✅ **Mobile-App** (Progressive Web App → Native App)

---

## 15. ANHANG

### 15.1 Glossar

| **Begriff** | **Beschreibung** |
|---|---|
| **Multi-Tenancy** | Ein System bedient mehrere Kunden (Vereine) isoliert |
| **RLS (Row Level Security)** | Datenbank-Feature, das Zugriff auf Zeilen einschränkt |
| **JWT (JSON Web Token)** | Token-basierte Authentifizierung |
| **501 Double-Out** | Dart-Spielmodus: Start bei 501, Checkout mit Double |
| **Bust** | Überwerfen im Dart (Restpunkte < 2 oder ungültiger Checkout) |
| **Checkout** | Letzter Wurf, der Leg beendet (muss mit Double enden) |
| **3-Dart-Average** | Durchschnittlicher Score pro 3 Darts |
| **Checkout-Quote** | Erfolgreiche Checkouts / Checkout-Versuche |
| **PWA (Progressive Web App)** | Web-App mit Offline-Funktionalität |

### 15.2 Kontakte & Ressourcen

- **Spring Boot Docs:** https://spring.io/projects/spring-boot
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Testcontainers:** https://www.testcontainers.org/
- **Sentry:** https://sentry.io
- **Hetzner Cloud:** https://www.hetzner.com/cloud

### 15.3 Lizenzierung

**Copyright:** Hans Hahn - Alle Rechte vorbehalten  
**Lizenz:** Proprietär (für kommerzielle Nutzung)

---

## 🎯 ZUSAMMENFASSUNG & NÄCHSTE SCHRITTE

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 2.0 (React-Edition)  
**Datum:** 30.09.2025
