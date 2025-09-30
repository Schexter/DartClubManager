# 🎯 DartClub Manager - Frontend Quick Start Guide

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 1.0 - 29.09.2025

---

## 🚀 Frontend starten (3 Schritte)

### 1️⃣ Dependencies installieren

```powershell
# Im Frontend-Verzeichnis
cd "C:\SoftwareEntwicklung\DartClubManager\Dart App\frontend"

# Dependencies installieren (dauert 1-2 Minuten)
npm install
```

### 2️⃣ Dev-Server starten

```powershell
# Dev-Server starten
npm run dev
```

Du solltest diese Ausgabe sehen:
```
  VITE v5.1.6  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3️⃣ Im Browser öffnen

Öffne: **http://localhost:5173/**

---

## 📱 Screenshots der UI

### Login Screen
```
┌─────────────────────────────────────┐
│            🎯                       │
│      DartClub Manager               │
│  Vereinsverwaltung & Live-Scoring   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Anmelden                  │   │
│  │                             │   │
│  │  E-Mail:                    │   │
│  │  ┌───────────────────────┐  │   │
│  │  │ ihre.email@beispiel.de│  │   │
│  │  └───────────────────────┘  │   │
│  │                             │   │
│  │  Passwort:                  │   │
│  │  ┌───────────────────────┐  │   │
│  │  │ ••••••••              │  │   │
│  │  └───────────────────────┘  │   │
│  │                             │   │
│  │  ☐ Angemeldet bleiben       │   │
│  │        Passwort vergessen?  │   │
│  │                             │   │
│  │    [ ANMELDEN ]             │   │
│  │                             │   │
│  │  Noch kein Konto?           │   │
│  │  Registrieren               │   │
│  └─────────────────────────────┘   │
│                                     │
│  © 2025 DartClub Manager            │
└─────────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────────┐
│  🎯 DartClub Manager                │
│     Falcons Dartclub         [↗️]   │
├─────────────────────────────────────┤
│                                     │
│  Übersicht                          │
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │Nächstes│ │Aktive  │ │Diese   │  │
│  │Match   │ │Spieler │ │Saison  │  │
│  │Heute   │ │  24    │ │12 - 3  │  │
│  │19:00   │ │Mitgl.  │ │S - N   │  │
│  └────────┘ └────────┘ └────────┘  │
│                                     │
│  Schnellaktionen                    │
│  ┌──────────┐ ┌──────────┐         │
│  │Neues     │ │Training  │         │
│  │Match     │ │planen    │         │
│  └──────────┘ └──────────┘         │
│                                     │
│  Letzte Matches                     │
│  ┌──────────────────────────┐      │
│  │ Falcons vs Eagles        │      │
│  │ 26.09.2025 • 5:3         │      │
│  │ ✓ Gewonnen               │      │
│  └──────────────────────────┘      │
│                                     │
├─────────────────────────────────────┤
│ [Home][Teams][Matches][Kal][⚙️]    │
└─────────────────────────────────────┘
```

### Live Scoring
```
┌─────────────────────────────────────┐
│  ← Live Scoring                     │
│     Set 1, Leg 3                    │
├─────────────────────────────────────┤
│         🏠 Falcons  2 : 1  Eagles ✈️ │
├─────────────────────────────────────┤
│  Aktueller Spieler                  │
│  🏠 Hans Hahn            Restpunkte │
│                              301    │
│                                     │
│  Aktueller Wurf                     │
│  ┌────┐ ┌────┐ ┌────┐  [🔄]        │
│  │ T20│ │ T20│ │ 20 │              │
│  └────┘ └────┘ └────┘              │
│                                     │
│  Wurf eingeben                      │
│  [T20][T19][T18][D20][D19]          │
│  [D18][20 ][19 ][18 ][17 ]          │
│  [16 ][15 ][Bull][D-Bull][0]        │
│                                     │
│  [  BUST  ]  [✓ WURF BESTÄTIGEN]    │
│                                     │
│  Player Stats                       │
│  ┌──────────┐ ┌──────────┐         │
│  │🏠 H.Hahn │ │✈️ P.Müller│         │
│  │   301   │ │   257   │         │
│  │Ø 89.34  │ │Ø 82.15  │         │
│  └──────────┘ └──────────┘         │
└─────────────────────────────────────┘
```

---

## 🎨 Features

### ✅ Implementiert (UI)
- [x] Login Screen mit Validierung
- [x] Dashboard mit Stats & Quick Actions
- [x] Match List mit Filter (Live/Geplant/Beendet)
- [x] Live Scoring mit Wurf-Eingabe
- [x] Responsive Design (Mobile-First)
- [x] Dark Mode Support
- [x] Custom Tailwind Theme

### 🔜 Nächste Schritte
- [ ] API Client implementieren
- [ ] Backend-Integration (Login, Match-Daten)
- [ ] WebSocket für Echtzeit-Updates
- [ ] Weitere Screens (Teams, Kalender, Settings)

---

## 🛠️ Verfügbare Commands

```bash
# Development
npm run dev              # Dev-Server starten

# Production
npm run build            # Production Build
npm run preview          # Production Preview

# Code Quality
npm run lint             # ESLint
npm run type-check       # TypeScript Check
npm run format           # Code formatieren
```

---

## 📂 Projektstruktur

```
frontend/
├── src/
│   ├── main.tsx                    # Entry Point
│   ├── App.tsx                     # Root Component
│   ├── features/
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx     # ✅
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.tsx # ✅
│   │   └── matches/
│   │       ├── MatchListScreen.tsx # ✅
│   │       └── LiveScoringScreen.tsx # ✅
│   └── styles/
│       └── index.css               # Tailwind + Custom
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🐛 Troubleshooting

### Problem: `npm install` schlägt fehl
**Lösung:** Node.js 18+ installieren von https://nodejs.org/

### Problem: Port 5173 bereits belegt
**Lösung:** Port ändern in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Andere Port-Nummer
}
```

### Problem: TypeScript Fehler
**Lösung:** 
```bash
npm run type-check
```

---

## 📚 Weitere Infos

- **Frontend-Doku:** `frontend/README.md`
- **Projekt-Doku:** `docs/ProjectDocumentation.md`
- **CHANGELOG:** `CHANGELOG.md`

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 1.0 - 29.09.2025
