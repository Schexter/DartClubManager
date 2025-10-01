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

    // Docker Compose Support - Startet automatisch PostgreSQL
    developmentOnly("org.springframework.boot:spring-boot-docker-compose")

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

// bootRun hängt von checkSetup ab
tasks.named("bootRun") {
    dependsOn("checkSetup")
}
