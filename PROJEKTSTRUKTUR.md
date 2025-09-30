# 📦 DartClubManager - Projekt-Struktur

**Version:** 2.0  
**Stand:** 30.09.2025  
**Tech-Stack:** Spring Boot (Backend) + React (Frontend)

---

## 🌳 Aktuelle Verzeichnis-Struktur

```
C:\SoftwareEntwicklung\DartClubManager\Dart App\
│
├── 📄 README.md                    # ✅ Vollständige Projektdokumentation
├── 📄 TODO.md                      # ✅ Meilensteine und Aufgabenliste
├── 📄 CHANGELOG.md                 # ✅ Entwicklungsprotokoll
├── 📄 error.log                    # ✅ Fehlerprotokoll
├── 📄 PROJEKTSTRUKTUR.md           # ✅ Diese Datei
├── 📄 FRONTEND-QUICKSTART.md       # ✅ Frontend Setup-Guide
│
├── 📁 docs/                        # Erweiterte Dokumentation
│   ├── README.md                   # Erklärung des docs-Ordners
│   ├── ProjectDocumentation.md     # Detaillierte Projekt-Doku
│   ├── ClassDocumentation.md       # Datenmodelle (Backend & Frontend)
│   └── database_schema.md          # Datenbank-Schema
│
├── 📁 logs/                        # Chat-Verläufe (nur bei aktiven Projekten)
│   └── README.md                   # Nutzungsrichtlinien für logs
│
├── 📁 backend/                     # ⚙️ BACKEND (Spring Boot)
│   ├── 📁 src/
│   │   ├── 📁 main/
│   │   │   ├── 📁 java/
│   │   │   │   └── 📁 com/
│   │   │   │       └── 📁 dartclub/
│   │   │   │           ├── DartClubApplication.java  # Main-Klasse
│   │   │   │           ├── 📁 config/                # Spring Config (Security, CORS)
│   │   │   │           ├── 📁 controller/            # REST-API Endpunkte
│   │   │   │           ├── 📁 service/               # Business-Logik
│   │   │   │           ├── 📁 repository/            # Datenbank-Interfaces (JPA)
│   │   │   │           ├── 📁 model/                 # Entities, DTOs, Enums
│   │   │   │           ├── 📁 security/              # JWT, Auth-Filter
│   │   │   │           └── 📁 exception/             # Fehlerbehandlung
│   │   │   │
│   │   │   └── 📁 resources/
│   │   │       ├── application.yml                   # Spring Boot Config
│   │   │       └── 📁 db/
│   │   │           └── 📁 migration/                 # Flyway-Migrations
│   │   │               └── V1__init_schema.sql
│   │   │
│   │   └── 📁 test/                                  # Unit & Integration Tests
│   │       └── 📁 java/
│   │           └── 📁 com/
│   │               └── 📁 dartclub/
│   │
│   ├── build.gradle                                  # Gradle Build-Script
│   └── settings.gradle                               # Gradle Settings
│
├── 📁 frontend/                    # 🎨 FRONTEND (React + TypeScript)
│   ├── 📁 src/
│   │   ├── main.tsx                                  # App-Einstiegspunkt
│   │   ├── App.tsx                                   # Haupt-Komponente, Routing
│   │   │
│   │   ├── 📁 components/                            # Wiederverwendbare UI-Komponenten
│   │   │   ├── 📁 ui/                                # Basis-Komponenten (Button, Card)
│   │   │   └── 📁 layout/                            # Layout-Komponenten (Navbar, Sidebar)
│   │   │
│   │   ├── 📁 features/                              # Feature-basierte Struktur
│   │   │   ├── 📁 auth/                              # Authentifizierung
│   │   │   │   └── LoginScreen.tsx
│   │   │   ├── 📁 dashboard/                         # Dashboard
│   │   │   │   └── DashboardScreen.tsx
│   │   │   └── 📁 matches/                           # Match-Management
│   │   │       ├── MatchListScreen.tsx
│   │   │       └── LiveScoringScreen.tsx
│   │   │
│   │   ├── 📁 lib/                                   # Utilities & Services
│   │   │   ├── 📁 api/                               # API-Kommunikation (Axios)
│   │   │   └── 📁 utils/                             # Hilfs-Funktionen
│   │   │
│   │   └── 📁 styles/                                # Globale Styles (Tailwind)
│   │       └── index.css
│   │
│   ├── 📁 public/                                    # Statische Assets
│   ├── index.html                                    # HTML-Template
│   ├── package.json                                  # NPM-Dependencies
│   ├── vite.config.ts                                # Vite-Konfiguration
│   ├── tsconfig.json                                 # TypeScript-Config
│   └── tailwind.config.js                            # Tailwind CSS Config
│
├── 📁 .gradle/                     # Gradle Build-Dateien
├── 📁 .idea/                       # IntelliJ IDEA Config
├── 📁 gradle/                      # Gradle Wrapper
│
├── 📄 build.gradle                 # Root-Gradle Build-Script
├── 📄 settings.gradle              # Root-Gradle Settings
├── 📄 gradlew                      # Gradle Wrapper (Unix)
├── 📄 gradlew.bat                  # Gradle Wrapper (Windows)
├── 📄 compose.yaml                 # Docker Compose Config
├── 📄 .gitignore                   # Git Ignore Rules
└── 📄 .gitattributes               # Git Attributes

```

