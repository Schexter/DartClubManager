🎯 DartClubManager - Modul-Übersicht & Entwicklungsplan
Erstellt von Hans Hahn - Alle Rechte vorbehalten
Datum: 30.09.2025

📋 ALLE ZU ENTWICKELNDEN MODULE
BACKEND-MODULE (Spring Boot)
Kern-System (Foundation)

Multi-Tenancy System

Organization Entity & Repository
User Entity & Repository
Membership Entity (User ↔ Organization Mapping)
Row Level Security (RLS) Setup


Authentifizierung & Autorisierung

JWT Token Provider
Security Configuration
Auth Controller (Login, Register, Refresh)
JWT Authentication Filter
Org-Scope Filter (org_id Enforcement)
Role-based Access Control (Admin, Trainer, Captain, Player)



Business-Module

Mitgliederverwaltung

Member Entity & Repository
Member Controller (CRUD)
Member Service (Validierung, Business Logic)
CSV Export Service


Team-Management

Team Entity & Repository
TeamMember Relation
Team Controller (CRUD)
Team Service


Match-Management

Match Entity & Repository
Set Entity & Repository
Leg Entity & Repository
Match Controller
Match Service
Match Status Management


Live-Scoring Engine ⚡ (KOMPLEX!)

Throw Entity & Repository
Scoring Engine (Wurf-Validierung)
Punkteberechnung (Single, Double, Triple, Bull)
Bust-Erkennung
Checkout-Erkennung
Event-Detection (180, 171, 140+, High-Checkout)
WebSocket Controller (Realtime Updates)


Statistik-Service

Statistics Calculation Engine
Player Statistics (Average, Checkout-%, Doppel-%, etc.)
Team Statistics
Statistics Controller
Statistics Repository (Aggregationen)


Termin-Management

Event Entity & Repository
EventParticipant Entity (Zu-/Absagen)
Event Controller (CRUD)
Event Service
iCal Export Service


Terminfindung (Doodle-Style)

Poll Entity & Repository
PollOption Entity
PollVote Entity
Poll Controller
Poll Service


Beitragsverwaltung

Fee Entity & Repository
FeePayment Entity
Fee Controller
Fee Service
Payment Status Management
Mahnwesen-Logik



Support-Services

PDF-Export Service

Match Report Generator
Template Engine (iText)
Branding Integration (Logo, Farben)


Notification Service

Push-Notification System
E-Mail Service (SMTP)
Notification Templates


File Storage Service

MinIO Integration (S3-kompatibel)
Logo Upload/Download
Document Management




FRONTEND-MODULE (React + TypeScript)
Kern-System

App Setup & Routing

Vite Configuration
React Router Setup
Protected Routes
Layout Components (Navbar, Sidebar, Footer)


State Management

Redux Store Configuration
Redux Toolkit Setup
API Client (Axios)
Auth Slice



UI-Komponenten (Wiederverwendbar)

Base UI Components

Button
Input / TextArea
Card
Modal / Dialog
Table
Dropdown / Select
DatePicker
Loading Spinner
Toast Notifications



Feature-Screens

Auth Screens

Login Screen
Register Screen
Password Reset Screen
Org Selector Screen


Dashboard

Dashboard Screen
Widgets (Kommende Matches, Stats, etc.)


Mitglieder-Verwaltung

Member List Screen
Member Detail Screen
Member Form Screen (Add/Edit)
Members Slice (Redux)
Members API Service


Team-Management

Team List Screen
Team Form Screen (Add/Edit)
Team Detail Screen (Lineup Management)
Teams Slice
Teams API Service


Match-Management

Match List Screen
Match Detail Screen
Match Form Screen (Create/Edit)
Lineup Editor
Matches Slice
Matches API Service


Live-Scoring ⚡ (KOMPLEX!)

Live Scoring Screen
Dart Input Component
Dartboard Graphic (SVG)
Throw History Component
Live Statistics Widget
WebSocket Integration
Scoring Slice


Event-Management

Event List Screen
Event Form Screen
Event Detail Screen (Participants)
RSVP Component (Zu-/Absagen)
Events Slice
Events API Service


Poll-Management

Poll List Screen
Poll Form Screen (Create Poll)
Poll Voting Screen
Poll Results View
Polls Slice
Polls API Service


Beitragsverwaltung

Fee List Screen
Fee Payment Screen
Payment Status Overview
Fees Slice
Fees API Service


Statistiken

Player Stats Screen
Team Stats Screen
Statistics Charts (Recharts)
Statistics Slice
Statistics API Service




🔄 LOGISCHE ENTWICKLUNGSREIHENFOLGE
PHASE 0: Setup & Foundation (Woche 1-2)
Ziel: Entwicklungsumgebung steht, Grundgerüst funktioniert
Backend:

Spring Boot Projekt initialisieren
PostgreSQL + Flyway Setup
Docker Compose (DB, MinIO)
Base Entity Classes
Health Check Endpoint

