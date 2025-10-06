# DartClub Manager - Setup Anleitung

## Voraussetzungen

- Java 21
- Docker Desktop (muss laufen!)
- Gradle (im Projekt enthalten als `gradlew`)

## Datenbank starten

**Vor jedem Start der Anwendung:**

```powershell
# In PowerShell
cd "C:\SoftwareEntwicklung\DartClubManager\Dart App"
docker compose up -d postgres
```

Die Datenbank läuft dann im Hintergrund und ist bereit für die Verbindung.

## Anwendung starten

```powershell
.\gradlew.bat :backend:bootRun
```

## Datenbank stoppen

```powershell
docker compose down
```

## Datenbank komplett zurücksetzen (alle Daten löschen)

```powershell
docker compose down -v
```

## Konfiguration

- **Datenbank**: PostgreSQL 16
- **Port**: 5432
- **Datenbankname**: dartclub
- **Benutzer**: dartclub
- **Passwort**: dartclub_dev_password

Die Konfiguration befindet sich in:
- `backend/src/main/resources/application.yml`
- `compose.yaml`

## Problembehebung

### "Passwort-Authentifizierung fehlgeschlagen"

1. Stelle sicher dass Docker Desktop läuft
2. Stoppe und lösche alle Container und Volumes:
   ```powershell
   docker compose down -v
   ```
3. Starte die Datenbank neu:
   ```powershell
   docker compose up -d postgres
   ```
4. Warte 5-10 Sekunden
5. Starte die Anwendung:
   ```powershell
   .\gradlew.bat :backend:bootRun
   ```

### Container läuft schon

Falls du die Fehlermeldung bekommst, dass der Container schon läuft:
```powershell
docker compose down
docker compose up -d postgres
```
