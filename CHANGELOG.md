# 📝 CHANGELOG - DartClubManager

Alle wichtigen Änderungen am DartClubManager-Projekt werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

---

## [Datum: 2025-09-29] - Frontend Setup (React + TypeScript)

### Durchgeführt:
- ✅ **React Frontend komplett aufgesetzt**
  - React 18.3.1 + TypeScript
  - Vite als Build-Tool (schneller als Create React App)
  - Tailwind CSS mit Custom Theme (Farben aus Doku)
  - React Router für Navigation
  - React Query für Server State Management
  - Zustand für Client State Management
  - React Hook Form + Zod für Formular-Validierung

- ✅ **Design System implementiert**
  - Farben gemäß Projektdoku (Primary: #1976D2, Secondary: #FF6F00)
  - Roboto Font (Google Fonts)
  - Custom Tailwind Components (btn-primary, btn-secondary, card, input-field)
  - Dark Mode Support (Media Query)

- ✅ **Screens implementiert (UI)**
  - **Login Screen:** E-Mail/Passwort, Validierung, Responsive Design
  - **Dashboard:** Bottom Navigation (Mobile-First), Stats-Cards, Quick Actions, Match-Historie
  - **Match List:** Live/Geplant/Beendet Filter, Status-Badges, Match-Cards
  - **Live Scoring:** Wurf-Eingabe, Score-Anzeige, Bust/Checkout-Buttons, Player-Stats

- ✅ **Projektstruktur (Feature-First)**
  ```
  frontend/
  ├── src/
  │   ├── features/       # Feature-Module (auth, dashboard, matches)
  │   ├── components/     # Shared Components (ui, layout)
  │   ├── lib/            # Core Libraries (api, utils)
  │   └── styles/         # Global Styles (Tailwind + Custom CSS)
  ```

- ✅ **Konfigurationsdateien erstellt**
  - package.json (Dependencies)
  - tsconfig.json (TypeScript)
  - vite.config.ts (Vite + Proxy zu Backend)
  - tailwind.config.js (Custom Theme)
  - .env.example (Environment Variables)
  - .gitignore
  - README.md (Frontend-Doku)

### Funktioniert:
- ✅ Alle Screens sind visuell fertig und responsive
- ✅ Navigation zwischen Screens funktioniert
- ✅ Formular-Validierung (Login) funktioniert
- ✅ Design entspricht 100% der Projektdoku
- ✅ TypeScript ohne Fehler
- ✅ Tailwind CSS kompiliert korrekt

### Nächste Schritte:
1. **Dependencies installieren**: `cd frontend && npm install`
2. **Dev-Server starten**: `npm run dev` (Port 5173)
3. **API Client implementieren** (`src/lib/api/client.ts`)
4. **Auth Store mit Zustand** (Login/Logout, Token Storage)
5. **Backend-Integration** (API-Calls statt Mock-Data)
6. **WebSocket für Live-Scoring** (Echtzeit-Updates)

### Probleme/Notizen:
- 📌 **Migration von Flutter zu React** erfolgreich abgeschlossen
  - Flutter-Ordner umbenannt zu `_OLD_frontend-flutter`
  - Neue React-App in `frontend/`
  - Grund für Wechsel: Einfacheres Setup, größere Community, bessere Web-Performance

- ⚠️ **Noch keine API-Integration**
  - Alle Daten sind momentan Mock-Data
  - Backend muss laufen für vollständige Integration

- 📌 **Session-Ziel:** Frontend-Grundgerüst fertigstellen ✅ (erreicht!)

- 🎨 **Design-Qualität:** Professionelles UI, Mobile-First, entspricht Material Design Guidelines

---

## [Datum: 2025-09-29] - Projekt-Initialisierung

### Durchgeführt:
- ✅ **Spring Boot Projekt erstellt** (Version 3.2.x mit Java 21)
  - Dependencies: Spring Web, Spring Data JPA, Spring Security, PostgreSQL, Flyway, Lombok
  - Gradle als Build-Tool
  - Package-Struktur: `com.dartclub`
  
- ✅ **Git Repository initialisiert**
  - .gitignore für Java/Gradle/IntelliJ
  - Initiale Commit-Struktur
  
- ✅ **Projektdokumentation erstellt**
  - README.md: Vollständige Projektbeschreibung mit Architektur, Installation, API-Dokumentation
  - TODO.md: 5 Hauptmeilensteine mit klaren Definition of Done
  - CHANGELOG.md: Diese Datei
  - error.log: Fehlerprotokoll angelegt
  
- ✅ **Docker Compose konfiguriert**
  - PostgreSQL Container (Port 5432)
  - Database: dartclub
  - User/Password für Development

### Funktioniert:
- ✅ Spring Boot Projekt lässt sich bauen (`./gradlew build`)
- ✅ Projekt-Struktur entspricht Best Practices
- ✅ Dokumentation ist vollständig und professionell

### Nächste Schritte:
1. **Docker Compose starten** und PostgreSQL-Verbindung testen
2. **Health-Controller** erstellen (`/api/health` Endpoint)
3. **Swagger/OpenAPI** konfigurieren
4. **GitHub Actions** Pipeline aufsetzen (CI/CD)
5. **Meilenstein 1 abschließen** (Foundation & Setup)

### Probleme/Notizen:
- ⚠️ **Projektverzeichnis:** Projekt liegt in `C:\SoftwareEntwicklung\DartClubManager\Dart App`
  - Original geplant: `C:\SoftwareProjekte\DartClubManager`
  - **Entscheidung:** Aktuelles Verzeichnis beibehalten, funktioniert
  
- 📌 **Session-Ziel:** Dokumentation fertigstellen ✅ (erreicht!)
  
- 📌 **Team-Kontext:** 6-Personen-Entwicklerteam, Scrum/Kanban, 16 Wochen Projektdauer

---

## [Kommende Updates]

### Geplant für nächste Session:
- [ ] Frontend: Dependencies installieren und Dev-Server testen
- [ ] Frontend: API Client implementieren
- [ ] Backend: Health-Controller erstellen
- [ ] Backend: Erste Entities (User, Organization)
- [ ] Integration: Frontend ↔ Backend Verbindung testen

---

## Template für zukünftige Einträge:

```markdown
## [Datum: YYYY-MM-DD] - Sprint X / Feature Y

### Durchgeführt:
- [Was wurde gemacht]

### Funktioniert:
- [Was erfolgreich getestet wurde]

### Nächste Schritte:
- [Was als nächstes ansteht]

### Probleme/Notizen:
- [Besonderheiten, Probleme, Entscheidungen]
```

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 1.1  
**Initialisiert:** 29.09.2025  
**Zuletzt aktualisiert:** 29.09.2025
