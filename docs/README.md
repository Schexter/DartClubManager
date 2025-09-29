# 📚 Dokumentationsordner

Dieser Ordner enthält die erweiterte Projektdokumentation.

## Struktur (geplant):

```
/docs/
├── architecture/          # Architektur-Diagramme und Beschreibungen
│   ├── system-overview.md
│   ├── database-schema.md
│   └── api-design.md
│
├── development/           # Entwicklungs-Guidelines
│   ├── coding-standards.md
│   ├── git-workflow.md
│   └── testing-strategy.md
│
├── deployment/            # Deployment-Anleitungen
│   ├── docker-setup.md
│   ├── production-config.md
│   └── ci-cd-pipeline.md
│
├── user-guides/           # Benutzer-Dokumentation
│   ├── admin-guide.md
│   ├── trainer-guide.md
│   └── player-guide.md
│
└── decisions/             # Architektur-Entscheidungen (ADRs)
    ├── 001-technology-stack.md
    ├── 002-multi-tenancy-approach.md
    └── 003-authentication-strategy.md
```

## Was gehört in docs/?

✅ **Architektur-Entscheidungen** - Warum wurde was wie gemacht?  
✅ **Technische Diagramme** - System-Übersichten, ER-Diagramme, Sequenzdiagramme  
✅ **Best Practices** - Code-Standards, Conventions, Patterns  
✅ **Deployment-Guides** - Wie wird deployed?  
✅ **API-Spezifikationen** - Erweiterte API-Dokumentation (zusätzlich zu Swagger)  

❌ **Nicht in docs/** - Code-Kommentare (gehören in den Code selbst)  
❌ **Nicht in docs/** - Temporäre Notizen (besser in /logs/ oder direkt löschen)  
❌ **Nicht in docs/** - API-Credentials (gehören in .env oder Secrets Manager)

---

**Erstellt von Hans Hahn - Alle Rechte vorbehalten**
