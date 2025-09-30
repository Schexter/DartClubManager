# DartClubManager - Projektdokumentation

**Version:** 1.0  
**Stand:** 29.09.2025  
**Owner:** Hans Hahn

---

## 1. Projektteam und Rollen

Dieses Dokument dient als zentrale Wissensdatenbank für das gesamte Entwicklungsteam.

| Rolle | Verantwortlich(e) | Hauptaufgaben |
|---|---|---|
| **Project Owner** | Hans Hahn | Produktvision, Anforderungsmanagement, Priorisierung |
| **Backend-Entwicklung** | Lukas, Dennis | Entwicklung der Spring Boot API, Business-Logik, Datenbank-Anbindung |
| **Frontend-Entwicklung**| Svenja, Francesco | Entwicklung der React App (Web), UI/UX Umsetzung, State Management |
| **Datenbank & Springer**| David | Datenbankdesign, Migrationen, Performance, unterstützt bei Bedarf |
| **Springer** | Frank | Unterstützt flexibel in allen Bereichen (Backend, Frontend, DevOps) |

---

## 2. Executive Summary

### 2.1. Projektvision

DartClubManager ist eine moderne, skalierbare und mandantenfähige Web-Anwendung zur professionellen Verwaltung von Dart-Vereinen. Ziel ist es, die Zettelwirtschaft und den unübersichtlichen Einsatz verschiedener Tools (Excel, WhatsApp, Doodle) durch eine zentrale, integrierte Plattform abzulösen.

### 2.2. Kernfunktionen

- **Mitglieder- & Teamverwaltung**
- **Spielverwaltung** mit detailliertem **Live-Scoring**
- **Statistiken & Analytics** nach PDC/WDF-Standard
- **Trainings- & Terminverwaltung**

### 2.3. Zielgruppe

- **Primär:** Dartvereine und -abteilungen in Deutschland.
- **Sekundär:** Hobby-Ligen und private Dart-Gruppen.

---

## 3. Technologie-Stack

### 3.1. Backend

| Technologie | Version | Verwendung |
|---|---|---|
| **Java** | 21 | Programmiersprache |
| **Spring Boot** | 3.2.x | Application Framework |
| **Spring Security** | 6.x | Authentifizierung & Autorisierung |
| **Spring Data JPA** | 3.x | Datenbankabstraktion |
| **PostgreSQL** | 16 | Primäre Datenbank |
| **Flyway** | 10.x | Datenbank-Migrationen |
| **JWT (jjwt)** | 0.12.x | Token-basierte Auth |
| **Lombok** | 1.18.x | Boilerplate-Reduktion |
| **Testcontainers** | 1.19.x | Integration Testing |

### 3.2. Frontend

| Technologie | Version | Verwendung |
|---|---|---|
| **React** | 18.x | Frontend Framework |
| **TypeScript** | 5.x | Programmiersprache |
| **Redux Toolkit** | 2.x | State Management |
| **React Router** | 6.x | Navigation |
| **Axios** | 1.x | HTTP Client |
| **Vite** | 5.x | Build-Tool |

### 3.3. DevOps

| Tool | Verwendung |
|---|---|
| **Docker** | Containerisierung |
| **Docker Compose** | Lokale Entwicklungsumgebung |
| **GitHub Actions** | CI/CD Pipeline |
| **Swagger/OpenAPI** | API-Dokumentation |

---

## 4. System-Architektur

### 4.1. Schichtenarchitektur (Backend)

Die Architektur folgt einem klassischen Schichtenmodell, um eine klare Trennung der Verantwortlichkeiten zu gewährleisten.

```
┌───────────────────────────────────────────────────────┐
│                  Controller Layer                      │
│  (REST Endpoints, Request Validation, DTO-Mapping)     │
└───────────────────────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────┐
│                   Service Layer                        │
│  (Business Logic, Transaktionen, Berechnungen)         │
└───────────────────────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────┐
│                  Repository Layer                      │
│  (Datenzugriff via Spring Data JPA)                    │
└───────────────────────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────┐
│                    Entity Layer                        │
│  (JPA-Entitäten, die die DB-Tabellen abbilden)         │
└───────────────────────────────────────────────────────┘
```

### 4.2. Backend-Paketstruktur

```
com.dartclub/
├── config/         # Spring-Konfigurationen (Security, CORS, etc.)
├── controller/     # REST-API Endpunkte
├── service/        # Business-Logik
├── repository/     # Datenbank-Interfaces
├── model/          # Datenmodelle (Entities, DTOs, Enums)
├── security/       # JWT- und Security-Komponenten
├── exception/      # Globale Fehlerbehandlung
└── util/           # Hilfsklassen
```

