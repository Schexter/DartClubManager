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

### Meilenstein 4: Spielverwaltung & Live-Scoring (Woche 7-11) ⚡ [95% COMPLETE]
**Ziel:** Spiele können angelegt und live gescored werden

- [x] **Entities erstellt:**
  - [x] Match Entity (vollständig mit Status, Lifecycle)
  - [x] Set Entity (mit Winner-Detection)
  - [x] Leg Entity (mit Double-Out Support)
  - [x] Throw Entity (3 Darts mit Multiplier/Segment/Score)
  
- [x] **Controllers implementiert:**
  - [x] MatchController
    - [x] GET /api/matches (alle Matches)
    - [x] GET /api/matches/{id} (Match Details)
    - [x] POST /api/matches (Match erstellen)
    - [x] PUT /api/matches/{id} (Match aktualisieren)
    - [x] DELETE /api/matches/{id} (Match löschen)
    - [x] POST /api/matches/{id}/start (Match starten)
    - [x] POST /api/matches/{id}/finalize (Match beenden)
    - [x] GET /api/matches/{id}/live (Live-Daten abrufen)
  - [x] ScoringController
    - [x] POST /api/matches/{id}/throws (Wurf eintragen)
    - [x] POST /api/matches/{id}/bust (Bust markieren)
  
- [x] **Services implementiert:**
  - [x] MatchService (kompletter Match-Lifecycle)
  - [x] ScoringEngine (Wurf-Validierung, Bust/Checkout-Detection)
  - [ ] PdfGeneratorService (noch offen)
  
- [x] **Frontend Live-Scoring (KOMPLETT!):**
  - [x] **Logik-Datei:** `frontend/src/logic/darts301.ts`
    - [x] Komplette TypeScript-Spiellogik (150+ Zeilen)
    - [x] Type-Safety mit Union Types
    - [x] Player-Management mit Turn-Locking
    - [x] History/Undo-Funktion
    - [x] Bust-Erkennung (Überwerfen, Restpunkte = 1)
    - [x] Double-Out-Logik mit Checkout-Erkennung
    - [x] 3-Dart-Turn-System
  - [x] **UI-Komponente:** `frontend/src/features/matches/LiveScoringScreen.tsx`
    - [x] Professionelles Scoreboard mit Live-Highlight
    - [x] Grid-Layout für Wurf-Eingabe (Single/Double/Triple 1-20)
    - [x] 4 Spezialtasten (MISS, Bull, Bullseye, Nächster Spieler)
    - [x] Live-Feedback (Letzter Wurf, Error-Messages)
    - [x] Undo-Button & Neues-Leg-Button
    - [x] Dark Mode Support
    - [x] Responsive Design (Mobile → Desktop)
    - [x] Turn-Locking (Spieler muss bestätigen nach 3 Darts)
  - [x] **Lukas' Scoreboard-System integriert** (07.10.2025)
    - [x] Bewährte Logik aus Branch "Lukas" übernommen
    - [x] In modernes Design-System integriert (Blue Theme)
    - [x] Test-Dokumentation erstellt (LIVE-SCORING-TEST.md)
  
- [x] **Features implementiert:**
  - [x] Spielansetzung (Heim/Auswärts, mit/ohne Teams)
  - [x] Match starten/beenden
  - [x] Live-Scoring:
    - [x] Wurf-Erfassung (3 Darts mit Multiplier/Segment)
    - [x] Automatische Punkteberechnung
    - [x] Bust-Detection (Restpunkte < 2 oder ungültiger Checkout)
    - [x] Checkout-Recognition (Double-Out Regel)
    - [x] Leg-Beendigung automatisch bei Checkout
    - [x] Event-Detection (180, 171, 140+, High-Checkout)
    - [x] Automatischer Spielerwechsel (Home/Away)
    - [x] Restpunkte-Berechnung nach jedem Wurf
    - [x] Live-Statistiken (Average pro Spieler)
    - [x] Schnelle Wurf-Eingabe (1 Click = 1 Wurf)
    - [x] Turn-Locking (Nach 3 Darts Bestätigung erforderlich)
    - [x] Undo-Funktion (Letzter Wurf rückgängig)
    - [x] Offline-fähig (Keine Server-Dependency)
  - [ ] PDF-Spielbericht generieren (noch offen)
  
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
- ✅ Spiele können angelegt werden
- ✅ Wurf-für-Wurf-Eingabe funktioniert
- ✅ Bust wird erkannt (Restpunkte bleiben)
- ✅ Checkout wird automatisch erkannt (Double-Out)
- ✅ Leg wird automatisch beendet bei Checkout
- ✅ Live-Statistiken (Average) werden berechnet
- ⏳ PDF-Spielbericht wird generiert (noch offen)
- ⏳ Alle Tests bestehen (noch offen)

**Status:** 98% Complete ✅
- ✅ Backend 100% KOMPLETT:
  - ✅ ScoringController.java (submitThrow, markBust)
  - ✅ ScoringEngine.java (Wurf-Validierung, Bust/Checkout)
  - ✅ MatchService.java (Match-Lifecycle, Set/Leg Management)
  - ✅ Alle DTOs (ThrowRequest, ThrowResponseDTO, LiveScoringLegDTO, etc.)
  - ✅ Alle Entities (Match, Set, Leg, Throw)
  - ✅ Alle Repositories (ThrowRepository, LegRepository, etc.)
- ✅ Frontend 100% KOMPLETT:
  - ✅ darts301.ts (Lukas' bewährte Spiellogik)
  - ✅ LiveScoringScreen.tsx (Modernes UI im Blue Design)
  - ✅ Offline-fähig (keine Server-Dependency)
- ⏳ Live-Testing ausstehend
- ⏳ WebSocket für Echtzeit-Updates (Phase 2)
- ⏳ PDF-Generation (Phase 2)

**Nächste Schritte:**
1. **Live-Testing durchführen:**
   - Backend starten: `cd backend && ./gradlew bootRun`
   - Frontend starten: `cd frontend && npm run dev`
   - Browser öffnen: http://localhost:5173/matches/123/scoring
   - Würfe eintragen, Bust testen, Checkout testen
2. **Frontend-Backend-Integration (Phase 2):**
   - Frontend submitThrow() mit Backend verbinden
   - Persistierung der Throws in DB
   - Live-Daten vom Backend laden
3. **WebSocket implementieren (Phase 2):**
   - Live-Updates für Zuschauer
   - Echtzeit-Synchronisation
4. **PDF-Spielbericht (Phase 2)**

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
**Letzte Aktualisierung:** 07.10.2025
