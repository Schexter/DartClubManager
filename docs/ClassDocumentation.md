# Klassendokumentation (Abgeleitet vom Datenbankschema)

Dieses Dokument beschreibt die wahrscheinlichen Klassen und Datenmodelle, die aus dem in der `README.md` definierten Datenbankschema abgeleitet wurden. Es dient als Referenz für die Backend-Entitäten (Java/JPA) und die Frontend-Modelle (Dart/Flutter).

---

## Backend: Java/Spring (JPA Entities)

Die folgenden Klassen repräsentieren die JPA-Entitäten, die auf die PostgreSQL-Tabellen abgebildet werden.

### Organization

Repräsentiert einen Verein oder Mandanten.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `name` | `String` | Name des Vereins |
| `slug` | `String` | Eindeutiger Kurzname für URLs |
| `logoUrl` | `String` | URL zum Vereinslogo |
| `primaryColor` | `String` | Hauptfarbe für das Branding |
| `secondaryColor` | `String` | Zweitfarbe für das Branding |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### User

Repräsentiert einen Anwendungsbenutzer mit Login-Daten.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `email` | `String` | E-Mail-Adresse (eindeutig) |
| `passwordHash` | `String` | Gehashtes Passwort |
| `displayName` | `String` | Anzeigename des Benutzers |
| `isActive` | `boolean` | Status, ob der Account aktiv ist |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### Membership

Verbindungstabelle zwischen `User` und `Organization`, die die Rolle festlegt.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `userId` | `UUID` | Fremdschlüssel zum `User` |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `role` | `String` (Enum) | Rolle des Benutzers im Verein (z.B. `ADMIN`, `PLAYER`) |
| `status` | `String` (Enum) | Status der Mitgliedschaft (z.B. `ACTIVE`, `INACTIVE`) |
| `joinedAt` | `LocalDate` | Datum des Beitritts |
| `leftAt` | `LocalDate` | Datum des Austritts |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### Member

Repräsentiert ein Vereinsmitglied mit persönlichen Daten.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `userId` | `UUID` | Optionaler Fremdschlüssel zum `User` |
| `firstName` | `String` | Vorname |
| `lastName` | `String` | Nachname |
| `email` | `String` | E-Mail-Adresse des Mitglieds |
| `phone` | `String` | Telefonnummer |
| `birthdate` | `LocalDate` | Geburtsdatum |
| `licenseNo` | `String` | Lizenz- oder Spielernummer |
| `handedness` | `String` (Enum) | Wurfhand (`LEFT`, `RIGHT`) |
| `notes` | `String` | Freitext für Notizen |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### Team

Repräsentiert eine Mannschaft innerhalb eines Vereins.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `name` | `String` | Name des Teams |
| `season` | `String` | Saison, in der das Team spielt (z.B. "2024/25") |
| `captainId` | `UUID` | Fremdschlüssel zum `Member` (Teamkapitän) |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### Match

Repräsentiert ein Spiel zwischen zwei Teams oder Spielern.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `homeTeamId` | `UUID` | Fremdschlüssel zum Heim-Team |
| `awayTeamId` | `UUID` | Fremdschlüssel zum Gast-Team |
| `matchDate` | `LocalDateTime` | Datum und Uhrzeit des Spiels |
| `venue` | `String` | Austragungsort |
| `league` | `String` | Liga oder Wettbewerb |
| `matchType` | `String` (Enum) | Art des Spiels (z.B. `LEAGUE`, `FRIENDLY`) |
| `status` | `String` (Enum) | Status des Spiels (z.B. `SCHEDULED`, `LIVE`, `FINISHED`) |
| `homeSets` | `int` | Gewonnene Sätze des Heim-Teams |
| `awaySets` | `int` | Gewonnene Sätze des Gast-Teams |
| `bestOfSets` | `int` | Spielmodus: Anzahl der zu gewinnenden Sätze |
| `bestOfLegs` | `int` | Spielmodus: Anzahl der zu gewinnenden Legs pro Satz |
| `startingScore` | `int` | Startpunktzahl (z.B. 501, 301) |
| `doubleOut` | `boolean` | Gibt an, ob mit einem Doppel beendet werden muss |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |
| `finishedAt` | `LocalDateTime` | Zeitstempel des Spielendes |