Frontend:

React + Vite Projekt initialisieren
Ordnerstruktur (Feature-First)
Tailwind CSS Setup
React Router Setup
Base UI Components (Button, Input, Card)

DevOps:

GitHub Repository
CI/CD Pipeline (GitHub Actions)
README.md

✅ Definition of Done:

Jeder Dev kann Projekt lokal starten
Backend: localhost:8080 erreichbar
Frontend: localhost:5173 erreichbar
PostgreSQL läuft
CI/CD Pipeline grün


PHASE 1: Authentication & Multi-Tenancy (Woche 3-4)
Ziel: User kann sich registrieren, einloggen, Verein auswählen
Backend:

✅ Organization Entity + Repository
✅ User Entity + Repository
✅ Membership Entity + Repository
✅ JWT Token Provider
✅ Security Configuration
✅ Auth Controller (Register, Login, Refresh)
✅ JWT Authentication Filter
✅ Org-Scope Filter (org_id Enforcement)

Frontend:

✅ Auth Slice (Redux)
✅ API Client Setup (Axios + Interceptors)
✅ Login Screen
✅ Register Screen
✅ Org Selector Screen
✅ Protected Routes
✅ Dashboard (Dummy)

✅ Definition of Done:

User kann sich registrieren
User kann sich einloggen (JWT Token)
Token wird in localStorage gespeichert
Org-Auswahl funktioniert (wenn User in mehreren Vereinen)
Protected Routes funktionieren (Redirect zu /login)


PHASE 2: Mitglieder & Teams (Woche 5-6)
Ziel: Admin kann Mitglieder und Teams verwalten
Backend:

✅ Member Entity + Repository
✅ Member Controller (CRUD)
✅ Member Service
✅ CSV Export Service
✅ Team Entity + Repository
✅ TeamMember Relation
✅ Team Controller (CRUD)
✅ Team Service

Frontend:

✅ Member List Screen
✅ Member Form Screen (Add/Edit)
✅ Member Detail Screen
✅ Members Slice
✅ Members API Service
✅ Team List Screen
✅ Team Form Screen
✅ Team Detail Screen (Lineup)
✅ Teams Slice
✅ Teams API Service

✅ Definition of Done:

Admin kann Mitglieder anlegen, bearbeiten, löschen
Admin kann Rollen zuweisen
Admin kann Teams erstellen
Admin kann Spieler zu Teams zuordnen
CSV-Export funktioniert


PHASE 3: Match-Management (Basic) (Woche 7-8)
Ziel: Admin/Trainer kann Matches anlegen, Captain kann Aufstellung festlegen
Backend:

✅ Match Entity + Repository
✅ Set Entity + Repository
✅ Leg Entity + Repository
✅ Match Controller (CRUD)
✅ Match Service
✅ Match Status Management

Frontend:

✅ Match List Screen
✅ Match Form Screen (Create/Edit)
✅ Match Detail Screen
✅ Lineup Editor
✅ Matches Slice
✅ Matches API Service

✅ Definition of Done:

Admin/Trainer kann Match anlegen
Captain kann Aufstellung festlegen
User kann Match-Liste sehen (kommend & vergangen)
User kann Match-Details ansehen


PHASE 4: Live-Scoring ⚡ (Woche 9-10)
Ziel: Live-Scoring mit Einzelwurf-Erfassung funktioniert
Backend:

✅ Throw Entity + Repository
✅ Scoring Engine (Wurf-Validierung)
✅ Punkteberechnung
✅ Bust-Erkennung
✅ Checkout-Erkennung
✅ Event-Detection
✅ WebSocket Controller
✅ Scoring Controller

Frontend:

✅ Live Scoring Screen
✅ Dart Input Component
✅ Dartboard Graphic (SVG)
✅ Throw History Component
✅ Live Statistics Widget
✅ WebSocket Integration
✅ Scoring Slice

✅ Definition of Done:

Scorer kann Match starten
Scorer kann Würfe eintragen (3 Darts)
Scorer kann Bust markieren
Scorer kann Leg als gewonnen markieren
Live-Statistiken werden angezeigt (Average, Checkout-%)
Zuschauer können Live-Scoring verfolgen (Read-Only)


PHASE 5: Termine & Terminfindung (Woche 11-12)
Ziel: Terminkalender und Terminfindung funktionieren
Backend:

✅ Event Entity + Repository
✅ EventParticipant Entity
✅ Event Controller (CRUD)
✅ Event Service
✅ iCal Export Service
✅ Poll Entity + Repository
✅ PollOption Entity
✅ PollVote Entity
✅ Poll Controller
✅ Poll Service

Frontend:

✅ Event List Screen
✅ Event Form Screen
✅ Event Detail Screen
✅ RSVP Component
✅ Events Slice
✅ Poll List Screen
✅ Poll Form Screen
✅ Poll Voting Screen
✅ Poll Results View
✅ Polls Slice

✅ Definition of Done:

