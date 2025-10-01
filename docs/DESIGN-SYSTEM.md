# 🎨 DartClubManager - Design System & Component Library

**Version:** 2.0  
**Datum:** 30.09.2025  
**Erstellt von:** Hans Hahn - Alle Rechte vorbehalten

---

## 📋 Inhaltsverzeichnis

1. [Farbpalette](#farbpalette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Komponenten-Bibliothek](#komponenten-bibliothek)
5. [Animations](#animations)
6. [Responsive Design](#responsive-design)
7. [Best Practices](#best-practices)

---

## 🎨 Farbpalette

### Primary Colors (Blau)

```css
/* Tailwind Classes */
bg-primary        → #1976D2  /* Material Blue 700 */
bg-primary-light  → #63A4FF  /* Helleres Blau */
bg-primary-dark   → #004BA0  /* Dunkleres Blau */

text-primary      → Blaue Textfarbe
border-primary    → Blauer Border
```

**Verwendung:**
- **Primary:** Haupt-CTAs, Links, wichtige Buttons
- **Primary Light:** Hover-States, Hintergründe
- **Primary Dark:** Gradients, Footer

### Secondary Colors (Orange)

```css
bg-secondary        → #FF6F00  /* Orange 800 */
bg-secondary-light  → #FFA040  
bg-secondary-dark   → #C43E00  

text-secondary      → Orange Textfarbe
border-secondary    → Oranger Border
```

**Verwendung:**
- **Secondary:** Sekundäre CTAs, Highlights, Akzente
- **Secondary Light:** Hover auf sekundären Buttons
- **Secondary Dark:** Dunkle Akzente

### Neutral Colors

```css
bg-white          → #FFFFFF
bg-gray-50        → #FAFAFA  /* Heller Hintergrund */
bg-gray-100       → #F5F5F5  /* Cards */
bg-gray-900       → #121212  /* Footer, Dark Sections */

text-gray-600     → #757575  /* Sekundär-Text */
text-gray-700     → #424242  /* Body-Text */
text-gray-900     → #212121  /* Headlines */
```

### Status Colors

```css
bg-green-500      → #388E3C  /* Success */
bg-red-500        → #D32F2F  /* Error */
bg-yellow-500     → #F57C00  /* Warning */
```

---

## 📝 Typography

### Font Family

```css
font-sans  → 'Inter', system-ui, sans-serif
```

**Google Fonts Import (in index.html):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Font Sizes (Responsive)

| Element | Mobile | Tablet (md:) | Desktop (lg:) | Class |
|---|---|---|---|---|
| **H1** | 2.25rem (36px) | 3rem (48px) | 4.5rem (72px) | `text-4xl md:text-5xl lg:text-7xl` |
| **H2** | 1.875rem (30px) | 2.25rem (36px) | 3rem (48px) | `text-3xl md:text-4xl lg:text-5xl` |
| **H3** | 1.5rem (24px) | 1.875rem (30px) | 2.25rem (36px) | `text-2xl md:text-3xl lg:text-4xl` |
| **Body** | 1rem (16px) | 1.125rem (18px) | 1.25rem (20px) | `text-base md:text-lg lg:text-xl` |
| **Small** | 0.875rem (14px) | 0.875rem | 1rem (16px) | `text-sm md:text-sm lg:text-base` |

### Font Weights

```css
font-normal      → 400  /* Body-Text */
font-medium      → 500  /* Buttons, Links */
font-semibold    → 600  /* Subheadings */
font-bold        → 700  /* Headlines */
font-extrabold   → 800  /* Hero-Headlines */
```

---

## 📐 Spacing & Layout

### Container

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

**Breakpoints:**
- `max-w-7xl` → 1280px (Standard)
- `max-w-6xl` → 1152px (Schmalere Sections)
- `max-w-4xl` → 896px (Text-Heavy Content)
- `max-w-2xl` → 672px (Narrow Content, z.B. Formular)

### Section Padding

```tsx
/* Standard Section */
<section className="py-20 px-4 sm:px-6 lg:px-8">

/* Hero Section (mehr Padding) */
<section className="py-32 px-4 sm:px-6 lg:px-8">

/* Compact Section */
<section className="py-12 px-4 sm:px-6 lg:px-8">
```

### Grid Layouts

**3-Column Grid (Responsive):**
```tsx
<div className="grid md:grid-cols-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**2-Column Grid:**
```tsx
<div className="grid md:grid-cols-2 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

**Auto-Fit Grid (flexibel):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {/* Auto-Anpassung an Viewport */}
</div>
```

---

## 🧩 Komponenten-Bibliothek

### 1. Buttons

#### Primary Button
```tsx
<button className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
  Jetzt starten
</button>
```

#### Secondary Button
```tsx
<button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-200">
  Demo ansehen
</button>
```

#### Outline Button
```tsx
<button className="px-6 py-3 text-secondary border-2 border-secondary rounded-lg font-medium hover:bg-secondary hover:text-white transition-all duration-200">
  Mehr erfahren
</button>
```

### 2. Cards

#### Basic Card
```tsx
<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
  <h3 className="text-xl font-bold text-gray-900 mb-3">Titel</h3>
  <p className="text-gray-600">Beschreibung...</p>
</div>
```

#### Gradient Card
```tsx
<div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary">
  <h3 className="text-2xl font-bold text-gray-900 mb-4">Feature</h3>
  <p className="text-gray-600 mb-6">Beschreibung...</p>
</div>
```

#### Icon Card
```tsx
<div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300">
  <div className="text-5xl mb-4">🎯</div>
  <h3 className="text-xl font-bold text-gray-900 mb-3">Titel</h3>
  <p className="text-gray-600">Text...</p>
</div>
```

### 3. Navigation

#### Sticky Navigation Bar
```tsx
<nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        🎯 Logo
      </div>
      
      {/* Links (Desktop) */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
          Features
        </a>
        <button className="px-4 py-2 text-secondary border-2 border-secondary rounded-lg">
          Login
        </button>
      </div>
    </div>
  </div>
</nav>
```

### 4. Hero Section

#### Full-Screen Hero mit Gradient
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
      backgroundSize: '40px 40px'
    }}></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6">
      Deine Headline
      <span className="bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent">
        mit Gradient
      </span>
    </h1>
    
    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Dein Subtext hier...
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-4 bg-secondary text-white rounded-lg font-bold">
        Primär CTA
      </button>
      <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg">
        Sekundär CTA
      </button>
    </div>
  </div>
</section>
```

### 5. Icons (Inline SVG)

#### User Icon
```tsx
const UsersIcon = () => (
  <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
```

#### Check Icon
```tsx
const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
```

#### Arrow Icon
```tsx
const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
```

### 6. Footer

```tsx
<footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      {/* Column 1: Branding */}
      <div>
        <h3 className="text-xl font-bold mb-4">🎯 DartClubManager</h3>
        <p className="text-gray-400">Die moderne Vereinsverwaltung.</p>
      </div>
      
      {/* Column 2: Links */}
      <div>
        <h4 className="font-bold mb-4">Links</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Preise</a></li>
        </ul>
      </div>
      
      {/* Column 3: Legal */}
      <div>
        <h4 className="font-bold mb-4">Rechtliches</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white">Impressum</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Datenschutz</a></li>
        </ul>
      </div>
    </div>
    
    {/* Copyright */}
    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
      <p>© 2025 DartClubManager - Alle Rechte vorbehalten</p>
    </div>
  </div>
</footer>
```

---

## ✨ Animations

### CSS Animations (in index.css)

```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fade In Up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Tailwind Animation Classes

```tsx
/* Fade In */
<div className="animate-fade-in">Content</div>

/* Fade In Up */
<div className="animate-fade-in-up">Content</div>

/* Bounce (Built-in) */
<div className="animate-bounce">↓</div>

/* Pulse (Built-in) */
<div className="animate-pulse">Loading...</div>
```

### Hover Animations

```tsx
/* Lift on Hover */
<div className="transform hover:-translate-y-2 transition-all duration-300">

/* Scale on Hover */
<div className="transform hover:scale-105 transition-all duration-200">

/* Shadow on Hover */
<div className="shadow-md hover:shadow-xl transition-shadow duration-300">
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
sm:   640px   /* Small tablets */
md:   768px   /* Tablets */
lg:   1024px  /* Laptops */
xl:   1280px  /* Desktops */
2xl:  1536px  /* Large Desktops */
```

### Responsive Patterns

#### Hide/Show Elements
```tsx
/* Show only on mobile */
<div className="block md:hidden">Mobile Only</div>

/* Show only on desktop */
<div className="hidden md:block">Desktop Only</div>
```

#### Responsive Grid
```tsx
/* 1 column mobile, 2 tablet, 3 desktop */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

#### Responsive Text Sizes
```tsx
<h1 className="text-3xl md:text-5xl lg:text-7xl">
  Responsive Headline
</h1>
```

#### Responsive Padding
```tsx
<section className="py-12 md:py-16 lg:py-20">
  {/* Less padding on mobile, more on desktop */}
</section>
```

---

## 💡 Best Practices

### 1. Performance

```tsx
/* ✅ DO: Inline SVG Icons (better performance) */
<svg className="w-6 h-6">...</svg>

/* ❌ DON'T: External Icon Libraries (bundle size) */
<FontAwesomeIcon icon={faUser} />
```

### 2. Accessibility

```tsx
/* ✅ DO: Semantic HTML */
<nav>, <main>, <section>, <article>, <footer>

/* ✅ DO: Alt-Text für Bilder */
<img src="..." alt="Beschreibung" />

/* ✅ DO: Focus States */
<button className="focus:outline-2 focus:outline-primary">
```

### 3. Mobile First

```tsx
/* ✅ DO: Start with mobile, then scale up */
<div className="p-4 md:p-6 lg:p-8">

/* ❌ DON'T: Start with desktop */
<div className="lg:p-8 md:p-6 p-4">
```

### 4. Consistent Spacing

```tsx
/* ✅ DO: Use Tailwind's spacing scale */
p-4, p-6, p-8, p-12, p-16, p-20
gap-4, gap-6, gap-8

/* ❌ DON'T: Arbitrary values */
p-[13px], gap-[27px]
```

### 5. Color Usage

```tsx
/* ✅ DO: Use semantic colors */
bg-primary, text-secondary, border-gray-300

/* ❌ DON'T: Hardcoded hex colors */
bg-[#1976D2]
```

---

## 🎯 Quick Copy Templates

### Landing Page Section Template
```tsx
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Section Headline
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Section Subtext
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      {/* Card */}
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-3">Card Title</h3>
        <p className="text-gray-600">Card content...</p>
      </div>
    </div>
  </div>
</section>
```

### CTA Section Template
```tsx
<section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-dark">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-white mb-6">
      Ready to get started?
    </h2>
    <p className="text-xl text-white/90 mb-8">
      Join thousands of happy customers.
    </p>
    <button className="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all">
      Get Started Now
    </button>
  </div>
</section>
```

---

## 📦 Checkliste: Neues Design erstellen

- [ ] **Farben definieren** (in tailwind.config.js)
- [ ] **Typography festlegen** (Headings, Body, Weights)
- [ ] **Container-Breiten** entscheiden (max-w-7xl, 6xl, etc.)
- [ ] **Button-Styles** kreieren (Primary, Secondary, Outline)
- [ ] **Card-Komponenten** bauen
- [ ] **Navigation** implementieren (Desktop + Mobile)
- [ ] **Hero Section** gestalten
- [ ] **Footer** erstellen
- [ ] **Responsive Testing** (Mobile, Tablet, Desktop)
- [ ] **Animations** hinzufügen (Fade, Hover)
- [ ] **Accessibility** prüfen (Focus States, Alt-Texts)

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**  
**Letzte Aktualisierung:** 30.09.2025
