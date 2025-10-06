package com.dartclub;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Basic Integration Test - verwendet H2 In-Memory DB
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */
@SpringBootTest
@ActiveProfiles("test")
class DartAppApplicationTests {

    @Test
    void contextLoads() {
        // Test dass der Spring Context lädt
    }

}
