# 🎯 DartClubManager

**Eine umfassende Dart-Vereinsverwaltungs-Software mit Multi-Tenancy-Unterstützung**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
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

DartClubManager ist eine moderne, skalierbare **Web-Anwendung** zur Verwaltung von Dart-Vereinen. Das System wurde entwickelt, um Vereinen aller Größenordnungen eine professionelle Plattform für:

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
- **Offline-First**: Kritische Funktionen auch ohne Internetverbindung nutzbar (via IndexedDB)
- **Skalierbar**: Von 20 bis 2000+ Mitglieder - die Architektur wächst mit
- **Responsive Design**: Optimiert für alle Bildschirmgrößen

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
- Native Mobile Apps (iOS/Android via React Native)

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

### Frontend

| Technologie | Version | Verwendung |
|-------------|---------|------------|
| **React** | 18.x | UI Framework |
| **TypeScript** | 5.x | Programmiersprache (Type Safety) |
| **Vite** | 5.x | Build Tool & Dev Server |
| **React Router** | 6.x | Client-Side Routing |
| **TanStack Query (React Query)** | 5.x | Server State Management |
| **Zustand** | 4.x | Client State Management |
| **Tailwind CSS** | 3.x | Utility-First CSS Framework |
| **shadcn/ui** | latest | UI Component Library |
| **Axios** | 1.x | HTTP Client |
| **React Hook Form** | 7.x | Form Handling |
| **Zod** | 3.x | Schema Validation |
| **date-fns** | 3.x | Date Utilities |
| **Recharts** | 2.x | Chart Library |
| **Vitest** | 1.x | Testing Framework |
| **Testing Library** | latest | React Testing |
| **Playwright** | 1.x | E2E Testing |

### DevOps

| Tool | Verwendung |
|------|------------|
| **Docker** | Containerisierung |
| **Docker Compose** | Lokale Entwicklungsumgebung |
| **GitHub Actions** | CI/CD Pipeline |
| **SonarQube** | Code-Qualität |
| **Swagger/OpenAPI** | API-Dokumentation |
| **Nginx** | Reverse Proxy & Static File Serving |

---

## 🏗️ Architektur

### High-Level Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   React     │  │     Web     │  │   Mobile    │         │
│  │   Web App   │  │   Browser   │  │  (future)   │         │
│  │ TypeScript  │  │  (PWA)      │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTPS/REST + JSON
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

### Frontend-Architektur (React)

```
┌───────────────────────────────────────────────────────┐
│                    App Entry Point                     │
│                    (main.tsx)                          │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                   Router Layer                         │
│              (React Router v6)                         │
│  /login  /dashboard  /matches  /players  /stats       │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                    Layout Layer                        │
│  • Authenticated Layout (with Nav/Sidebar)            │
│  • Public Layout (Login/Register)                     │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                    Feature Modules                     │
│  ├── auth/      (Login, Register, Logout)            │
│  ├── dashboard/ (Overview, Quick Actions)            │
│  ├── players/   (List, Detail, Form, Stats)          │
│  ├── matches/   (List, Detail, Live Scoring)         │
│  ├── teams/     (List, Detail, Lineup)               │
│  ├── events/    (Calendar, Training)                 │
│  └── stats/     (Analytics, Charts)                  │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                 State Management                       │
│  • Zustand (Global State: auth, org)                 │
│  • React Query (Server State: API Caching)           │
│  • React Context (Theme, Locale)                     │
└───────────────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                   API Layer                            │
│  • Axios Instance (with Interceptors)                │
│  • JWT Token Refresh                                 │
│  • Error Handling                                     │
└───────────────────────────────────────────────────────┘
```

### Frontend Folder Structure