### Set

Repräsentiert einen Satz innerhalb eines Matches.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `matchId` | `UUID` | Fremdschlüssel zum `Match` |
| `setNo` | `int` | Laufende Nummer des Satzes im Match |
| `homeLegs` | `int` | Gewonnene Legs des Heim-Teams in diesem Satz |
| `awayLegs` | `int` | Gewonnene Legs des Gast-Teams in diesem Satz |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### Leg

Repräsentiert ein Leg innerhalb eines Satzes.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `setId` | `UUID` | Fremdschlüssel zum `Set` |
| `legNo` | `int` | Laufende Nummer des Legs im Satz |
| `startingScore` | `int` | Startpunktzahl des Legs |
| `homeMemberId` | `UUID` | Fremdschlüssel zum Heim-Spieler im Leg |
| `awayMemberId` | `UUID` | Fremdschlüssel zum Gast-Spieler im Leg |
| `winnerTeamId` | `UUID` | Fremdschlüssel zum Gewinner-Team des Legs |
| `winnerMemberId` | `UUID` | Fremdschlüssel zum Gewinner-Spieler des Legs |
| `totalDarts` | `int` | Gesamtzahl der Darts, die im Leg geworfen wurden |
| `checkoutScore` | `int` | Punktzahl, mit der das Leg beendet wurde |
| `startedAt` | `LocalDateTime` | Zeitstempel des Leg-Starts |
| `finishedAt` | `LocalDateTime` | Zeitstempel des Leg-Endes |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### Throw

Repräsentiert einen einzelnen Wurf (bestehend aus 3 Darts).

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `legId` | `UUID` | Fremdschlüssel zum `Leg` |
| `memberId` | `UUID` | Fremdschlüssel zum werfenden `Member` |
| `throwNo` | `int` | Laufende Nummer des Wurfs im Leg |
| `dart1Multiplier` | `int` | Multiplikator des ersten Darts (1, 2, 3) |
| `dart1Segment` | `int` | Segment des ersten Darts (1-25) |
| `dart1Score` | `int` | Punktzahl des ersten Darts |
| `dart2Multiplier` | `int` | Multiplikator des zweiten Darts |
| `dart2Segment` | `int` | Segment des zweiten Darts |
| `dart2Score` | `int` | Punktzahl des zweiten Darts |
| `dart3Multiplier` | `int` | Multiplikator des dritten Darts |
| `dart3Segment` | `int` | Segment des dritten Darts |
| `dart3Score` | `int` | Punktzahl des dritten Darts |
| `throwTotal` | `int` | Gesamtergebnis des Wurfs (alle 3 Darts) |
| `remainingScore` | `int` | Verbleibende Punktzahl nach dem Wurf |
| `isBust` | `boolean` | Gibt an, ob der Wurf ein "Bust" (Überwerfen) war |
| `isCheckout` | `boolean` | Gibt an, ob dieser Wurf das Leg beendet hat |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### MatchEvent

Repräsentiert ein besonderes Ereignis während eines Matches (z.B. 180er).

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `matchId` | `UUID` | Fremdschlüssel zum `Match` |
| `legId` | `UUID` | Fremdschlüssel zum `Leg` (optional) |
| `memberId` | `UUID` | Fremdschlüssel zum `Member`, der das Event ausgelöst hat |
| `eventType` | `String` (Enum) | Art des Events (z.B. `180`, `HIGH_CHECKOUT`) |
| `value` | `int` | Zusätzlicher Wert zum Event (z.B. Checkout-Score) |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### Event