---

## 🛠️ Technologie-Stack

### Backend
- **Java** 21
- **Spring Boot** 3.2.x
- **Spring Security** (JWT-basiert)
- **Spring Data JPA**
- **PostgreSQL** 16
- **Flyway** (DB-Migrationen)
- **Gradle** (Build-Tool)

### Frontend
- **React** 18.x
- **TypeScript** 5.x
- **Redux Toolkit** (State Management)
- **React Router** 6.x
- **Axios** (HTTP Client)
- **Vite** 5.x (Build-Tool)
- **Tailwind CSS** (Styling)

### DevOps
- **Docker** & Docker Compose
- **PostgreSQL** in Container
- **GitHub Actions** (CI/CD - geplant)

---

## ✅ Abgeschlossen (Meilenstein 1 - Teilweise)

### Dokumentation (100% ✅)
- [x] README.md - Umfassend, professionell, vollständig
- [x] TODO.md - 5 klare Meilensteine mit Definition of Done
- [x] CHANGELOG.md - Strukturiertes Entwicklungsprotokoll
- [x] error.log - Fehler-Tracking vorbereitet
- [x] PROJEKTSTRUKTUR.md - Übersicht über Verzeichnisse
- [x] docs/ - Erweiterte technische Dokumentation

### Projekt-Setup (85% ✅)
- [x] Spring Boot Backend initialisiert (Java 21, Gradle)
- [x] React Frontend initialisiert (TypeScript, Vite)
- [x] Dependencies konfiguriert
- [x] Git Repository initialisiert
- [x] Ordnerstruktur angelegt (backend/, frontend/, docs/, logs/)
- [x] Package-Struktur definiert (`com.dartclub`)
- [x] Docker Compose Setup

### Noch offen (15% ⏳)
- [ ] Docker Compose testen (PostgreSQL-Verbindung prüfen)
- [ ] Backend application.yml konfigurieren
- [ ] Health-Controller erstellen
- [ ] Swagger/OpenAPI Setup
- [ ] GitHub Actions CI/CD Pipeline
- [ ] Frontend Redux Store Setup
- [ ] API Service Layer (Axios) implementieren

---

## 🎯 Nächste Schritte (Session 2)

### 1. Docker-Umgebung testen
```bash
docker-compose up -d
```

### 2. Backend: application.yml erstellen
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/dartclub
    username: dartclub
    password: dartclub_dev_password
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
```

### 3. Frontend: API Service einrichten
```typescript
// src/lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 4. Health-Controller implementieren (Backend)
```java
@RestController
@RequestMapping("/api/health")
public class HealthController {
    @GetMapping
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
```

