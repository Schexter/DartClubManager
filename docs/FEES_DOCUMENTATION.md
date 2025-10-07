# 💶 Beitragsverwaltung - Dokumentation

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 1.0  
**Datum:** 07.10.2025

---

## 📋 Übersicht

Die Beitragsverwaltung ermöglicht es Admins und Trainern, Beitragssätze zu definieren, Mitgliedern zuzuweisen, Zahlungen zu erfassen und den Zahlungsstatus zu überwachen.

---

## 🎯 Features

### 1. Beitragssätze verwalten (`/fees`)

**Hauptscreen** zur Verwaltung von Beitragssätzen und Übersicht über Zahlungsstatus.

**Funktionen:**
- ✅ Beitragssätze anlegen (Name, Betrag, Periode, Beschreibung)
- ✅ Beitragssätze bearbeiten und löschen
- ✅ Zahlungsstatus-Übersicht (wer hat bezahlt, wer nicht)
- ✅ Ampel-System (PAID/OPEN/OVERDUE/PARTIAL)

**Perioden:**
- **YEARLY:** Jährlicher Beitrag
- **QUARTERLY:** Vierteljährlicher Beitrag
- **MONTHLY:** Monatlicher Beitrag
- **ONCE:** Einmaliger Beitrag

---

### 2. Beiträge zuweisen (`/fees/assign`)

**Screen** zum Zuweisen von Beitragssätzen an Mitglieder.

**Workflow:**
1. **Beitragssatz auswählen** (Radio-Button Auswahl)
2. **Fälligkeitsdatum festlegen** (Default: Heute)
3. **Mitglieder auswählen** (Multi-Select mit Suchfunktion)
4. **Zusammenfassung prüfen** (Gesamtsumme, Anzahl Mitglieder)
5. **Zuweisen** (Button)

**Features:**
- ✅ Multi-Select für Mitglieder
- ✅ Suchfunktion (Name, E-Mail)
- ✅ "Alle auswählen" Button
- ✅ Zusammenfassung mit Gesamtsumme
- ✅ Validierung (min. 1 Mitglied + Beitragssatz)

**Navigation:**
- Button "Beitrag zuweisen" (grün) im FeeManagementScreen Header
- Oder direkt via URL: `/fees/assign`

---

### 3. Zahlungen erfassen (`/fees/record`)

**Screen** zum manuellen Erfassen von Beitragszahlungen.

**Workflow:**
1. **Offenen Beitrag auswählen** (aus Liste)
2. **Zahlungsdetails eingeben:**
   - Zahlungsdatum
   - Zahlungsmethode (Bar, Überweisung, SEPA, Karte)
   - Notizen (optional)
3. **Zusammenfassung prüfen**
4. **Zahlung erfassen** (Button)

**Features:**
- ✅ Auswahl von offenen Beiträgen
- ✅ Filter nach Status (Alle, Nur Offene, Nur Überfällige)
- ✅ Suchfunktion (Mitglied, Beitrag)
- ✅ Anzeige von überfälligen Tagen
- ✅ 4 Zahlungsmethoden
- ✅ Notizen-Feld für Referenznummern

**Zahlungsmethoden:**
- 💵 **Bar** (CASH)
- 🏦 **Überweisung** (BANK_TRANSFER)
- 📋 **SEPA-Lastschrift** (SEPA)
- 💳 **Karte** (CARD)

**Navigation:**
- Button "Zahlung erfassen" (blau) im FeeManagementScreen Header
- Oder direkt via URL: `/fees/record`

---

### 4. Mitglied-Beitrags-Details (`/fees/member/:memberId`)

**Screen** zur Anzeige aller Beiträge und Zahlungen eines Mitglieds.

**Anzeige:**
- 📊 **Statistik-Cards:**
  - Bezahlt (grün)
  - Offen (gelb)
  - Überfällig (rot)
  
- ⚠️ **Überfällige Beiträge** (falls vorhanden):
  - Hervorgehoben in rotem Card
  - Anzeige der überfälligen Tage
  - Quick-Button "Zahlung jetzt erfassen"

- 📝 **Offene Beiträge:**
  - Liste aller noch nicht bezahlten Beiträge
  - Fälligkeitsdatum
  - Betrag

- 📜 **Zahlungshistorie:**
  - Liste aller bezahlten Beiträge
  - Zahlungsdatum und -methode
  - Betrag

- 💰 **Gesamtübersicht:**
  - Gesamt bezahlt
  - Gesamt offen
  - Gesamt überfällig
  - Gesamt ausstehend

