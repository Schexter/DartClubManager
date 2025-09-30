# 📚 Dokumentationsordner

Dieser Ordner enthält die erweiterte technische Projektdokumentation für DartClubManager.

---

## 📂 Aktuelle Struktur

```
/docs/
├── README.md                      # ← Diese Datei
├── ProjectDocumentation.md        # Detaillierte Projekt-Dokumentation
├── ClassDocumentation.md          # Datenmodelle (Backend & Frontend)
└── database_schema.md             # Datenbank-Schema & Migrations
```

---

## 📖 Dokument-Übersicht

### 1. **ProjectDocumentation.md**
**Zweck:** Zentrale technische Projektdokumentation  
**Enthält:**
- Projektteam und Rollen
- Executive Summary & Vision
- Vollständiger Technologie-Stack (Backend & Frontend)
- System-Architektur (Schichtenmodell)
- Backend-Paketstruktur (Spring Boot)
- Frontend-Architektur (React Feature-First)
- Entwicklungsprozess & Git-Workflow
- Lokale Entwicklungsumgebung Setup
- Roadmap (MVP → Growth → Scale)

**Zielgruppe:** Alle Entwickler, Product Owner, neue Team-Mitglieder

---

### 2. **ClassDocumentation.md**
**Zweck:** Datenmodell-Referenz  
**Enthält:**
- **Backend:** Java/JPA Entity-Klassen (Organization, User, Member, Team, Match, etc.)
- **Frontend:** TypeScript Interfaces (entsprechend den Backend-Entities)
- Variablen-Namen, Datentypen, Beschreibungen
- Beziehungen zwischen Entities

**Zielgruppe:** Backend-Entwickler, Frontend-Entwickler, Datenbank-Admins

---

### 3. **database_schema.md**
**Zweck:** Vollständiges PostgreSQL-Datenbankschema  
**Enthält:**
- CREATE TABLE Statements für alle Tabellen
- Indices, Constraints, Foreign Keys
- Row Level Security (RLS) Policies
- Flyway-Migrations-Strategie
- Triggers & Functions

**Zielgruppe:** Backend-Entwickler, Datenbank-Admins, DevOps

---

## 🎯 Was gehört in docs/?

### ✅ **Sollte in docs/ sein:**
- **Architektur-Entscheidungen (ADRs)** - Warum wurde was wie gemacht?
- **Technische Diagramme** - System-Übersichten, ER-Diagramme, Sequenzdiagramme
- **Best Practices** - Code-Standards, Conventions, Patterns
- **Deployment-Guides** - Wie wird deployed? (Docker, Cloud)
- **API-Spezifikationen** - Erweiterte API-Dokumentation (zusätzlich zu Swagger)
- **Datenbank-Design** - Schema, Migrationen, Optimierungen
- **Security-Konzepte** - Auth-Flow, JWT, RLS, CORS

### ❌ **Sollte NICHT in docs/ sein:**
- **Code-Kommentare** - Gehören in den Code selbst
- **Temporäre Notizen** - Besser in /logs/ oder direkt löschen
- **API-Credentials** - Gehören in .env oder Secrets Manager
- **Build-Artefakte** - Gehören in .gitignore
- **Chat-Verläufe** - Gehören in /logs/ (nur bei aktiven Projekten)

---

## 🚧 Geplante Erweiterungen

In zukünftigen Sprints werden folgende Dokumente hinzugefügt:

### `/docs/architecture/` (geplant)
- `system-overview.md` - High-Level System-Diagramm
- `api-design.md` - REST-API Design-Prinzipien
- `security-architecture.md` - JWT, Multi-Tenancy, RLS

### `/docs/development/` (geplant)
- `coding-standards.md` - Java & TypeScript Conventions
- `git-workflow.md` - Detaillierter Git-Flow & PR-Prozess
- `testing-strategy.md` - Unit, Integration, E2E Tests

