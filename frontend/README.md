# DartClub Manager - Frontend (React)

**Version:** 1.0  
**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS  
**Erstellt von Hans Hahn - Alle Rechte vorbehalten**

---

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+ installiert
- npm oder yarn

### Installation

```bash
# 1. In das Frontend-Verzeichnis wechseln
cd "C:\SoftwareEntwicklung\DartClubManager\Dart App\frontend"

# 2. Dependencies installieren
npm install

# 3. Dev-Server starten
npm run dev

# 4. Im Browser öffnen: http://localhost:5173
```

---

## 📁 Projektstruktur

```
frontend/
├── src/
│   ├── main.tsx                 # Entry Point
│   ├── App.tsx                  # Root Component mit Router
│   ├── features/                # Feature-Module
│   │   ├── auth/                # Authentifizierung
│   │   │   └── LoginScreen.tsx
│   │   ├── dashboard/           # Dashboard
│   │   │   └── DashboardScreen.tsx
│   │   └── matches/             # Matches & Scoring
│   │       ├── MatchListScreen.tsx
│   │       └── LiveScoringScreen.tsx
│   ├── components/              # Shared Components
│   │   ├── ui/                  # UI Components
│   │   └── layout/              # Layout Components
│   ├── lib/                     # Core Libraries
│   │   ├── api/                 # API Client
│   │   └── utils/               # Utilities
│   └── styles/                  # Global Styles
│       └── index.css            # Tailwind + Custom CSS
├── public/                      # Static Assets
├── index.html                   # HTML Template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript Config
├── vite.config.ts               # Vite Config
└── tailwind.config.js           # Tailwind Config
```

---

## 🎨 Design System

### Farben (aus Doku)

```javascript
// Primary Colors
primary: '#1976D2'        // Material Blue 700
primary-light: '#63A4FF'
primary-dark: '#004BA0'

// Secondary Colors
secondary: '#FF6F00'      // Orange 800
secondary-light: '#FFA040'
secondary-dark: '#C43E00'

// Status Colors
error: '#D32F2F'
success: '#388E3C'
warning: '#F57C00'
```

### Typography
- **Font:** Roboto (Google Fonts)
- **H1:** 32px Bold
- **H2:** 24px Semi-Bold
- **H3:** 20px Medium
- **Body:** 16px Regular

---

## 🛠️ Verfügbare Scripts

```bash
# Development
npm run dev              # Start dev server (Port 5173)

# Production
npm run build            # Build für Production
npm run preview          # Preview production build

# Code Quality
npm run lint             # ESLint
npm run type-check       # TypeScript Type Checking
npm run format           # Prettier Code Formatting
```

---

## 📱 Implementierte Features

### ✅ Sprint 0 (Fertig)
- [x] React + TypeScript Setup
- [x] Vite Build Tool
- [x] Tailwind CSS mit Custom Theme
- [x] React Router Setup
- [x] Projektstruktur (Feature-First)

### ✅ Login Screen
- [x] E-Mail/Passwort-Eingabe
- [x] Formular-Validierung (React Hook Form + Zod)
- [x] Design gemäß Doku (Farben, Typography)
- [x] Responsive Layout
- [ ] API-Integration (TODO)

### ✅ Dashboard
- [x] Bottom Navigation (Mobile-First)
- [x] Übersichtsseite mit Stats
- [x] Quick Actions
- [x] Letzte Matches
- [ ] Echte Daten von API (TODO)

### ✅ Match List
- [x] Match-Übersicht (Live, Geplant, Beendet)
- [x] Status-Badges
- [x] Filter-Tabs
- [ ] Echte Daten von API (TODO)

### ✅ Live Scoring
- [x] Echtzeit-Scoring UI
- [x] Wurf-Eingabe (Tastatur-Modus)
- [x] Score-Anzeige
- [x] Bust/Checkout-Buttons
- [ ] WebSocket-Integration (TODO)
- [ ] Wurf-Validierung (TODO)

---

## 🔜 Nächste Schritte

### Sprint 1: API-Integration
1. **API Client erstellen** (`src/lib/api/client.ts`)
   - Axios Setup
   - JWT Token Handling
   - Error Handling

2. **Auth Store** (Zustand)
   - Login/Logout
   - Token Storage (localStorage)
   - Auto-Refresh

3. **API-Endpunkte anbinden**
   - Login
   - Match-Liste
   - Live-Scoring Submit

### Sprint 2: Weitere Screens
- Member Management
- Team Management
- Calendar/Events
- Settings

---

## 🧪 Testing (geplant)

```bash
# Unit Tests (geplant)
npm run test

# E2E Tests mit Playwright (geplant)
npm run test:e2e
```

---

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
# Output: dist/
```

### Preview Production
```bash
npm run preview
```

---

## 📚 Dependencies

### Core
- **react** 18.3.1 - UI Framework
- **react-dom** 18.3.1 - React DOM Rendering
- **react-router-dom** 6.22.3 - Routing

### State Management
- **@tanstack/react-query** 5.28.4 - Server State
- **zustand** 4.5.2 - Client State

### Forms & Validation
- **react-hook-form** 7.51.0 - Form Handling
- **zod** 3.22.4 - Schema Validation

### Styling
- **tailwindcss** 3.4.1 - Utility-First CSS
- **lucide-react** 0.356.0 - Icons

### HTTP Client
- **axios** 1.6.7 - API Requests

---

## 🐛 Bekannte Probleme

*Keine bekannten Probleme bisher.*

---

## 📝 Changelog

### [29.09.2025] - Initial Setup
- ✅ React + TypeScript + Vite Setup
- ✅ Tailwind CSS mit Custom Theme
- ✅ Login Screen implementiert
- ✅ Dashboard mit Bottom Nav
- ✅ Match List Screen
- ✅ Live Scoring Screen (UI)

---

## 👨‍💻 Entwickler

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
Version 1.0 - 29.09.2025

---

## 📞 Support

Bei Fragen oder Problemen:
- Siehe Haupt-README: `../README.md`
- Siehe Projektdokumentation: `../docs/`
