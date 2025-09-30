# Klassendokumentation (Abgeleitet vom Datenbankschema)

Dieses Dokument beschreibt die wahrscheinlichen Klassen und Datenmodelle, die aus dem in der `README.md` definierten Datenbankschema abgeleitet wurden. Es dient als Referenz für die Backend-Entitäten (Java/JPA) und die Frontend-Modelle (TypeScript/React).

---

## Backend: Java/Spring (JPA Entities)

Die folgenden Klassen repräsentieren die JPA-Entitäten, die auf die PostgreSQL-Tabellen abgebildet werden.

### Organization

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `name` | `String` | Name des Vereins |

### User

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `email` | `String` | E-Mail-Adresse (eindeutig) |

### Member

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `firstName` | `String` | Vorname |
| `lastName` | `String` | Nachname |

### Team

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `name` | `String` | Name des Teams |

### Match

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `matchDate` | `LocalDateTime` | Datum und Uhrzeit des Spiels |
| `status` | `String` (Enum) | Status des Spiels |

### Throw

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `throwTotal` | `int` | Gesamtergebnis des Wurfs |
| `remainingScore` | `int` | Verbleibende Punktzahl |

---

## Frontend: TypeScript/React (Interfaces)

Die folgenden Interfaces repräsentieren die Datenmodelle, die für die Verarbeitung der API-Antworten im React-Frontend verwendet werden.

### Organization

```typescript
export interface Organization {
  id: string; // UUID
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}
```

### User

```typescript
export interface User {
  id: string; // UUID
  email: string;
  displayName?: string;
  isActive: boolean;
}
```

### Member

```typescript
export interface Member {
  id: string; // UUID
  orgId: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthdate?: string; // ISO 8601 Date
  licenseNo?: string;
  handedness?: 'left' | 'right';
  notes?: string;
}
```

### Team

```typescript
export interface Team {
  id: string; // UUID
  orgId: string;
  name: string;
  season?: string;
  captainId?: string; // UUID of a Member
}
```

### Match

```typescript
export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'cancelled';

export interface Match {
  id: string; // UUID
  orgId: string;
  homeTeamId?: string;
  awayTeamId?: string;
  matchDate: string; // ISO 8601 DateTime
  venue?: string;
  league?: string;
  matchType: 'league' | 'friendly' | 'cup' | 'practice';
  status: MatchStatus;
  homeSets: number;
  awaySets: number;
  startingScore: 301 | 501 | 701;
  doubleOut: boolean;
}
```

### Throw

```typescript
export interface Throw {
  id: string; // UUID
  legId: string;
  memberId: string;
  throwNo: number;
  throwTotal: number;
  remainingScore: number;
  isBust: boolean;
  isCheckout: boolean;
  darts: {
    multiplier: number;
    segment: number;
    score: number;
  }[];
}
```

### Event

```typescript
export interface Event {
  id: string; // UUID
  orgId: string;
  eventType: 'training' | 'match' | 'meeting' | 'other';
  title: string;
  description?: string;
  startTime: string; // ISO 8601 DateTime
  endTime?: string; // ISO 8601 DateTime
  location?: string;
}
```

### Poll

```typescript
export interface Poll {
  id: string; // UUID
  orgId: string;
  title: string;
  description?: string;
  deadline?: string; // ISO 8601 DateTime
  isClosed: boolean;
}
```

### Fee

```typescript
export interface Fee {
  id: string; // UUID
  orgId: string;
  name: string;
  description?: string;
  amount: number;
  period: 'yearly' | 'monthly' | 'quarterly' | 'one_time';
  isActive: boolean;
}
```
