# 🎯 DartClubManager

**Eine umfassende Dart-Vereinsverwaltungs-Software mit Multi-Tenancy-Unterstützung**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## 📖 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Architektur](#architektur)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Nutzung](#nutzung)
- [Entwicklung](#entwicklung)
- [API-Dokumentation](#api-dokumentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Team](#team)
- [Lizenz](#lizenz)

---

## 🎯 Über das Projekt

DartClubManager ist eine moderne, skalierbare Web-Anwendung zur Verwaltung von Dart-Vereinen. Das System wurde entwickelt, um Vereinen aller Größenordnungen eine professionelle Plattform für:

- **Mitgliederverwaltung** - Komplette Spielerdaten mit Statistiken
- **Spielverwaltung** - Liga-, Freundschafts- und Turnierspiele
- **Live-Scoring** - Detaillierte Wurf-für-Wurf-Erfassung mit automatischer Statistikberechnung
- **Trainingsverwaltung** - Planung und Organisation von Trainingseinheiten
- **Team-Kommunikation** - Integrierte Kommunikationstools
- **Statistiken & Analytics** - Umfassende Auswertungen auf Spieler- und Teamebene

### 🌟 Besonderheiten

- **Multi-Tenancy-fähig**: Ein System, viele Vereine - datentechnisch vollständig isoliert
- **PDC/WDF-konforme Statistiken**: Professionelle Kennzahlen wie 3-Dart-Average, Checkout-Quote, 180er-Rate
- **Progressive Web App**: Funktioniert auf Desktop, Tablet und Mobile
- **Offline-First**: Kritische Funktionen auch ohne Internetverbindung nutzbar
- **Skalierbar**: Von 20 bis 2000+ Mitglieder - die Architektur wächst mit

---

## ✨ Features

### Phase 1: MVP (Core-Features) - ✅ Aktuell in Entwicklung

#### Authentifizierung & Multi-Tenancy
- ✅ JWT-basierte Authentifizierung
- ✅ Rollen-System (Admin, Trainer, Spieler, Mitglied)
- ✅ Vereins-Isolation (Row Level Security)
- ⏳ OAuth2 Social Login (Google, Microsoft)

#### Mitglieder- & Teamverwaltung
- ✅ Spielerprofile mit Avatar-Upload
- ✅ Team-Erstellung und -Zuordnung
- ✅ Spieler-Import via CSV/Excel
- ⏳ Mitgliedschaftsverwaltung

#### Spielverwaltung
- ✅ Spielansetzungen (Heim/Auswärts)
- ✅ Mannschaftsaufstellung
- ✅ Einzelergebniserfassung
- ⏳ Live-Scoring (Wurf-für-Wurf)
- ⏳ Automatische Statistikberechnung
- ⏳ PDF-Spielberichte

#### Trainingskalender
- ✅ Termine erstellen und verwalten
- ✅ An-/Abmeldung für Spieler
- ⏳ Kapazitätsüberwachung
- ⏳ Push-Benachrichtigungen

### Phase 2: Advanced Features (geplant)

#### Erweiterte Statistiken
- 3-Dart-Average (Overall, per Game, per Leg)
- First-9-Average
- Checkout-Quote nach Bereichen (51-70, 71-100, 101-170)
- 180er-Rate & 171er-Rate
- Vergleichsgrafiken (Spieler vs. Team-Durchschnitt)
- Formkurve (letzte 10 Spiele)

#### Kommunikation
- Team-Chat
- Push-Benachrichtigungen
- Schwarzes Brett

#### Erweiterte Funktionen
- Board-Belegungsplan
- Material-Verwaltung
- Finanzverwaltung (optional)
- Training Drills & Übungen

### Phase 3: Premium Features (Zukunft)

- Video-Integration (Highlight-Reels)
- KI-gestützte Spieleranalysen
- Gegnerscouts mit statistischer Auswertung
- Mobile Apps (iOS/Android native)

---

## 🛠️ Technologie-Stack

### Backend

| Technologie | Version | Verwendung |
|-------------|---------|------------|
| **Java** | 21 | Programmiersprache |
| **Spring Boot** | 3.2.x | Application Framework |
| **Spring Security** | 6.x | Authentifizierung & Autorisierung |
| **Spring Data JPA** | 3.x | Datenbankabstraktion |
| **PostgreSQL** | 16 | Primäre Datenbank |
| **Flyway** | 10.x | Datenbank-Migrationen |
| **JWT (jjwt)** | 0.12.x | Token-basierte Auth |
| **Lombok** | 1.18.x | Boilerplate-Reduktion |
| **MapStruct** | 1.5.x | DTO-Mapping |
| **JUnit 5** | 5.10.x | Testing |
| **Mockito** | 5.x | Mocking Framework |
| **Testcontainers** | 1.19.x | Integration Testing |

### Frontend (geplant)

| Technologie | Version | Verwendung |
|-------------|---------|------------|
| **Flutter** | 3.x | Cross-Platform Framework |
| **Dart** | 3.x | Programmiersprache |
| **Riverpod** | 2.x | State Management |
| **GoRouter** | 13.x | Navigation |
| **Dio** | 5.x | HTTP Client |
| **Freezed** | 2.x | Immutable Models |

### DevOps

| Tool | Verwendung |
|------|------------|
| **Docker** | Containerisierung |
| **Docker Compose** | Lokale Entwicklungsumgebung |
| **GitHub Actions** | CI/CD Pipeline |
| **SonarQube** | Code-Qualität |
| **Swagger/OpenAPI** | API-Dokumentation |

---

## 🏗️ Architektur

### High-Level Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Flutter   │  │     Web     │  │   Mobile    │         │
│  │   Web App   │  │   Browser   │  │    Apps     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTPS/REST
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│                    (Spring Boot Backend)                     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              REST Controllers                         │   │
│  │  /api/auth  /api/players  /api/matches  /api/stats  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Security Layer (JWT + Row Level)            │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Service Layer                        │   │
│  │  Business Logic + Validation + Calculations          │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Repository Layer (JPA)                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ SQL
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL Database                     │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐        │
│  │    Users    │  │   Matches    │  │   Players   │        │
│  │ + org_id    │  │  + org_id    │  │  + org_id   │        │
│  └─────────────┘  └──────────────┘  └─────────────┘        │
│                                                               │
│         Row Level Security Policy für Multi-Tenancy          │
└─────────────────────────────────────────────────────────────┘
```

### Schichtenarchitektur (Layered Architecture)

```
┌───────────────────────────────────────────────────────┐
│                  Controller Layer                      │
│  • REST Endpoints                                      │
│  • Request Validation                                  │
│  • DTO Mapping (Entity <-> DTO)                       │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                   Service Layer                        │
│  • Business Logic                                      │
│  • Transaction Management                              │
│  • Complex Validations                                 │
│  • Statistics Calculations                             │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                  Repository Layer                      │
│  • Data Access (JPA)                                   │
│  • Custom Queries (JPQL)                              │
│  • Native Queries (Complex Stats)                     │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                    Entity Layer                        │
│  • Database Entities                                   │
│  • Relationships (@OneToMany, etc.)                   │
│  • Multi-Tenancy (org_id in allen Entitäten)         │
└───────────────────────────────────────────────────────┘
```

### Package-Struktur

```
com.dartclub/
├── config/                      # Konfigurationsklassen
│   ├── SecurityConfig.java      # Spring Security Setup
│   ├── CorsConfig.java          # CORS-Policies
│   ├── JwtConfig.java           # JWT-Konfiguration
│   └── OpenApiConfig.java       # Swagger-Setup
│
├── controller/                  # REST-Controller
│   ├── AuthController.java
│   ├── PlayerController.java
│   ├── MatchController.java
│   ├── TeamController.java
│   ├── TrainingController.java
│   └── StatisticsController.java
│
├── service/                     # Business Logic
│   ├── AuthService.java
│   ├── PlayerService.java
│   ├── MatchService.java
│   ├── TeamService.java
│   ├── StatisticsService.java
│   └── NotificationService.java
│
├── repository/                  # Data Access Layer
│   ├── UserRepository.java
│   ├── PlayerRepository.java
│   ├── MatchRepository.java
│   ├── ThrowRepository.java
│   └── TeamRepository.java
│
├── model/
│   ├── entity/                 # JPA Entities
│   │   ├── User.java
│   │   ├── Organization.java
│   │   ├── Player.java
│   │   ├── Match.java
│   │   ├── Throw.java
│   │   └── Team.java
│   │
│   ├── dto/                    # Data Transfer Objects
│   │   ├── request/
│   │   │   ├── LoginRequest.java
│   │   │   ├── CreatePlayerRequest.java
│   │   │   └── MatchResultRequest.java
│   │   └── response/
│   │       ├── PlayerResponse.java
│   │       ├── MatchResponse.java
│   │       └── StatisticsResponse.java
│   │
│   └── enums/                  # Enumerations
│       ├── Role.java
│       ├── MatchType.java
│       └── GameFormat.java
│
├── security/                   # Security Components
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   ├── CustomUserDetailsService.java
│   └── TenantContext.java      # Thread-local org_id Storage
│
├── exception/                  # Custom Exceptions
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── UnauthorizedException.java
│   └── ValidationException.java
│
└── util/                       # Helper Classes
    ├── StatisticsCalculator.java
    ├── PdfGenerator.java
    └── DateUtils.java
```

---

## 📦 Installation

### Voraussetzungen

- **Java Development Kit (JDK)** 21 oder höher
- **PostgreSQL** 16 oder höher
- **Docker** & **Docker Compose** (empfohlen für lokale Entwicklung)
- **Git**
- **IntelliJ IDEA** (empfohlen) oder andere Java IDE

### 1. Repository klonen

```bash
git clone https://github.com/your-org/dartclub-manager.git
cd dartclub-manager
```

### 2. Datenbank mit Docker starten

```bash
docker-compose up -d postgres
```

Das startet PostgreSQL auf Port 5432 mit folgenden Credentials:
- **Database:** `dartclub`
- **User:** `dartclub`
- **Password:** `dartclub_dev_password`

### 3. Dependencies installieren

```bash
./gradlew build -x test
```

### 4. Datenbank-Migrationen ausführen

Flyway führt die Migrationen automatisch beim ersten Start aus. Alternativ manuell:

```bash
./gradlew flywayMigrate
```

### 5. Anwendung starten

```bash
./gradlew bootRun
```

Die Anwendung läuft nun auf: **http://localhost:8080**

### 6. Health-Check

```bash
curl http://localhost:8080/api/health
```

Erwartete Antwort:
```json
{
  "status": "UP",
  "message": "DartClubManager Backend is running!"
}
```

---

## ⚙️ Konfiguration

### application.yml

Die Hauptkonfiguration liegt in `src/main/resources/application.yml`:

```yaml
spring:
  application:
    name: dartclub-backend

  datasource:
    url: jdbc:postgresql://localhost:5432/dartclub
    username: dartclub
    password: dartclub_dev_password
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true

  flyway:
    enabled: true
    baseline-on-migrate: true
    locations: classpath:db/migration

jwt:
  secret: ${JWT_SECRET:your-secret-key-change-in-production}
  expiration: 86400000  # 24 Stunden

cors:
  allowed-origins: http://localhost:3000,http://localhost:8080
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
```

### Umgebungsvariablen

Für die Produktion sollten sensitive Daten über Umgebungsvariablen gesetzt werden:

```bash
export JWT_SECRET="your-super-secret-jwt-key-min-256-bits"
export DB_URL="jdbc:postgresql://prod-db:5432/dartclub"
export DB_USERNAME="dartclub_prod"
export DB_PASSWORD="secure-production-password"
```

---

## 🚀 Nutzung

### API Endpoints (Übersicht)

#### Authentifizierung

```http
POST   /api/auth/register      # Neuen User registrieren
POST   /api/auth/login         # Einloggen (JWT Token erhalten)
POST   /api/auth/refresh       # Token erneuern
GET    /api/auth/me            # Aktuellen User abrufen
```

#### Spieler

```http
GET    /api/players            # Alle Spieler des Vereins
GET    /api/players/{id}       # Spieler-Details
POST   /api/players            # Neuen Spieler anlegen
PUT    /api/players/{id}       # Spieler aktualisieren
DELETE /api/players/{id}       # Spieler löschen
GET    /api/players/{id}/stats # Spieler-Statistiken
```

#### Spiele

```http
GET    /api/matches            # Alle Spiele
GET    /api/matches/{id}       # Spiel-Details
POST   /api/matches            # Neues Spiel anlegen
PUT    /api/matches/{id}       # Spiel aktualisieren
POST   /api/matches/{id}/throws  # Wurf erfassen (Live-Scoring)
POST   /api/matches/{id}/finalize # Spiel abschließen
```

#### Teams

```http
GET    /api/teams              # Alle Teams
POST   /api/teams              # Neues Team erstellen
PUT    /api/teams/{id}         # Team aktualisieren
POST   /api/teams/{id}/members # Spieler zu Team hinzufügen
```

#### Training

```http
GET    /api/trainings          # Alle Trainings
POST   /api/trainings          # Training erstellen
POST   /api/trainings/{id}/attend  # Teilnahme bestätigen
```

### Beispiel-Requests

#### 1. Registrierung

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "max.mustermann",
    "email": "max@dartclub.de",
    "password": "SecurePass123!",
    "organizationName": "Dart Club München"
  }'
```

#### 2. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "max.mustermann",
    "password": "SecurePass123!"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": 1,
    "username": "max.mustermann",
    "email": "max@dartclub.de",
    "role": "ADMIN",
    "organizationId": 1
  }
}
```

#### 3. Spieler anlegen (mit JWT Token)

```bash
curl -X POST http://localhost:8080/api/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "firstName": "Michael",
    "lastName": "van Gerwen",
    "nickname": "Mighty Mike",
    "email": "mvg@example.com",
    "dateOfBirth": "1989-04-25",
    "teamId": 1
  }'
