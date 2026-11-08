// =========================================================
// Spring Boot 4.0: Production REST Controller & CRUD API
// Clean Architecture with Java 25 Records
// =========================================================

package com.example.runner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.time.Instant;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// REST API Controller
@RestController
@RequestMapping("/api/v1/users")
class UserController {

    public record UserDto(Long id, String username, String email, String role, Instant createdAt) {}

    private final List<UserDto> users = List.of(
        new UserDto(1L, "varekar", "virendra.arekar@gmail.com", "ADMIN", Instant.now()),
        new UserDto(2L, "alex_dev", "alex.chen@spring.io", "DEVELOPER", Instant.now()),
        new UserDto(3L, "sophia_m", "sophia.miller@oracle.com", "DEVELOPER", Instant.now())
    );

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return users.stream()
            .filter(u -> u.id().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto request) {
        UserDto newUser = new UserDto(4L, request.username(), request.email(), "USER", Instant.now());
        return ResponseEntity.status(201).body(newUser);
    }
}