Repräsentiert einen Termin oder eine Veranstaltung des Vereins.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `eventType` | `String` (Enum) | Art des Events (z.B. `TRAINING`, `MEETING`) |
| `title` | `String` | Titel des Events |
| `description` | `String` | Beschreibung des Events |
| `startTime` | `LocalDateTime` | Startzeitpunkt des Events |
| `endTime` | `LocalDateTime` | Endzeitpunkt des Events |
| `location` | `String` | Ort des Events |
| `capacity` | `int` | Maximale Teilnehmerzahl |
| `createdBy` | `UUID` | Fremdschlüssel zum `User`, der das Event erstellt hat |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### EventParticipant

Verbindungstabelle zwischen `Event` und `Member` für die Teilnahmebestätigung.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `eventId` | `UUID` | Fremdschlüssel zum `Event` |
| `memberId` | `UUID` | Fremdschlüssel zum `Member` |
| `status` | `String` (Enum) | Teilnahme-Status (z.B. `YES`, `NO`, `PENDING`) |
| `responseAt` | `LocalDateTime` | Zeitstempel der Antwort |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### Poll

Repräsentiert eine Umfrage, z.B. zur Terminfindung.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `title` | `String` | Titel der Umfrage |
| `description` | `String` | Beschreibung der Umfrage |
| `createdBy` | `UUID` | Fremdschlüssel zum `User`, der die Umfrage erstellt hat |
| `deadline` | `LocalDateTime` | Frist für die Abstimmung |
| `isClosed` | `boolean` | Gibt an, ob die Umfrage geschlossen ist |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### PollOption

Repräsentiert eine Auswahlmöglichkeit innerhalb einer Umfrage.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `pollId` | `UUID` | Fremdschlüssel zur `Poll` |
| `optionDate` | `LocalDateTime` | Datum und Uhrzeit der Option (z.B. für Terminfindung) |
| `optionLabel` | `String` | Beschriftung der Option |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### PollVote

Repräsentiert die Abstimmung eines Mitglieds für eine Umfrageoption.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `pollId` | `UUID` | Fremdschlüssel zur `Poll` |
| `optionId` | `UUID` | Fremdschlüssel zur `PollOption` |
| `memberId` | `UUID` | Fremdschlüssel zum `Member`, der abgestimmt hat |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |

### Fee

Repräsentiert einen Beitragssatz des Vereins.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `name` | `String` | Name des Beitrags (z.B. "Jahresbeitrag") |
| `description` | `String` | Beschreibung des Beitrags |
| `amount` | `BigDecimal` | Höhe des Beitrags |
| `period` | `String` (Enum) | Zahlungsperiode (z.B. `YEARLY`, `MONTHLY`) |
| `isActive` | `boolean` | Gibt an, ob der Beitragssatz aktiv ist |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

### FeePayment

Repräsentiert eine Zahlung eines Mitglieds für einen Beitrag.

| Variable | Java-Typ | Beschreibung |
|---|---|---|
| `id` | `UUID` | Primärschlüssel |
| `orgId` | `UUID` | Fremdschlüssel zur `Organization` |
| `memberId` | `UUID` | Fremdschlüssel zum `Member` |
| `feeId` | `UUID` | Fremdschlüssel zum `Fee` (optional) |
| `amount` | `BigDecimal` | Gezahlter Betrag |
| `dueDate` | `LocalDate` | Fälligkeitsdatum der Zahlung |
| `paidAt` | `LocalDate` | Datum der Zahlung |
| `paymentMethod` | `String` | Methode der Zahlung (z.B. "Überweisung") |
| `status` | `String` (Enum) | Status der Zahlung (z.B. `OPEN`, `PAID`, `OVERDUE`) |
| `notes` | `String` | Notizen zur Zahlung |
| `createdAt` | `LocalDateTime` | Zeitstempel der Erstellung |
| `updatedAt` | `LocalDateTime` | Zeitstempel der letzten Änderung |

---