```

---

## 👨‍💻 Entwicklung

### Lokale Entwicklungsumgebung

1. **IDE Setup (IntelliJ IDEA)**
   - Öffne das Projekt in IntelliJ
   - IDE erkennt automatisch Gradle und lädt Dependencies
   - Aktiviere Lombok Plugin: `Settings → Plugins → Lombok`
   - Enable Annotation Processing: `Settings → Build → Compiler → Annotation Processors`

2. **Docker Compose für Services**

```bash
docker-compose up -d
```

Startet:
- PostgreSQL (Port 5432)
- pgAdmin (Port 5050) - Web-Interface für DB
- Redis (Port 6379) - für Caching/Sessions

3. **Hot Reload aktivieren**

Spring Boot DevTools ist bereits eingebunden. Änderungen am Code werden automatisch neu geladen.

### Code-Style

Wir folgen den **Google Java Style Guidelines** mit kleinen Anpassungen:

- **Indentation:** 4 Spaces
- **Line Length:** Max. 120 Zeichen
- **Imports:** Keine Wildcards, alphabetisch sortiert
- **Kommentare:** JavaDoc für alle public Methoden

```java
/**
 * Berechnet die 3-Dart-Average eines Spielers für ein bestimmtes Spiel.
 *
 * @param playerId die ID des Spielers
 * @param matchId die ID des Spiels
 * @return die berechnete 3-Dart-Average
 * @throws ResourceNotFoundException wenn Spieler oder Spiel nicht gefunden
 */