```
frontend/
├── public/                     # Static Assets
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── main.tsx               # Entry Point
│   ├── App.tsx                # Root Component
│   ├── vite-env.d.ts          # Vite Type Declarations
│   │
│   ├── assets/                # Images, Icons, Fonts
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/            # Shared Components
│   │   ├── ui/               # shadcn/ui Components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── features/              # Feature-Based Modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLogin.ts
│   │   │   ├── api/
│   │   │   │   └── authApi.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── stores/
│   │   │       └── authStore.ts
│   │   │
│   │   ├── players/
│   │   │   ├── components/
│   │   │   │   ├── PlayerList.tsx
│   │   │   │   ├── PlayerCard.tsx
│   │   │   │   ├── PlayerForm.tsx
│   │   │   │   └── PlayerStats.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── usePlayers.ts
│   │   │   │   └── usePlayerStats.ts
│   │   │   ├── api/
│   │   │   │   └── playersApi.ts
│   │   │   └── types/
│   │   │       └── player.types.ts
│   │   │
│   │   ├── matches/
│   │   │   ├── components/
│   │   │   │   ├── MatchList.tsx
│   │   │   │   ├── MatchCard.tsx
│   │   │   │   ├── MatchDetail.tsx
│   │   │   │   ├── LiveScoring.tsx
│   │   │   │   └── ScoreBoard.tsx
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   └── types/
│   │   │
│   │   ├── teams/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   └── types/
│   │   │
│   │   ├── events/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   └── types/
│   │   │
│   │   └── stats/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── api/
│   │       └── types/
│   │
│   ├── lib/                   # Core Utilities
│   │   ├── api/
│   │   │   ├── axios.ts      # Axios Instance
│   │   │   └── queryClient.ts # React Query Setup
│   │   ├── utils/
│   │   │   ├── cn.ts         # className utility
│   │   │   ├── format.ts     # Formatters
│   │   │   └── validation.ts # Validators
│   │   └── constants/
│   │       ├── routes.ts
│   │       └── config.ts
│   │
│   ├── hooks/                 # Global Custom Hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── types/                 # Global Types
│   │   ├── api.types.ts
│   │   └── common.types.ts
│   │
│   ├── styles/                # Global Styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   │
│   └── router/                # Routing Configuration
│       ├── index.tsx
│       ├── ProtectedRoute.tsx
│       └── routes.ts
│
├── .env                       # Environment Variables
├── .env.example
├── .eslintrc.json            # ESLint Config
├── .prettierrc               # Prettier Config
├── tsconfig.json             # TypeScript Config
├── vite.config.ts            # Vite Config
├── tailwind.config.ts        # Tailwind Config
├── postcss.config.js         # PostCSS Config
└── package.json              # Dependencies
```

---

## 📦 Installation

### Voraussetzungen

- **Java Development Kit (JDK)** 21 oder höher
- **Node.js** 20+ & **npm** 10+
- **PostgreSQL** 16 oder höher
- **Docker** & **Docker Compose** (empfohlen für lokale Entwicklung)
- **Git**

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

### 3. Backend Installation

```bash
cd backend
./gradlew build -x test
```

### 4. Backend starten

```bash
./gradlew bootRun
```

Backend läuft auf: **http://localhost:8080**

### 5. Frontend Installation

```bash
cd frontend
npm install
```

### 6. Frontend starten

```bash
npm run dev
```

Frontend läuft auf: **http://localhost:5173**

### 7. Health-Check

**Backend:**
```bash
curl http://localhost:8080/api/health
```

**Frontend:**
Öffne Browser: http://localhost:5173

---

## ⚙️ Konfiguration

### Backend (application.yml)

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
  allowed-origins: http://localhost:5173,http://localhost:8080
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
```

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000

# Environment
VITE_NODE_ENV=development

# Feature Flags
VITE_ENABLE_LIVE_SCORING=true
VITE_ENABLE_ANALYTICS=false
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

### Frontend-Komponenten Beispiele

#### Login-Komponente

```typescript
// src/features/auth/components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="E-Mail"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>
      
      <div>
        <Input
          type="password"
          placeholder="Passwort"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
      
      <Button type="submit" fullWidth loading={isLoading}>
        Anmelden
      </Button>
    </form>
  );
}
```

#### Player-Liste

```typescript
// src/features/players/components/PlayerList.tsx
import { usePlayers } from '../hooks/usePlayers';
import { PlayerCard } from './PlayerCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function PlayerList() {
  const { data: players, isLoading, error } = usePlayers();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Fehler beim Laden der Spieler</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players?.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}