### `/docs/deployment/` (geplant)
- `docker-setup.md` - Docker & Docker Compose Details
- `production-config.md` - Produktions-Umgebung (Cloud)
- `ci-cd-pipeline.md` - GitHub Actions Workflows

### `/docs/user-guides/` (geplant)
- `admin-guide.md` - Benutzer-Handbuch für Admins
- `trainer-guide.md` - Benutzer-Handbuch für Trainer
- `player-guide.md` - Benutzer-Handbuch für Spieler

### `/docs/decisions/` (geplant)
- `001-technology-stack.md` - Warum Spring Boot + React?
- `002-multi-tenancy-approach.md` - Warum Row Level Security?
- `003-authentication-strategy.md` - Warum JWT?

---

## 📝 Dokumentations-Standards

### Markdown-Format
- Nutze **Überschriften** für Struktur (H1, H2, H3)
- Nutze **Code-Blöcke** mit Syntax-Highlighting
- Nutze **Tabellen** für strukturierte Daten
- Nutze **Diagramme** (Mermaid) für Visualisierungen
- Füge **Inhaltsverzeichnis** bei langen Dokumenten hinzu

### Versionierung
- Jedes Dokument hat **Version** und **Stand**-Datum
- Bei größeren Änderungen: Version erhöhen
- Bei kleineren Updates: Stand-Datum aktualisieren

### Signatur
Alle Dokumente enden mit:
```markdown
---
**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** X.X  
**Stand:** DD.MM.YYYY
```

---

## 🔄 Wartung & Updates

### Wann sollten Dokumente aktualisiert werden?

| Situation | Dokument | Aktion |
|---|---|---|
| Neue Entity/Tabelle | ClassDocumentation.md, database_schema.md | Ergänzen |
| Architektur-Änderung | ProjectDocumentation.md | Aktualisieren |
| Neue Dependency | ProjectDocumentation.md | Tech-Stack erweitern |
| Neuer API-Endpoint | API-Dokumentation (Swagger) | Automatisch generiert |
| Deployment-Änderung | deployment/ (geplant) | Neue Anleitung |
| Wichtige Entscheidung | decisions/ (geplant) | ADR erstellen |

---

## 🔗 Verwandte Dateien

- **[../README.md](../README.md)** - Haupt-Projektdokumentation (Überblick)
- **[../TODO.md](../TODO.md)** - Meilensteine & Aufgaben
- **[../CHANGELOG.md](../CHANGELOG.md)** - Entwicklungsprotokoll
- **[../PROJEKTSTRUKTUR.md](../PROJEKTSTRUKTUR.md)** - Ordnerstruktur-Übersicht
- **[../FRONTEND-QUICKSTART.md](../FRONTEND-QUICKSTART.md)** - Frontend Setup-Guide

---

## 💡 Tipps für neue Team-Mitglieder

### Start-Reihenfolge für neue Entwickler:
1. **[../README.md](../README.md)** - Projekt-Überblick verstehen
2. **[ProjectDocumentation.md](./ProjectDocumentation.md)** - Architektur & Tech-Stack lernen
3. **[../PROJEKTSTRUKTUR.md](../PROJEKTSTRUKTUR.md)** - Ordnerstruktur verstehen
4. **[ClassDocumentation.md](./ClassDocumentation.md)** - Datenmodell kennenlernen
5. **[database_schema.md](./database_schema.md)** - Datenbank-Schema studieren
6. **[../TODO.md](../TODO.md)** - Aktuelle Aufgaben sehen

### Lokale Entwicklung starten:
1. **[../FRONTEND-QUICKSTART.md](../FRONTEND-QUICKSTART.md)** für Frontend
2. **[ProjectDocumentation.md - Kapitel 7](./ProjectDocumentation.md#7-lokale-entwicklungsumgebung-setup)** für Backend

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 2.0  
**Stand:** 30.09.2025
