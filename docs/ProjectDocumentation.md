# 🎯 DartClubManager - Vollständige Projektdokumentation

**Version:** 1.0  
**Stand:** 29.09.2025  
**Projektdauer:** 16 Wochen  
**Team:** 6 Entwickler  
**Owner:** Hans Hahn

Erstellt von Hans Hahn - Alle Rechte vorbehalten

---

## 📋 Inhaltsverzeichnis

1. [Executive Summary](#1-executive-summary)
2. [Projektteam und Rollen](#2-projektteam-und-rollen)
3. [Soll-Ist-Analyse](#3-soll-ist-analyse)
4. [Technologie-Stack & Begründungen](#4-technologie-stack--begründungen)
5. [System-Architektur](#5-system-architektur)
6. [Datenmodell](#6-datenmodell)
7. [Design-Konzept](#7-design-konzept)
8. [Feature-Spezifikation](#8-feature-spezifikation)
9. [Sprint-Planung](#9-sprint-planung)
10. [User Stories](#10-user-stories)
11. [Implementierungs-Snippets](#11-implementierungs-snippets)
12. [Testing-Strategie](#12-testing-strategie)
13. [Deployment-Strategie](#13-deployment-strategie)
14. [Risiken & Mitigation](#14-risiken--mitigation)
15. [Roadmap](#15-roadmap)
16. [Anhang](#16-anhang)

---

## 1. Executive Summary

### 1.1 Projektvision

Eine **mandantenfähige Mobile- und Web-Applikation** zur professionellen Verwaltung von Dartvereinen mit Fokus auf:

- **Mitgliederverwaltung** (zentrale Datenbank, DSGVO-konform)
- **Match-Management** mit Live-Scoring (Einzelwurf-Erfassung)
- **Terminverwaltung** & Terminfindung (integriertes Doodle-System)
- **Beitragsverwaltung** (digitale Übersicht, Mahnwesen)
- **Statistiken & Analytics** (automatisch berechnet, exportierbar)

### 1.2 Zielgruppe

- **Primär:** Dartvereine in Deutschland
- **Sekundär:** Hobby-Dart-Gruppen, Ligabetreiber
- **Später:** Internationale Vereine (Multi-Language)

### 1.3 Geschäftsziele

- ✅ **MVP in 16 Wochen** (4 Monate)
- ✅ **3-5 Pilotvereine** als Testnutzer gewinnen
- ✅ **Skalierbar auf 50+ Vereine** innerhalb 12 Monaten
- ✅ **White-Label-fähig** für andere Sportarten (Phase 2)

### 1.4 Erfolgsmetriken

- ✅ Funktionierendes Live-Scoring mit Einzelwurf-Erfassung
- ✅ Mindestens 30 aktive Nutzer im Pilotverein
- ✅ 90% Uptime im Produktivbetrieb
- ✅ <500ms API Response Time (P95)
- ✅ Positives Feedback von Vereinsvorständen

---

## 2. Projektteam und Rollen

| Rolle | Verantwortlich(e) | Hauptaufgaben |
|---|---|---|
| **Project Owner** | Hans Hahn | Produktvision, Anforderungsmanagement, Priorisierung |
| **Backend-Entwicklung** | Lukas, Dennis | Entwicklung der Spring Boot API, Business-Logik, Datenbank-Anbindung |
| **Frontend-Entwicklung** | Svenja, Francesco | Entwicklung der Flutter App (Mobile & Web), UI/UX Umsetzung |
| **Datenbank & DevOps** | David | Datenbankdesign, Migrationen, Performance, CI/CD |
| **Springer** | Frank | Unterstützt flexibel in allen Bereichen (Backend, Frontend, Testing) |

### Team-Velocity
- **Durchschnittlich:** 24 Story Points pro Sprint (2 Wochen)
- **Gesamt:** ~170 Story Points über 7 Sprints

---

## 3. Soll-Ist-Analyse

### 3.1 IST-Zustand (aktuell in Dartvereinen)

| Bereich | Aktueller Zustand | Probleme |
|---------|-------------------|----------|
| **Mitgliederverwaltung** | Excel-Tabellen, Papier | ❌ Keine Versionierung, fehleranfällig |
| **Match-Verwaltung** | Zettelwirtschaft, WhatsApp | ❌ Verlust von Daten, keine Historie |
| **Live-Scoring** | Kreide, Papier, manuelle Eintragung | ❌ Keine digitale Erfassung, keine Statistiken |
| **Termine** | WhatsApp-Gruppen, Excel | ❌ Unübersichtlich, keine Zusagen-Verwaltung |
| **Terminfindung** | Doodle (extern), WhatsApp-Umfragen | ❌ Mehrere Tools, keine Integration |
| **Beiträge** | Excel, Kontoauszüge | ❌ Manuelle Abgleiche, fehleranfällig |
| **Statistiken** | Nicht vorhanden oder manuell | ❌ Zeitaufwändig, ungenau |
| **Kommunikation** | WhatsApp, E-Mail (zersplittert) | ❌ Informationen gehen verloren |

### 3.2 SOLL-Zustand (Ziel)

| Bereich | Geplanter Zustand | Nutzen |
|---------|-------------------|--------|
| **Mitgliederverwaltung** | Zentrale Datenbank, Rollen, Teams | ✅ Single Source of Truth, DSGVO-konform |
| **Match-Verwaltung** | Digitale Erfassung, Historie | ✅ Vollständige Nachvollziehbarkeit |
| **Live-Scoring** | Einzelwurf-Erfassung, Echtzeitstatistiken | ✅ Professionelle Datengrundlage |
| **Termine** | Kalender mit Zu-/Absagen, iCal-Export | ✅ Übersichtlich, automatische Erinnerungen |
| **Terminfindung** | Integriertes Doodle-System | ✅ Alles in einer App |
| **Beiträge** | Digitale Übersicht, Mahnwesen | ✅ Transparenz, weniger Aufwand |
| **Statistiken** | Automatisch berechnet, exportierbar | ✅ Datenbasierte Entscheidungen |
| **Kommunikation** | Push-Notifications, In-App-Ankündigungen | ✅ Zentral, kein Informationsverlust |

### 3.3 Gap-Analyse

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

- Firebase Cloud Messaging (Push)
- iCal-Export (Standard-Protokoll)
- Payment-Provider (später für automatische Beiträge)

---

## 4. Technologie-Stack & Begründungen

### 4.1 Backend: Spring Boot

**Entscheidung:** Spring Boot 3.2+ mit Java 21

**Begründungen:**

| Aspekt | Begründung |
|--------|-----------|
| **Maturity** | Bewährt, stabile APIs, große Community |
| **Skalierbarkeit** | Hervorragend für Multi-Tenancy, hohe Last |
| **Sicherheit** | Spring Security sehr ausgereift (JWT, OAuth2, RLS) |
| **Ökosystem** | Hibernate/JPA, Spring Data, Testcontainers |
| **Team-Skill** | User-Präferenz: "ich persönlich würde das als spring projekt starten" |
| **Long-Term-Support** | Enterprise-ready, lange Wartungszyklen |

**Alternativen & warum abgelehnt:**

- ❌ **NestJS/TypeScript**: Weniger ausgereift für Enterprise, Type-Safety schwächer
- ❌ **Django/Python**: Nicht optimal für Realtime (WebSockets)
- ❌ **Go**: Kleineres Ökosystem, steile Lernkurve

### 4.2 Frontend: Flutter

**Entscheidung:** Flutter 3.24+ mit Dart

**Begründungen:**

| Aspekt | Begründung |
|--------|-----------|
| **Cross-Platform** | Eine Codebasis für iOS, Android, Web |
| **Performance** | Native Kompilierung, 60fps UI |
| **Hot Reload** | Schnelle Entwicklung, sofortiges Feedback |
| **Zukunftssicher** | Wachsende Community, Google-backed |
| **Offline-First** | Hive/SQLite-Integration sehr gut |
| **UI-Qualität** | Material Design & Cupertino out-of-the-box |

**Alternativen & warum abgelehnt:**

- ❌ **React Native**: Performance-Issues, Bridge-Overhead
- ❌ **Native (Swift/Kotlin)**: Doppelter Entwicklungsaufwand
- ❌ **PWA**: Eingeschränkte Native-Features (Offline, Push)

### 4.3 Datenbank: PostgreSQL 15+

**Entscheidung:** PostgreSQL 15 mit Row Level Security (RLS)

**Begründungen:**

| Aspekt | Begründung |
|--------|-----------|
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

### 4.4 Deployment & Infrastructure

| Komponente | Technologie | Begründung |
|-----------|-------------|-----------|
| **Containerisierung** | Docker | Standard, einfache lokale Entwicklung |
| **Orchestrierung** | Docker Compose (Dev/Staging) | Simpel, ausreichend für MVP |
| **CI/CD** | GitHub Actions | Kostenlos, gute Integration, YAML-Config |
| **Hosting** | Hetzner Cloud (initial) | Preis/Leistung, EU-DSGVO, schnell provisioniert |
| **Reverse Proxy** | Caddy | Automatisches HTTPS, einfache Config |
| **File Storage** | MinIO (S3-kompatibel) | Selbst-gehostet, günstig, später zu AWS S3 migrierbar |
| **Monitoring** | Prometheus + Grafana | Open Source, Industrie-Standard |
| **Logging** | Loki + Grafana | Strukturierte Logs, gute Query-Sprache |
| **Error Tracking** | Sentry (SaaS) | Kostenlos bis 5k Events/Monat, beste UX |

### 4.5 Zusätzliche Libraries & Tools

**Backend Dependencies:**

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

**Frontend Dependencies:**

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.4.9
  
  # Routing
  go_router: ^12.1.3
  
  # API Communication
  dio: ^5.4.0
  retrofit: ^4.0.3
  
  # Local Storage
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # Notifications
  firebase_messaging: ^14.7.6
  flutter_local_notifications: ^16.3.0
  
  # PDF
  pdf: ^3.10.7
  
  # Utils
  intl: ^0.18.1
  uuid: ^4.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  mockito: ^5.4.4
  build_runner: ^2.4.7
```

---

## 5. System-Architektur

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
├─────────────────────────────────────────────────────────┤
│  Flutter Mobile App (iOS/Android)                        │
│  Flutter Web App (Browser)                               │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTPS/REST + WebSocket
                   ▼
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY                            │
│              (Caddy Reverse Proxy)                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────┤
│  Spring Boot Backend (API)                               │
│  ├─ REST Controllers                                     │
│  ├─ Service Layer (Business Logic)                      │
│  ├─ Security (JWT, RLS)                                 │
│  ├─ WebSocket (Live-Scoring)                            │
│  └─ Background Jobs (Statistics, Notifications)         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                            │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL 15 (Primary Database)                        │
│  ├─ Organizations (Mandanten)                            │
│  ├─ Users, Members, Teams                                │
│  ├─ Matches, Legs, Throws                                │
│  ├─ Events, Polls, Fees                                  │
│  └─ Row Level Security (org_id)                          │
│                                                           │
│  MinIO (S3-Compatible Object Storage)                    │
│  └─ Logos, Documents, Match-Reports (PDFs)               │
└─────────────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES                        │
├─────────────────────────────────────────────────────────┤
│  Firebase Cloud Messaging (Push Notifications)           │
│  Sentry (Error Tracking)                                 │
│  Prometheus/Grafana (Monitoring)                         │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Backend-Architektur (Spring Boot Layered)

```
src/main/java/com/dartclub/
├── config/
│   ├── SecurityConfig.java          # JWT, CORS, Security
│   ├── WebSocketConfig.java         # WebSocket für Live-Scoring
│   └── AsyncConfig.java             # Async Tasks
│
├── controller/
│   ├── AuthController.java          # Login, Register
│   ├── OrganizationController.java  # Vereinsverwaltung
│   ├── MemberController.java        # Mitglieder CRUD
│   ├── TeamController.java          # Teams CRUD
│   ├── MatchController.java         # Match-Management
│   ├── ScoringController.java       # Live-Scoring (WebSocket)
│   ├── EventController.java         # Termine
│   ├── PollController.java          # Terminfindung
│   ├── FeeController.java           # Beitragsverwaltung
│   └── StatisticsController.java    # Statistiken
│
├── service/
│   ├── AuthService.java
│   ├── OrganizationService.java
│   ├── MemberService.java
│   ├── MatchService.java
│   ├── ScoringEngine.java           # Wurf-Validierung, Punkteberechnung
│   ├── StatisticsService.java       # Average, Checkout-%, etc.
│   ├── NotificationService.java     # Push-Notifications
│   └── PdfService.java              # PDF-Generierung
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
│   ├── OrgScopeFilter.java          # org_id Enforcement
│   └── CustomUserDetailsService.java
│
└── exception/
    ├── GlobalExceptionHandler.java
    ├── ResourceNotFoundException.java
    └── UnauthorizedException.java
```

### 5.3 Frontend-Architektur (Flutter Feature-First)

```
lib/
├── main.dart
├── app.dart                          # MaterialApp, Theme, Routing
│
├── core/
│   ├── config/
│   │   ├── app_config.dart          # API URLs, Constants
│   │   └── theme.dart               # Light/Dark Theme
│   ├── utils/
│   │   ├── validators.dart
│   │   └── formatters.dart
│   └── services/
│       ├── api_service.dart         # Dio/Retrofit Setup
│       ├── auth_service.dart        # JWT Storage, Refresh
│       ├── storage_service.dart     # Hive Local Storage
│       └── notification_service.dart
│
├── features/
│   ├── auth/
│   │   ├── presentation/
│   │   │   ├── login_screen.dart
│   │   │   └── register_screen.dart
│   │   ├── providers/
│   │   │   └── auth_provider.dart
│   │   └── models/
│   │       └── user_model.dart
│   │
│   ├── organization/
│   │   ├── presentation/
│   │   │   └── org_selector_screen.dart
│   │   ├── providers/
│   │   └── models/
│   │
│   ├── members/
│   │   ├── presentation/
│   │   │   ├── member_list_screen.dart
│   │   │   ├── member_detail_screen.dart
│   │   │   └── member_form_screen.dart
│   │   ├── providers/
│   │   └── models/
│   │
│   ├── teams/
│   │   ├── presentation/
│   │   ├── providers/
│   │   └── models/
│   │
│   ├── matches/
│   │   ├── presentation/
│   │   │   ├── match_list_screen.dart
│   │   │   ├── match_detail_screen.dart
│   │   │   ├── match_form_screen.dart
│   │   │   └── live_scoring_screen.dart
│   │   ├── providers/
│   │   │   ├── match_provider.dart
│   │   │   └── scoring_provider.dart
│   │   └── models/
│   │
│   ├── events/
│   │   ├── presentation/
│   │   ├── providers/
│   │   └── models/
│   │
│   ├── polls/
│   │   ├── presentation/
│   │   ├── providers/
│   │   └── models/
│   │
│   ├── fees/
│   │   ├── presentation/
│   │   ├── providers/
│   │   └── models/
│   │
│   └── statistics/
│       ├── presentation/
│       ├── providers/
│       └── models/
│
└── shared/
    ├── widgets/
    │   ├── custom_button.dart
    │   ├── loading_indicator.dart
    │   └── error_widget.dart
    └── models/
        └── api_response.dart
```

---

## 6. Datenmodell

### 6.1 ER-Diagramm (konzeptionell)

```
┌──────────────┐         ┌──────────────┐
│Organization │◄────┬───│     User     │
└──────────────┘     │   └──────────────┘
       │             │          │
       │      ┌──────┴──────┐   │
       │      │  Membership │◄──┘
       │      └─────────────┘
       │
       ├────►┌──────────────┐
       │     │    Member    │
       │     └──────────────┘
       │            │
       │            │
       ├────►┌──────────────┐
       │     │     Team     │◄──────┐
       │     └──────────────┘       │
       │            │               │
       │            │               │
       ├────►┌──────────────┐       │
       │     │    Match     │───────┤
       │     └──────────────┘       │
       │            │               │
       │            ▼               │
       │     ┌──────────────┐       │
       │     │     Set      │       │
       │     └──────────────┘       │
       │            │               │
       │            ▼               │
       │     ┌──────────────┐       │
       │     │     Leg      │───────┘
       │     └──────────────┘
       │            │
       │            ▼
       │     ┌──────────────┐
       │     │    Throw     │
       │     └──────────────┘
       │
       ├────►┌──────────────┐
       │     │    Event     │
       │     └──────────────┘
       │            │
       │            ▼
       │     ┌──────────────┐
       │     │  EventPart.  │
       │     └──────────────┘
       │
       ├────►┌──────────────┐
       │     │     Poll     │
       │     └──────────────┘
       │            │
       │            ├──►┌──────────────┐
       │            │   │  PollOption  │
       │            │   └──────────────┘
       │            │          │
       │            │          ▼
       │            └──►┌──────────────┐
       │                │   PollVote   │
       │                └──────────────┘
       │
       └────►┌──────────────┐
             │     Fee      │
             └──────────────┘
                    │
                    ▼
             ┌──────────────┐
             │ FeePayment   │
             └──────────────┘
```

### 6.2 PostgreSQL Schema (vollständig)

Das vollständige PostgreSQL-Schema mit allen Tabellen, Constraints, Indizes und Triggern ist in der separaten Datei **[database_schema.md](./database_schema.md)** dokumentiert.

**Kerntabellen:**

1. **organizations** - Vereine/Mandanten
2. **users** - Benutzer-Accounts
3. **memberships** - User ↔ Organization Mapping (mit Rollen)
4. **members** - Vereinsmitglieder
5. **teams** - Mannschaften
6. **team_members** - Team ↔ Member Mapping
7. **matches** - Spiele/Begegnungen
8. **sets** - Sets innerhalb eines Matches
9. **legs** - Legs innerhalb eines Sets
10. **throws** - Einzelne Würfe (Dart 1, 2, 3)
11. **match_events** - Besondere Events (180, High-Checkout, etc.)
12. **events** - Termine (Training, Meetings)
13. **event_participants** - Event ↔ Member Mapping (mit Zusage-Status)
14. **polls** - Terminfindungen (Doodle-Style)
15. **poll_options** - Terminoptionen einer Umfrage
16. **poll_votes** - Abstimmungen
17. **fees** - Beitragssätze
18. **fee_payments** - Zahlungen

**Multi-Tenancy via Row Level Security (RLS):**

Alle Tabellen haben eine `org_id` Spalte und nutzen PostgreSQL's RLS Feature, um sicherzustellen, dass Queries automatisch auf die Organisation des eingeloggten Users gefiltert werden.

---

## 7. Design-Konzept

### 7.1 Design-Prinzipien

| Prinzip | Beschreibung |
|---------|-------------|
| **Mandantenfähigkeit** | Jeder Verein hat eigenes Branding (Logo, Farben) |
| **Mobile-First** | Touch-optimiert, große Buttons, klare Hierarchie |
| **Accessibility** | Mindestens WCAG 2.1 Level AA (Kontraste, Fonts) |
| **Offline-First** | App funktioniert ohne Internet (Sync später) |
| **Dark Mode** | Automatisch je nach System-Einstellung |
| **Responsive** | Web-Version funktioniert auf Desktop & Tablet |

### 7.2 Farbschema (Standard-Theme)

**Primary Colors:**
- **Primary**: `#1976D2` (Material Blue 700)
- **Primary Light**: `#63A4FF`
- **Primary Dark**: `#004BA0`

**Secondary Colors:**
- **Secondary**: `#FF6F00` (Orange 800)
- **Secondary Light**: `#FFA040`
- **Secondary Dark**: `#C43E00`

**Neutral Colors:**
- **Background**: `#FAFAFA` (Light Mode) / `#121212` (Dark Mode)
- **Surface**: `#FFFFFF` (Light) / `#1E1E1E` (Dark)
- **Error**: `#D32F2F`
- **Success**: `#388E3C`
- **Warning**: `#F57C00`

### 7.3 Typography

**Font:** Roboto (Material Design Standard)

| Element | Font Size | Weight | Usage |
|---------|-----------|--------|-------|
| H1 | 32sp | Bold | Bildschirmtitel |
| H2 | 24sp | Semi-Bold | Sektionen |
| H3 | 20sp | Medium | Cards, Listen-Header |
| Body1 | 16sp | Regular | Standard-Text |
| Body2 | 14sp | Regular | Sekundär-Text |
| Caption | 12sp | Regular | Labels, Timestamps |
| Button | 14sp | Medium (Uppercase) | Buttons |

### 7.4 UI-Komponenten

**Buttons:**

```dart
// Primary Button (für Hauptaktionen)
ElevatedButton(
  onPressed: () {},
  child: Text('SPEICHERN'),
)

// Secondary Button (für sekundäre Aktionen)
OutlinedButton(
  onPressed: () {},
  child: Text('ABBRECHEN'),
)

// Text Button (für tertiäre Aktionen)
TextButton(
  onPressed: () {},
  child: Text('Mehr erfahren'),
)
```

**Cards:**

```dart
Card(
  elevation: 2,
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Titel', style: Theme.of(context).textTheme.titleLarge),
        SizedBox(height: 8),
        Text('Inhalt...'),
      ],
    ),
  ),
)
```

**Lists:**

```dart
ListTile(
  leading: CircleAvatar(child: Icon(Icons.person)),
  title: Text('Hans Hahn'),
  subtitle: Text('Captain • Lizenz: 12345'),
  trailing: Icon(Icons.chevron_right),
  onTap: () {},
)
```

### 7.5 Navigation

**Bottom Navigation Bar (Mobile):**

```
┌─────────────────────────────────────┐
│                                     │
│          [Content Area]             │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Teams] [Matches] [Profile]  │
└─────────────────────────────────────┘
```

**Drawer Navigation (Web):**

```
┌────────┬───────────────────────────┐
│ Home   │                           │
│ Teams  │      [Content Area]       │
│ Matches│                           │
│ Events │                           │
│ Fees   │                           │
│ Stats  │                           │
│ Profile│                           │
└────────┴───────────────────────────┘
```

### 7.6 Screen-Layouts (Key Screens)

**Login Screen:**

```
┌─────────────────────────────────┐
│          [Logo]                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ E-Mail                  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Passwort                │   │
│  └─────────────────────────┘   │
│                                 │
│       [ ANMELDEN ]              │
│                                 │
│  Noch kein Konto? Registrieren  │
└─────────────────────────────────┘
```

**Match List Screen:**

```
┌─────────────────────────────────┐
│  Matches              [+ Neu]   │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ Falcons vs Eagles         │  │
│  │ 29.09.2025 • 19:00        │  │
│  │ 🏆 Kreisliga A             │  │
│  │ ⚡ LIVE                    │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Hawks vs Panthers         │  │
│  │ 05.10.2025 • 18:30        │  │
│  │ 📅 Geplant                 │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Live Scoring Screen:**

```
┌─────────────────────────────────┐
│       Set 1, Leg 3              │
│  🏠 Falcons 2 : 1 Eagles ✈️      │
├─────────────────────────────────┤
│                                 │
│  🏠 Hans Hahn                    │
│  Restpunkte: 301                │
│  Letzter Wurf: T20, T20, 20     │
│  ═══════════════════════        │
│                                 │
│  ┌─────────────────────────┐   │
│  │   WURF EINGEBEN         │   │
│  │                         │   │
│  │  [T20] [T19] [T18]      │   │
│  │  [D20] [D19] [D18]      │   │
│  │  [20]  [19]  [18]       │   │
│  │                         │   │
│  │  [BUST] [FEHLWURF]      │   │
│  │  [✓ LEG GEWONNEN]       │   │
│  └─────────────────────────┘   │
│                                 │
│  ✈️ Peter Müller                │
│  Restpunkte: 257                │
│  ═══════════════════════        │
└─────────────────────────────────┘
```

**Player Statistics:**

```
┌─────────────────────────────────┐
│      Hans Hahn #7               │
│      📊 Statistiken              │
├─────────────────────────────────┤
│  Matches gespielt: 42           │
│  Gewonnen: 27 (64%)             │
│                                 │
│  3-Dart-Average: 89.34          │
│  Checkout-Quote: 45%            │
│  Doppel-Quote: 38%              │
│                                 │
│  🎯 Highlights                   │
│  180er: 12                      │
│  Höchster Checkout: 170         │
│  Bester Average: 107.82         │
│                                 │
│  📈 Form (letzte 5)              │
│  W-W-L-W-W                      │
└─────────────────────────────────┘
```

---

## 8. Feature-Spezifikation

### 8.1 Authentifizierung & Autorisierung

**Funktionen:**
- ✅ Registrierung (E-Mail + Passwort)
- ✅ Login (JWT-Token)
- ✅ Passwort vergessen (E-Mail-Reset)
- ✅ Refresh-Token (Auto-Logout nach 7 Tagen)
- ✅ Vereinsauswahl nach Login

**Rollen:**

| Rolle | Berechtigungen |
|-------|---------------|
| **Admin** | Alle Rechte (Mitglieder, Teams, Matches, Beiträge, Einstellungen) |
| **Trainer** | Mitglieder verwalten, Teams verwalten, Matches anlegen, Statistiken |
| **Captain** | Aufstellungen festlegen, Matches starten, Live-Scoring |
| **Player** | Eigene Daten sehen, Termine zu-/absagen, Statistiken ansehen |

### 8.2 Mitgliederverwaltung

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
- Notizen (freitext)

### 8.3 Team-Management

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

### 8.4 Match-Management

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

### 8.5 Live-Scoring (Einzelwurf-Erfassung)

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

### 8.6 Statistiken

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

### 8.7 Terminverwaltung

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

### 8.8 Terminfindung (Doodle-Style)

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

### 8.9 Beitragsverwaltung

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

## 9. Sprint-Planung

### 9.1 Sprint-Übersicht (16 Wochen)

| Sprint | Wochen | Fokus | Team-Velocity (Story Points) |
|--------|--------|-------|------------------------------|
| **Sprint 0** | 1-2 | Setup, Architektur | 0 (Keine User Stories) |
| **Sprint 1** | 3-4 | Auth & Multi-Tenancy | 21 |
| **Sprint 2** | 5-6 | Mitglieder & Teams | 26 |
| **Sprint 3** | 7-8 | Match-Management Basic | 24 |
| **Sprint 4** | 9-10 | Live-Scoring | 34 (komplex!) |
| **Sprint 5** | 11-12 | Termine & Terminfindung | 21 |
| **Sprint 6** | 13-14 | Beitragsverwaltung | 18 |
| **Sprint 7** | 15-16 | Statistiken & Polish | 26 |

**Gesamt: ~170 Story Points über 7 Sprints (Ø 24 SP/Sprint)**

### 9.2 SPRINT 0: Setup & Architektur (Woche 1-2)

**Ziel:** Entwicklungsumgebung aufsetzen, Architektur finalisieren

**Tasks:**

**Backend (Spring Boot):**
- Spring Boot Projekt initialisieren (Spring Initializr)
- PostgreSQL via Docker Compose
- Flyway Migrations Setup
- Security Config (JWT)
- Base Entity Classes (Organization, User)
- Health Check Endpoint (/actuator/health)

**Frontend (Flutter):**
- Flutter Projekt initialisieren
- Ordnerstruktur (Feature-First)
- Riverpod Setup
- go_router Setup
- API Service (Dio/Retrofit)
- Theme Setup (Light/Dark Mode)

**DevOps:**
- GitHub Repository erstellen
- Branching-Strategy (main, develop, feature/*)
- GitHub Actions CI/CD Pipeline
  - Backend: Build, Test, Lint
  - Frontend: Build, Test, Analyze
- Docker Compose für lokale Entwicklung
- README.md mit Setup-Anleitung

**Definition of Done:**
- ✅ Jeder Dev kann Projekt lokal starten
- ✅ Backend läuft auf localhost:8080
- ✅ Frontend läuft auf localhost:3000 (Web)
- ✅ PostgreSQL läuft und ist erreichbar
- ✅ CI/CD Pipeline läuft grün

### 9.3 SPRINT 1: Auth & Multi-Tenancy (Woche 3-4)

**Sprint Goal:** User kann sich registrieren, einloggen und Verein auswählen

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
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
- Flutter: Login Screen
- Flutter: Register Screen
- Flutter: Org Selector Screen
- Flutter: Auth Provider (Token Storage)

**Akzeptanzkriterien (US-1.2):**
- ✅ User kann E-Mail + Passwort eingeben
- ✅ Bei korrekten Credentials: JWT-Token wird zurückgegeben
- ✅ Bei falschen Credentials: Fehler "Ungültige Anmeldedaten"
- ✅ Token enthält user_id, org_id, role
- ✅ Token ist 24h gültig, Refresh-Token 7 Tage

### 9.4 SPRINT 2: Mitglieder & Teams (Woche 5-6)

**Sprint Goal:** Admin kann Mitglieder und Teams verwalten

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
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
- Flutter: Member List Screen
- Flutter: Member Form Screen (Add/Edit)
- Flutter: Member Detail Screen
- Flutter: Team List Screen
- Flutter: Team Form Screen

### 9.5 SPRINT 3: Match-Management Basic (Woche 7-8)

**Sprint Goal:** Admin/Trainer kann Matches anlegen und Aufstellungen festlegen

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
| US-3.1 | Als Admin/Trainer kann ich Match anlegen (Teams, Datum, Ort, Liga) | 5 | MUST |
| US-3.2 | Als Captain kann ich Aufstellung festlegen (welcher Spieler auf Position) | 8 | MUST |
| US-3.3 | Als User kann ich Match-Liste sehen (kommende & vergangene) | 3 | MUST |
| US-3.4 | Als User kann ich Match-Details ansehen (Teams, Aufstellung, Ergebnis) | 5 | MUST |
| US-3.5 | Als Admin kann ich Match bearbeiten oder löschen | 3 | SHOULD |

**Gesamt: 24 Story Points**

### 9.6 SPRINT 4: Live-Scoring (Woche 9-10)

**Sprint Goal:** Live-Scoring mit Einzelwurf-Erfassung funktioniert

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
| US-4.1 | Als Scorer kann ich Match starten und Live-Scoring-Screen öffnen | 5 | MUST |
| US-4.2 | Als Scorer kann ich Wurf eintragen (Dart 1, 2, 3) | 13 | MUST (komplex!) |
| US-4.3 | Als Scorer kann ich Bust markieren | 3 | MUST |
| US-4.4 | Als Scorer kann ich Leg als gewonnen markieren (Checkout) | 5 | MUST |
| US-4.5 | Als Scorer sehe ich Live-Statistiken (Average, Checkout-Quote) | 5 | MUST |
| US-4.6 | Als Zuschauer kann ich Live-Scoring verfolgen (Read-Only) | 3 | NICE |

**Gesamt: 34 Story Points** (höchster Sprint wegen Komplexität!)

**Technische Tasks:**
- Throw Entity + Repository
- MatchEvent Entity (180, 171, High-Checkout)
- ScoringEngine Service (Punkteberechnung, Bust-Logik, Checkout-Detection)
- StatisticsService (Average, Checkout-%, Doppel-%)
- WebSocket für Live-Updates (Optional: Polling reicht für MVP)
- Flutter: Live Scoring Screen
- Flutter: Wurf-Eingabe UI (Tastatur-Modus)
- Flutter: Live-Stats Widget
- Flutter: Wurf-Historie Widget

### 9.7 SPRINT 5: Termine & Terminfindung (Woche 11-12)

**Sprint Goal:** Terminkalender und Terminfindung (Doodle-Style) funktionieren

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
| US-5.1 | Als Admin/Trainer kann ich Trainingstermine anlegen | 5 | MUST |
| US-5.2 | Als Spieler kann ich zu-/absagen | 3 | MUST |
| US-5.3 | Als Admin/Trainer sehe ich, wer zugesagt hat | 3 | MUST |
| US-5.4 | Als Spieler erhalte ich Push-Notification bei neuem Termin | 3 | SHOULD |
| US-5.5 | Als Admin/Trainer kann ich Terminfindung (Poll) erstellen | 5 | MUST |
| US-5.6 | Als Spieler kann ich bei Poll abstimmen | 2 | MUST |

**Gesamt: 21 Story Points**

### 9.8 SPRINT 6: Beitragsverwaltung (Woche 13-14)

**Sprint Goal:** Admin kann Beiträge verwalten und Zahlungen erfassen

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
| US-6.1 | Als Admin kann ich Beitragssätze definieren (Name, Betrag, Periode) | 5 | MUST |
| US-6.2 | Als Admin kann ich Zahlungen manuell erfassen | 5 | MUST |
| US-6.3 | Als Admin sehe ich Übersicht: Wer hat bezahlt, wer nicht? | 5 | MUST |
| US-6.4 | Als Admin kann ich Mahnliste exportieren (CSV) | 3 | SHOULD |

**Gesamt: 18 Story Points**

### 9.9 SPRINT 7: Statistiken & Polish (Woche 15-16)

**Sprint Goal:** Statistiken anzeigen, Bugs fixen, App polieren

**User Stories:**

| ID | Story | Story Points | Priorität |
|----|-------|--------------|-----------|
| US-7.1 | Als Spieler sehe ich meine persönlichen Statistiken | 8 | MUST |
| US-7.2 | Als Trainer sehe ich Team-Statistiken | 5 | MUST |
| US-7.3 | Als Admin kann ich Match-Report als PDF exportieren | 5 | MUST |
| US-7.4 | Als User kann ich zwischen Light/Dark Mode wechseln | 2 | NICE |
| US-7.5 | Bug-Fixing & Performance-Optimierung | 6 | MUST |

**Gesamt: 26 Story Points**

---

## 10. User Stories

### 10.1 Template für User Stories

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

### 10.2 Beispiel-User-Stories (detailliert)

#### US-4.2: Live-Scoring - Wurf eintragen

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

Endpoint: `POST /api/matches/{matchId}/legs/{legId}/throws`

Request Body:
```json
{
  "member_id": "uuid",
  "dart1": { "multiplier": 3, "segment": 20 },
  "dart2": { "multiplier": 3, "segment": 20 },
  "dart3": { "multiplier": 1, "segment": 20 },
  "is_bust": false
}
```

Response:
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

#### US-5.5: Terminfindung erstellen (Doodle-Style)

**ID:** US-5.5  
**Titel:** Terminfindung erstellen (Doodle-Style)

**Als** Admin/Trainer  
**möchte ich** eine Terminfindung mit mehreren Optionen erstellen  
**damit** das Team abstimmen kann, welcher Termin am besten passt

**Akzeptanzkriterien:**

- Admin/Trainer öffnet "Neue Terminfindung"
- Formular enthält:
  - Titel (Pflicht, max. 255 Zeichen)
  - Beschreibung (Optional)
  - Terminoptionen (min. 2, max. 10)
    - Pro Option: Datum + Uhrzeit
    - Optional: Label (z.B. "Montag Abend")
  - Deadline (bis wann abstimmen?)
- Nach Speichern: Poll wird erstellt
- Team-Mitglieder erhalten Push-Notification
- Poll erscheint in "Umfragen"-Liste
- Admin/Trainer kann Poll jederzeit schließen
- Nach Schließen: Ergebnis wird angezeigt (Votes pro Option)

**Technische Details:**

Endpoint: `POST /api/polls`

Request Body:
```json
{
  "org_id": "uuid",
  "title": "Wann passt Training?",
  "description": "Bitte stimmt ab!",
  "options": [
    { "date": "2025-10-05T19:00:00Z", "label": "Montag Abend" },
    { "date": "2025-10-06T19:00:00Z", "label": "Dienstag Abend" },
    { "date": "2025-10-07T19:00:00Z", "label": "Mittwoch Abend" }
  ],
  "deadline": "2025-10-04T12:00:00Z"
}
```

**Story Points:** 5  
**Priorität:** MUST  
**Sprint:** 5  
**Abhängigkeiten:** Keine

---

## 11. Implementierungs-Snippets

### 11.1 Backend (Spring Boot)

#### JWT Token Provider

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

#### Organization Scope Filter (Multi-Tenancy)

```java
package com.dartclub.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.UUID;

@Component
public class OrgScopeFilter implements Filter {

    private final JwtTokenProvider tokenProvider;

    public OrgScopeFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = extractTokenFromRequest(httpRequest);

        if (token != null && tokenProvider.validateToken(token)) {
            UUID orgId = tokenProvider.getOrgIdFromToken(token);
            OrgContext.setCurrentOrgId(orgId);
        }

        try {
            chain.doFilter(request, response);
        } finally {
            OrgContext.clear();
        }
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

// ThreadLocal für org_id
class OrgContext {
    private static final ThreadLocal<UUID> currentOrgId = new ThreadLocal<>();

    public static void setCurrentOrgId(UUID orgId) {
        currentOrgId.set(orgId);
    }

    public static UUID getCurrentOrgId() {
        return currentOrgId.get();
    }

    public static void clear() {
        currentOrgId.remove();
    }
}
```

#### Scoring Engine (Wurf-Validierung)

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

### 11.2 Frontend (Flutter)

#### API Service (Dio Setup)

```dart
// lib/core/services/api_service.dart
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'auth_service.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: 'http://localhost:8080/api',
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
      headers: {
        'Content-Type': 'application/json',
      },
    ),
  );

  // Interceptor für JWT-Token
  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) async {
        final authService = ref.read(authServiceProvider);
        final token = await authService.getToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        // Refresh-Token-Logik bei 401
        if (error.response?.statusCode == 401) {
          // TODO: Token refresh
        }
        return handler.next(error);
      },
    ),
  );

  return dio;
});
```

#### Auth Provider (Riverpod)

```dart
// lib/features/auth/providers/auth_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import '../../../core/services/auth_service.dart';
import '../models/user_model.dart';

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref.read(dioProvider), ref.read(authServiceProvider));
});

class AuthNotifier extends StateNotifier<AuthState> {
  final Dio _dio;
  final AuthService _authService;

  AuthNotifier(this._dio, this._authService) : super(AuthState.unauthenticated());

  Future<void> login(String email, String password) async {
    state = AuthState.loading();
    try {
      final response = await _dio.post('/auth/login', data: {
        'email': email,
        'password': password,
      });

      final token = response.data['token'];
      final user = UserModel.fromJson(response.data['user']);

      await _authService.saveToken(token);
      state = AuthState.authenticated(user);
    } catch (e) {
      state = AuthState.error('Login fehlgeschlagen');
    }
  }

  Future<void> logout() async {
    await _authService.deleteToken();
    state = AuthState.unauthenticated();
  }
}

class AuthState {
  final bool isLoading;
  final bool isAuthenticated;
  final UserModel? user;
  final String? error;

  AuthState({
    required this.isLoading,
    required this.isAuthenticated,
    this.user,
    this.error,
  });

  factory AuthState.loading() => AuthState(isLoading: true, isAuthenticated: false);
  factory AuthState.authenticated(UserModel user) => AuthState(
        isLoading: false,
        isAuthenticated: true,
        user: user,
      );
  factory AuthState.unauthenticated() => AuthState(isLoading: false, isAuthenticated: false);
  factory AuthState.error(String message) => AuthState(
        isLoading: false,
        isAuthenticated: false,
        error: message,
      );
}
```

---

## 12. Testing-Strategie

### 12.1 Testing-Pyramide

```
       ┌─────────┐
       │   E2E   │  ← 10% (Happy Path, kritische Flows)
       └─────────┘
    ┌─────────────┐
    │ Integration │  ← 30% (API + DB, Auth)
    └─────────────┘
┌───────────────────┐
│    Unit Tests     │  ← 60% (Business Logic, Validierung)
└───────────────────┘
```

### 12.2 Backend-Testing (Spring Boot)

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

### 12.3 Frontend-Testing (Flutter)

**Unit Tests:**
- Models (fromJson, toJson)
- Validators
- Formatters

**Widget Tests:**
- Einzelne Widgets (Buttons, Cards, Forms)
- State-Änderungen

**Integration Tests:**
- Komplette Flows (Login → Dashboard → Match-Anlegen)

**Beispiel (Unit Test - Model):**

```dart
// test/features/auth/models/user_model_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:dartclub/features/auth/models/user_model.dart';

void main() {
  group('UserModel', () {
    test('fromJson should parse correctly', () {
      final json = {
        'id': '123e4567-e89b-12d3-a456-426614174000',
        'email': 'test@example.com',
        'displayName': 'Test User',
      };

      final user = UserModel.fromJson(json);

      expect(user.id, '123e4567-e89b-12d3-a456-426614174000');
      expect(user.email, 'test@example.com');
      expect(user.displayName, 'Test User');
    });

    test('toJson should serialize correctly', () {
      final user = UserModel(
        id: '123',
        email: 'test@example.com',
        displayName: 'Test User',
      );

      final json = user.toJson();

      expect(json['id'], '123');
      expect(json['email'], 'test@example.com');
      expect(json['displayName'], 'Test User');
    });
  });
}
```

---

## 13. Deployment-Strategie

### 13.1 Umgebungen

| Umgebung | Zweck | URL | Deployment |
|----------|-------|-----|------------|
| **Development** | Lokale Entwicklung | localhost | Manuell (Docker Compose) |
| **Staging** | Testing, QA, Demo | staging.dartclub.app | Automatisch (Push auf develop) |
| **Production** | Live-System | dartclub.app | Manuell (Tag + Release) |

### 13.2 Docker Compose (lokal & Staging)

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
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
      - "3000:80"
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

### 13.3 Dockerfile (Backend)

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

### 13.4 GitHub Actions CI/CD

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
        image: postgres:15-alpine
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
      
      - name: Set up Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
      
      - name: Install dependencies
        working-directory: ./frontend
        run: flutter pub get
      
      - name: Analyze
        working-directory: ./frontend
        run: flutter analyze
      
      - name: Test
        working-directory: ./frontend
        run: flutter test
      
      - name: Build Web
        working-directory: ./frontend
        run: flutter build web --release

  deploy-staging:
    needs: [backend-test, frontend-test]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Staging
        run: |
          # SSH to staging server and pull/restart
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
          # SSH to production server and pull/restart
          echo "Deploying to production..."
          # TODO: SSH commands
```

---

## 14. Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|-----------|
| **Scope Creep** | HOCH | HOCH | ✅ Strikte Backlog-Priorisierung, "NEIN" zu neuen Features im MVP |
| **Technische Komplexität (Live-Scoring)** | MITTEL | HOCH | ✅ Spike in Sprint 0, Prototyp bauen, früh testen |
| **Team-Kapazität** | MITTEL | MITTEL | ✅ Buffer einplanen (Sprint 7 = Polish), regelmäßige Retros |
| **Performance-Issues (DB)** | NIEDRIG | MITTEL | ✅ Indices auf org_id, Pagination, Caching |
| **Sicherheitslücken** | MITTEL | HOCH | ✅ SAST in CI/CD, Security-Review vor Prod-Deployment |
| **Hosting-Kosten** | NIEDRIG | NIEDRIG | ✅ Hetzner statt AWS spart 70%, Monitoring für Ressourcen |
| **Datenverlust** | NIEDRIG | HOCH | ✅ Tägliche Backups (pgBackRest), Restore-Tests monatlich |

---

## 15. Roadmap

### 15.1 Phase 1: MVP (Monat 1-4)

**Ziel:** Funktionierendes Produkt für 3-5 Pilotvereine

| Sprint | Wochen | Deliverables |
|--------|--------|--------------|
| Sprint 0 | 1-2 | Setup, Architektur, CI/CD |
| Sprint 1 | 3-4 | Auth, Multi-Tenancy |
| Sprint 2 | 5-6 | Mitglieder, Teams |
| Sprint 3 | 7-8 | Match-Management |
| Sprint 4 | 9-10 | Live-Scoring |
| Sprint 5 | 11-12 | Termine, Terminfindung |
| Sprint 6 | 13-14 | Beitragsverwaltung |
| Sprint 7 | 15-16 | Statistiken, Polish, Launch |

### 15.2 Phase 2: Growth (Monat 5-8)

**Ziel:** 20+ Vereine, erweiterte Features

- ✅ **Turnier-Modus** (Bracket-Generator, Single/Double Elimination)
- ✅ **Erweiterte Statistiken** (Formkurven, Vergleiche)
- ✅ **In-App-Chat** (Team-Kommunikation)
- ✅ **Subdomain-Routing** (falcons.dartclub.app)
- ✅ **PDF-Verbesserungen** (Branding, Multi-Page-Reports)
- ✅ **Kalender-Integration** (Google Calendar, Outlook)
- ✅ **Multi-Language** (Englisch, Französisch, Niederländisch)

### 15.3 Phase 3: Scale (Monat 9-12)

**Ziel:** 50+ Vereine, Monetarisierung

- ✅ **Premium-Features** (Advanced Analytics, Video-Archiv)
- ✅ **White-Label** (komplett eigenes Branding pro Verein)
- ✅ **API für Drittanbieter** (Ligasoftware-Integration)
- ✅ **Automatische SEPA-Lastschrift** (Beitragsverwaltung)
- ✅ **Merchandising-Integration** (In-App-Shop)
- ✅ **Smart-Board-Integration** (elektronische Dartboards)

### 15.4 Phase 4: Diversification (Monat 12+)

**Ziel:** Multi-Sport-Plattform

- ✅ **Plugin-System** (andere Sportarten: Tischtennis, Billard, Bowling)
- ✅ **Franchise-Modell** (Verbände können White-Label nutzen)
- ✅ **Mobile-App Optimierungen** (AR, Offline-First 2.0)

---

## 16. Anhang

### 16.1 Glossar

| Begriff | Beschreibung |
|---------|-------------|
| **Multi-Tenancy** | Ein System bedient mehrere Kunden (Vereine) isoliert |
| **RLS (Row Level Security)** | Datenbank-Feature, das Zugriff auf Zeilen einschränkt |
| **JWT (JSON Web Token)** | Token-basierte Authentifizierung |
| **501 Double-Out** | Dart-Spielmodus: Start bei 501, Checkout mit Double |
| **Bust** | Überwerfen im Dart (Restpunkte < 2 oder ungültiger Checkout) |
| **Checkout** | Letzter Wurf, der Leg beendet (muss mit Double enden) |
| **3-Dart-Average** | Durchschnittlicher Score pro 3 Darts |
| **Checkout-Quote** | Erfolgreiche Checkouts / Checkout-Versuche |

### 16.2 Kontakte & Ressourcen

- **Spring Boot Docs:** https://spring.io/projects/spring-boot
- **Flutter Docs:** https://docs.flutter.dev
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Testcontainers:** https://www.testcontainers.org/
- **Sentry:** https://sentry.io
- **Hetzner Cloud:** https://www.hetzner.com/cloud

### 16.3 Lizenzierung

**Copyright:** Hans Hahn - Alle Rechte vorbehalten  
**Lizenz:** Proprietär (für kommerzielle Nutzung)

---

**Kontakt:**  
Hans Hahn - Project Owner  
Bei Fragen oder Änderungswünschen bitte direkt ansprechen.
