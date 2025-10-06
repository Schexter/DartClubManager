plugins {
    java
    id("org.springframework.boot") version "3.5.6"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "com.dartclub"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot Starters
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-security")

    // Docker Compose Support - DEAKTIVIERT (manuelles Management via Gradle Task)
    // developmentOnly("org.springframework.boot:spring-boot-docker-compose")

    // Database
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    runtimeOnly("org.postgresql:postgresql")

    // H2 Database für lokale Entwicklung (wenn PostgreSQL nicht funktioniert)
    runtimeOnly("com.h2database:h2")

    // API Documentation
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")

    // JWT
    implementation("io.jsonwebtoken:jjwt-api:0.12.3")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.3")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.3")

    // Utilities
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Testing
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("org.testcontainers:postgresql")
}

dependencyManagement {
    imports {
        mavenBom("org.testcontainers:testcontainers-bom:1.19.7")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// Custom Task zum Starten der PostgreSQL-Datenbank
tasks.register("startDatabase") {
    group = "application"
    description = "Startet die PostgreSQL-Datenbank mit Docker Compose"

    doLast {
        println("\n=== Starte PostgreSQL-Datenbank ===\n")

        try {
            // rootDir ist 'Dart App', das ist wo docker-compose.yml liegt
            val composeDir = project.rootDir
            val isWindows = System.getProperty("os.name").lowercase().contains("windows")

            // Für Windows: Verwende docker.exe explizit, falls docker nicht im PATH ist
            val dockerCommand = if (isWindows) {
                try {
                    ProcessBuilder("docker", "--version").start().waitFor()
                    "docker"
                } catch (e: Exception) {
                    "docker.exe"
                }
            } else {
                "docker"
            }

            // Prüfe ob Docker läuft
            val psProcess = ProcessBuilder(dockerCommand, "ps")
                .redirectErrorStream(true)
                .start()
            val psOutput = psProcess.inputStream.bufferedReader().readText()
            psProcess.waitFor()

            if (psProcess.exitValue() != 0) {
                println("❌ Docker läuft nicht!")
                if (isWindows) {
                    println("\n👉 Bitte starte Docker Desktop und versuche es erneut.\n")
                } else {
                    println("\n👉 Bitte starte Docker und versuche es erneut.\n")
                }
                throw GradleException("Docker ist nicht verfügbar")
            }

            // Prüfe ob das Volume existiert - wenn ja, könnte es ein Passwort-Problem geben
            val volumeCheck = ProcessBuilder(dockerCommand, "volume", "ls", "-q")
                .redirectErrorStream(true)
                .start()
            val volumes = volumeCheck.inputStream.bufferedReader().readText()
            volumeCheck.waitFor()

            val hasOldVolume = volumes.contains("dartapp_postgres_data")

            val composeProcess = ProcessBuilder(dockerCommand, "compose", "up", "-d", "postgres")
                .directory(composeDir)
                .redirectErrorStream(true)
                .start()

            val output = composeProcess.inputStream.bufferedReader().readText()
            composeProcess.waitFor()

            if (composeProcess.exitValue() == 0) {
                println(output)
                println("✅ PostgreSQL-Container gestartet")

                // Warte auf Datenbank-Bereitschaft mit Health-Check
                println("⏳ Warte auf Datenbank-Bereitschaft...")

                // Warte initial 15 Sekunden, damit DB Zeit hat hochzufahren
                Thread.sleep(15000)

                var dbReady = false
                for (i in 1..30) {
                    Thread.sleep(1000)

                    val healthCheck = ProcessBuilder(dockerCommand, "exec", "dartclub-postgres",
                        "pg_isready", "-U", "dartclub", "-d", "dartclub")
                        .redirectErrorStream(true)
                        .start()

                    healthCheck.waitFor()

                    if (healthCheck.exitValue() == 0) {
                        dbReady = true
                        println("✅ PostgreSQL-Datenbank bereit (nach $i Sekunden)")
                        break
                    }
                    print(".")
                }

                if (!dbReady) {
                    throw GradleException("Datenbank wurde nicht rechtzeitig bereit")
                }
            } else {
                println("❌ Fehler beim Starten der Datenbank:")
                println(output)
                throw GradleException("Konnte Datenbank nicht starten")
            }
        } catch (e: GradleException) {
            throw e
        } catch (e: Exception) {
            println("❌ Docker Compose nicht verfügbar - ${e.message}")
            throw GradleException("Stelle sicher, dass Docker läuft und im PATH ist")
        }

        println("\n=== Datenbank bereit ===\n")
    }
}

// Custom Task zum Setup-Check
tasks.register("checkSetup") {
    group = "verification"
    description = "Überprüft ob alle Voraussetzungen erfüllt sind"

    doLast {
        println("\n=== DartClub Manager Setup Check ===\n")

        // Java Version prüfen
        val javaVersion = System.getProperty("java.version")
        println("✅ Java Version: $javaVersion")

        // Docker prüfen
        try {
            val dockerProcess = ProcessBuilder("docker", "--version")
                .redirectErrorStream(true)
                .start()
            val dockerOutput = dockerProcess.inputStream.bufferedReader().readText()
            dockerProcess.waitFor()

            if (dockerProcess.exitValue() == 0) {
                println("✅ Docker: $dockerOutput".trim())
            } else {
                println("❌ Docker: Nicht installiert oder nicht im PATH")
            }
        } catch (e: Exception) {
            println("❌ Docker: Nicht verfügbar - ${e.message}")
        }

        // Docker Compose prüfen
        try {
            val composeProcess = ProcessBuilder("docker", "compose", "version")
                .redirectErrorStream(true)
                .start()
            val composeOutput = composeProcess.inputStream.bufferedReader().readText()
            composeProcess.waitFor()

            if (composeProcess.exitValue() == 0) {
                println("✅ Docker Compose: $composeOutput".trim())
            } else {
                println("❌ Docker Compose: Nicht verfügbar")
            }
        } catch (e: Exception) {
            println("❌ Docker Compose: Nicht verfügbar - ${e.message}")
        }

        println("\n=== Setup Check abgeschlossen ===\n")
    }
}

// bootRun hängt von checkSetup ab (startDatabase manuell vorher ausführen!)
tasks.named("bootRun") {
    dependsOn("checkSetup")
    // HINWEIS: startDatabase wurde entfernt wegen Timing-Problemen
    // Führe MANUELL aus: gradlew.bat startDatabase
    // Dann 20-30 Sekunden warten!
    // Dann: gradlew.bat :backend:bootRun
}