Admin/Trainer kann Trainingstermine anlegen
Spieler können zu-/absagen
Admin/Trainer sieht, wer zugesagt hat
Spieler erhalten Push-Notification bei neuem Termin
Admin/Trainer kann Terminfindung (Poll) erstellen
Spieler können bei Poll abstimmen


PHASE 6: Beitragsverwaltung (Woche 13-14)
Ziel: Admin kann Beiträge verwalten und Zahlungen erfassen
Backend:

✅ Fee Entity + Repository
✅ FeePayment Entity
✅ Fee Controller
✅ Fee Service
✅ Payment Status Management
✅ Mahnwesen-Logik

Frontend:

✅ Fee List Screen
✅ Fee Payment Screen
✅ Payment Status Overview
✅ Fees Slice
✅ Fees API Service

✅ Definition of Done:

Admin kann Beitragssätze definieren
Admin kann Zahlungen manuell erfassen
Admin sieht Übersicht: Wer hat bezahlt, wer nicht?
Admin kann Mahnliste exportieren (CSV)


PHASE 7: Statistiken & Polish (Woche 15-16)
Ziel: Statistiken anzeigen, Bugs fixen, App polieren
Backend:

✅ Statistics Calculation Engine
✅ Player Statistics
✅ Team Statistics
✅ Statistics Controller
✅ PDF-Export Service (Match Reports)
✅ Notification Service

Frontend:

✅ Player Stats Screen
✅ Team Stats Screen
✅ Statistics Charts
✅ Statistics Slice
✅ PDF-Viewer/Download
✅ Dark Mode Toggle
✅ Bug-Fixing & Performance-Optimierung

✅ Definition of Done:

Spieler sehen persönliche Statistiken
Trainer sehen Team-Statistiken
Admin kann Match-Report als PDF exportieren
User kann zwischen Light/Dark Mode wechseln
Alle kritischen Bugs behoben
Performance optimiert (< 500ms API Response Time)


🔀 PARALLELISIERUNGS-STRATEGIEN
Strategie 1: Backend vs. Frontend Teams
Backend-Team (3 Devs):

Dev 1: Multi-Tenancy, Auth, Security
Dev 2: Members, Teams, Matches
Dev 3: Live-Scoring Engine, Statistics

Frontend-Team (3 Devs):

Dev 4: Auth Screens, Routing, Base UI
Dev 5: Members, Teams, Match-Management
Dev 6: Live-Scoring UI, Statistics

Vorteil: Klare Trennung, weniger Merge-Konflikte
Risiko: Synchronisation Backend ↔ Frontend nötig

Strategie 2: Feature-Teams (Vertikal)
Team 1 (2 Devs): Foundation

Backend: Auth, Multi-Tenancy
Frontend: Auth Screens, Routing

Team 2 (2 Devs): Core Features

Backend: Members, Teams
Frontend: Member/Team Management

Team 3 (2 Devs): Scoring & Statistics

Backend: Match-Management, Live-Scoring, Stats
Frontend: Live-Scoring UI, Statistics

Vorteil: Teams liefern komplette Features
Risiko: Mehr Koordination bei gemeinsamen Ressourcen

Strategie 3: Phasen-basierte Parallelisierung
Phase 0-1 (Setup & Auth):

SEQUENZIELL (Alle zusammen, um Grundlagen zu legen)

Phase 2-4 (Members, Teams, Matches, Scoring):

PARALLEL:

Team A: Members & Teams (Backend + Frontend)
Team B: Matches & Live-Scoring (Backend + Frontend)



Phase 5-6 (Events, Fees):

PARALLEL:

Team A: Events & Polls
Team B: Fees & Payments



Phase 7 (Stats & Polish):

PARALLEL:

Team A: Statistics
Team B: PDF-Export, Notifications, Bug-Fixing



Vorteil: Maximale Parallelität bei klaren Meilensteinen
Risiko: Hohe Koordinationsanforderungen

📊 EMPFOHLENE AUFTEILUNG (6 Entwickler)
Empfehlung: Hybrid-Ansatz
Sprint 0-1: Alle zusammen (Woche 1-4)

Setup, Architektur, Auth
Ziel: Gemeinsames Verständnis

Sprint 2-7: Feature-Teams (Woche 5-16)
Team Alpha (2 Devs):

Backend: Members, Teams, Fees
Frontend: Member/Team Management, Fee Management

Team Beta (2 Devs):

Backend: Matches, Events, Polls
Frontend: Match Management, Event Management

Team Gamma (2 Devs):

Backend: Live-Scoring, Statistics, PDF/Notifications
Frontend: Live-Scoring UI, Statistics


🎯 NÄCHSTE SCHRITTE FÜR HEUTE

Projektordner anlegen:

C:\SoftwareProjekte\DartClubManager\

Grundstruktur erstellen:

DartClubManager/
├── backend/
├── frontend/
├── docs/
├── README.md
├── TODO.md
├── CHANGELOG.md
└── error.log