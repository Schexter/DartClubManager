# 🎨 DartClubManager - Modernes Design System

**Version:** 3.0 (Modern Edition)  
**Datum:** 06.10.2025  
**Erstellt von:** Hans Hahn - Alle Rechte vorbehalten

---

## 📋 Inhaltsverzeichnis

1. [Design-Philosophie](#design-philosophie)
2. [Farbpalette (Modern & Reduziert)](#farbpalette-modern--reduziert)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Komponenten-Bibliothek](#komponenten-bibliothek)
6. [Dark Mode](#dark-mode)
7. [Responsive Design](#responsive-design)
8. [Best Practices](#best-practices)

---

## 🎯 Design-Philosophie

### Prinzipien

**Weniger ist mehr:**
- Reduzierte Farbpalette (Neutral + ein Akzent)
- Weißraum als Gestaltungselement
- Subtile Schatten statt bunter Hintergründe

**Klarheit:**
- Klare Hierarchien durch Größe und Gewicht (nicht Farbe)
- Konsistente Abstände
- Lesbarkeit über Dekoration

**Modern & Zeitlos:**
- Minimalistisch, aber warm
- Professionell, aber zugänglich
- Web-First, aber Native-Feel

---

## 🎨 Farbpalette (Modern & Reduziert)

### Primary (Nur ein Akzent!)

```css
/* Blau - Sparsam einsetzen! */
--color-primary-50:  #EFF6FF;   /* Sehr heller Hintergrund */
--color-primary-100: #DBEAFE;   /* Hover-Backgrounds */
--color-primary-500: #3B82F6;   /* Hauptfarbe (Blue 500) */
--color-primary-600: #2563EB;   /* Hover/Active States */
--color-primary-700: #1D4ED8;   /* Pressed States */
```

**Verwendung:**
- Nur für primäre CTAs (1-2 pro Screen)
- Links (sparsam)
- Wichtige Status-Indikatoren
- Icons nur wenn semantisch wichtig

**❌ NICHT verwenden für:**
- Hintergründe von großen Flächen
- Dekorative Elemente
- Cards

### Neutral (Die Hauptfarben!)

```css
/* Grau-Skala - Das ist eure Hauptpalette! */
--color-gray-50:  #F9FAFB;   /* Page Background */
--color-gray-100: #F3F4F6;   /* Card Background (subtil) */
--color-gray-200: #E5E7EB;   /* Borders */
--color-gray-300: #D1D5DB;   /* Dividers */
--color-gray-400: #9CA3AF;   /* Placeholder Text */
--color-gray-500: #6B7280;   /* Secondary Text */
--color-gray-600: #4B5563;   /* Body Text (Light Mode) */
--color-gray-700: #374151;   /* Headings (Light Mode) */
--color-gray-800: #1F2937;   /* Dark Headings */
--color-gray-900: #111827;   /* Highest Contrast Text */
```

**Verwendung:**
- 90% der UI nutzt diese Farben!
- Weiße Cards auf Gray-50 Background
- Gray-100 für subtile Card-Hintergründe
- Gray-200 für Borders
- Gray-600/700 für Text

### Status Colors (Nur wenn nötig!)

```css
/* Grün - Nur für Erfolge */
--color-green-50:  #F0FDF4;
--color-green-500: #10B981;
--color-green-600: #059669;

/* Rot - Nur für Fehler/Warnungen */
--color-red-50:  #FEF2F2;
--color-red-500: #EF4444;
--color-red-600: #DC2626;

/* Gelb - Nur für Warnungen */
--color-yellow-50:  #FFFBEB;
--color-yellow-500: #F59E0B;
--color-yellow-600: #D97706;
```

**Verwendung:**
- Nur semantisch (Erfolg, Fehler, Warnung)
- Nicht als Design-Element!

---

## 📝 Typography

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Import (in index.html):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Font Sizes & Weights

| Element | Size | Weight | Line Height | Tailwind Class |
|---------|------|--------|-------------|----------------|
| **H1** | 36px | 700 | 1.2 | `text-4xl font-bold leading-tight` |
| **H2** | 30px | 700 | 1.3 | `text-3xl font-bold` |
| **H3** | 24px | 600 | 1.4 | `text-2xl font-semibold` |
| **H4** | 20px | 600 | 1.4 | `text-xl font-semibold` |
| **Body Large** | 18px | 400 | 1.6 | `text-lg text-gray-600` |
| **Body** | 16px | 400 | 1.6 | `text-base text-gray-600` |
| **Body Small** | 14px | 400 | 1.5 | `text-sm text-gray-500` |
| **Caption** | 12px | 500 | 1.4 | `text-xs text-gray-400 font-medium` |

### Text Color Hierarchy

```tsx
/* Headlines */
<h1 className="text-gray-900">Hauptüberschrift</h1>
<h2 className="text-gray-800">Unterüberschrift</h2>

/* Body Text */
<p className="text-gray-600">Normaler Text</p>
<p className="text-gray-500">Sekundärer Text</p>

/* Disabled/Placeholder */
<span className="text-gray-400">Deaktiviert</span>
```

---

## 📐 Spacing & Layout

### Container Sizes

```tsx
/* Standard Content Container */
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* 1280px max-width */}
</div>

/* Narrow Content (Text-heavy) */
<div className="max-w-4xl mx-auto px-4">
  {/* 896px max-width */}
</div>

/* Wide Dashboard */
<div className="max-w-screen-2xl mx-auto px-4">
  {/* 1536px max-width */}
</div>
```

### Spacing Scale (8px Grid)

**Nutze nur diese Werte:**
- `p-2` → 8px
- `p-3` → 12px
- `p-4` → 16px
- `p-6` → 24px
- `p-8` → 32px
- `p-12` → 48px
- `p-16` → 64px
- `p-20` → 80px
- `p-24` → 96px

**❌ Vermeide:** `p-5`, `p-7`, `p-9` etc.

---

## 🧩 Komponenten-Bibliothek

### 1. Buttons

#### Primary Button (Nur für Hauptaktionen!)
```tsx
<button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Speichern
</button>
```

#### Secondary Button (Standard für meiste Aktionen)
```tsx
<button className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Abbrechen
</button>
```

#### Ghost Button (Tertiäre Aktionen)
```tsx
<button className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
  Mehr anzeigen
</button>
```

#### Icon Button
```tsx
<button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
```

### 2. Cards (Minimalistisch!)

#### Standard Card (Weiß auf Gray-Background)
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Card Titel
  </h3>
  <p className="text-sm text-gray-600">
    Card Inhalt mit etwas mehr Text...
  </p>
</div>
```

#### Stats Card
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">Aktive Spieler</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
    </div>
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Icon */}
      </svg>
    </div>
  </div>
  <div className="mt-4 flex items-center text-sm">
    <span className="text-green-600 font-medium">↑ 12%</span>
    <span className="text-gray-500 ml-2">vs. letzte Woche</span>
  </div>
</div>
```

#### Interactive List Item
```tsx
<button className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors group">
  <div className="flex items-center gap-4">
    {/* Avatar */}
    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
      HH
    </div>
    
    {/* Content */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">
        Hans Hahn
      </p>
      <p className="text-sm text-gray-500 truncate">
        Captain · Lizenz 12345
      </p>
    </div>
    
    {/* Arrow */}
    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
</button>
```

### 3. Navigation

#### Top Navigation Bar
```tsx
<nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        <span className="text-lg font-semibold text-gray-900">DartClub</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Dashboard
        </a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
          Teams
        </a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
          Matches
        </a>
      </div>
      
      {/* Profile */}
      <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
        <span className="text-sm font-medium">HH</span>
      </button>
    </div>
  </div>
</nav>
```

#### Sidebar Navigation
```tsx
<aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
  <div className="p-6">
    {/* Logo */}
    <div className="flex items-center gap-2 mb-8">
      <span className="text-2xl">🎯</span>
      <span className="text-lg font-semibold text-gray-900">DartClub</span>
    </div>
    
    {/* Navigation Items */}
    <nav className="space-y-1">
      {/* Active Item */}
      <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Icon */}
        </svg>
        Dashboard
      </a>
      
      {/* Inactive Item */}
      <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Icon */}
        </svg>
        Teams
      </a>
    </nav>
  </div>
</aside>
```

### 4. Forms

#### Input Field
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    E-Mail
  </label>
  <input
    type="email"
    id="email"
    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="name@example.com"
  />
</div>
```

#### Select
```tsx
<div className="space-y-2">
  <label htmlFor="team" className="block text-sm font-medium text-gray-700">
    Team
  </label>
  <select
    id="team"
    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    <option>Falcons</option>
    <option>Eagles</option>
  </select>
</div>
```

#### Checkbox
```tsx
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
  />
  <span className="text-sm text-gray-700">
    Ich akzeptiere die AGB
  </span>
</label>
```

### 5. Status Badges

```tsx
{/* Success */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
  Aktiv
</span>

{/* Warning */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
  Ausstehend
</span>

{/* Error */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
  Fehler
</span>

{/* Neutral */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
  Entwurf
</span>
```

### 6. Empty States

```tsx
<div className="text-center py-12">
  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Icon */}
    </svg>
  </div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Keine Matches vorhanden
  </h3>
  <p className="text-sm text-gray-500 mb-6">
    Erstelle dein erstes Match, um loszulegen.
  </p>
  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
    + Neues Match
  </button>
</div>
```

### 7. Loading States

#### Spinner
```tsx
<div className="flex items-center justify-center p-8">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
</div>
```

#### Skeleton Card
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

---

## 🌓 Dark Mode

### Color Mapping (Dark Mode)

```css
/* Light Mode → Dark Mode Mapping */
bg-white          → dark:bg-gray-900
bg-gray-50        → dark:bg-gray-800
bg-gray-100       → dark:bg-gray-800

text-gray-900     → dark:text-white
text-gray-700     → dark:text-gray-200
text-gray-600     → dark:text-gray-300
text-gray-500     → dark:text-gray-400

border-gray-200   → dark:border-gray-700
border-gray-300   → dark:border-gray-600
```

### Dark Mode Example

```tsx
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    Card Titel
  </h3>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    Card Inhalt
  </p>
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```
sm:   640px   (Mobile Landscape, Small Tablets)
md:   768px   (Tablets)
lg:   1024px  (Laptops)
xl:   1280px  (Desktops)
2xl:  1536px  (Large Desktops)
```

### Mobile-First Examples

```tsx
/* Stack on mobile, side-by-side on desktop */
<div className="flex flex-col md:flex-row gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

/* 1 column mobile, 2 tablet, 3 desktop */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

/* Smaller padding on mobile */
<section className="py-12 md:py-16 lg:py-20">
  {/* Content */}
</section>

/* Hide on mobile, show on desktop */
<div className="hidden lg:block">Desktop Only</div>

/* Show on mobile, hide on desktop */
<div className="block lg:hidden">Mobile Only</div>
```

---

## 💡 Best Practices

### ✅ DO

```tsx
/* Verwende neutrale Farben für 90% der UI */
<div className="bg-white border border-gray-200 text-gray-900">

/* Subtile Hover-Effekte */
<button className="hover:bg-gray-50 transition-colors">

/* Klare Text-Hierarchie durch Größe und Gewicht */
<h1 className="text-2xl font-semibold text-gray-900">
<p className="text-sm text-gray-600">

/* Konsistente Abstände (8px Grid) */
<div className="p-6 gap-4">
```

### ❌ DON'T

```tsx
/* Keine bunten Hintergründe für große Flächen */
<div className="bg-blue-500">  /* ❌ */

/* Keine mehrfarbigen UI-Elemente ohne Grund */
<div className="bg-gradient-to-r from-blue-500 to-purple-600">  /* ❌ */

/* Keine inkonsistenten Abstände */
<div className="p-5 gap-7">  /* ❌ - Nutze nur 8px Grid */

/* Keine unnötigen Animationen */
<div className="animate-bounce">  /* ❌ - Nur wo sinnvoll */
```

### Komponenten-Checkliste

Jede Komponente sollte haben:
- [ ] **Hover State** (subtil, meist bg-gray-50)
- [ ] **Focus State** (Ring mit focus:ring-2)
- [ ] **Active State** (dunkler als Hover)
- [ ] **Disabled State** (opacity-50, cursor-not-allowed)
- [ ] **Loading State** (Spinner oder Skeleton)
- [ ] **Empty State** (Icon + Text + CTA)
- [ ] **Dark Mode Support** (dark: Präfixe)

---

## 📦 Quick Start Templates

### Dashboard Layout
```tsx
<div className="min-h-screen bg-gray-50">
  {/* Top Navigation */}
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
    {/* Nav Content */}
  </nav>
  
  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600">Willkommen zurück, Hans</p>
    </div>
    
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Stats Cards */}
    </div>
    
    {/* Content Sections */}
    <div className="space-y-8">
      {/* Sections */}
    </div>
  </main>
</div>
```

### Login Page
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <span className="text-4xl mb-2 block">🎯</span>
        <h2 className="text-2xl font-bold text-gray-900">Anmelden</h2>
        <p className="text-sm text-gray-500 mt-2">
          Melde dich mit deinem Account an
        </p>
      </div>
      
      {/* Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-Mail
          </label>
          <input
            type="email"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passwort
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Anmelden
        </button>
      </form>
      
      <p className="text-center text-sm text-gray-500 mt-6">
        Noch kein Account?{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
          Registrieren
        </a>
      </p>
    </div>
  </div>
</div>
```

---

## 🎨 Design Tokens Export

Für Entwickler-Handoff oder Design-Tools:

```json
{
  "colors": {
    "primary": {
      "50": "#EFF6FF",
      "500": "#3B82F6",
      "600": "#2563EB"
    },
    "gray": {
      "50": "#F9FAFB",
      "100": "#F3F4F6",
      "200": "#E5E7EB",
      "300": "#D1D5DB",
      "400": "#9CA3AF",
      "500": "#6B7280",
      "600": "#4B5563",
      "700": "#374151",
      "800": "#1F2937",
      "900": "#111827"
    }
  },
  "spacing": {
    "xs": "8px",
    "sm": "12px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px"
  },
  "borderRadius": {
    "sm": "6px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px"
  }
}
```

---

## 📚 Weitere Ressourcen

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Heroicons:** https://heroicons.com (Empfohlene Icons)
- **Headless UI:** https://headlessui.com (Accessibility-Components)

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Letzte Aktualisierung:** 06.10.2025

---

## 🔄 Changelog

### Version 3.0 (06.10.2025)
- ✨ Komplette Neugestaltung: Moderner, minimalistischer Ansatz
- 🎨 Reduzierte Farbpalette: Neutral + ein Akzent (Blau)
- ⚪ Weißraum als Gestaltungselement
- 🔲 Subtile Schatten statt bunter Hintergründe
- 📱 Optimierte mobile Komponenten
- 🌓 Verbessertes Dark Mode System
- 📦 Neue Quick Start Templates

### Version 2.0 (30.09.2025)
- Initial Design System mit bunter Palette
- Material Design inspirierte Farben
- Erste Komponenten-Bibliothek
