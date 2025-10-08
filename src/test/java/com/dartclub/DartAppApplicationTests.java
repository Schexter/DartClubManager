package com.dartclub;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/**
 * Basic Integration Test - verwendet PostgreSQL via Testcontainers
 * 
 * Der PostgreSQL-Container wird automatisch gestartet und gestoppt.
 * Spring Boot 3.1+ verbindet sich automatisch via @ServiceConnection.
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
class DartAppApplicationTests {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("dartclub_test")
            .withUsername("test")
            .withPassword("test");

    @Test
    void contextLoads() {
        // Test dass der Spring Context lädt
        // PostgreSQL-Container läuft automatisch im Hintergrund
    }

}
