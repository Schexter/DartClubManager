# 🎯 DartClubManager

**Eine umfassende Dart-Vereinsverwaltungs-Software mit Multi-Tenancy-Unterstützung**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-27+-blue.svg)](https://www.docker.com/)

Erstellt von Hans Hahn - Alle Rechte vorbehalten

---

## 📖 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Architektur](#architektur)
- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Nutzung](#nutzung)
- [Entwicklung](#entwicklung)

---

## 🎯 Über das Projekt

DartClubManager ist eine moderne, skalierbare Web-Anwendung zur Verwaltung von Dart-Vereinen, entwickelt mit einem Spring Boot Backend und einem React Frontend.

---

## ✨ Features

- **Mitgliederverwaltung**
- **Spielverwaltung** mit Live-Scoring
- **Statistiken & Analytics**
- **Trainingsverwaltung**
- **Multi-Tenancy-fähig**

---

## 🛠️ Technologie-Stack

### Backend

| Technologie | Version | Verwendung |
|---|---|---|
| **Java** | 21 | Programmiersprache |
| **Spring Boot** | 3.2.x | Application Framework |
| **PostgreSQL** | 16 | Primäre Datenbank |
| **Flyway** | 10.x | Datenbank-Migrationen |

### Frontend

| Technologie | Version | Verwendung |
|---|---|---|
| **React** | 18.x | Frontend Framework |
| **TypeScript** | 5.x | Programmiersprache |
| **Redux Toolkit** | 2.x | State Management |
| **React Router** | 6.x | Navigation |
| **Axios** | 1.x | HTTP Client |
| **Vite** | 5.x | Build-Tool |

### DevOps

| Tool | Verwendung |
|---|---|
| **Docker** | Containerisierung |
| **Docker Compose** | Lokale Entwicklungsumgebung |
| **GitHub Actions** | CI/CD Pipeline |

---

## 🏗️ Architektur

### Backend-Paketstruktur (Spring Boot)

```
com.dartclub/
├── controller/     # REST-API Endpunkte
├── service/        # Business-Logik
├── repository/     # Datenbank-Interfaces
├── model/          # Datenmodelle (Entities, DTOs)
└── security/       # Security-Komponenten
```

### Frontend-Architektur (React)

```
src/
├── App.tsx           # Haupt-Komponente, Routing
├── app/              # Redux Store Konfiguration
├── components/       # Wiederverwendbare UI-Komponenten
├── features/         # Einzelne App-Features (z.B. auth, matches)
├── services/         # API-Kommunikation
└── types/            # Globale TypeScript-Typen
```

---

## ⚙️ Voraussetzungen

**WICHTIG:** Diese Software muss VOR der Projekt-Installation auf deinem System vorhanden sein!

### **Erforderlich (MUST):**

| Software | Min. Version | Download | Prüfung |
|---|---|---|---|
| **Java JDK** | 21+ | [Download](https://adoptium.net/) | `java -version` |
| **Docker Desktop** | 27+ | [Download](https://www.docker.com/products/docker-desktop/) | `docker --version` |
| **Node.js** | 20+ | [Download](https://nodejs.org/) | `node --version` |
| **npm** | 10+ | (mit Node.js) | `npm --version` |
| **Git** | 2.40+ | [Download](https://git-scm.com/) | `git --version` |

### **Optional (für Komfort):**

| Software | Verwendung | Download |
|---|---|---|
| **IntelliJ IDEA** | Backend-Entwicklung | [Download](https://www.jetbrains.com/idea/) |
| **VS Code** | Frontend-Entwicklung | [Download](https://code.visualstudio.com/) |
| **Postman** | API-Testing | [Download](https://www.postman.com/) |
| **pgAdmin** | DB-Verwaltung | [Download](https://www.pgadmin.org/) |

---

## 📦 Installation

### **Schritt 1: Voraussetzungen prüfen**

Öffne PowerShell/Terminal und prüfe, ob alle Tools installiert sind:

```powershell
# Java prüfen
java -version
# Erwartete Ausgabe: openjdk version "21.x.x"

# Docker prüfen
docker --version
# Erwartete Ausgabe: Docker version 27.x.x

# Node.js prüfen
node --version
# Erwartete Ausgabe: v20.x.x

# npm prüfen
npm --version
# Erwartete Ausgabe: 10.x.x

# Git prüfen
git --version
# Erwartete Ausgabe: git version 2.x.x
```

**Falls eine Software fehlt:** Installiere sie zuerst über die Links oben!

---

### **Schritt 2: Repository klonen**

```bash
git clone <repository-url>
cd dartclub-manager
```

---

### **Schritt 3: Backend starten (startet automatisch PostgreSQL)**

**AUTOMATISCH:** Das Backend startet PostgreSQL automatisch über Docker Compose!

```bash
cd "Dart App/backend"

# Windows:
gradlew.bat bootRun

# Linux/Mac:
./gradlew bootRun
```

Das Backend:
- ✅ Startet automatisch PostgreSQL via Docker Compose
- ✅ Führt Datenbank-Migrationen aus (Flyway)
- ✅ Stoppt PostgreSQL beim Beenden automatisch
- ✅ Läuft auf http://localhost:8080

**Erwartete Ausgabe:**
```
NAME                IMAGE                COMMAND                  SERVICE    CREATED         STATUS                   PORTS
dartclub-postgres   postgres:16-alpine   "docker-entrypoint.s…"   postgres   10 seconds ago  Up 9 seconds (healthy)   0.0.0.0:5432->5432/tcp
```

---

### **Schritt 4: Frontend starten**

```bash
cd frontend

# Dependencies installieren (nur beim ersten Mal)
npm install

# Dev-Server starten
npm run dev
```

**Erfolgreich, wenn:**
```
  VITE v5.1.6  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Frontend läuft auf:** http://localhost:5173

---

## 🚀 Nutzung

### **Erste Schritte:**

1. **Öffne Browser:** http://localhost:5173
2. **Registriere einen Account** oder nutze Test-User:
   - E-Mail: `admin@falcons.de`
   - Passwort: `Test123!`
3. **Erkunde die Features!**

### **API-Dokumentation:**

- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **Health Check:** http://localhost:8080/api/health

---

## 👨‍💻 Entwicklung

### **Branch-Strategie:**

Wir verwenden **Git Flow**:
- `main` - Produktiv-Branch (nur stable Releases)
- `develop` - Development-Branch (aktuelle Entwicklung)
- `feature/*` - Feature-Branches
- `hotfix/*` - Hotfix-Branches

### **Commit-Messages:**

Wir verwenden **Conventional Commits**:
```
feat: Add user registration endpoint
fix: Fix JWT token expiration bug
docs: Update README with Docker setup
test: Add unit tests for AuthService
```

### **Code-Style:**

- **Backend:** Google Java Style Guide
- **Frontend:** Airbnb JavaScript Style Guide
- **Automatisch:** ESLint + Prettier

---

## 🔧 Troubleshooting

### **Problem: "Port 8080 already in use"**

```bash
# Prüfe, was auf Port 8080 läuft
netstat -ano | findstr :8080

# Stoppe Backend
# Ändere Port in application.yml: server.port=8081
```

### **Problem: "Port 5432 already in use"**

```bash
# Stoppe andere PostgreSQL-Instanz oder
# Ändere Port in compose.yaml:
ports:
  - '5433:5432'
```

### **Problem: Docker Container startet nicht**

```bash
# Logs prüfen
docker compose logs postgres

# Container neu starten
docker compose restart postgres

# Alles neu aufbauen (löscht auch Daten!)
docker compose down -v
docker compose up -d
```

### **Problem: "Flyway migration failed"**

```bash
# Datenbank zurücksetzen
docker compose down -v
docker compose up -d

# Backend neu starten
./gradlew bootRun
```

---

## 📞 Support

Bei Fragen oder Problemen:
1. Prüfe [Troubleshooting](#troubleshooting)
2. Schaue in [GitHub Issues](link-to-issues)
3. Kontaktiere das Entwickler-Team

---

## 📄 Lizenz

Copyright © 2025 Hans Hahn - Alle Rechte vorbehalten

---

**Happy Coding! 🎯**
