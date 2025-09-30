# 🎯 DartClubManager

**Eine umfassende Dart-Vereinsverwaltungs-Software mit Multi-Tenancy-Unterstützung**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)

---

## 📖 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Architektur](#architektur)
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

## 📦 Installation

### Voraussetzungen

- Java 21+
- Docker & Docker Compose
- Node.js 20+ & npm
- Git

### 1. Repository klonen

```bash
git clone <repository-url>
cd dartclub-manager
```

### 2. Services starten

```bash
docker-compose up -d
```

### 3. Backend starten

- Öffne das `backend`-Verzeichnis in deiner IDE.
- Starte die Spring Boot Anwendung.

### 4. Frontend starten

```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Entwicklung

Wir verwenden **Conventional Commits** für eine saubere Git-Historie und **Git Flow** als Branch-Strategie.