## Frontend: Dart/Flutter (Datenmodelle)

Die folgenden Klassen repräsentieren die Dart-Modelle, die für die Verarbeitung der API-Antworten im Flutter-Frontend verwendet werden.

### OrganizationModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `name` | `String` | Name des Vereins |
| `slug` | `String` | Eindeutiger Kurzname für URLs |
| `logoUrl` | `String?` | URL zum Vereinslogo |
| `primaryColor` | `String?` | Hauptfarbe für das Branding |
| `secondaryColor` | `String?` | Zweitfarbe für das Branding |

### UserModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `email` | `String` | E-Mail-Adresse |
| `displayName` | `String?` | Anzeigename des Benutzers |
| `isActive` | `bool` | Status, ob der Account aktiv ist |

### MembershipModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `userId` | `String` | ID des Benutzers |
| `orgId` | `String` | ID der Organisation |
| `role` | `String` | Rolle des Benutzers im Verein |
| `status` | `String` | Status der Mitgliedschaft |
| `joinedAt` | `DateTime?` | Datum des Beitritts |
| `leftAt` | `DateTime?` | Datum des Austritts |

### MemberModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `userId` | `String?` | ID des verknüpften Benutzers |
| `firstName` | `String` | Vorname |
| `lastName` | `String` | Nachname |
| `email` | `String?` | E-Mail-Adresse des Mitglieds |
| `phone` | `String?` | Telefonnummer |
| `birthdate` | `DateTime?` | Geburtsdatum |
| `licenseNo` | `String?` | Lizenz- oder Spielernummer |
| `handedness` | `String?` | Wurfhand (`LEFT`, `RIGHT`) |
| `notes` | `String?` | Freitext für Notizen |

### TeamModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `name` | `String` | Name des Teams |
| `season` | `String?` | Saison |
| `captainId` | `String?` | ID des Teamkapitäns |

### MatchModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `homeTeamId` | `String?` | ID des Heim-Teams |
| `awayTeamId` | `String?` | ID des Gast-Teams |
| `matchDate` | `DateTime` | Datum und Uhrzeit des Spiels |
| `venue` | `String?` | Austragungsort |
| `league` | `String?` | Liga oder Wettbewerb |
| `matchType` | `String` | Art des Spiels |
| `status` | `String` | Status des Spiels |
| `homeSets` | `int` | Gewonnene Sätze des Heim-Teams |
| `awaySets` | `int` | Gewonnene Sätze des Gast-Teams |
| `bestOfSets` | `int` | Spielmodus: Anzahl der zu gewinnenden Sätze |
| `bestOfLegs` | `int` | Spielmodus: Anzahl der zu gewinnenden Legs pro Satz |
| `startingScore` | `int` | Startpunktzahl |
| `doubleOut` | `bool` | Gibt an, ob mit einem Doppel beendet werden muss |
| `finishedAt` | `DateTime?` | Zeitstempel des Spielendes |

### SetModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `matchId` | `String` | ID des Matches |
| `setNo` | `int` | Laufende Nummer des Satzes |
| `homeLegs` | `int` | Gewonnene Legs des Heim-Teams |
| `awayLegs` | `int` | Gewonnene Legs des Gast-Teams |

### LegModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `setId` | `String` | ID des Satzes |
| `legNo` | `int` | Laufende Nummer des Legs |
| `startingScore` | `int` | Startpunktzahl des Legs |
| `homeMemberId` | `String?` | ID des Heim-Spielers |
| `awayMemberId` | `String?` | ID des Gast-Spielers |
| `winnerTeamId` | `String?` | ID des Gewinner-Teams |
| `winnerMemberId` | `String?` | ID des Gewinner-Spielers |
| `totalDarts` | `int?` | Gesamtzahl der Darts |
| `checkoutScore` | `int?` | Punktzahl des Checkouts |
| `startedAt` | `DateTime?` | Zeitstempel des Leg-Starts |
| `finishedAt` | `DateTime?` | Zeitstempel des Leg-Endes |

### ThrowModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `legId` | `String` | ID des Legs |
| `memberId` | `String` | ID des werfenden Mitglieds |
| `throwNo` | `int` | Laufende Nummer des Wurfs |
| `dart1Multiplier` | `int?` | Multiplikator des ersten Darts |
| `dart1Segment` | `int?` | Segment des ersten Darts |
| `dart1Score` | `int` | Punktzahl des ersten Darts |
| `dart2Multiplier` | `int?` | Multiplikator des zweiten Darts |
| `dart2Segment` | `int?` | Segment des zweiten Darts |
| `dart2Score` | `int` | Punktzahl des zweiten Darts |
| `dart3Multiplier` | `int?` | Multiplikator des dritten Darts |
| `dart3Segment` | `int?` | Segment des dritten Darts |
| `dart3Score` | `int` | Punktzahl des dritten Darts |
| `throwTotal` | `int` | Gesamtergebnis des Wurfs |
| `remainingScore` | `int` | Verbleibende Punktzahl |
| `isBust` | `bool` | War der Wurf ein "Bust"? |
| `isCheckout` | `bool` | War der Wurf der Checkout? |

### MatchEventModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `matchId` | `String` | ID des Matches |
| `legId` | `String?` | ID des Legs |
| `memberId` | `String` | ID des Mitglieds |
| `eventType` | `String` | Art des Events |
| `value` | `int?` | Zusätzlicher Wert |

### EventModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `eventType` | `String` | Art des Events |
| `title` | `String` | Titel des Events |
| `description` | `String?` | Beschreibung des Events |
| `startTime` | `DateTime` | Startzeitpunkt |
| `endTime` | `DateTime?` | Endzeitpunkt |
| `location` | `String?` | Ort des Events |
| `capacity` | `int?` | Maximale Teilnehmerzahl |
| `createdBy` | `String?` | ID des Erstellers |

### EventParticipantModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `eventId` | `String` | ID des Events |
| `memberId` | `String` | ID des Mitglieds |
| `status` | `String` | Teilnahme-Status |
| `responseAt` | `DateTime?` | Zeitstempel der Antwort |

### PollModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `title` | `String` | Titel der Umfrage |
| `description` | `String?` | Beschreibung der Umfrage |
| `createdBy` | `String?` | ID des Erstellers |
| `deadline` | `DateTime?` | Frist für die Abstimmung |
| `isClosed` | `bool` | Ist die Umfrage geschlossen? |

### PollOptionModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `pollId` | `String` | ID der Umfrage |
| `optionDate` | `DateTime` | Datum und Uhrzeit der Option |
| `optionLabel` | `String?` | Beschriftung der Option |

### PollVoteModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `pollId` | `String` | ID der Umfrage |
| `optionId` | `String` | ID der Option |
| `memberId` | `String` | ID des Mitglieds |

### FeeModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `name` | `String` | Name des Beitrags |
| `description` | `String?` | Beschreibung des Beitrags |
| `amount` | `double` | Höhe des Beitrags |
| `period` | `String` | Zahlungsperiode |
| `isActive` | `bool` | Ist der Beitragssatz aktiv? |

### FeePaymentModel

| Variable | Dart-Typ | Beschreibung |
|---|---|---|
| `id` | `String` | Primärschlüssel |
| `orgId` | `String` | ID der Organisation |
| `memberId` | `String` | ID des Mitglieds |
| `feeId` | `String?` | ID des Beitrags |
| `amount` | `double` | Gezahlter Betrag |
| `dueDate` | `DateTime?` | Fälligkeitsdatum |
| `paidAt` | `DateTime?` | Datum der Zahlung |
| `paymentMethod` | `String?` | Methode der Zahlung |
| `status` | `String` | Status der Zahlung |
| `notes` | `String?` | Notizen zur Zahlung |
