package controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class Main {

    public static void main(String[] args) {

        SpringApplication.run(Main.class);
        System.out.println("Server Up and Running");
    }
}
