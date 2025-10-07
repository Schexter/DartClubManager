# Live Scoring - Test-Anleitung

## Quick Start

1. **Frontend starten:**
```bash
cd frontend
npm run dev
```

2. **Browser öffnen:**
```
http://localhost:5173/matches/123/scoring
```

## Test-Szenarien

### ✅ Basis-Funktionen
- [ ] Wurf eintragen (Single 20)
- [ ] Wurf eintragen (Double 20)
- [ ] Wurf eintragen (Triple 20)
- [ ] MISS-Button
- [ ] Bull-Button (25)
- [ ] Bullseye-Button (50)

### ✅ Spiellogik
- [ ] Nach 3 Darts → "Nächster Spieler" aktiviert
- [ ] Bust-Erkennung (Überwerfen)
- [ ] Double-Out aktivieren → Checkout nur mit Double
- [ ] Undo-Funktion (letzter Wurf rückgängig)
- [ ] Neues Leg starten

### ✅ UI/UX
- [ ] Aktueller Spieler hat blauen Ring
- [ ] Score-Anzeige live aktualisiert
- [ ] Darts-Counter (0/3, 1/3, 2/3, 3/3)
- [ ] Error-Message bei ungültigem Wurf
- [ ] Letzter Wurf wird angezeigt

### ✅ Dark Mode
- [ ] Dark Mode Toggle funktioniert
- [ ] Alle Komponenten sichtbar
- [ ] Kontraste ausreichend

## Bekannte Einschränkungen (MVP)

- ❌ Noch keine Backend-Integration (kommt in Phase 2)
- ❌ Keine Persistierung (nur im Browser-Memory)
- ❌ Keine WebSocket-Updates (noch)
- ❌ Keine Statistiken (Average, etc.) (kommt später)

## Nächste Schritte

1. Backend-Integration vorbereiten
2. WebSocket für Live-Updates
3. Statistiken berechnen (Average, Checkout-Quote)
4. Match-Persistierung

---
Erstellt von Hans Hahn - Alle Rechte vorbehalten