public double calculateThreeDartAverage(Long playerId, Long matchId) {
    // Implementation
}
```

### Database Migrations

Neue Datenbank-Änderungen werden über **Flyway** versioniert:

1. Erstelle neue Migration in `src/main/resources/db/migration/`
2. Naming-Convention: `V{version}__{description}.sql`
   - Beispiel: `V2__add_throws_table.sql`
3. Migrations werden automatisch beim Start ausgeführt

**Beispiel-Migration:**

```sql
-- V2__add_throws_table.sql
CREATE TABLE throws (
    id BIGSERIAL PRIMARY KEY,
    match_id BIGINT NOT NULL REFERENCES matches(id),
    player_id BIGINT NOT NULL REFERENCES players(id),
    org_id BIGINT NOT NULL REFERENCES organizations(id),
    leg_number INTEGER NOT NULL,
    throw_number INTEGER NOT NULL,
    score INTEGER NOT NULL,
    multiplier INTEGER NOT NULL CHECK (multiplier IN (1, 2, 3)),
    is_double BOOLEAN DEFAULT FALSE,
    is_triple BOOLEAN DEFAULT FALSE,
    remaining_score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_throws_match ON throws(match_id);
CREATE INDEX idx_throws_player ON throws(player_id);
CREATE INDEX idx_throws_org ON throws(org_id);
```

### Branch-Strategie

Wir verwenden **Git Flow**:

- `main` - Produktions-Code
- `develop` - Entwicklungs-Branch
- `feature/xyz` - Feature-Branches
- `bugfix/xyz` - Bugfix-Branches
- `release/x.x.x` - Release-Branches

**Feature-Workflow:**

```bash
# Feature-Branch erstellen
git checkout develop
git pull
git checkout -b feature/live-scoring

# Entwickeln und committen
git add .
git commit -m "feat: implement live-scoring throw recording"

# Push und Pull Request erstellen
git push origin feature/live-scoring
```

### Commit-Conventions

Wir folgen **Conventional Commits**:

- `feat:` - Neue Features
- `fix:` - Bugfixes
- `docs:` - Dokumentation
- `style:` - Code-Formatierung
- `refactor:` - Code-Refactoring
- `test:` - Tests hinzufügen/ändern
- `chore:` - Build-Prozess, Dependencies

---

## 📚 API-Dokumentation

Die API-Dokumentation wird automatisch über **Swagger/OpenAPI** generiert.

**Zugriff:** http://localhost:8080/swagger-ui.html

**OpenAPI JSON:** http://localhost:8080/v3/api-docs

---

## 🧪 Testing

### Test-Pyramide

```
         /\
        /  \       E2E Tests (wenige)
       /────\
      /      \     Integration Tests (moderate)
     /────────\
    /          \   Unit Tests (viele)
   /────────────\
```

### Tests ausführen

```bash
# Alle Tests
./gradlew test

# Nur Unit Tests
./gradlew test --tests *Test

# Nur Integration Tests
./gradlew test --tests *IT

# Mit Coverage Report
./gradlew test jacocoTestReport
```

Coverage-Report: `build/reports/jacoco/test/html/index.html`

### Beispiel Unit Test

```java
@ExtendWith(MockitoExtension.class)
class StatisticsServiceTest {

    @Mock
    private ThrowRepository throwRepository;

    @InjectMocks
    private StatisticsService statisticsService;

    @Test
    void calculateThreeDartAverage_shouldReturnCorrectAverage() {
        // Given
        Long playerId = 1L;
        Long matchId = 1L;
        List<Throw> throws = Arrays.asList(
            createThrow(60, 1),
            createThrow(60, 2),
            createThrow(60, 3)
        );
        
        when(throwRepository.findByPlayerIdAndMatchId(playerId, matchId))
            .thenReturn(throws);

        // When
        double average = statisticsService.calculateThreeDartAverage(playerId, matchId);

        // Then
        assertEquals(60.0, average, 0.01);
    }
}
```

### Integration Test mit Testcontainers

```java
@SpringBootTest
@Testcontainers
class PlayerControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createPlayer_shouldReturnCreatedPlayer() throws Exception {
        mockMvc.perform(post("/api/players")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "firstName": "Michael",
                        "lastName": "van Gerwen"
                    }
                    """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.firstName").value("Michael"));
    }
}
```

---

## 🚢 Deployment

### Docker Build

```bash
# Docker Image bauen
./gradlew bootBuildImage

# Image läuft nun als: dartclub-backend:latest
```

### Docker Compose (Production)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: dartclub
      POSTGRES_USER: dartclub
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    image: dartclub-backend:latest
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/dartclub
      SPRING_DATASOURCE_USERNAME: dartclub
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### Deployment auf Cloud

**Unterstützte Plattformen:**
- AWS (Elastic Beanstalk, ECS)
- Azure (App Service, Container Instances)
- Google Cloud (Cloud Run, GKE)
- Heroku
- DigitalOcean App Platform

---

## 🗺️ Roadmap

### Sprint 0: Setup & Foundation (Woche 1-2) ✅
- [x] Projekt-Setup (Spring Boot, PostgreSQL)
- [x] Docker-Umgebung
- [x] Git-Repository
- [x] CI/CD Pipeline (GitHub Actions)

### Sprint 1: Auth & Core (Woche 3-4) 🔄
- [ ] JWT-Authentifizierung
- [ ] User & Organization Entities
- [ ] Multi-Tenancy Setup
- [ ] RBAC (Role-Based Access Control)

### Sprint 2: Spielerverwaltung (Woche 5-6)
- [ ] Player CRUD
- [ ] Team-Verwaltung
- [ ] CSV-Import
- [ ] Avatar-Upload

### Sprint 3: Spielverwaltung Basic (Woche 7-8)
- [ ] Match CRUD
- [ ] Mannschaftsaufstellung
- [ ] Einfache Ergebniserfassung
- [ ] PDF-Spielberichte

### Sprint 4: Live-Scoring (Woche 9-11)
- [ ] Throw-Recording
- [ ] Bust-Detection
- [ ] Checkout-Recognition
- [ ] Realtime-Updates

### Sprint 5: Statistiken (Woche 12-13)
- [ ] 3-Dart-Average
- [ ] Checkout-Quote
- [ ] Formkurve
- [ ] Vergleichsgrafiken

### Sprint 6: Training & Kalender (Woche 14-15)
- [ ] Training CRUD
- [ ] Teilnehmerverwaltung
- [ ] Push-Benachrichtigungen

### Sprint 7: Polish & Testing (Woche 16)
- [ ] Bug-Fixes
- [ ] Performance-Optimierung
- [ ] Dokumentation vervollständigen
- [ ] Deployment auf Staging

---

## 👥 Team

**Entwickler-Team:**
- **Backend-Team** (2 Entwickler) - Spring Boot, PostgreSQL, REST APIs
- **Frontend-Team** (2 Entwickler) - Flutter, Dart, UI/UX
- **DevOps** (1 Entwickler) - Docker, CI/CD, Deployment
- **Project Owner/Scrum Master** (1 Person) - Koordination, Testing, Dokumentation

**Scrum-Rhythmus:**
- **Daily Standups:** 15 Minuten (täglich)
- **Sprint Planning:** Jeden zweiten Montag
- **Sprint Review:** Jeden zweiten Freitag
- **Sprint Retrospektive:** Nach jedem Sprint

---

## 📄 Lizenz

Dieses Projekt ist proprietäre Software.

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**

© 2025 DartClubManager. Alle Rechte vorbehalten. 

Die Nutzung, Vervielfältigung oder Weitergabe dieser Software bedarf der ausdrücklichen schriftlichen Genehmigung des Urhebers.

---

## 📞 Support & Kontakt

**Bei Fragen oder Problemen:**
- 📧 Email: support@dartclubmanager.de
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/dartclub-manager/issues)
- 📚 Wiki: [Projekt-Wiki](https://github.com/your-org/dartclub-manager/wiki)

---

**Version:** 1.0.0  
**Letztes Update:** 29.09.2025  
**Status:** 🚧 In Entwicklung (MVP Phase)


_____________________________________________________________________________________________________________________________________________________________


classDiagram
%% =========================
%% DOMAIN / DATA MODEL
%% =========================
class Organization {
  UUID id
  String name
  String slug
  String logoUrl
  String primaryColor
  String secondaryColor
  ts createdAt
  ts updatedAt
}

class User {
  UUID id
  String email
  String passwordHash
  String displayName
  Boolean isActive
  ts createdAt
  ts updatedAt
}

class Membership {
  UUID userId
  UUID orgId
  enum role {admin,trainer,captain,player}
  enum status {active,inactive,left}
  date joinedAt
  date leftAt
  ts createdAt
}

class Member {
  UUID id
  UUID orgId
  UUID userId
  String firstName
  String lastName
  String email
  String phone
  date birthdate
  String licenseNo
  enum handedness {left,right}
  String notes
  ts createdAt
  ts updatedAt
}

class Team {
  UUID id
  UUID orgId
  String name
  String season
  UUID captainId
  ts createdAt
  ts updatedAt
}

class TeamMember {
  UUID teamId
  UUID memberId
  int position
  ts createdAt
}

class Match {
  UUID id
  UUID orgId
  UUID homeTeamId
  UUID awayTeamId
  ts matchDate
  String venue
  String league
  enum matchType {league,friendly,cup,practice}
  enum status {scheduled,live,finished,cancelled}
  int homeSets
  int awaySets
  int bestOfSets
  int bestOfLegs
  int startingScore {301|501|701}
  bool doubleOut
  ts createdAt
  ts updatedAt
  ts finishedAt
}

class Set {
  UUID id
  UUID matchId
  int setNo
  int homeLegs
  int awayLegs
  ts createdAt
}

class Leg {
  UUID id
  UUID setId
  int legNo
  int startingScore
  UUID homeMemberId
  UUID awayMemberId
  UUID winnerTeamId
  UUID winnerMemberId
  int totalDarts
  int checkoutScore
  ts startedAt
  ts finishedAt
  ts createdAt
}

class Throw {
  UUID id
  UUID legId
  UUID memberId
  int throwNo
  int dart1_multiplier
  int dart1_segment
  int dart1_score
  int dart2_multiplier
  int dart2_segment
  int dart2_score
  int dart3_multiplier
  int dart3_segment
  int dart3_score
  int throw_total
  int remaining_score
  bool is_bust
  bool is_checkout
  ts createdAt
}

class MatchEvent {
  UUID id
  UUID matchId
  UUID legId
  UUID memberId
  enum event_type {180,171,140_plus,high_checkout,nine_darter}
  int value
  ts createdAt
}

class Event {
  UUID id
  UUID orgId
  enum event_type {training,match,meeting,other}
  String title
  String description
  ts start_time
  ts end_time
  String location
  int capacity
  UUID created_by
  ts createdAt
  ts updatedAt
}

class EventParticipant {
  UUID eventId
  UUID memberId
  enum status {yes,no,maybe,pending}
  ts responseAt
  ts createdAt
}

class Poll {
  UUID id
  UUID orgId
  String title
  String description
  UUID created_by
  ts deadline
  bool is_closed
  ts createdAt
  ts updatedAt
}

class PollOption {
  UUID id
  UUID pollId
  ts option_date
  String option_label
  ts createdAt
}

class PollVote {
  UUID pollId
  UUID optionId
  UUID memberId
  ts createdAt
}

class Fee {
  UUID id
  UUID orgId
  String name
  String description
  decimal amount
  enum period {yearly,monthly,quarterly,one_time}
  bool is_active
  ts createdAt
  ts updatedAt
}

class FeePayment {
  UUID id
  UUID orgId
  UUID memberId
  UUID feeId
  decimal amount
  date due_date
  date paid_at
  String payment_method
  enum status {open,paid,overdue,cancelled}
  String notes
  ts createdAt
  ts updatedAt
}

%% =========================
%% RELATIONSHIPS
%% =========================
Organization "1" --> "0..*" Member : org_id
Organization "1" --> "0..*" Team   : org_id
Organization "1" --> "0..*" Match  : org_id
Organization "1" --> "0..*" Event  : org_id
Organization "1" --> "0..*" Poll   : org_id
Organization "1" --> "0..*" Fee    : org_id

User "1" -- "0..*" Membership : users.id = memberships.user_id
Organization "1" -- "0..*" Membership : organizations.id = memberships.org_id
Member "0..1" -- "1" User : optional(user_id)

Team "1" -- "0..*" TeamMember : team_id
Member "1" -- "0..*" TeamMember : member_id
Team "1" -- "0..*" Match : home_team_id
Team "1" -- "0..*" Match : away_team_id
Team "0..1" <-- "0..

