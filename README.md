# 🎯 DartClub Manager

**Eine moderne, umfassende Dart-Vereinsverwaltungs-Software mit Multi-Tenancy-Unterstützung**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.10-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-28+-blue.svg)](https://www.docker.com/)

**Erstellt von Hans Hahn - Alle Rechte vorbehalten © 2025**

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

### 🔐 Authentifizierung & Organisation
- **JWT-basierte Authentifizierung** - Sichere Token-basierte Anmeldung
- **Multi-Tenancy-Unterstützung** - Mehrere Vereine in einer Instanz
- **Organisation erstellen/beitreten** - Flexible Organisationsverwaltung
- **Rollenbasierte Zugriffskontrolle** - Admin, Trainer, Captain, Player

### 👥 Mitgliederverwaltung
- **Mitgliederprofile** - Vollständige Spielerdaten
- **CSV-Import** - Massenimport von Mitgliedern
- **Avatar-Upload** - Profilbilder hochladen
- **Status-Verwaltung** - Aktiv/Inaktiv

### 🎯 Spielverwaltung
- **Match-Erstellung** - Spiele planen und organisieren
- **Live-Scoring** - Echtzeit-Punktevergabe während des Spiels
- **Set & Leg Tracking** - Detaillierte Spielverfolgung
- **Checkout-Vorschläge** - Automatische Finish-Empfehlungen

### 📊 Statistiken & Analytics
- **Spielerstatistiken** - Durchschnitte, Checkout-Quote, Form
- **Team-Statistiken** - Mannschaftsleistung analysieren
- **Saisonübersicht** - Langzeitanalysen

### 📅 Events & Termine
- **Trainingsplanung** - Trainingstermine verwalten
- **Event-Kalender** - Alle Termine auf einen Blick
- **Benachrichtigungen** - Automatische Erinnerungen

### 🎨 Design & UX
- **Modernes UI** - Inspiriert von Linear, Vercel, Stripe
- **Responsive Design** - Mobile-First Ansatz
- **Dark Mode Ready** - Vorbereitet für Dunkelmodus
- **Glassmorphism** - Moderne Designelemente

---

## 🛠️ Technologie-Stack

### Backend

| Technologie | Version | Verwendung |
|---|---|---|
| **Java** | 21.0.7 | Programmiersprache |
| **Spring Boot** | 3.5.6 | Application Framework |
| **Spring Security** | 6.5.5 | Authentifizierung & Autorisierung |
| **Spring Data JPA** | 3.5.6 | ORM & Datenbankzugriff |
| **PostgreSQL** | 16.10 | Primäre Datenbank |
| **Flyway** | 10.x | Datenbank-Migrationen |
| **JJWT** | 0.12.x | JWT Token Handling |
| **Lombok** | 1.18.x | Code-Generierung |
| **Gradle** | 8.10 | Build-Tool |

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

### **Schritt 2: Projekt öffnen**

```bash
# Navigiere zum Projektverzeichnis
cd "C:\SoftwareEntwicklung\DartClubManager\Dart App"

# oder wo auch immer dein Projekt liegt
cd "/path/to/your/DartClubManager/Dart App"
```

---

### **Schritt 3: Backend starten (startet automatisch PostgreSQL)**

**AUTOMATISCH:** Das Backend startet PostgreSQL automatisch über Docker Compose!

**⚠️ WICHTIG:** Docker Desktop muss laufen!

```bash
# Navigiere zum Backend-Verzeichnis
cd backend

# Windows (PowerShell):
.\gradlew.bat bootRun

# Linux/Mac:
./gradlew bootRun
```

**Das Backend macht automatisch:**
1. ✅ Prüft ob Java, Docker und PostgreSQL verfügbar sind
2. ✅ Startet PostgreSQL Container (Port 5434)
3. ✅ Führt Datenbank-Migrationen aus (Flyway)
4. ✅ Startet Spring Boot Server (Port 8080)

**Erwartete Ausgabe beim ersten Start:**
```
=== DartClub Manager Setup Check ===
✓ Java Version: 21.0.7
✓ Docker: Docker version 28.4.0
✓ Docker Compose: Docker Compose version v2.39.4-desktop.1
=== Setup Check abgeschlossen ===

Creating dartclub-postgres-fresh ... done
...
Started Application in 8.155 seconds (process running for 8.641)
```

**Backend läuft auf:** http://localhost:8080
**PostgreSQL läuft auf:** localhost:5434

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

2. **Registriere einen neuen Account:**
   - Klicke auf "Registrieren"
   - Gib deine Daten ein (E-Mail, Name, Passwort)
   - Nach erfolgreicher Registrierung wirst du eingeloggt

3. **Organisation erstellen:**
   - Du siehst den Onboarding-Screen
   - Wähle "Organisation gründen"
   - Gib Namen, Slug und Farben ein
   - Klicke auf "Organisation gründen"

4. **Erkunde die Features!**
   - Dashboard mit Übersicht
   - Mitglieder verwalten
   - Matches erstellen
   - Live-Scoring nutzen

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

**Windows:**
```powershell
# Prüfe, was auf Port 8080 läuft
netstat -ano | findstr :8080

# Finde Prozess-ID und beende ihn
taskkill /PID <PID> /F

# ODER: Ändere Port in application.yml
server.port=8081
```

**Linux/Mac:**
```bash
# Prüfe, was auf Port 8080 läuft
lsof -i :8080

# Beende Prozess
kill -9 <PID>
```

### **Problem: "Port 5434 already in use"**

```bash
# Stoppe andere PostgreSQL-Instanz
docker compose -f compose.yaml down

# ODER: Ändere Port in compose.yaml und application.yml
# compose.yaml:
ports:
  - '5435:5432'

# application.yml:
datasource:
  url: jdbc:postgresql://localhost:5435/dartclub
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

## ❓ Häufig gestellte Fragen (FAQ)

### **Wie stoppe ich die Anwendung?**

**Backend stoppen:**
- Im Terminal: `Strg+C` (Windows) oder `Cmd+C` (Mac)
- PostgreSQL wird automatisch gestoppt

**Frontend stoppen:**
- Im Terminal: `Strg+C` (Windows) oder `Cmd+C` (Mac)

### **Wo finde ich die Datenbank?**

Die PostgreSQL-Datenbank läuft in Docker:
- **Host:** localhost
- **Port:** 5434
- **Datenbank:** dartclub
- **User:** dartclub_user
- **Passwort:** dartclub_password

**Mit pgAdmin verbinden:**
1. Öffne pgAdmin
2. Rechtsklick auf "Servers" → "Register" → "Server"
3. Name: `DartClub Local`
4. Connection: Host=`localhost`, Port=`5434`, Database=`dartclub`
5. Username: `dartclub_user`, Password: `dartclub_password`

### **Wie setze ich die Datenbank zurück?**

```bash
# Stoppe Backend (Strg+C)

# Lösche alle Daten und Container
cd backend
docker compose -f compose.yaml down -v

# Starte Backend neu (erstellt neue DB)
.\gradlew.bat bootRun  # Windows
./gradlew bootRun      # Linux/Mac
```

### **Kann ich mehrere Organisationen haben?**

Ja! Das System ist Multi-Tenancy-fähig:
- Ein User kann mehreren Organisationen beitreten
- Jede Organisation hat eigene Daten (Mitglieder, Matches, etc.)
- Der JWT-Token enthält die aktuelle Organisation

### **Wo werden die Logs gespeichert?**

**Backend-Logs:**
- Terminal-Ausgabe (während Backend läuft)
- Optional: `backend/logs/` (falls konfiguriert)

**Frontend-Logs:**
- Browser Console (F12 → Console)

**PostgreSQL-Logs:**
```bash
docker compose -f compose.yaml logs postgres
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
