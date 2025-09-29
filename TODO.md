# 📋 TODO - DartClubManager

**Projekt:** DartClubManager  
**Version:** 1.0.0  
**Stand:** 29.09.2025

---

## 🎯 Meilensteine

### Meilenstein 1: Foundation & Setup ✅ (Woche 1-2)
**Ziel:** Projekt-Grundgerüst und Entwicklungsumgebung komplett einsatzbereit

- [x] Spring Boot Projekt anlegen
- [x] Git Repository initialisieren
- [x] Docker Compose für PostgreSQL
- [x] README.md erstellen
- [x] TODO.md erstellen
- [x] CHANGELOG.md erstellen
- [x] error.log anlegen
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Projektstruktur (/src, /docs, /tests, /logs)
- [ ] Swagger/OpenAPI konfigurieren

**Definition of Done:**
- ✅ Projekt läuft lokal
- ⏳ PostgreSQL via Docker erreichbar
- ⏳ Health-Endpoint antwortet
- ⏳ Swagger UI verfügbar

---

### Meilenstein 2: Authentifizierung & Multi-Tenancy (Woche 3-4)
**Ziel:** Sichere Auth mit JWT und Vereins-Isolation funktioniert

- [ ] **Entities erstellen:**
  - [ ] User Entity (mit org_id)
  - [ ] Organization Entity
  - [ ] Role Enum
  
- [ ] **Security-Konfiguration:**
  - [ ] SecurityConfig.java
  - [ ] JwtTokenProvider
  - [ ] JwtAuthenticationFilter
  - [ ] CustomUserDetailsService
  
- [ ] **Controllers:**
  - [ ] AuthController
    - [ ] POST /api/auth/register
    - [ ] POST /api/auth/login
    - [ ] POST /api/auth/refresh
    - [ ] GET /api/auth/me
  
- [ ] **Services:**
  - [ ] AuthService
  - [ ] UserService
  
- [ ] **Database Migrations:**
  - [ ] V1__init_schema.sql
  - [ ] V2__add_organizations.sql
  
- [ ] **Tests:**
  - [ ] AuthService Unit Tests
  - [ ] AuthController Integration Tests
  - [ ] JWT Token Tests

**Definition of Done:**
- User kann sich registrieren
- User kann sich einloggen und erhält JWT
- JWT wird bei Requests validiert
- Jeder Request ist einem Verein (org_id) zugeordnet
- Row Level Security verhindert Cross-Org Access
- Alle Tests bestehen

---

### Meilenstein 3: Spieler- & Teamverwaltung (Woche 5-6)
**Ziel:** Spieler und Teams können verwaltet werden

- [ ] **Entities erstellen:**
  - [ ] Player Entity
  - [ ] Team Entity
  - [ ] PlayerTeam (Junction Table)
  
- [ ] **Controllers:**
  - [ ] PlayerController
    - [ ] GET /api/players
    - [ ] GET /api/players/{id}
    - [ ] POST /api/players
    - [ ] PUT /api/players/{id}
    - [ ] DELETE /api/players/{id}
    - [ ] POST /api/players/import (CSV)
  - [ ] TeamController
    - [ ] GET /api/teams
    - [ ] POST /api/teams
    - [ ] PUT /api/teams/{id}
    - [ ] POST /api/teams/{id}/members
  
- [ ] **Services:**
  - [ ] PlayerService
  - [ ] TeamService
  - [ ] CsvImportService
  
- [ ] **Features:**
  - [ ] Avatar-Upload (S3 oder lokaler Storage)
  - [ ] Spieler-Suche/Filter
  - [ ] Team-Aufstellung
  
- [ ] **Database Migrations:**
  - [ ] V3__add_players.sql
  - [ ] V4__add_teams.sql
  
- [ ] **Tests:**
  - [ ] Player CRUD Tests
  - [ ] Team CRUD Tests
  - [ ] CSV Import Tests

**Definition of Done:**
- Spieler können angelegt/bearbeitet/gelöscht werden
- Teams können erstellt und Spieler zugeordnet werden
- CSV-Import funktioniert
- Alle CRUD-Operationen respektieren org_id
- Alle Tests bestehen

---

### Meilenstein 4: Spielverwaltung & Live-Scoring (Woche 7-11)
**Ziel:** Spiele können angelegt und live gescored werden

- [ ] **Entities erstellen:**
  - [ ] Match Entity
  - [ ] Leg Entity
  - [ ] Throw Entity
  - [ ] MatchPlayer (Aufstellung)
  
- [ ] **Controllers:**
  - [ ] MatchController
    - [ ] GET /api/matches
    - [ ] GET /api/matches/{id}
    - [ ] POST /api/matches
    - [ ] PUT /api/matches/{id}
    - [ ] POST /api/matches/{id}/throws
    - [ ] POST /api/matches/{id}/finalize
    - [ ] GET /api/matches/{id}/pdf
  
