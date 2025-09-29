package com.dartclub;

import org.springframework.boot.SpringApplication;

public class TestDartAppApplication {

    public static void main(String[] args) {
        SpringApplication.from(DartAppApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
