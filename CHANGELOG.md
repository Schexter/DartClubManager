# 📝 CHANGELOG - DartClubManager

Alle wichtigen Änderungen am DartClubManager-Projekt werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

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
- [ ] Docker Compose testen
- [ ] Erste Entities erstellen (User, Organization)
- [ ] Health-Controller implementieren
- [ ] Flyway-Migrationen (V1__init_schema.sql)

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
**Version:** 1.0  
**Initialisiert:** 29.09.2025