- [ ] **Services:**
  - [ ] MatchService
  - [ ] LiveScoringService
  - [ ] StatisticsService
  - [ ] PdfGeneratorService
  
- [ ] **Features:**
  - [ ] Spielansetzung (Heim/Auswärts)
  - [ ] Aufstellung festlegen
  - [ ] Live-Scoring:
    - [ ] Wurf-Erfassung (score, multiplier)
    - [ ] Bust-Detection
    - [ ] Checkout-Recognition
    - [ ] Leg-Beendigung
  - [ ] PDF-Spielbericht generieren
  
- [ ] **Database Migrations:**
  - [ ] V5__add_matches.sql
  - [ ] V6__add_throws.sql
  
- [ ] **Tests:**
  - [ ] Match CRUD Tests
  - [ ] Live-Scoring Logic Tests
  - [ ] Bust Detection Tests
  - [ ] Checkout Recognition Tests
  - [ ] PDF Generation Tests

**Definition of Done:**
- Spiele können angelegt werden
- Wurf-für-Wurf-Eingabe funktioniert
- Bust wird erkannt und Score zurückgesetzt
- Checkout wird automatisch erkannt
- Leg wird automatisch beendet bei Checkout
- PDF-Spielbericht wird generiert
- Alle Tests bestehen

---

### Meilenstein 5: Statistiken & Analytics (Woche 12-13)
**Ziel:** Umfassende Statistiken für Spieler und Teams

- [ ] **Statistik-Berechnungen implementieren:**
  - [ ] 3-Dart-Average (Overall, per Match, per Leg)
  - [ ] First-9-Average
  - [ ] Checkout-Quote (gesamt + nach Bereichen)
  - [ ] 180er-Rate
  - [ ] 171er-Rate
  - [ ] Highest Finish
  - [ ] Formkurve (letzte 10 Spiele)
  
- [ ] **Controllers:**
  - [ ] StatisticsController
    - [ ] GET /api/players/{id}/stats
    - [ ] GET /api/players/{id}/stats/form
    - [ ] GET /api/teams/{id}/stats
    - [ ] GET /api/matches/{id}/stats
  
- [ ] **Services:**
  - [ ] StatisticsCalculator
  - [ ] FormAnalyzer
  
- [ ] **Features:**
  - [ ] Vergleichsgrafiken (Spieler vs. Team-Durchschnitt)
  - [ ] Leaderboards
  - [ ] Statistik-Export (CSV/Excel)
  
- [ ] **Tests:**
  - [ ] Statistik-Berechnungen Tests
  - [ ] Edge-Cases (0 Würfe, Bust-only Legs, etc.)

**Definition of Done:**
- Alle Statistiken werden korrekt berechnet
- Statistiken sind performant (<500ms für komplexe Queries)
- Vergleiche zwischen Spielern möglich
- Export funktioniert
- Alle Tests bestehen

---

## 🔧 Technische Aufgaben (Parallel zu Meilensteinen)

### Code-Qualität
- [ ] SonarQube einrichten
- [ ] Code-Coverage >80%
- [ ] Lombok konsistent nutzen
- [ ] MapStruct für DTO-Mapping einführen

### Dokumentation
- [ ] JavaDoc für alle public Methoden
- [ ] API-Dokumentation in Swagger vervollständigen
- [ ] Architektur-Diagramme (docs/)
- [ ] Deployment-Guide

### DevOps
- [ ] GitHub Actions Pipeline
  - [ ] Build & Test
  - [ ] Code Quality Check
  - [ ] Docker Image Build
  - [ ] Deploy to Staging
- [ ] Docker Compose für Prod
- [ ] Logging (ELK-Stack oder ähnlich)
- [ ] Monitoring (Prometheus/Grafana)

### Performance
- [ ] Database Indexing optimieren
- [ ] Query-Performance testen (>1000 Spieler)
- [ ] Caching-Strategy (Redis)
- [ ] Connection Pooling konfigurieren

---

## 🐛 Bug-Liste

*Keine offenen Bugs (Stand: 29.09.2025)*

---

## 💡 Feature-Ideen (Backlog)

**Nicht im MVP, aber für Phase 2/3:**

- [ ] Chat-Funktion
- [ ] Push-Benachrichtigungen
- [ ] Board-Belegungsplan
- [ ] Material-Verwaltung
- [ ] Finanzverwaltung
- [ ] Training Drills
- [ ] Video-Integration
- [ ] KI-Analysen
- [ ] Mobile Apps (iOS/Android)

---

## 📝 Notizen

### Entscheidungen
- **Framework:** Spring Boot (wegen Java-Expertise im Team)
- **Database:** PostgreSQL (wegen Row Level Security für Multi-Tenancy)
- **Auth:** JWT (stateless, skalierbar)
- **API:** REST (Standard, gut dokumentiert)

### Learnings
*(wird während Entwicklung gefüllt)*

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Letzte Aktualisierung:** 29.09.2025
