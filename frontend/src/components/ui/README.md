# 🎨 UI Components - Modern Design System

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Version:** 3.0

---

## 📋 Übersicht

Dieses Verzeichnis enthält wiederverwendbare UI-Komponenten, die dem modernen Design-System folgen.

**Design-Prinzipien:**
- ✅ **Minimalistisch:** Weniger ist mehr
- ✅ **Konsistent:** Einheitliches Aussehen und Verhalten
- ✅ **Zugänglich:** WCAG 2.1 Level AA konform
- ✅ **Responsiv:** Funktioniert auf allen Bildschirmgrößen
- ✅ **Type-Safe:** Vollständig typisiert mit TypeScript

---

## 🧩 Verfügbare Komponenten

### Button

Primärer, sekundärer und tertiärer Button mit Loading-States.

```tsx
import { Button } from '@/components/ui';

// Primary Button (für Hauptaktionen)
<Button variant="primary" size="md">
  Speichern
</Button>

// Secondary Button (Standard)
<Button variant="secondary">
  Abbrechen
</Button>

// Ghost Button (tertiär)
<Button variant="ghost" size="sm">
  Mehr anzeigen
</Button>

// Mit Loading State
<Button variant="primary" isLoading>
  Laden...
</Button>

// Mit Icons
<Button 
  variant="primary" 
  leftIcon={<SaveIcon />}
>
  Speichern
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `isLoading`: boolean
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode

---

### Card

Container-Komponente für Inhalte mit optionalen Sub-Komponenten.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

<Card hover>
  <CardHeader>
    <CardTitle>Titel</CardTitle>
    <CardDescription>Beschreibung</CardDescription>
  </CardHeader>
  
  <CardContent>
    {/* Inhalt */}
  </CardContent>
  
  <CardFooter>
    {/* Footer mit Buttons */}
  </CardFooter>
</Card>
```

**Props:**
- `hover`: boolean (Hover-Effekt aktivieren)
- `padding`: 'none' | 'sm' | 'md' | 'lg'

---

### Input

Text-Input mit Label, Error und Helper-Text.

```tsx
import { Input } from '@/components/ui';

<Input
  label="E-Mail"
  type="email"
  placeholder="name@example.com"
  error="Ungültige E-Mail"
  helperText="Wir senden dir eine Bestätigung"
  leftIcon={<MailIcon />}
/>
```

**Varianten:**
- `Input` - Standard Text-Input
- `Textarea` - Mehrzeilige Text-Eingabe
- `Select` - Dropdown-Auswahl

---

### Badge

Status-Anzeige oder Labels.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Aktiv</Badge>
<Badge variant="warning" size="sm">Ausstehend</Badge>
<Badge variant="error" dot>Offline</Badge>
```

**Props:**
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md'
- `dot`: boolean (Punkt-Indikator)

---

### StatsCard

Statistik-Karte mit Icon und Trend.

```tsx
import { StatsCard } from '@/components/ui';

<StatsCard
  label="Aktive Spieler"
  value={24}
  change={{ value: 12, label: 'vs. letzte Woche' }}
  trend="up"
  icon={<UsersIcon />}
/>
```

**Props:**
- `label`: string
- `value`: string | number
- `change`: { value: number, label: string }
- `trend`: 'up' | 'down' | 'neutral'
- `icon`: ReactNode

---

## 🎨 Design-Tokens

### Farben

**Verwende immer die Tailwind-Klassen:**

```tsx
// Primary (Blau) - sparsam einsetzen!
bg-blue-500    // Hauptfarbe
bg-blue-600    // Hover
text-blue-600  // Text

// Neutral (Hauptfarben!)
bg-white       // Cards, Surfaces
bg-gray-50     // Page Background
bg-gray-100    // Subtle Card Backgrounds
text-gray-900  // Headlines
text-gray-600  // Body Text
text-gray-500  // Secondary Text
border-gray-200 // Borders

// Status
bg-green-50 text-green-700  // Success
bg-red-50 text-red-700      // Error
bg-yellow-50 text-yellow-700 // Warning
```

### Spacing

**8px Grid System:**
```
p-2  → 8px
p-4  → 16px
p-6  → 24px
p-8  → 32px
p-12 → 48px
```

### Border Radius

```
rounded-lg  → 12px (Standard)
rounded-xl  → 16px (Cards)
rounded-2xl → 20px (Large Cards)
```

---

## 📱 Responsive Design

### Breakpoints

```
sm:  640px   (Mobile Landscape)
md:  768px   (Tablets)
lg:  1024px  (Laptops)
xl:  1280px  (Desktops)
```

### Beispiele

```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">

// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Hide on mobile
<div className="hidden lg:block">

// Show on mobile only
<div className="block lg:hidden">
```

---

## ✅ Best Practices

### DO ✅

```tsx
// Verwende konsistente Abstände (8px Grid)
<div className="p-6 gap-4">

// Verwende semantische Komponenten
<Card>
  <CardHeader>
    <CardTitle>Titel</CardTitle>
  </CardHeader>
</Card>

// Verwende Tailwind-Farben
<div className="bg-white border-gray-200">

// Hover-States hinzufügen
<button className="hover:bg-gray-50 transition-colors">
```

### DON'T ❌

```tsx
// Keine inkonsistenten Abstände
<div className="p-5 gap-7">  ❌

// Keine Inline-Styles
<div style={{ padding: '13px' }}>  ❌

// Keine bunten Hintergründe ohne Grund
<div className="bg-gradient-to-r from-purple-500 to-pink-500">  ❌

// Keine mehrfachen Farben in einer Komponente
<div className="bg-blue-500 text-red-500 border-green-500">  ❌
```

---

## 🔧 Entwicklung

### Neue Komponente erstellen

1. **Datei erstellen:** `components/ui/MeineKomponente.tsx`
2. **TypeScript Interface definieren:**
```tsx
interface MeineKomponenteProps {
  title: string;
  // ...
}
```
3. **Komponente implementieren**
4. **Export in `index.tsx` hinzufügen**
5. **Dokumentation aktualisieren**

### Testing

```tsx
// Komponente sollte testbar sein
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

---

## 📚 Weitere Ressourcen

- **Design-System Doku:** `/docs/DESIGN-SYSTEM.md`
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Heroicons:** https://heroicons.com (Empfohlene Icons)

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Letzte Aktualisierung:** 06.10.2025