**Navigation:**
- Aus Mitgliederliste: Klick auf Mitglied
- Oder direkt via URL: `/fees/member/[memberId]`

---

## 🎨 UI/UX Highlights

### Quick-Actions (FeeManagementScreen)
```
┌─────────────────────────────────────────────────────┐
│  💶 Beitragsverwaltung         [+ Neuer Beitragssatz]│
├─────────────────────────────────────────────────────┤
│  [✚ Beitrag zuweisen]  [✓ Zahlung erfassen]         │
│     (grüner Button)        (blauer Button)          │
└─────────────────────────────────────────────────────┘
```

### Statistik-Cards (MemberFeeDetailScreen)
```
┌───────────┬───────────┬─────────────┐
│  120.00 € │  50.00 €  │   30.00 €   │
│ Bezahlt   │  Offen    │ Überfällig  │
│    (3)    │    (1)    │     (1)     │
└───────────┴───────────┴─────────────┘
```

### Status-Badges
- 🟢 **PAID** (Bezahlt) - Grün
- 🟡 **OPEN** (Offen) - Gelb
- 🔴 **OVERDUE** (Überfällig) - Rot
- 🟠 **PARTIAL** (Teilweise) - Orange

---

## 🔧 Technische Details

### Mock-Daten (aktuell)
Alle Screens verwenden derzeit **Mock-Daten** für die Entwicklung. Die echte Backend-Integration erfolgt in der nächsten Phase.

**Mock-Daten Struktur:**
```typescript
const mockMembers = [
  { id: '1', firstName: 'Max', lastName: 'Mustermann', email: 'max@example.com' }
];

const mockFeeTypes = [
  { id: '1', name: 'Jahresbeitrag Erwachsene', amount: 120.00, period: 'YEARLY' }
];

const mockOpenPayments = [
  {
    id: '1',
    member: { id: '1', firstName: 'Max', lastName: 'Mustermann' },
    feeType: { name: 'Jahresbeitrag', amount: 120.00 },
    dueDate: '2024-12-31',
    status: 'OPEN'
  }
];
```

### Routing
```typescript
// App.tsx
<Route path="/fees" element={<FeeManagementScreen />} />
<Route path="/fees/assign" element={<FeeAssignmentScreen />} />
<Route path="/fees/record" element={<PaymentRecordScreen />} />
<Route path="/fees/member/:memberId" element={<MemberFeeDetailScreen />} />
```

### API Endpoints (geplant)
```typescript
// POST /api/fees/assign
{
  memberIds: string[],
  feeTypeId: string,
  dueDate: string
}

// POST /api/fees/payments
{
  paymentId: string,
  paymentDate: string,
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'SEPA' | 'CARD',
  notes?: string
}

// GET /api/fees/member/:memberId
// Returns: { member, fees, payments, statistics }
```

---

## 📱 Responsive Design

Alle Screens sind **vollständig responsive** und funktionieren auf:
- 📱 **Mobile** (< 640px)
- 📱 **Tablet** (640px - 1024px)
- 💻 **Desktop** (> 1024px)

---

## ✅ Validierung

### FeeAssignmentScreen
- ❌ Mindestens 1 Mitglied muss ausgewählt sein
- ❌ Beitragssatz muss ausgewählt sein
- ❌ Fälligkeitsdatum muss gesetzt sein

### PaymentRecordScreen
- ❌ Offener Beitrag muss ausgewählt sein
- ❌ Zahlungsdatum muss gesetzt sein
- ❌ Zahlungsmethode muss ausgewählt sein

---

## 🚀 Nächste Schritte

### Backend-Integration
1. ✅ FeeController.java erstellen
2. ✅ FeeService.java implementieren
3. ✅ PaymentEntity hinzufügen
4. ✅ API-Endpoints implementieren

### Redux Integration
1. ✅ `assignFeesToMembers()` in feesSlice
2. ✅ `recordPayment()` in feesSlice
3. ✅ `fetchMemberFeeDetails()` in feesSlice

### Feature-Erweiterungen
1. 📧 E-Mail-Benachrichtigungen bei Fälligkeit
2. 📄 PDF-Export für Mahnungen
3. 🔄 Automatische Mahnläufe
4. 💰 Bulk-Zahlungen erfassen
5. 📊 Erweiterte Statistiken (Zahlungsquote pro Monat)

---

## 🐛 Known Issues

**Keine bekannten Bugs** (Stand: 07.10.2025)

---

## 📞 Support

Bei Fragen oder Problemen:
- **Entwickler:** Hans Hahn
- **E-Mail:** [Ihre E-Mail]
- **Projekt:** DartClubManager
- **Version:** 1.0

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**