### 4.3. Frontend-Architektur (React)

Die Frontend-Architektur ist nach Features organisiert ("Feature-First"), um eine hohe Modularität zu erreichen.

```
src/
├── main.tsx          # App-Einstiegspunkt
├── App.tsx           # Haupt-Komponente, Routing
├── app/              # Globale Logik (Store, Slices)
│   ├── store.ts      # Redux Store
│   └── ...
├── components/       # Wiederverwendbare UI-Komponenten
│   ├── ui/           # Basis-Komponenten (Button, Card, etc.)
│   └── layout/       # Layout-Komponenten (Navbar, Sidebar)
├── features/         # Einzelne App-Features (z.B. auth, matches)
│   ├── auth/
│   │   ├── AuthPage.tsx
│   │   ├── authSlice.ts
│   │   └── authApi.ts
│   └── ...
├── hooks/            # Wiederverwendbare React Hooks
├── services/         # API-Kommunikation (Axios-Instanz)
└── types/            # Globale TypeScript-Typen
```

---

## 5. Datenmodell

Das detaillierte Datenbankschema (PostgreSQL) und die daraus abgeleiteten Klassen sind in der separaten Dokumentation zu finden:

- **[Klassendokumentation](./ClassDocumentation.md)**

Alle Tabellen nutzen `UUID` als Primärschlüssel und enthalten eine `org_id` zur Gewährleistung der Mandantenfähigkeit (Multi-Tenancy).

---

## 6. Entwicklungsprozess

### 6.1. Branch-Strategie (Git Flow)

- `main`: Enthält den produktiven Code. Direkte Commits sind gesperrt.
- `develop`: Hauptentwicklungsbranch. Features werden hierhin gemerged.
- `feature/<name>`: Branch für die Entwicklung eines neuen Features.
- `bugfix/<name>`: Branch für die Behebung eines Fehlers.

**Workflow:**
1. Erstelle einen neuen `feature`-Branch von `develop`.
2. Entwickle das Feature und committe deine Änderungen.
3. Erstelle einen Pull Request von deinem `feature`-Branch nach `develop`.
4. Nach einem erfolgreichen Review wird der PR gemerged.

### 6.2. Commit-Konventionen

Wir verwenden **Conventional Commits**, um eine klare und nachvollziehbare Git-Historie zu gewährleisten.

- `feat:` Neues Feature
- `fix:` Ein Bugfix
- `docs:` Änderungen an der Dokumentation
- `style:` Code-Formatierung (keine funktionalen Änderungen)
- `refactor:` Code-Refactoring
- `test:` Hinzufügen oder Ändern von Tests
- `chore:` Build-Prozess, Dependencies, etc.

---

## 7. Lokale Entwicklungsumgebung (Setup)

### 7.1. Voraussetzungen

- Java 21+
- PostgreSQL 16+
- Docker & Docker Compose
- Node.js 20+ & npm
- Git
- IntelliJ IDEA (empfohlen für Backend), VS Code (empfohlen für Frontend)

### 7.2. Schritte

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd dartclub-manager
   ```

2. **Datenbank starten:**
   ```bash
   docker-compose up -d postgres
   ```
   Die Datenbank ist unter `localhost:5432` erreichbar.

3. **Backend starten:**
   - Öffne das Projekt im `backend`-Verzeichnis in IntelliJ.
   - Führe die Anwendung über die `bootRun`-Konfiguration von Gradle aus.
   - Das Backend läuft auf `http://localhost:8080`.

4. **Frontend starten:**
   - Wechsle in das `frontend`-Verzeichnis: `cd frontend`
   - Führe `npm install` aus, um die Dependencies zu laden.
   - Starte den Entwicklungsserver mit `npm run dev`.
   - Das Frontend läuft auf `http://localhost:5173` (oder einem anderen von Vite angegebenen Port).

---

## 8. Roadmap

Die Entwicklung ist in Phasen und Sprints unterteilt.

- **Phase 1 (MVP):** Auth, Mitglieder, Teams, Match-Verwaltung, Live-Scoring, Termine, Beiträge, Statistiken.
- **Phase 2 (Growth):** Turniermodus, erweiterte Statistiken, In-App-Chat, Multi-Language.
- **Phase 3 (Scale):** Premium-Features, White-Label-Fähigkeit, API für Drittanbieter.

Die detaillierte Sprint-Planung ist im `README.md` zu finden.