### 5. Erste Flyway-Migration
```sql
-- V1__init_schema.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📊 Projekt-Status

**Fortschritt:** 📈 ~20% (Meilenstein 1 von 5 zu 85% abgeschlossen)

**Aktueller Fokus:** Foundation & Setup  
**Nächster Meilenstein:** Authentifizierung & Multi-Tenancy  
**Team-Readiness:** ✅ Dokumentation komplett, Team kann starten

---

## 🔍 Quality-Check

### Code-Qualität
- ✅ Projektstruktur folgt Best Practices
- ✅ Package-Naming-Convention eingehalten (Backend)
- ✅ Feature-First-Struktur implementiert (Frontend)
- ✅ Alle obligatorischen Dateien vorhanden
- ⏳ Code-Coverage (noch keine Tests)

### Dokumentation
- ✅ README.md vollständig und professionell
- ✅ TODO.md mit klaren Meilensteinen
- ✅ CHANGELOG.md strukturiert
- ✅ Ordnerstruktur dokumentiert
- ✅ Technische Dokumentation in docs/

### DevOps
- ⏳ CI/CD Pipeline (noch nicht erstellt)
- ✅ Docker-Setup (vorhanden, noch ungetestet)
- ⏳ Testing-Setup (noch keine Tests)

---

## 🎓 Learnings & Entscheidungen

### Warum Spring Boot (Backend)?
- ✅ Team-Expertise in Java
- ✅ Große Community und Ressourcen
- ✅ Exzellente Integration für REST-APIs
- ✅ Spring Security für Auth out-of-the-box
- ✅ Hervorragende Testbarkeit

### Warum React + TypeScript (Frontend)?
- ✅ **React:** Größte Community, beste Job-Markt-Chancen
- ✅ **TypeScript:** Type-Safety verhindert Fehler
- ✅ **Vite:** Schnellste Build-Performance
- ✅ **Redux Toolkit:** Bewährtes State Management
- ✅ **Cross-Platform:** Web-App funktioniert überall

### Warum PostgreSQL?
- ✅ **Row Level Security** - Perfekt für Multi-Tenancy
- ✅ Robustheit und ACID-Compliance
- ✅ Kostenlos und Open Source
- ✅ Exzellente Flyway-Integration
- ✅ JSON-Support für flexible Datenstrukturen

### Warum Gradle?
- ✅ Moderne Build-Tool-Syntax (Groovy/Kotlin)
- ✅ Flexibler als Maven
- ✅ Schnellere Builds durch Caching
- ✅ Spring Initializr Standard

---

## 📁 Ordner-Zwecke

### `/backend/`
- Enthält den kompletten Spring Boot Backend-Code
- Eigenständiges Gradle-Projekt
- REST-API für Frontend
- Business-Logik & Datenbankzugriff

### `/frontend/`
- Enthält die komplette React-Anwendung
- Eigenständiges NPM-Projekt
- UI/UX, State Management
- API-Kommunikation mit Backend

### `/docs/`
- Erweiterte technische Dokumentation
- Architektur-Entscheidungen
- Datenmodell-Dokumentation
- Deployment-Guides (geplant)

### `/logs/`
- Chat-Verläufe bei aktiver Entwicklung
- Technische Entscheidungen dokumentieren
- **Nicht für allgemeine Notizen**

---

## 📞 Team-Kommunikation

### Scrum-Struktur
- **Sprint-Dauer:** 2 Wochen
- **Daily Standup:** 15 Minuten (optional bei Remote-Team)
- **Sprint Planning:** Montags
- **Sprint Review:** Freitags
- **Retrospektive:** Nach jedem Sprint

### Rollen & Verantwortlichkeiten
| Rolle | Anzahl | Verantwortung |
|---|---|---|
| **Product Owner** | 1 (Hans Hahn) | Vision, Priorisierung, Stakeholder |
| **Backend-Devs** | 2 (Lukas, Dennis) | Spring Boot API, Business-Logik |
| **Frontend-Devs** | 2 (Svenja, Francesco) | React UI, State Management |
| **DB & Springer** | 1 (David) | PostgreSQL, Flyway, Support |
| **Springer** | 1 (Frank) | Flexible Unterstützung überall |

---

## 🚀 Entwicklungs-Workflow

### Branch-Strategie (Git Flow)
```
main ← Production-ready Code
  └─ develop ← Active Development
       ├─ feature/auth-login
       ├─ feature/match-scoring
       └─ bugfix/login-validation
```

### Commit-Konventionen
- `feat:` Neues Feature
- `fix:` Ein Bugfix
- `docs:` Dokumentations-Änderungen
- `style:` Code-Formatierung
- `refactor:` Code-Refactoring
- `test:` Tests hinzufügen/ändern
- `chore:` Build, Dependencies

---

## 🔐 Umgebungsvariablen

### Backend (.env oder application.yml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/dartclub
    username: dartclub
    password: ${DB_PASSWORD}
  security:
    jwt:
      secret: ${JWT_SECRET}
      expiration: 86400000  # 24 hours
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=DartClubManager
```

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 2.0  
**Stand:** 30.09.2025