```

---

## 👨‍💻 Entwicklung

### Lokale Entwicklungsumgebung

#### Backend (IntelliJ IDEA)
1. Öffne das Projekt in IntelliJ
2. IDE erkennt automatisch Gradle und lädt Dependencies
3. Aktiviere Lombok Plugin
4. Enable Annotation Processing

#### Frontend (VS Code - empfohlen)
1. Öffne den `frontend/` Ordner in VS Code
2. Installiere empfohlene Extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)
3. Run `npm install`
4. Run `npm run dev`

### Code-Style

#### TypeScript/React
- **ESLint + Prettier** für Code-Formatting
- **Airbnb Style Guide** als Basis
- **Functional Components** mit Hooks
- **TypeScript Strict Mode** aktiviert

```typescript
// ✅ GOOD
interface PlayerProps {
  player: Player;
  onEdit: (id: string) => void;
}

export function PlayerCard({ player, onEdit }: PlayerProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">{player.name}</h3>
      <button onClick={() => onEdit(player.id)}>Edit</button>
    </div>
  );
}

// ❌ BAD (No Types)
export function PlayerCard({ player, onEdit }) {
  return <div>...</div>;
}
```

### Git Workflow

```bash
# Feature-Branch erstellen
git checkout develop
git pull
git checkout -b feature/live-scoring-ui

# Entwickeln und committen
git add .
git commit -m "feat: add live scoring UI components"

# Push und Pull Request erstellen
git push origin feature/live-scoring-ui
```

### Commit-Conventions

```
feat: neue Features
fix: Bugfixes
docs: Dokumentation
style: Code-Formatierung
refactor: Code-Refactoring
test: Tests hinzufügen/ändern
chore: Build-Prozess, Dependencies
```

---

## 🧪 Testing

### Frontend Tests

```bash
# Unit Tests (Vitest)
npm run test

# E2E Tests (Playwright)
npm run test:e2e

# Coverage Report
npm run test:coverage
```

#### Unit Test Beispiel

```typescript
// src/features/players/components/PlayerCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PlayerCard } from './PlayerCard';

describe('PlayerCard', () => {
  it('should render player name', () => {
    const player = {
      id: '1',
      firstName: 'Michael',
      lastName: 'van Gerwen',
    };

    render(<PlayerCard player={player} />);
    
    expect(screen.getByText('Michael van Gerwen')).toBeInTheDocument();
  });
});
```

### Backend Tests

```bash
# Alle Tests
./gradlew test

# Coverage Report
./gradlew test jacocoTestReport
```

---

## 🚢 Deployment

### Frontend Build

```bash
cd frontend
npm run build
```

Erstellt optimierte Production-Dateien in `frontend/dist/`

### Docker Build

```bash
# Backend
docker build -t dartclub-backend:latest ./backend

# Frontend
docker build -t dartclub-frontend:latest ./frontend
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

  backend:
    image: dartclub-backend:latest
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/dartclub
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  frontend:
    image: dartclub-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 🗺️ Roadmap

### Sprint 1-7: MVP Phase (16 Wochen)
- [x] Sprint 0: Setup & Architektur
- [ ] Sprint 1: Auth & Core
- [ ] Sprint 2: Spielerverwaltung
- [ ] Sprint 3: Spielverwaltung
- [ ] Sprint 4: Live-Scoring
- [ ] Sprint 5: Statistiken
- [ ] Sprint 6: Training & Kalender
- [ ] Sprint 7: Polish & Testing

### Phase 2: Advanced Features (Monat 5-8)
- Erweiterte Statistiken
- Team-Chat
- Mobile-Optimierung
- Multi-Language

### Phase 3: Scale (Monat 9-12)
- Premium-Features
- API für Drittanbieter
- Native Mobile Apps (React Native)

---

## 👥 Team

**Entwickler-Team:**
- **Backend** (2 Entwickler) - Spring Boot, PostgreSQL, REST APIs
- **Frontend** (2 Entwickler) - React, TypeScript, UI/UX
- **DevOps** (1 Entwickler) - Docker, CI/CD, Deployment
- **Project Owner/Scrum Master** (1 Person) - Koordination, Testing, Dokumentation

---

## 📄 Lizenz

Dieses Projekt ist proprietäre Software.

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**

© 2025 DartClubManager. Alle Rechte vorbehalten.

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

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**
