# DartClub Manager - Frontend Beispiel

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 1.0  
**Datum:** 29.09.2025

## 📱 Über dieses Frontend-Beispiel

Dies ist ein **vollständiges Flutter-Frontend-Beispiel** für die DartClub Manager App, erstellt gemäß der Projektdokumentation.

### ✅ Implementierte Screens

1. **Login Screen** (`/lib/features/auth/presentation/login_screen.dart`)
   - E-Mail & Passwort Eingabe
   - Login-Button mit Validierung
   - Registrierungs-Link

2. **Dashboard** (`/lib/features/dashboard/presentation/dashboard_screen.dart`)
   - Bottom Navigation Bar (Home, Teams, Matches, Profil)
   - Willkommens-Card mit Gradient
   - Schnellaktionen (Neues Match, Live Scoring)
   - Kommende Matches Übersicht
   - Floating Action Button

3. **Match List Screen** (`/lib/features/matches/presentation/match_list_screen.dart`)
   - Tab-Navigation (Kommend, Live, Beendet)
   - Match Cards mit Status-Badges
   - Detaillierte Match-Informationen
   - Filter-Button

4. **Live Scoring Screen** (`/lib/features/matches/presentation/live_scoring_screen.dart`)
   - Echtzeit-Score Anzeige
   - Aktueller Spieler mit Restpunkten
   - Wurf-Eingabe (Triple, Double, Single, Bull)
   - Automatische Punkteberechnung
   - Bust & Checkout Detection
   - 3-Dart Visualisierung

## 🎨 Design-System

### Farben (exakt aus Doku)

```dart
// Primary Colors
Primary: #1976D2 (Material Blue 700)
Primary Light: #63A4FF
Primary Dark: #004BA0

// Secondary Colors
Secondary: #FF6F00 (Orange 800)
Secondary Light: #FFA040
Secondary Dark: #C43E00

// Status Colors
Error: #D32F2F
Success: #388E3C
Warning: #F57C00
```

### Typografie

- **Font:** Roboto (Material Design Standard)
- **H1:** 32sp, Bold
- **H2:** 24sp, Semi-Bold
- **Body:** 16sp, Regular

### UI-Komponenten

✅ Material Design Cards mit Elevation  
✅ Bottom Navigation Bar  
✅ Floating Action Button  
✅ Status Badges  
✅ Gradient Containers  
✅ Icon Buttons

## 📁 Struktur

```
lib/
├── main.dart                          # App Entry Point
├── core/
│   └── config/
│       └── theme.dart                 # Theme Configuration
└── features/
    ├── auth/
    │   └── presentation/
    │       └── login_screen.dart      # Login UI
    ├── dashboard/
    │   └── presentation/
    │       └── dashboard_screen.dart  # Dashboard + Bottom Nav
    └── matches/
        └── presentation/
            ├── match_list_screen.dart # Match Übersicht
            └── live_scoring_screen.dart # Live Scoring
```

## 🚀 Installation & Ausführung

### Voraussetzungen

- Flutter SDK 3.24+
- Dart 3.5+

### Setup

1. **Dependencies installieren:**
```bash
cd frontend
flutter pub get
```

2. **App starten (Web):**
```bash
flutter run -d chrome
```

3. **App starten (Mobile):**
```bash
# Android
flutter run -d android

# iOS
flutter run -d ios
```

## 📸 Screenshots der Screens

### Login Screen
- Clean, minimalistisches Design
- Material Design TextField
- Primary Button mit Farbschema
- Link zur Registrierung

### Dashboard
- Gradient Willkommens-Card
- Schnellaktionen in Grid
- Match-Cards mit Status
- Bottom Navigation

### Match List
- Tab-Navigation (Kommend/Live/Beendet)
- Status-Badges (Geplant, Live, Beendet)
- Team-Namen mit Icons (🏠 / ✈️)
- Datum, Zeit, Ort, Liga

### Live Scoring
- Team-Score Header
- Aktueller Spieler mit Restpunkten
- 3-Dart Visualisierung
- Wurf-Eingabe Pad
- Bestätigen & Zurücksetzen Buttons

## 🎯 Features

✅ **Theme-System:** Light & Dark Mode  
✅ **Responsive:** Funktioniert auf Mobile, Tablet, Web  
✅ **Navigation:** Bottom Navigation Bar + Routing  
✅ **State Management:** StatefulWidget (Provider in Produktiv-App)  
✅ **Validierung:** Login-Form Validierung  
✅ **Feedback:** Dialoge für Bust & Checkout  
✅ **Accessibility:** Material Design Standards

## 📝 Nächste Schritte (für Produktiv-App)

1. **State Management:** Riverpod integrieren
2. **API Integration:** Dio/Retrofit für Backend-Kommunikation
3. **Authentifizierung:** JWT Token Storage
4. **Offline-First:** Hive für lokale Datenbank
5. **Push Notifications:** Firebase Cloud Messaging
6. **Testing:** Unit Tests, Widget Tests, Integration Tests

## 🔗 Links

- **Projektdokumentation:** `🎯 DartClub Manager.docx`
- **Backend:** Spring Boot 3.2+ mit Java 21
- **Datenbank:** PostgreSQL 15+

## 📄 Lizenz

**Copyright:** Hans Hahn - Alle Rechte vorbehalten  
**Lizenz:** Proprietär (für kommerzielle Nutzung)

---

**Version:** 1.0  
**Erstellt:** 29.09.2025  
**Status:** Frontend-Beispiel (Design & UI fertig)
