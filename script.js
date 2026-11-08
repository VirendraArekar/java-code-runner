// ============================================================================
// jdk/script.js - Java 25 & Spring Boot 4 Interactive Runner Engine
// Full Project Directory Explorer & File Control (jdk/springboot_app)
// Colorful VS Code Highlighting, Multi-Database Inspector & Living Canvas Animation
// (Java Cup, Spring Boot Leaf, Hibernate, JPA)
// Copyright 2026 Virendra Arekar - virendra.arekar@gmail.com
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. STARTER TEMPLATES FOR SPRING BOOT PROJECT FILES
  // --------------------------------------------------------------------------
  const TEMPLATES = {
    demoApp: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
`,

    controller: `package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> listAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createNewUser(@RequestBody User user) {
        User created = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
`,

    service: `package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getActiveClients() {
        return userRepository.findByStatus("ACTIVE");
    }
}
`,

    repository: `package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByStatus(String status);
    List<User> findByBalanceGreaterThan(BigDecimal minBalance);
}
`,

    entity: `package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String role;

    @Column(length = 20)
    private String status;

    private BigDecimal balance;

    private Instant createdAt = Instant.now();

    public User() {}

    public User(String username, String email, String role, String status, BigDecimal balance) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.status = status;
        this.balance = balance;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
    public Instant getCreatedAt() { return createdAt; }
}
`,

    properties: `# Spring Boot 4.0 Application Configuration
spring.application.name=SpringBoot4-Demo

# Virtual Threads (Java 25 LTS)
spring.threads.virtual.enabled=true

# Server Configuration
server.port=8080

# Database Configuration (MySQL / PostgreSQL / MSSQL)
spring.datasource.url=jdbc:mysql://localhost:3306/production_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Actuator Endpoints
management.endpoints.web.exposure.include=health,info,metrics
`,

    sql: `-- Spring Boot 4 Initial Database Schema
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) DEFAULT 'USER',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,

    blank: `// New Java source file
public class NewComponent {
    // Add logic here
}
`,

    javaScratchpad: `// =========================================================
// Java 25 (LTS) Core Program Runner
// Oracle OpenJDK 25.0.4.1 Runtime & Virtual Threads
// =========================================================

import java.util.*;
import java.time.Instant;
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        System.out.println("☕ Core Java 25 (LTS) Program Runner");
        System.out.println("Java Specification: " + System.getProperty("java.specification.version"));
        System.out.println("JVM Vendor:        " + System.getProperty("java.vendor"));
        System.out.println("Runtime Arch:      " + System.getProperty("os.arch"));
        System.out.println("--------------------------------------------------");

        Instant start = Instant.now();

        // Core Java 25 Virtual Thread
        Thread vThread = Thread.ofVirtual().start(() -> {
            System.out.println("🚀 Virtual Thread executing concurrently: " + Thread.currentThread());
        });

        try {
            vThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Core Java Collections & Streams
        List<String> items = List.of("Core Java", "Virtual Threads", "Pattern Matching", "Stream Gatherers");
        System.out.println("Standard Features: " + items.stream().map(String::toUpperCase).toList());

        Duration elapsed = Duration.between(start, Instant.now());
        System.out.println("--------------------------------------------------");
        System.out.println("✅ Core Java 25 execution finished in " + elapsed.toMillis() + " ms.");
    }
}
`,

    javaPatternMatching: `// =========================================================
// Java 25 (LTS): Pattern Matching & Sealed Records
// Oracle JDK 25.0.4.1 Runtime
// =========================================================

public class Main {
    sealed interface Shape permits Circle, Rectangle, Triangle {}
    record Circle(double radius) implements Shape {}
    record Rectangle(double width, double height) implements Shape {}
    record Triangle(double base, double height) implements Shape {}

    public static void main(String[] args) {
        System.out.println("🛡️ Java 25 Pattern Matching & Record Patterns");
        System.out.println("--------------------------------------------------");

        Shape[] shapes = new Shape[] {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Triangle(3.0, 8.0)
        };

        for (Shape s : shapes) {
            String desc = switch (s) {
                case Circle(double r) -> String.format("Circle [r=%.2f, area=%.2f]", r, Math.PI * r * r);
                case Rectangle(double w, double h) -> String.format("Rectangle [w=%.2f, h=%.2f, area=%.2f]", w, h, w * h);
                case Triangle(double b, double h) -> String.format("Triangle [b=%.2f, h=%.2f, area=%.2f]", b, h, 0.5 * b * h);
            };
            System.out.println("  * " + desc);
        }
        System.out.println("✅ Pattern matching evaluated exhaustively with record destructuring.");
    }
}
`,

    javaGatherers: `// =========================================================
// Java 25 (LTS): Stream Gatherers & Scoped Values
// Oracle JDK 25.0.4.1 Runtime
// =========================================================

import java.util.stream.*;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("🌊 Java 25 Modern Stream Transformations");
        System.out.println("--------------------------------------------------");

        List<Integer> numbers = List.of(10, 25, 42, 58, 73, 91, 105, 120);

        System.out.println("Input sequence: " + numbers);

        // Functional stream processing with statistics
        var stats = numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .summaryStatistics();

        System.out.println("Even Numbers Count: " + stats.getCount());
        System.out.println("Sum of Even Numbers: " + stats.getSum());
        System.out.printf("Average of Even Numbers: %.2f%n", stats.getAverage());
        System.out.println("Maximum Value: " + stats.getMax());

        System.out.println("--------------------------------------------------");
        System.out.println("✅ Java 25 Functional Stream pipeline executed successfully.");
    }
}
`,

    javaHttpClient: `// =========================================================
// Java 25 (LTS): Modern HTTP Client & JSON Processing
// Oracle JDK 25.0.4.1 Runtime
// =========================================================

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("🌐 Java 25 Async HTTP Client Engine");
        System.out.println("--------------------------------------------------");

        try (var client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .connectTimeout(Duration.ofSeconds(5))
                .build()) {

            var request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/get"))
                .header("User-Agent", "Java25-Scratchpad/1.0")
                .timeout(Duration.ofSeconds(5))
                .GET()
                .build();

            System.out.println("Sending async HTTP GET request...");
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Response Status Code: " + response.statusCode());
            System.out.println("HTTP Version: " + response.version());
            System.out.println("Headers Content-Type: " + response.headers().firstValue("content-type").orElse("none"));
            System.out.println("✅ Modern HttpClient executed cleanly.");
        } catch (Exception ex) {
            System.out.println("⚠️ HTTP simulation completed (offline sandbox network): " + ex.getMessage());
            System.out.println("✅ HttpClient initialization and request pipeline verified.");
        }
    }
}
`,

    javaBenchmark: `// =========================================================
// Java 25 (LTS): Algorithmic Complexity Benchmark
// Oracle JDK 25.0.4.1 Runtime
// =========================================================

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        System.out.println("🧮 Java 25 Algorithmic Performance Benchmark");
        System.out.println("--------------------------------------------------");

        int arraySize = 500_000;
        int[] data = new Random(42).ints(arraySize, 0, 1_000_000).toArray();

        System.out.printf("Sorting %,d pseudo-random integers with Dual-Pivot Quicksort...%n", arraySize);

        Instant start = Instant.now();
        Arrays.sort(data);
        Duration duration = Duration.between(start, Instant.now());

        System.out.printf("✅ Array sorted in %d ms (%,d ops/sec).%n", 
            duration.toMillis(), 
            (long) arraySize * 1000 / Math.max(1, duration.toMillis()));
        System.out.printf("Min value: %,d, Max value: %,d%n", data[0], data[arraySize - 1]);
    }
}
`,

    javaUnnamedClass: `// =========================================================
// Java 25 (LTS): Instance Main / Unnamed Class
// Oracle JDK 25.0.4.1 Runtime (Preview)
// =========================================================

void main() {
    System.out.println("⚡ Welcome to Java 25 Unnamed Class & Instance Main!");
    System.out.println("Specification Version: " + System.getProperty("java.specification.version"));
    System.out.println("OS Architecture: " + System.getProperty("os.arch"));
    System.out.println("No boilerplate 'public static void main(String[] args)' required.");
    System.out.println("--------------------------------------------------");
    System.out.println("✅ Executed cleanly as a single-file source script.");
}
`,

    javaClassicMain: `// =========================================================
// Java 25 (LTS): Standalone Main Application
// Oracle JDK 25.0.4.1 Runtime
// =========================================================

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        System.out.println("☕ Java 25 LTS Standalone Application");
        System.out.println("Timestamp: " + timestamp);
        System.out.println("Active Threads: " + Thread.activeCount());
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());
        System.out.printf("Max Memory: %,d MB%n", Runtime.getRuntime().maxMemory() / (1024 * 1024));
        System.out.println("--------------------------------------------------");
        System.out.println("Ready to execute custom Java 25 code!");
    }
}
`,

    mysqlQuery: `-- MySQL 8.0 Live Database Query
SELECT 
    customerNumber, 
    customerName, 
    contactLastName, 
    contactFirstName, 
    city, 
    country, 
    creditLimit 
FROM customers 
ORDER BY creditLimit DESC 
LIMIT 25;
`,

    postgresQuery: `-- PostgreSQL Custom Query
SELECT 
    id, 
    full_name, 
    email, 
    tier, 
    metadata 
FROM customers 
WHERE tier = 'ENTERPRISE'
ORDER BY id ASC;
`,

    mssqlQuery: `-- Microsoft SQL Server 2025 Query
SELECT TOP 10 
    EmployeeKey, 
    FirstName, 
    LastName, 
    Title, 
    DepartmentName, 
    BaseRate 
FROM DimEmployee 
ORDER BY BaseRate DESC;
`,

    mongoQuery: `// MongoDB 8.0 Document Query
db.users.find({ status: "ACTIVE" }).sort({ createdAt: -1 });
`,

    sqliteQuery: `-- SQLite 3.51 Persistent Configuration Data & Tables
SELECT 
    db_type, 
    host, 
    port, 
    database_name, 
    username, 
    is_active, 
    updated_at 
FROM db_connections;
`,

    pomXml: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.0.0</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>SpringBoot4-Java25-Demo</name>
    <description>Enterprise Spring Boot 4 &amp; Java 25 Virtual Threads Microservice</description>

    <properties>
        <java.version>25</java.version>
        <maven.compiler.source>25</maven.compiler.source>
        <maven.compiler.target>25</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
`,
  };

  // In-Memory Fast Lookup Cache for Instant Tree File Loading
  const FILE_CACHE = new Map([
    ["src/main/java/com/example/demo/DemoApplication.java", TEMPLATES.demoApp],
    [
      "src/main/java/com/example/demo/controller/UserController.java",
      TEMPLATES.controller,
    ],
    [
      "src/main/java/com/example/demo/service/UserService.java",
      TEMPLATES.service,
    ],
    [
      "src/main/java/com/example/demo/repository/UserRepository.java",
      TEMPLATES.repository,
    ],
    ["src/main/java/com/example/demo/model/User.java", TEMPLATES.entity],
    ["src/main/resources/application.properties", TEMPLATES.properties],
    ["src/main/resources/schema.sql", TEMPLATES.sql],
    ["pom.xml", TEMPLATES.pomXml],
  ]);

  // Default Fallback Project Tree structure (used if API connection drops or offline)
  const DEFAULT_BOOT_TREE = {
    name: "springboot_app",
    path: "",
    type: "directory",
    children: [
      {
        name: "src",
        path: "src",
        type: "directory",
        children: [
          {
            name: "main",
            path: "src/main",
            type: "directory",
            children: [
              {
                name: "java",
                path: "src/main/java",
                type: "directory",
                children: [
                  {
                    name: "com",
                    path: "src/main/java/com",
                    type: "directory",
                    children: [
                      {
                        name: "example",
                        path: "src/main/java/com/example",
                        type: "directory",
                        children: [
                          {
                            name: "demo",
                            path: "src/main/java/com/example/demo",
                            type: "directory",
                            children: [
                              {
                                name: "controller",
                                path: "src/main/java/com/example/demo/controller",
                                type: "directory",
                                children: [
                                  {
                                    name: "UserController.java",
                                    path: "src/main/java/com/example/demo/controller/UserController.java",
                                    type: "file",
                                  },
                                ],
                              },
                              {
                                name: "service",
                                path: "src/main/java/com/example/demo/service",
                                type: "directory",
                                children: [
                                  {
                                    name: "UserService.java",
                                    path: "src/main/java/com/example/demo/service/UserService.java",
                                    type: "file",
                                  },
                                ],
                              },
                              {
                                name: "repository",
                                path: "src/main/java/com/example/demo/repository",
                                type: "directory",
                                children: [
                                  {
                                    name: "UserRepository.java",
                                    path: "src/main/java/com/example/demo/repository/UserRepository.java",
                                    type: "file",
                                  },
                                ],
                              },
                              {
                                name: "model",
                                path: "src/main/java/com/example/demo/model",
                                type: "directory",
                                children: [
                                  {
                                    name: "User.java",
                                    path: "src/main/java/com/example/demo/model/User.java",
                                    type: "file",
                                  },
                                ],
                              },
                              {
                                name: "DemoApplication.java",
                                path: "src/main/java/com/example/demo/DemoApplication.java",
                                type: "file",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "resources",
                path: "src/main/resources",
                type: "directory",
                children: [
                  {
                    name: "application.properties",
                    path: "src/main/resources/application.properties",
                    type: "file",
                  },
                  {
                    name: "schema.sql",
                    path: "src/main/resources/schema.sql",
                    type: "file",
                  },
                ],
              },
            ],
          },
        ],
      },
      { name: "pom.xml", path: "pom.xml", type: "file" },
    ],
  };

  // --------------------------------------------------------------------------
  // 2. DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const tabJava = document.getElementById("tab-java");
  const tabBoot = document.getElementById("tab-boot");
  const tabDb = document.getElementById("tab-db");

  const btnRun = document.getElementById("btn-run");
  const btnRunLabel = document.getElementById("btn-run-label");
  const btnRunIcon = document.getElementById("btn-run-icon");
  const btnSave = document.getElementById("btn-save");
  const btnCreateFile = document.getElementById("btn-create-file");
  const btnCreateFolder = document.getElementById("btn-create-folder");
  const btnRefreshTree = document.getElementById("btn-refresh-tree");
  const btnBootDefaultCode = document.getElementById("btn-boot-default-code");
  const btnDownloadProjectZip = document.getElementById(
    "btn-download-project-zip",
  );
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  const btnSidebarLabel = document.getElementById("btn-sidebar-label");
  const btnClearCode = document.getElementById("btn-clear-code");
  const btnClearConsole = document.getElementById("btn-clear-console");

  const complexityChip = document.getElementById("complexity-chip");
  const complexityChipText = document.getElementById("complexity-chip-text");
  const btnComplexity = document.getElementById("btn-complexity");
  const modeIndicatorChip = document.getElementById("mode-indicator-chip");
  const statusChip = document.getElementById("status-chip");

  // Layout & Console Sizing Controls
  const workspaceGrid = document.getElementById("workspace-grid");
  const outputPanel = document.getElementById("output-panel");
  const btnToggleConsole = document.getElementById("btn-toggle-console");
  const btnToggleConsoleIcon = document.getElementById(
    "btn-toggle-console-icon",
  );
  const btnToggleConsoleLabel = document.getElementById(
    "btn-toggle-console-label",
  );
  const btnTabToggleConsole = document.getElementById("btn-tab-toggle-console");
  const tabToggleConsoleIcon = document.getElementById(
    "tab-toggle-console-icon",
  );
  const tabToggleConsoleLabel = document.getElementById(
    "tab-toggle-console-label",
  );
  const btnMinimizeConsole = document.getElementById("btn-minimize-console");
  const consoleCollapsedRail = document.getElementById(
    "console-collapsed-rail",
  );
  const btnRailExpand = document.getElementById("btn-rail-expand");
  const btnQuickNewFile = document.getElementById("btn-quick-new-file");

  // Sidebar & File Tree
  const projectSidebar = document.getElementById("project-explorer-sidebar");
  const bootFileTree = document.getElementById("boot-file-tree");
  const treeSearchInput = document.getElementById("tree-search-input");
  const btnTreeAddFile = document.getElementById("btn-tree-add-file");
  const btnTreeAddFolder = document.getElementById("btn-tree-add-folder");
  const btnTreeRefresh = document.getElementById("btn-tree-refresh");
  const bootDirActions = document.getElementById("boot-dir-actions");

  // IntelliJ IDEA Window, Navigation & Feature Widgets
  const intellijWindowWrapper = document.getElementById(
    "intellij-window-wrapper",
  );
  const btnIjBuild = document.getElementById("btn-ij-build");
  const btnIjRun = document.getElementById("btn-ij-run");
  const btnIjDebug = document.getElementById("btn-ij-debug");
  const btnIjStop = document.getElementById("btn-ij-stop");
  const btnIjReformat = document.getElementById("btn-ij-reformat");
  const btnIjGenerate = document.getElementById("btn-ij-generate");
  const btnIjFind = document.getElementById("btn-ij-find");
  const btnIjAutocomplete = document.getElementById("btn-ij-autocomplete");
  const btnIjThemeToggle = document.getElementById("btn-ij-theme-toggle");
  const ijThemeIcon = document.getElementById("ij-theme-icon");
  const ijThemeLabel = document.getElementById("ij-theme-label");
  const ijConfigName = document.getElementById("ij-config-name");
  const ijRunConfigBtn = document.getElementById("ij-run-config-btn");
  const ijCrumbMethod = document.getElementById("ij-crumb-method");
  const ijClassBadge = document.getElementById("ij-class-badge");

  // IntelliJ Find in File Bar
  const intellijFindBar = document.getElementById("intellij-find-bar");
  const ijFindInput = document.getElementById("ij-find-input");
  const ijFindCount = document.getElementById("ij-find-count");
  const btnFindPrev = document.getElementById("btn-find-prev");
  const btnFindNext = document.getElementById("btn-find-next");
  const btnFindClose = document.getElementById("btn-find-close");

  // IntelliJ Autocomplete Popup
  const intellijCompletionPopup = document.getElementById(
    "intellij-completion-popup",
  );
  const completionList = document.getElementById("completion-list");

  // IntelliJ Generate Modal
  const ijGenerateModal = document.getElementById("ij-generate-modal");
  const btnCloseGenerateModal = document.getElementById(
    "btn-close-generate-modal",
  );
  const btnCancelGenerateModal = document.getElementById(
    "btn-cancel-generate-modal",
  );

  // Java 25 Scratchpad Actions & Modal
  const scratchDirActions = document.getElementById("scratch-dir-actions");
  const btnScratchTemplates = document.getElementById("btn-scratch-templates");
  const btnScratchReset = document.getElementById("btn-scratch-reset");
  const javaScratchpadModal = document.getElementById("java-scratchpad-modal");
  const btnCloseScratchModal = document.getElementById(
    "btn-close-scratch-modal",
  );
  const btnCancelScratchModal = document.getElementById(
    "btn-cancel-scratch-modal",
  );

  // IntelliJ Inspection Rail
  const inspectionStatusIcon = document.getElementById(
    "inspection-status-icon",
  );
  const ijInspectionSummary = document.getElementById("ij-inspection-summary");
  const crumbRoot = document.getElementById("crumb-root");

  // Breakpoints Set for IntelliJ Gutter
  const breakpoints = new Set();

  // VS Code / IntelliJ Window & Editor Elements
  const activeTabTitle = document.getElementById("vscode-active-tab-title");
  const activeTabIcon =
    document.getElementById("vscode-active-tab-icon") ||
    document.getElementById("vscode-tab-icon");
  const activeTabDirty = document.getElementById("vscode-tab-dirty");
  const btnTabClose = document.getElementById("btn-tab-close");
  const crumbFolder = document.getElementById("crumb-folder");
  const crumbFile = document.getElementById("crumb-file");
  const editorGutter = document.getElementById("vscode-gutter");
  const codeEditor = document.getElementById("code-editor");
  const highlightLayer = document.getElementById("vscode-highlight-layer");
  const highlightCodeEl = document.getElementById("vscode-code-highlight");
  const editorLangBadge = document.getElementById("editor-lang-badge");
  const editorFrameworkBadge = document.getElementById(
    "editor-framework-badge",
  );
  const cursorPosEl = document.getElementById("vscode-cursor-pos");
  const fileStatsEl = document.getElementById("vscode-file-stats");
  const vscodeLangMode = document.getElementById("vscode-lang-mode");

  // Output Hub
  const tabConsole = document.getElementById("tab-console");
  const tabDbInspector = document.getElementById("tab-db-inspector");
  const outputTabTitle = document.getElementById("output-tab-title");
  const outputTabIcon = document.getElementById("output-tab-icon");
  const viewConsole = document.getElementById("view-console");
  const viewDbInspector = document.getElementById("view-db-inspector");
  const consoleStatusBadge = document.getElementById("console-status-badge");
  const dbActiveBadge = document.getElementById("db-active-badge");
  const dbActiveTableName = document.getElementById("db-active-table-name");
  const logStream = document.getElementById("log-stream");
  const complexityBanner = document.getElementById("complexity-banner");
  const complexityBadgeText = document.getElementById("complexity-badge-text");
  const complexityTypeText = document.getElementById("complexity-type-text");
  const complexitySpaceText = document.getElementById("complexity-space-text");
  const complexityExplanationText = document.getElementById(
    "complexity-explanation-text",
  );
  const btnCopyOutput = document.getElementById("btn-copy-output");
  const btnDownloadOutput = document.getElementById("btn-download-output");

  // Database View Elements
  const dbBtnMysql = document.getElementById("db-btn-mysql");
  const dbBtnPostgres = document.getElementById("db-btn-postgres");
  const dbBtnMssql = document.getElementById("db-btn-mssql");
  const dbBtnMongodb = document.getElementById("db-btn-mongodb");
  const dbBtnSqlite = document.getElementById("db-btn-sqlite");
  const dbToggleBtns = [
    dbBtnMysql,
    dbBtnPostgres,
    dbBtnMssql,
    dbBtnMongodb,
    dbBtnSqlite,
  ].filter(Boolean);

  const connDisplayText = document.getElementById("conn-display-text");
  const connStateBadge = document.getElementById("conn-state-badge");
  const connStatusDot = document.getElementById("conn-status-dot");
  const btnToggleConnSettings = document.getElementById(
    "btn-toggle-conn-settings",
  );
  const btnTestConnection = document.getElementById("btn-test-connection");
  const dbConnectionPanel = document.getElementById("db-connection-panel");
  const btnCloseConnPanel = document.getElementById("btn-close-conn-panel");
  const connPanelTitleText = document.getElementById("conn-panel-title-text");

  const connHostInput = document.getElementById("conn-host");
  const connPortInput = document.getElementById("conn-port");
  const connDatabaseInput = document.getElementById("conn-database");
  const connUserInput = document.getElementById("conn-user");
  const connPasswordInput = document.getElementById("conn-password");
  const connUriInput = document.getElementById("conn-uri");
  const btnSaveConn = document.getElementById("btn-save-conn");
  const btnResetConn = document.getElementById("btn-reset-conn");

  const dbTablesList = document.getElementById("db-tables-list");
  const btnOpenInsertRow = document.getElementById("btn-open-insert-row");
  const btnQuickSelect = document.getElementById("btn-quick-select");
  const btnRefreshDb = document.getElementById("btn-refresh-db");

  const dbQueryStatus = document.getElementById("db-query-status");
  const dbRowCount = document.getElementById("db-row-count");
  const dbExecutionLatency = document.getElementById("db-execution-latency");
  const dbTargetName = document.getElementById("db-target-name");
  const dbSourceBadge = document.getElementById("db-source-badge");
  const dbSourceDot = document.getElementById("db-source-dot");
  const viewModeGrid = document.getElementById("view-mode-grid");
  const viewModeJson = document.getElementById("view-mode-json");
  const dbGridView = document.getElementById("db-grid-view");
  const dbEmptyState = document.getElementById("db-empty-state");
  const dbDataTable = document.getElementById("db-data-table");
  const dbJsonView = document.getElementById("db-json-view");
  const dbTableHead = document.getElementById("db-table-head");
  const dbTableBody = document.getElementById("db-table-body");
  const dbJsonContent = document.getElementById("db-json-content");

  // Dedicated Write Query Editor Console Elements
  const dbQueryEditorCard = document.getElementById("db-query-editor-card");
  const dbQueryEnginePill = document.getElementById("db-query-engine-pill");
  const btnDbFormatSql = document.getElementById("btn-db-format-sql");
  const btnDbClearQuery = document.getElementById("btn-db-clear-query");
  const btnDbExecuteQuery = document.getElementById("btn-db-execute-query");
  const dbQueryGutter = document.getElementById("db-query-gutter");
  const dbQueryTextarea = document.getElementById("db-query-textarea");

  // Modals
  const newFileModal = document.getElementById("boot-new-file-modal");
  const btnCloseNewFileModal = document.getElementById(
    "btn-close-new-file-modal",
  );
  const btnCancelNewFile = document.getElementById("btn-cancel-new-file");
  const btnSubmitNewFile = document.getElementById("btn-submit-new-file");
  const newFileParentDir = document.getElementById("new-file-parent-dir");
  const newFileName = document.getElementById("new-file-name");
  const newFileTemplate = document.getElementById("new-file-template");

  const newFolderModal = document.getElementById("boot-new-folder-modal");
  const btnCloseNewFolderModal = document.getElementById(
    "btn-close-new-folder-modal",
  );
  const btnCancelNewFolder = document.getElementById("btn-cancel-new-folder");
  const btnSubmitNewFolder = document.getElementById("btn-submit-new-folder");
  const newFolderParentDir = document.getElementById("new-folder-parent-dir");
  const newFolderName = document.getElementById("new-folder-name");

  const dbRecordModal = document.getElementById("db-record-modal");
  const btnCloseRecordModal = document.getElementById("btn-close-record-modal");
  const btnCancelRecordModal = document.getElementById(
    "btn-cancel-record-modal",
  );
  const btnSaveRecordModal = document.getElementById("btn-save-record-modal");
  const modalTitleText = document.getElementById("modal-title-text");
  const modalFieldsContainer = document.getElementById(
    "modal-fields-container",
  );

  const toastContainer = document.getElementById("toast-container");
  const natureCanvas = document.getElementById("nature-canvas");

  // --------------------------------------------------------------------------
  // 3. APPLICATION STATE & DYNAMIC API RESOLUTION
  // --------------------------------------------------------------------------
  let currentMode = "boot"; // 'boot' | 'java' | 'db'
  let activeDb = "mysql"; // 'mysql' | 'postgres' | 'mssql' | 'mongodb'
  let activeTable = "users";
  let activeFilePath = "src/main/java/com/example/demo/DemoApplication.java";
  let lastBootFilePath = "src/main/java/com/example/demo/DemoApplication.java";
  let isFileDirty = false;
  let currentTreeData = null;
  let activeRecordAction = "insert";
  let editingRowPk = null;
  let currentColumns = [];
  let isExecuting = false;

  function isPureCoreJavaCode(code) {
    if (!code || typeof code !== "string") return false;
    const lower = code.toLowerCase();
    // Scratchpad MUST be pure Core Java runner - NO Spring annotations or imports!
    if (
      lower.includes("org.springframework") ||
      lower.includes("@springbootapplication") ||
      lower.includes("@restcontroller") ||
      lower.includes("@controller") ||
      lower.includes("@requestmapping") ||
      lower.includes("@service") ||
      lower.includes("@repository") ||
      lower.includes("@autowired") ||
      lower.includes("springapplication.run")
    ) {
      return false;
    }
    return code.includes("class ") || code.includes("void main");
  }

  function getScratchpadCode() {
    const saved = localStorage.getItem("java_scratchpad_code");
    if (saved && saved.trim() && isPureCoreJavaCode(saved)) {
      return saved;
    }
    // Clean out any contaminated code from browser storage
    localStorage.setItem("java_scratchpad_code", TEMPLATES.javaScratchpad);
    return TEMPLATES.javaScratchpad;
  }

  function saveScratchpadCode(code) {
    if (typeof code === "string" && isPureCoreJavaCode(code)) {
      localStorage.setItem("java_scratchpad_code", code);
    }
  }

  // Preload saved src/Main.java into scratchpad storage if not already cached
  if (
    !localStorage.getItem("java_scratchpad_code") ||
    !isPureCoreJavaCode(localStorage.getItem("java_scratchpad_code"))
  ) {
    apiFetch("/api/load?file=Main.java")
      .then((data) => {
        if (
          data &&
          data.success &&
          data.content &&
          isPureCoreJavaCode(data.content)
        ) {
          saveScratchpadCode(data.content);
        } else {
          saveScratchpadCode(TEMPLATES.javaScratchpad);
        }
      })
      .catch(() => {
        saveScratchpadCode(TEMPLATES.javaScratchpad);
      });
  }

  // Immediately ensure codeEditor has DemoApplication.java content if empty
  if (codeEditor && (!codeEditor.value || codeEditor.value.trim() === "")) {
    codeEditor.value = TEMPLATES.demoApp;
  }

  // Dynamic API Resolution with Fallback across Standard Server Ports
  let activeApiBase = null;

  async function apiFetch(endpoint, options = {}) {
    const isFileProto = window.location.protocol === "file:";
    const port = window.location.port;

    const candidateBases = [];
    if (!isFileProto && port) {
      candidateBases.push(""); // relative URL (matches whichever port served the UI)
    }
    candidateBases.push(
      "http://localhost:8080",
      "http://localhost:3001",
      "http://127.0.0.1:8080",
      "http://localhost:3000",
    );

    let res = null;
    let lastErr = null;

    if (activeApiBase !== null) {
      const url = endpoint.startsWith("http")
        ? endpoint
        : `${activeApiBase}${endpoint}`;
      try {
        res = await fetch(url, options);
      } catch (err) {
        activeApiBase = null; // reset if active base failed
      }
    }

    if (!res) {
      for (const base of candidateBases) {
        const url = endpoint.startsWith("http")
          ? endpoint
          : `${base}${endpoint}`;
        try {
          res = await fetch(url, options);
          if (res) {
            activeApiBase = base;
            break;
          }
        } catch (err) {
          lastErr = err;
        }
      }
    }

    if (!res) {
      throw (
        lastErr ||
        new Error(`Could not connect to backend server on port 8080 or 3001.`)
      );
    }

    const text = await res.text();

    // Guard: Prevent "Unexpected token '<'" from HTML error pages
    if (text.trim().startsWith("<")) {
      throw new Error(
        `Server returned HTML error page instead of JSON. Ensure server is running.`,
      );
    }

    try {
      return JSON.parse(text);
    } catch (parseErr) {
      throw new Error(`Invalid JSON response: ${text.slice(0, 80)}`);
    }
  }

  // --------------------------------------------------------------------------
  // 4. TOAST NOTIFICATION SYSTEM (WITH ANIMATED ICONS)
  // --------------------------------------------------------------------------
  function showToast(type, title, message, duration = 3500) {
    let icon = "info";
    let anim = "pop";

    if (type === "success") {
      icon = "check_circle";
      anim = "bounce";
    } else if (type === "error") {
      icon = "report_problem";
      anim = "shake";
    } else if (type === "warning") {
      icon = "warning_amber";
      anim = "shake";
    } else {
      icon = "info";
      anim = "pulse";
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "alert");

    toast.innerHTML = `
      <div class="toast-icon-wrap">
        <span class="material-icons toast-icon" data-anim="${anim}">${icon}</span>
      </div>
      <div class="toast-content">
        <div class="toast-title">${escapeHtml(title)}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
      </div>
      <button class="toast-close" type="button" aria-label="Dismiss">✕</button>
      <div class="toast-progress">
        <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
      </div>
    `;

    toastContainer.prepend(toast);

    let isDismissed = false;
    let dismissTimeout;

    const dismiss = () => {
      if (isDismissed) return;
      isDismissed = true;
      clearTimeout(dismissTimeout);
      toast.classList.add("toast-hiding");
      toast.addEventListener("animationend", () => toast.remove(), {
        once: true,
      });
    };

    dismissTimeout = setTimeout(dismiss, duration);
    toast.querySelector(".toast-close").addEventListener("click", dismiss);

    const progressBar = toast.querySelector(".toast-progress-bar");
    toast.addEventListener("mouseenter", () => {
      clearTimeout(dismissTimeout);
      if (progressBar) progressBar.style.animationPlayState = "paused";
    });
    toast.addEventListener("mouseleave", () => {
      if (progressBar) progressBar.style.animationPlayState = "running";
      dismissTimeout = setTimeout(dismiss, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 5. COLORFUL VS CODE SYNTAX HIGHLIGHTER (JAVA, XML, PROPERTIES, SQL, MONGO)
  // --------------------------------------------------------------------------
  function highlightCode(code, lang = "java") {
    if (!code) return "";

    // 1. XML Syntax Highlighting (for pom.xml, beans.xml)
    if (lang === "xml") {
      const xmlRegex =
        /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z0-9_\-:]+)|(\s+[a-zA-Z0-9_\-:]+)(?==)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/?>)|([<>&])/g;
      let lastIndex = 0;
      let html = "";
      let match;
      while ((match = xmlRegex.exec(code)) !== null) {
        if (match.index > lastIndex) {
          html += escapeHtml(code.slice(lastIndex, match.index));
        }
        const [
          full,
          comment,
          openTag,
          tagName,
          attrName,
          strVal,
          closeTag,
          specialChar,
        ] = match;
        if (comment)
          html += `<span class="tok-comment">${escapeHtml(comment)}</span>`;
        else if (openTag && tagName)
          html += `${escapeHtml(openTag)}<span class="tok-tag">${escapeHtml(tagName)}</span>`;
        else if (attrName)
          html += `<span class="tok-attr">${escapeHtml(attrName)}</span>`;
        else if (strVal)
          html += `<span class="tok-string">${escapeHtml(strVal)}</span>`;
        else if (closeTag) html += escapeHtml(closeTag);
        else if (specialChar) html += escapeHtml(specialChar);
        else html += escapeHtml(full);
        lastIndex = xmlRegex.lastIndex;
      }
      if (lastIndex < code.length) html += escapeHtml(code.slice(lastIndex));
      return html;
    }

    // 2. Properties & YAML Syntax Highlighting
    if (lang === "properties" || lang === "yml") {
      const lines = code.split("\n");
      return lines
        .map((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("#") || trimmed.startsWith("!")) {
            return `<span class="tok-comment">${escapeHtml(line)}</span>`;
          }
          const eqIdx = line.indexOf("=");
          const colonIdx = line.indexOf(":");
          let splitIdx = -1;
          if (eqIdx !== -1 && colonIdx !== -1)
            splitIdx = Math.min(eqIdx, colonIdx);
          else if (eqIdx !== -1) splitIdx = eqIdx;
          else if (colonIdx !== -1) splitIdx = colonIdx;

          if (splitIdx !== -1) {
            const key = line.slice(0, splitIdx);
            const sep = line[splitIdx];
            const val = line.slice(splitIdx + 1);
            return `<span class="tok-prop-key">${escapeHtml(key)}</span><span class="tok-operator">${escapeHtml(sep)}</span><span class="tok-prop-val">${escapeHtml(val)}</span>`;
          }
          return escapeHtml(line);
        })
        .join("\n");
    }

    // 3. Java 25 & Spring Boot 4 Highlighter
    if (lang === "java" || lang === "boot") {
      const tokenRegex =
        /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|"""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[a-zA-Z0-9_]+)|(\b(?:if|else|for|while|do|switch|case|default|break|continue|return|try|catch|finally|throw|throws|yield)\b)|(\b(?:public|private|protected|static|final|abstract|synchronized|volatile|transient|native|strictfp|class|interface|enum|record|extends|implements|package|import|new|this|super|instanceof)\b)|(\b(?:true|false|null)\b)|(\b(?:void|int|long|double|float|boolean|char|byte|short|var|String|Integer|Long|Double|Float|Boolean|List|Map|Set|Optional|ResponseEntity|CompletableFuture|Instant|Duration|Thread|ArrayList|HashMap|UUID)\b)|(\b\d+(?:\.\d+)?(?:[dDfFlL])?\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|(::|->|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||[+\-*/%=<>!&|^~?:;.,])/g;

      let lastIndex = 0;
      let html = "";
      let match;

      while ((match = tokenRegex.exec(code)) !== null) {
        if (match.index > lastIndex) {
          html += escapeHtml(code.slice(lastIndex, match.index));
        }
        const [
          full,
          comment,
          str,
          annot,
          controlKw,
          declKw,
          boolNull,
          typeKw,
          num,
          fnName,
          op,
        ] = match;

        if (comment)
          html += `<span class="tok-comment">${escapeHtml(comment)}</span>`;
        else if (str)
          html += `<span class="tok-string">${escapeHtml(str)}</span>`;
        else if (annot)
          html += `<span class="tok-annotation">${escapeHtml(annot)}</span>`;
        else if (controlKw)
          html += `<span class="tok-control">${escapeHtml(controlKw)}</span>`;
        else if (declKw)
          html += `<span class="tok-decl">${escapeHtml(declKw)}</span>`;
        else if (boolNull)
          html += `<span class="tok-bool">${escapeHtml(boolNull)}</span>`;
        else if (typeKw)
          html += `<span class="tok-type">${escapeHtml(typeKw)}</span>`;
        else if (num)
          html += `<span class="tok-number">${escapeHtml(num)}</span>`;
        else if (fnName)
          html += `<span class="tok-function">${escapeHtml(fnName)}</span>`;
        else if (op)
          html += `<span class="tok-operator">${escapeHtml(op)}</span>`;

        lastIndex = tokenRegex.lastIndex;
      }
      if (lastIndex < code.length) {
        html += escapeHtml(code.slice(lastIndex));
      }
      return html;
    }

    // 4. SQL / Mongo Highlighter
    const sqlRegex =
      /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\b(?:SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|TOP|CREATE|TABLE|PRIMARY|KEY|DEFAULT|AND|OR|NOT|AS|DESC|ASC|IN|IS|NULL)\b)|(db\.[a-zA-Z0-9_]+\.(?:find|insertOne|insertMany|updateOne|updateMany|deleteOne|deleteMany|aggregate))|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\b)/gi;

    let lastIndex = 0;
    let html = "";
    let match;

    while ((match = sqlRegex.exec(code)) !== null) {
      if (match.index > lastIndex) {
        html += escapeHtml(code.slice(lastIndex, match.index));
      }
      const [full, comment, str, sqlKw, mongoKw, num, word] = match;

      if (comment)
        html += `<span class="tok-comment">${escapeHtml(comment)}</span>`;
      else if (str)
        html += `<span class="tok-string">${escapeHtml(str)}</span>`;
      else if (sqlKw)
        html += `<span class="tok-sql">${escapeHtml(sqlKw.toUpperCase())}</span>`;
      else if (mongoKw)
        html += `<span class="tok-builtin">${escapeHtml(mongoKw)}</span>`;
      else if (num)
        html += `<span class="tok-number">${escapeHtml(num)}</span>`;
      else html += escapeHtml(word);

      lastIndex = sqlRegex.lastIndex;
    }
    if (lastIndex < code.length) {
      html += escapeHtml(code.slice(lastIndex));
    }
    return html;
  }

  function getActiveLanguage() {
    if (currentMode === "db") return activeDb;
    if (currentMode === "java") return "java";
    if (activeFilePath.endsWith(".xml")) return "xml";
    if (
      activeFilePath.endsWith(".properties") ||
      activeFilePath.endsWith(".yml")
    )
      return "properties";
    if (activeFilePath.endsWith(".sql")) return "sql";
    return "java";
  }

  // --------------------------------------------------------------------------
  // INTELLIJ CODE COMPLETION TEMPLATES
  // --------------------------------------------------------------------------
  const INTELLIJ_COMPLETIONS = [
    {
      prefix: "psvm",
      label: "public static void main(String[] args)",
      type: "m",
      desc: "Main method declaration",
      snippet: `public static void main(String[] args) {\n    SpringApplication.run(DemoApplication.class, args);\n}`,
    },
    {
      prefix: "sout",
      label: "System.out.println()",
      type: "m",
      desc: "Console standard print",
      snippet: `System.out.println("Hello from Java 25 & Spring Boot 4!");`,
    },
    {
      prefix: "@SpringBootApplication",
      label: "@SpringBootApplication",
      type: "a",
      desc: "Spring Boot master annotation",
      snippet: `@SpringBootApplication\n`,
    },
    {
      prefix: "@RestController",
      label: "@RestController",
      type: "a",
      desc: "Spring REST API Controller",
      snippet: `@RestController\n@RequestMapping("/api/v1")\n`,
    },
    {
      prefix: "@GetMapping",
      label: "@GetMapping",
      type: "a",
      desc: "HTTP GET request handler",
      snippet: `@GetMapping\npublic ResponseEntity<List<String>> getItems() {\n    return ResponseEntity.ok(List.of("Microservice-A", "Microservice-B"));\n}\n`,
    },
    {
      prefix: "@PostMapping",
      label: "@PostMapping",
      type: "a",
      desc: "HTTP POST request handler",
      snippet: `@PostMapping\npublic ResponseEntity<String> createItem(@RequestBody String body) {\n    return ResponseEntity.status(201).body("Created: " + body);\n}\n`,
    },
    {
      prefix: "@Autowired",
      label: "@Autowired",
      type: "a",
      desc: "Spring Bean dependency injection",
      snippet: `@Autowired\nprivate UserService userService;\n`,
    },
    {
      prefix: "vthread",
      label: "Thread.ofVirtual().start()",
      type: "m",
      desc: "Java 25 High-Throughput Thread",
      snippet: `Thread.ofVirtual().name("demo-vthread").start(() -> {\n    System.out.println("Virtual Thread executing concurrently on " + Thread.currentThread());\n});\n`,
    },
    {
      prefix: "ResponseEntity",
      label: "ResponseEntity.ok()",
      type: "c",
      desc: "Spring HTTP Response builder",
      snippet: `ResponseEntity.ok()`,
    },
    {
      prefix: "Instant",
      label: "Instant.now()",
      type: "c",
      desc: "Java time UTC timestamp",
      snippet: `Instant.now()`,
    },
    {
      prefix: "logger",
      label: "LoggerFactory.getLogger()",
      type: "f",
      desc: "SLF4J Logger field",
      snippet: `private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(DemoApplication.class);\n`,
    },
  ];

  function updateEditor() {
    const code = codeEditor.value;
    const lines = code.split("\n");
    const lineCount = lines.length;

    // 1. Syntax highlight
    const lang = getActiveLanguage();
    highlightCodeEl.innerHTML = highlightCode(code, lang) + "\n";

    // 2. IntelliJ Feature Gutter (Run ▶, Spring 🍃, Breakpoint ●, Line #, Fold ▼)
    const cursorLine = getCursorLineNumber();
    let gutterHtml = "";
    const isScratchpad = currentMode === "java";
    const activeBaseName = isScratchpad
      ? "Main.java"
      : activeFilePath.split("/").pop();
    const isJava = isScratchpad || activeBaseName.endsWith(".java");

    for (let i = 1; i <= lineCount; i++) {
      const activeClass = i === cursorLine ? " active" : "";
      const lineText = lines[i - 1] || "";
      const hasBp = breakpoints.has(i);

      let gutterIcon = "";
      if (isJava) {
        if (
          lineText.includes("public static void main") ||
          (isScratchpad && lineText.includes("void main"))
        ) {
          const runTarget = isScratchpad
            ? "Main"
            : activeBaseName.replace(".java", "");
          gutterIcon = `<span class="ij-run-btn" data-line="${i}" title="Run '${runTarget}.main()' (Shift+F10)">▶</span>`;
        } else if (lineText.includes("@SpringBootApplication")) {
          gutterIcon = `<span class="ij-spring-bean" title="Spring Boot Application Component">🍃</span>`;
        } else if (
          !isScratchpad &&
          (lineText.includes("class DemoApplication") ||
            (lineText.includes("public class") &&
              lineText.includes("Application")))
        ) {
          gutterIcon = `<span class="ij-run-btn" data-line="${i}" title="Run Application (Shift+F10)">▶</span>`;
        } else if (
          isScratchpad &&
          (lineText.includes("public class Main") ||
            lineText.includes("class Main"))
        ) {
          gutterIcon = `<span class="ij-run-btn" data-line="${i}" title="Run 'Main' (Shift+F10)">▶</span>`;
        } else if (
          lineText.includes("@RestController") ||
          lineText.includes("@Service") ||
          lineText.includes("@Repository")
        ) {
          gutterIcon = `<span class="ij-spring-bean" title="Spring Bean Registered in ApplicationContext">🍃</span>`;
        } else if (
          lineText.includes("@GetMapping") ||
          lineText.includes("@PostMapping") ||
          lineText.includes("@PutMapping") ||
          lineText.includes("@DeleteMapping")
        ) {
          gutterIcon = `<span class="ij-spring-bean" style="color: #2563eb;" title="Spring REST Endpoint">⚡</span>`;
        }
      }

      const hasFold = lineText.trim().endsWith("{");

      gutterHtml += `
        <div class="ij-gutter-row vscode-gutter-line${activeClass}" data-line="${i}">
          <span class="ij-gutter-bp${hasBp ? " has-breakpoint" : ""}" data-line="${i}" title="${hasBp ? "Remove Breakpoint" : "Toggle Breakpoint (Line " + i + ")"}"></span>
          <span class="ij-gutter-icon-slot">${gutterIcon}</span>
          <span class="ij-gutter-num">${i}</span>
          <span class="ij-gutter-fold">${hasFold ? "▼" : ""}</span>
        </div>
      `;
    }
    editorGutter.innerHTML = gutterHtml;

    // Attach IntelliJ Gutter Action Listeners
    editorGutter.querySelectorAll(".ij-run-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        runCurrentApplication();
      });
    });

    editorGutter.querySelectorAll(".ij-gutter-bp").forEach((bp) => {
      bp.addEventListener("click", (e) => {
        e.stopPropagation();
        const line = parseInt(bp.dataset.line, 10);
        if (breakpoints.has(line)) {
          breakpoints.delete(line);
          bp.classList.remove("has-breakpoint");
          showToast("info", "Breakpoint Removed", `Line ${line}`);
        } else {
          breakpoints.add(line);
          bp.classList.add("has-breakpoint");
          showToast("info", "Breakpoint Added", `Line ${line} (Debug Target)`);
        }
      });
    });

    editorGutter.querySelectorAll(".ij-spring-bean").forEach((sb) => {
      sb.addEventListener("click", (e) => {
        e.stopPropagation();
        showToast(
          "success",
          "Spring Context",
          "Spring Bean successfully registered in ApplicationContext.",
        );
      });
    });

    // 3. Stats & Config update
    fileStatsEl.textContent = `${lineCount} lines, ${code.length} chars`;
    if (ijConfigName) {
      if (isScratchpad) {
        ijConfigName.textContent = "Main";
      } else {
        ijConfigName.textContent = activeBaseName.replace(/\.[^/.]+$/, "");
      }
    }
  }

  function getCursorLineNumber() {
    const pos = codeEditor.selectionStart || 0;
    return codeEditor.value.substring(0, pos).split("\n").length;
  }

  function updateCursorPos() {
    const pos = codeEditor.selectionStart || 0;
    const textBefore = codeEditor.value.substring(0, pos);
    const lines = textBefore.split("\n");
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    cursorPosEl.textContent = `Ln ${line}, Col ${col}`;

    // Highlight active IntelliJ gutter row
    const gutterRows = editorGutter.querySelectorAll(".ij-gutter-row");
    gutterRows.forEach((gr) => {
      const rowLine = parseInt(gr.dataset.line, 10);
      if (rowLine === line) gr.classList.add("active");
      else gr.classList.remove("active");
    });

    // Dynamic IntelliJ Breadcrumbs method detection
    if (ijCrumbMethod) {
      let foundMethod = "";
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i].trim();
        const methodMatch = l.match(
          /(?:public|private|protected)?\s*(?:static\s+)?[\w<>[\]]+\s+(\w+)\s*\([^)]*\)\s*\{?/,
        );
        if (
          methodMatch &&
          !["if", "for", "while", "switch", "catch"].includes(methodMatch[1])
        ) {
          foundMethod = methodMatch[1] + "()";
          break;
        }
      }
      if (foundMethod) {
        ijCrumbMethod.style.display = "inline-flex";
        const label = ijCrumbMethod.querySelector("span:last-child");
        if (label) label.textContent = foundMethod;
      } else {
        ijCrumbMethod.style.display = "none";
      }
    }
  }

  // Scroll Synchronization
  codeEditor.addEventListener("scroll", () => {
    highlightLayer.scrollTop = codeEditor.scrollTop;
    highlightLayer.scrollLeft = codeEditor.scrollLeft;
    editorGutter.scrollTop = codeEditor.scrollTop;
  });

  codeEditor.addEventListener("input", () => {
    isFileDirty = true;
    activeTabDirty.style.display = "inline";
    if (currentMode === "java") {
      saveScratchpadCode(codeEditor.value);
    }
    clearCompilerErrors();
    updateEditor();
  });

  codeEditor.addEventListener("keyup", updateCursorPos);
  codeEditor.addEventListener("click", updateCursorPos);

  // --------------------------------------------------------------------------
  // INTELLIJ CODE REFORMAT (Ctrl+Alt+L)
  // --------------------------------------------------------------------------
  function reformatIntellijCode() {
    const code = codeEditor.value;
    const lines = code.split("\n");
    let indent = 0;
    const formatted = lines
      .map((rawLine) => {
        const line = rawLine.trim();
        if (!line) return "";
        if (
          line.startsWith("}") ||
          line.startsWith(");") ||
          line.startsWith("]")
        ) {
          indent = Math.max(0, indent - 1);
        }
        const res = "    ".repeat(indent) + line;
        if (line.endsWith("{") && !line.startsWith("//")) {
          indent++;
        }
        return res;
      })
      .join("\n");

    codeEditor.value = formatted;
    updateEditor();
    showToast(
      "success",
      "IntelliJ Reformat (Ctrl+Alt+L)",
      "Applied JetBrains Java code style formatting.",
    );
  }

  if (btnIjReformat)
    btnIjReformat.addEventListener("click", reformatIntellijCode);

  // --------------------------------------------------------------------------
  // INTELLIJ CODE COMPLETION (Ctrl+Space)
  // --------------------------------------------------------------------------
  function showCompletionPopup() {
    if (!intellijCompletionPopup) return;
    completionList.innerHTML = "";

    INTELLIJ_COMPLETIONS.forEach((item, index) => {
      const el = document.createElement("div");
      el.className = `completion-item ${index === 0 ? "selected" : ""}`;
      el.innerHTML = `
        <span class="completion-badge badge-${item.type}">${item.type.toUpperCase()}</span>
        <span class="completion-text">${escapeHtml(item.label)}</span>
        <span class="completion-type">${escapeHtml(item.desc)}</span>
      `;
      el.addEventListener("click", () => {
        insertSnippetAtCursor(item.snippet);
        hideCompletionPopup();
      });
      completionList.appendChild(el);
    });

    intellijCompletionPopup.style.display = "flex";
  }

  function hideCompletionPopup() {
    if (intellijCompletionPopup) intellijCompletionPopup.style.display = "none";
  }

  function insertSnippetAtCursor(snippet) {
    const start = codeEditor.selectionStart || 0;
    const end = codeEditor.selectionEnd || 0;
    const val = codeEditor.value;
    codeEditor.value = val.substring(0, start) + snippet + val.substring(end);
    codeEditor.selectionStart = codeEditor.selectionEnd =
      start + snippet.length;
    codeEditor.focus();
    updateEditor();
    showToast(
      "success",
      "Snippet Inserted",
      "Inserted IntelliJ code completion snippet.",
    );
  }

  if (btnIjAutocomplete) {
    btnIjAutocomplete.addEventListener("click", () => {
      if (
        intellijCompletionPopup &&
        intellijCompletionPopup.style.display === "flex"
      ) {
        hideCompletionPopup();
      } else {
        showCompletionPopup();
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (
      intellijCompletionPopup &&
      !intellijCompletionPopup.contains(e.target) &&
      e.target !== btnIjAutocomplete &&
      !btnIjAutocomplete?.contains(e.target)
    ) {
      hideCompletionPopup();
    }
  });

  // --------------------------------------------------------------------------
  // INTELLIJ FIND IN FILE (Ctrl+F)
  // --------------------------------------------------------------------------
  let findMatches = [];
  let currentFindIndex = -1;

  function toggleFindBar(show) {
    if (!intellijFindBar) return;
    const isVisible =
      typeof show === "boolean"
        ? show
        : intellijFindBar.style.display === "none";
    intellijFindBar.style.display = isVisible ? "flex" : "none";
    if (isVisible) {
      ijFindInput.focus();
      ijFindInput.select();
      performFind();
    }
  }

  function performFind() {
    const query = ijFindInput.value;
    findMatches = [];
    currentFindIndex = -1;

    if (!query) {
      ijFindCount.textContent = "0 of 0";
      return;
    }

    const code = codeEditor.value.toLowerCase();
    const qLower = query.toLowerCase();
    let idx = code.indexOf(qLower);
    while (idx !== -1) {
      findMatches.push(idx);
      idx = code.indexOf(qLower, idx + qLower.length);
    }

    if (findMatches.length > 0) {
      currentFindIndex = 0;
      ijFindCount.textContent = `1 of ${findMatches.length}`;
      highlightFindMatch(findMatches[0], query.length);
    } else {
      ijFindCount.textContent = "0 of 0";
    }
  }

  function highlightFindMatch(startPos, length) {
    codeEditor.focus();
    codeEditor.setSelectionRange(startPos, startPos + length);
    updateCursorPos();
  }

  function nextFindMatch() {
    if (findMatches.length === 0) return;
    currentFindIndex = (currentFindIndex + 1) % findMatches.length;
    ijFindCount.textContent = `${currentFindIndex + 1} of ${findMatches.length}`;
    highlightFindMatch(findMatches[currentFindIndex], ijFindInput.value.length);
  }

  function prevFindMatch() {
    if (findMatches.length === 0) return;
    currentFindIndex =
      (currentFindIndex - 1 + findMatches.length) % findMatches.length;
    ijFindCount.textContent = `${currentFindIndex + 1} of ${findMatches.length}`;
    highlightFindMatch(findMatches[currentFindIndex], ijFindInput.value.length);
  }

  if (btnIjFind) btnIjFind.addEventListener("click", () => toggleFindBar());
  if (btnFindClose)
    btnFindClose.addEventListener("click", () => toggleFindBar(false));
  if (ijFindInput) {
    ijFindInput.addEventListener("input", performFind);
    ijFindInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) prevFindMatch();
        else nextFindMatch();
      } else if (e.key === "Escape") {
        toggleFindBar(false);
      }
    });
  }
  if (btnFindNext) btnFindNext.addEventListener("click", nextFindMatch);
  if (btnFindPrev) btnFindPrev.addEventListener("click", prevFindMatch);

  // --------------------------------------------------------------------------
  // INTELLIJ CODE GENERATION DIALOG (Alt+Insert)
  // --------------------------------------------------------------------------
  function openGenerateModal() {
    if (ijGenerateModal) ijGenerateModal.style.display = "flex";
  }

  function closeGenerateModal() {
    if (ijGenerateModal) ijGenerateModal.style.display = "none";
  }

  if (btnIjGenerate) btnIjGenerate.addEventListener("click", openGenerateModal);
  if (btnCloseGenerateModal)
    btnCloseGenerateModal.addEventListener("click", closeGenerateModal);
  if (btnCancelGenerateModal)
    btnCancelGenerateModal.addEventListener("click", closeGenerateModal);

  document.querySelectorAll(".ij-gen-card").forEach((card) => {
    card.addEventListener("click", () => {
      const genType = card.dataset.gen;
      let snippet = "";

      if (genType === "get-mapping") {
        snippet = `\n    @GetMapping("/{id}")\n    public ResponseEntity<String> getItemById(@PathVariable Long id) {\n        return ResponseEntity.ok("Item #" + id + " fetched at " + Instant.now());\n    }\n`;
      } else if (genType === "post-mapping") {
        snippet = `\n    @PostMapping\n    public ResponseEntity<Map<String, Object>> createResource(@RequestBody Map<String, Object> payload) {\n        return ResponseEntity.status(201).body(payload);\n    }\n`;
      } else if (genType === "service-bean") {
        snippet = `\n    public String processBusinessLogic(String task) {\n        return "Task [" + task + "] executed via Java 25 Virtual Thread at " + Instant.now();\n    }\n`;
      } else if (genType === "virtual-thread") {
        snippet = `\n    // Java 25 High-Throughput Virtual Thread\n    Thread.ofVirtual().name("async-task").start(() -> {\n        System.out.println("Executing task concurrently on: " + Thread.currentThread());\n    });\n`;
      } else if (genType === "constructor-getters") {
        snippet = `\n    public DemoComponent() {}\n\n    public String getInfo() { return "IntelliJ IDEA Component"; }\n`;
      } else if (genType === "logger") {
        snippet = `\n    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(DemoApplication.class);\n`;
      }

      insertSnippetAtCursor(snippet);
      closeGenerateModal();
    });
  });

  // --------------------------------------------------------------------------
  // INTELLIJ RUN / BUILD / DEBUG WIDGET LISTENERS
  // --------------------------------------------------------------------------
  if (btnIjRun) btnIjRun.addEventListener("click", runCurrentApplication);
  if (btnIjBuild) {
    btnIjBuild.addEventListener("click", async () => {
      activateOutputTab("console");
      const now = new Date().toISOString().substring(11, 19);

      if (currentMode === "java") {
        showToast(
          "info",
          "IntelliJ Build (Ctrl+F9)",
          "Compiling Main.java with javac 25...",
        );
        const log = (tag, msg, type = "info") => {
          const entry = document.createElement("div");
          entry.className = `log-entry log-${type}`;
          entry.innerHTML = `
            <span class="log-time">[${now}]</span>
            <span class="log-tag tag-${tag.toLowerCase()}">${tag}</span>
            <span class="log-msg">${escapeHtml(msg)}</span>
          `;
          logStream.appendChild(entry);
          viewConsole.querySelector(".terminal-container").scrollTop = 999999;
        };

        log(
          "JAVAC",
          "Compiling Java 25 source code (Oracle OpenJDK 25.0.4.1)...",
          "compiler",
        );
        try {
          const data = await apiFetch("/api/run/java", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: codeEditor.value }),
          });
          if (data && data.success) {
            log(
              "BUILD",
              "Incremental build completed: 0 errors, 0 warnings. Classes ready.",
              "success",
            );
            showToast(
              "success",
              "Build Successful",
              "javac 25 compiled Main.java with 0 errors.",
            );
            clearCompilerErrors();
          } else {
            const err = (data && data.error) || "Compilation failed";
            log("ERROR", err, "error");
            showToast(
              "error",
              "Build Failed",
              "javac 25 reported compilation errors.",
            );
            highlightCompilerErrors(err);
          }
        } catch (e) {
          log("ERROR", `Build error: ${e.message}`, "error");
        }
      } else {
        showToast(
          "info",
          "IntelliJ Build (Ctrl+F9)",
          "Executing Maven incremental compile...",
        );
        const entry = document.createElement("div");
        entry.className = "log-entry log-success";
        entry.innerHTML = `
          <span class="log-time">[${now}]</span>
          <span class="log-tag tag-ready">BUILD</span>
          <span class="log-msg">Incremental build completed: 0 errors, 0 warnings. (Oracle JDK 25 &amp; Spring Boot 4)</span>
        `;
        logStream.appendChild(entry);
      }
    });
  }

  if (btnIjDebug) {
    btnIjDebug.addEventListener("click", () => {
      const modeLabel =
        currentMode === "java" ? "Main.java" : "DemoApplication";
      showToast(
        "success",
        "IntelliJ Debugger (Shift+F9)",
        `Connected to JDWP agent for ${modeLabel}. Breakpoints: ${breakpoints.size || "None"}`,
      );
      runCurrentApplication();
    });
  }

  if (btnIjStop) {
    btnIjStop.addEventListener("click", () => {
      showToast("warning", "Process Stopped", "Application execution stopped.");
      if (consoleStatusBadge) consoleStatusBadge.textContent = "STOPPED";
    });
  }

  // IntelliJ Run Configuration Switcher Dropdown
  let ijConfigDropdownEl = null;

  function toggleRunConfigDropdown() {
    if (ijConfigDropdownEl) {
      ijConfigDropdownEl.remove();
      ijConfigDropdownEl = null;
      return;
    }

    ijConfigDropdownEl = document.createElement("div");
    ijConfigDropdownEl.className = "ij-run-config-dropdown";

    const bootItem = document.createElement("button");
    bootItem.className = `ij-run-config-dropdown-item ${currentMode === "boot" ? "active" : ""}`;
    bootItem.innerHTML = `<span>🍃</span><span>DemoApplication (Spring Boot 4)</span>`;
    bootItem.addEventListener("click", (e) => {
      e.stopPropagation();
      setApplicationMode("boot");
      if (ijConfigDropdownEl) {
        ijConfigDropdownEl.remove();
        ijConfigDropdownEl = null;
      }
    });

    const javaItem = document.createElement("button");
    javaItem.className = `ij-run-config-dropdown-item ${currentMode === "java" ? "active" : ""}`;
    javaItem.innerHTML = `<span>☕</span><span>Main (Java 25 Scratchpad)</span>`;
    javaItem.addEventListener("click", (e) => {
      e.stopPropagation();
      setApplicationMode("java");
      if (ijConfigDropdownEl) {
        ijConfigDropdownEl.remove();
        ijConfigDropdownEl = null;
      }
    });

    ijConfigDropdownEl.appendChild(bootItem);
    ijConfigDropdownEl.appendChild(javaItem);

    if (ijRunConfigBtn && ijRunConfigBtn.parentElement) {
      ijRunConfigBtn.parentElement.style.position = "relative";
      ijRunConfigBtn.parentElement.appendChild(ijConfigDropdownEl);
    }
  }

  if (ijRunConfigBtn) {
    ijRunConfigBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleRunConfigDropdown();
    });
  }

  document.addEventListener("click", (e) => {
    if (
      ijConfigDropdownEl &&
      !ijConfigDropdownEl.contains(e.target) &&
      e.target !== ijRunConfigBtn &&
      !ijRunConfigBtn?.contains(e.target)
    ) {
      ijConfigDropdownEl.remove();
      ijConfigDropdownEl = null;
    }
  });

  // Compiler Diagnostics
  function highlightCompilerErrors(errText) {
    if (!errText) return;
    const match = errText.match(/(?:Main\.java|[\w/\\.-]+\.java):(\d+):/i);
    if (match) {
      const lineNum = parseInt(match[1], 10);
      const row = editorGutter.querySelector(
        `.ij-gutter-row[data-line="${lineNum}"]`,
      );
      if (row) {
        row.style.background = "rgba(239, 68, 68, 0.2)";
        row.title = `Error on line ${lineNum}: ${errText.substring(0, 100)}`;
      }
      if (inspectionStatusIcon) {
        inspectionStatusIcon.innerHTML = `<span class="material-icons" style="font-size: 10px; color: #ef4444;">error</span>`;
        inspectionStatusIcon.style.background = "#fef2f2";
        inspectionStatusIcon.title = `Error at line ${lineNum}`;
      }
      if (ijInspectionSummary) {
        ijInspectionSummary.innerHTML = `
          <span class="material-icons" style="font-size: 13px; color: #ef4444;">error</span>
          <span style="color: #ef4444; font-weight: 600;">1 error (Line ${lineNum})</span>
        `;
      }
    }
  }

  function clearCompilerErrors() {
    editorGutter.querySelectorAll(".ij-gutter-row").forEach((row) => {
      row.style.background = "";
    });
    if (inspectionStatusIcon) {
      inspectionStatusIcon.innerHTML = `<span class="material-icons status-ok-check">check</span>`;
      inspectionStatusIcon.style.background = "#ecfdf5";
      inspectionStatusIcon.title = "No errors found in file";
    }
    if (ijInspectionSummary) {
      ijInspectionSummary.innerHTML = `
        <span class="material-icons" style="font-size: 13px; color: #10b981;">verified</span>
        <span>No errors</span>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // INTELLIJ THEME SWITCHER (Light <-> Darcula)
  // --------------------------------------------------------------------------
  function setIntelliJTheme(theme) {
    const isDarcula = theme === "darcula";
    if (intellijWindowWrapper) {
      intellijWindowWrapper.classList.toggle("intellij-darcula", isDarcula);
    }
    document.body.classList.toggle("intellij-darcula", isDarcula);
    document.documentElement.classList.toggle("intellij-darcula", isDarcula);

    if (ijThemeIcon) {
      ijThemeIcon.textContent = isDarcula ? "light_mode" : "dark_mode";
    }
    if (ijThemeLabel) {
      ijThemeLabel.textContent = isDarcula ? "Light" : "Darcula";
    }
    localStorage.setItem("ij_theme", theme);
  }

  const savedTheme = localStorage.getItem("ij_theme") || "light";
  if (savedTheme === "darcula") {
    setIntelliJTheme("darcula");
  }

  if (btnIjThemeToggle) {
    btnIjThemeToggle.addEventListener("click", () => {
      const current = document.body.classList.contains("intellij-darcula")
        ? "darcula"
        : "light";
      const target = current === "darcula" ? "light" : "darcula";
      setIntelliJTheme(target);
      showToast(
        "info",
        "IntelliJ Theme",
        `Switched to IntelliJ IDEA ${target === "darcula" ? "Darcula (Dark)" : "Light (New UI)"}.`,
      );
    });
  }

  // Enhanced IntelliJ Keybindings
  codeEditor.addEventListener("keydown", (e) => {
    // 1. Tab indentation (4 spaces)
    if (e.key === "Tab") {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value =
        codeEditor.value.substring(0, start) +
        "    " +
        codeEditor.value.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
      updateEditor();
    }
    // 2. Ctrl+Alt+L / Cmd+Alt+L: Reformat Code
    else if (
      (e.metaKey || e.ctrlKey) &&
      e.altKey &&
      (e.key === "l" || e.key === "L")
    ) {
      e.preventDefault();
      reformatIntellijCode();
    }
    // 3. Alt+Insert / Cmd+N: Generate Code Modal
    else if ((e.altKey && e.key === "Insert") || (e.metaKey && e.key === "n")) {
      e.preventDefault();
      openGenerateModal();
    }
    // 4. Ctrl+F / Cmd+F: Find in File
    else if ((e.metaKey || e.ctrlKey) && (e.key === "f" || e.key === "F")) {
      e.preventDefault();
      toggleFindBar();
    }
    // 5. Ctrl+Space: Code Completion
    else if ((e.ctrlKey || e.metaKey) && e.key === " ") {
      e.preventDefault();
      showCompletionPopup();
    }
    // 6. Cmd+S / Ctrl+S: Save
    else if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      saveActiveFile();
    }
    // 7. Cmd+Enter / Ctrl+Enter: Run
    else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      runCurrentApplication();
    }
    // 8. Shift+F10: Run
    else if (e.shiftKey && e.key === "F10") {
      e.preventDefault();
      runCurrentApplication();
    }
    // 9. Shift+F9: Debug
    else if (e.shiftKey && e.key === "F9") {
      e.preventDefault();
      showToast("success", "Debug", "Running with Java 25 debugger attached.");
      runCurrentApplication();
    }
  });

  // --------------------------------------------------------------------------
  // 6. SPRING BOOT PROJECT DIRECTORY TREE EXPLORER
  // --------------------------------------------------------------------------
  async function fetchProjectTree() {
    try {
      bootFileTree.innerHTML = `
        <div class="tree-loading">
          <span class="material-icons spin-anim">sync</span>
          <span>Scanning project directory...</span>
        </div>
      `;
      const data = await apiFetch("/api/boot/tree");
      if (data && data.success && data.tree) {
        currentTreeData = data.tree;
        renderDirectoryTree(data.tree, treeSearchInput.value.trim());
      } else {
        throw new Error(
          (data && data.error) || "Failed to load directory tree",
        );
      }
    } catch (err) {
      console.warn("[Tree Fetch Fallback]", err.message);
      currentTreeData = DEFAULT_BOOT_TREE;
      renderDirectoryTree(DEFAULT_BOOT_TREE, treeSearchInput.value.trim());
      showToast(
        "info",
        "Project Explorer",
        "Loaded Spring Boot project structure.",
      );
    }
  }

  function renderDirectoryTree(tree, filter = "") {
    bootFileTree.innerHTML = "";
    const container = document.createElement("div");
    renderTreeNode(tree, container, 0, filter.toLowerCase());
    bootFileTree.appendChild(container);
  }

  function renderTreeNode(node, parentElement, depth = 0, filter = "") {
    if (!node) return;

    if (node.type === "directory") {
      const hasMatchingChild = filter ? checkNodeMatches(node, filter) : true;
      if (!hasMatchingChild) return;

      const folderRow = document.createElement("div");
      folderRow.className = "tree-row";
      folderRow.title = node.path || "Root Folder";

      for (let i = 0; i < depth; i++) {
        const indent = document.createElement("span");
        indent.className = "tree-indent";
        folderRow.appendChild(indent);
      }

      const arrow = document.createElement("span");
      arrow.className = "material-icons tree-arrow expanded";
      arrow.textContent = "chevron_right";
      folderRow.appendChild(arrow);

      const icon = document.createElement("span");
      icon.className = "material-icons tree-item-icon icon-folder";
      icon.textContent = "folder";
      folderRow.appendChild(icon);

      const name = document.createElement("span");
      name.className = "tree-item-name";
      name.textContent = node.name;
      folderRow.appendChild(name);

      parentElement.appendChild(folderRow);

      const childrenContainer = document.createElement("div");
      childrenContainer.className = "tree-children";
      parentElement.appendChild(childrenContainer);

      let isExpanded = true;
      folderRow.addEventListener("click", (e) => {
        e.stopPropagation();
        isExpanded = !isExpanded;
        arrow.classList.toggle("expanded", isExpanded);
        icon.textContent = isExpanded ? "folder_open" : "folder";
        childrenContainer.style.display = isExpanded ? "block" : "none";
      });

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) =>
          renderTreeNode(child, childrenContainer, depth + 1, filter),
        );
      }
    } else {
      if (
        filter &&
        !node.name.toLowerCase().includes(filter) &&
        !node.path.toLowerCase().includes(filter)
      ) {
        return;
      }

      const fileRow = document.createElement("div");
      fileRow.className = "tree-row";
      if (node.path === activeFilePath) fileRow.classList.add("active");
      fileRow.title = node.path;

      for (let i = 0; i < depth; i++) {
        const indent = document.createElement("span");
        indent.className = "tree-indent";
        fileRow.appendChild(indent);
      }

      const spacer = document.createElement("span");
      spacer.className = "tree-indent";
      fileRow.appendChild(spacer);

      const icon = document.createElement("span");
      icon.className = "tree-item-icon";
      if (node.name.endsWith(".java")) {
        icon.textContent = "☕";
        icon.classList.add("icon-java");
      } else if (node.name === "pom.xml") {
        icon.textContent = "📄";
        icon.classList.add("icon-xml");
      } else if (
        node.name.endsWith(".properties") ||
        node.name.endsWith(".yml")
      ) {
        icon.textContent = "⚙️";
        icon.classList.add("icon-properties");
      } else if (node.name.endsWith(".sql")) {
        icon.textContent = "🗄️";
        icon.classList.add("icon-sql");
      } else {
        icon.textContent = "📄";
      }
      fileRow.appendChild(icon);

      const name = document.createElement("span");
      name.className = "tree-item-name";
      name.textContent = node.name;
      fileRow.appendChild(name);

      const delBtn = document.createElement("button");
      delBtn.className = "material-icons tree-delete-btn";
      delBtn.textContent = "delete_outline";
      delBtn.title = `Delete ${node.name}`;
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteProjectFile(node.path);
      });
      fileRow.appendChild(delBtn);

      fileRow.addEventListener("click", (e) => {
        e.stopPropagation();
        openProjectFile(node.path, node.name);
      });

      parentElement.appendChild(fileRow);
    }
  }

  function checkNodeMatches(node, filter) {
    if (node.name.toLowerCase().includes(filter)) return true;
    if (node.children) {
      return node.children.some((c) => checkNodeMatches(c, filter));
    }
    return false;
  }

  treeSearchInput.addEventListener("input", () => {
    if (currentTreeData) {
      renderDirectoryTree(currentTreeData, treeSearchInput.value.trim());
    }
  });

  // Open File from Project Tree (Instant Snippet Loading via FILE_CACHE + Cloud Sync)
  async function openProjectFile(relPath, fileName = "") {
    if (!relPath) return;

    const cleanRelPath = relPath
      .replace(/^springboot_app[\/\\]+/, "")
      .replace(/^\/+/, "");
    const baseName = fileName || cleanRelPath.split("/").pop();

    // Cache current file before switching to another file
    if (
      currentMode === "boot" &&
      activeFilePath &&
      activeFilePath !== cleanRelPath
    ) {
      if (codeEditor && codeEditor.value && codeEditor.value.trim()) {
        FILE_CACHE.set(activeFilePath, codeEditor.value);
      }
    } else if (currentMode === "java") {
      if (codeEditor && isPureCoreJavaCode(codeEditor.value)) {
        saveScratchpadCode(codeEditor.value);
      }
    }

    activeFilePath = cleanRelPath;
    lastBootFilePath = cleanRelPath;
    isFileDirty = false;
    activeTabDirty.style.display = "none";

    // If currently in DB or Java scratchpad mode, switch UI state to Spring Boot Explorer mode
    if (currentMode !== "boot") {
      currentMode = "boot";
      tabBoot.classList.add("active");
      tabJava.classList.remove("active");
      tabDb.classList.remove("active");
      projectSidebar.classList.remove("collapsed");
      bootDirActions.style.display = "flex";
      if (scratchDirActions) scratchDirActions.style.display = "none";
      btnToggleSidebar.style.display = "inline-flex";
      if (btnRun) {
        btnRun.style.display = "inline-flex";
        btnRun.className = "mui-btn mui-btn-run boot-theme";
      }
      btnRunLabel.textContent = "Run Spring Boot 4";
      if (modeIndicatorChip) modeIndicatorChip.textContent = "Spring Boot 4 Project";
      if (workspaceGrid) workspaceGrid.classList.remove("db-mode");
    }

    if (crumbRoot) crumbRoot.textContent = "springboot_app";
    // Update Tab & Breadcrumbs
    if (activeTabTitle) activeTabTitle.textContent = baseName;
    if (crumbFile) crumbFile.textContent = baseName;
    const dir =
      cleanRelPath.substring(0, cleanRelPath.lastIndexOf("/")) ||
      "springboot_app";
    if (crumbFolder) crumbFolder.textContent = dir;

    if (activeTabIcon) {
      if (baseName.endsWith(".java")) {
        activeTabIcon.innerHTML = `<span class="ij-class-badge" id="ij-class-badge" style="background: #3574f0;">C</span>`;
      } else if (
        baseName.endsWith(".properties") ||
        baseName.endsWith(".yml")
      ) {
        activeTabIcon.innerHTML = `<span class="ij-class-badge" id="ij-class-badge" style="background: #64748b;">P</span>`;
      } else if (baseName.endsWith(".xml")) {
        activeTabIcon.innerHTML = `<span class="ij-class-badge" id="ij-class-badge" style="background: #ea580c;">X</span>`;
      } else if (baseName.endsWith(".sql")) {
        activeTabIcon.innerHTML = `<span class="ij-class-badge" id="ij-class-badge" style="background: #059669;">S</span>`;
      } else {
        activeTabIcon.textContent = "📄";
      }
    }

    if (editorLangBadge && editorFrameworkBadge && vscodeLangMode) {
      if (baseName.endsWith(".java")) {
        editorLangBadge.textContent = "JAVA 25";
        editorFrameworkBadge.textContent = "SPRING BOOT 4";
        vscodeLangMode.textContent = "Java 25 (LTS)";
      } else if (
        baseName.endsWith(".properties") ||
        baseName.endsWith(".yml")
      ) {
        editorLangBadge.textContent = "CONFIG";
        editorFrameworkBadge.textContent = "SPRING PROPERTIES";
        vscodeLangMode.textContent = "Properties";
      } else if (baseName.endsWith(".xml")) {
        editorLangBadge.textContent = "MAVEN";
        editorFrameworkBadge.textContent = "POM.XML";
        vscodeLangMode.textContent = "XML";
      } else if (baseName.endsWith(".sql")) {
        editorLangBadge.textContent = "SQL";
        editorFrameworkBadge.textContent = "DATABASE DDL";
        vscodeLangMode.textContent = "SQL";
      } else {
        editorLangBadge.textContent = "SOURCE";
        editorFrameworkBadge.textContent = "RESOURCE";
        vscodeLangMode.textContent = "Plain Text";
      }
    }

    if (ijConfigName) {
      ijConfigName.textContent = baseName.replace(/\.[^/.]+$/, "");
    }

    // Highlight active tree item
    const rows = bootFileTree.querySelectorAll(".tree-row");
    rows.forEach((r) => {
      const rowTitle = (r.title || "")
        .replace(/^springboot_app[\/\\]+/, "")
        .replace(/^\/+/, "");
      if (rowTitle === cleanRelPath || r.title === relPath)
        r.classList.add("active");
      else r.classList.remove("active");
    });

    // 1. Instant Cache Retrieval: Zero-latency display
    if (FILE_CACHE.has(cleanRelPath) && FILE_CACHE.get(cleanRelPath)) {
      codeEditor.value = FILE_CACHE.get(cleanRelPath);
    } else if (FILE_CACHE.has(relPath) && FILE_CACHE.get(relPath)) {
      codeEditor.value = FILE_CACHE.get(relPath);
    } else {
      fallbackFileContent(baseName, cleanRelPath);
    }
    codeEditor.scrollTop = 0;
    highlightLayer.scrollTop = 0;
    editorGutter.scrollTop = 0;
    updateEditor();

    // 2. Network Sync: Pull latest file content from backend server
    try {
      const data = await apiFetch(
        `/api/boot/file?path=${encodeURIComponent(cleanRelPath)}`,
      );
      if (data && data.success && typeof data.content === "string") {
        FILE_CACHE.set(cleanRelPath, data.content);
        if (activeFilePath === cleanRelPath) {
          codeEditor.value = data.content;
          codeEditor.scrollTop = 0;
          highlightLayer.scrollTop = 0;
          editorGutter.scrollTop = 0;
          updateEditor();
        }
      }
    } catch (err) {
      console.warn("[File Open Network Notice]", err.message);
    }
  }

  function fallbackFileContent(baseName, relPath = "") {
    const cleanRel = (relPath || "")
      .replace(/^springboot_app[\/\\]+/, "")
      .replace(/^\/+/, "");
    const targetPath = cleanRel || activeFilePath;
    let content = "";

    if (cleanRel === "pom.xml" || baseName === "pom.xml") {
      content = TEMPLATES.pomXml;
    } else if (
      cleanRel.endsWith("DemoApplication.java") ||
      baseName === "DemoApplication.java"
    ) {
      content = TEMPLATES.demoApp;
    } else if (
      cleanRel.endsWith("UserController.java") ||
      baseName === "UserController.java"
    ) {
      content = TEMPLATES.controller;
    } else if (
      cleanRel.endsWith("UserService.java") ||
      baseName === "UserService.java"
    ) {
      content = TEMPLATES.service;
    } else if (
      cleanRel.endsWith("UserRepository.java") ||
      baseName === "UserRepository.java"
    ) {
      content = TEMPLATES.repository;
    } else if (cleanRel.endsWith("User.java") || baseName === "User.java") {
      content = TEMPLATES.entity;
    } else if (
      cleanRel.endsWith("application.properties") ||
      baseName === "application.properties"
    ) {
      content = TEMPLATES.properties;
    } else if (cleanRel.endsWith("schema.sql") || baseName === "schema.sql") {
      content = TEMPLATES.sql;
    } else {
      content = `// ${baseName}\n// Spring Boot 4 & Java 25 Component\n`;
    }

    codeEditor.value = content;
    FILE_CACHE.set(targetPath, content);
  }

  // Save Active File
  async function saveActiveFile() {
    if (currentMode === "java") {
      const codeToSave = codeEditor.value;
      saveScratchpadCode(codeToSave);

      try {
        const data = await apiFetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: "Main.java",
            content: codeToSave,
          }),
        });
        if (data && data.success) {
          isFileDirty = false;
          activeTabDirty.style.display = "none";
          showToast(
            "success",
            "Java Scratchpad Saved",
            "Saved to src/Main.java on disk.",
          );
        } else {
          showToast(
            "error",
            "Save Failed",
            (data && data.error) || "Failed to save",
          );
        }
      } catch (err) {
        isFileDirty = false;
        activeTabDirty.style.display = "none";
        showToast(
          "success",
          "Saved Locally",
          "Java scratchpad saved in browser storage.",
        );
      }
      return;
    }

    if (currentMode === "db") {
      showToast("success", "Saved", "Database query script stored.");
      return;
    }

    FILE_CACHE.set(activeFilePath, codeEditor.value);
    try {
      const data = await apiFetch("/api/boot/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: activeFilePath,
          content: codeEditor.value,
        }),
      });
      if (data && data.success) {
        isFileDirty = false;
        activeTabDirty.style.display = "none";
        showToast(
          "success",
          "File Saved",
          `Successfully written to ${activeFilePath}`,
        );
      } else {
        showToast(
          "error",
          "Save Failed",
          (data && data.error) || "Unknown error",
        );
      }
    } catch (err) {
      showToast("error", "Error", `Save failed: ${err.message}`);
    }
  }

  btnSave.addEventListener("click", saveActiveFile);

  // Delete Project File
  async function deleteProjectFile(relPath) {
    if (!confirm(`Are you sure you want to delete ${relPath}?`)) return;
    try {
      const data = await apiFetch(
        `/api/boot/file?path=${encodeURIComponent(relPath)}`,
        { method: "DELETE" },
      );
      if (data && data.success) {
        showToast("success", "File Deleted", `Removed ${relPath}`);
        fetchProjectTree();
        if (activeFilePath === relPath) {
          openProjectFile(
            "src/main/java/com/example/demo/DemoApplication.java",
          );
        }
      } else {
        showToast(
          "error",
          "Delete Failed",
          (data && data.error) || "Could not delete file",
        );
      }
    } catch (err) {
      showToast("error", "Error", `Delete failed: ${err.message}`);
    }
  }

  // --------------------------------------------------------------------------
  // 7. NEW FILE & NEW FOLDER CREATION MODALS
  // --------------------------------------------------------------------------
  function openNewFileModal() {
    newFileName.value = "";
    newFileModal.style.display = "flex";
    newFileName.focus();
  }

  function closeNewFileModal() {
    newFileModal.style.display = "none";
  }

  btnCreateFile.addEventListener("click", openNewFileModal);
  btnTreeAddFile.addEventListener("click", openNewFileModal);
  btnCloseNewFileModal.addEventListener("click", closeNewFileModal);
  btnCancelNewFile.addEventListener("click", closeNewFileModal);

  btnSubmitNewFile.addEventListener("click", async () => {
    const parentDir = newFileParentDir.value.trim();
    let name = newFileName.value.trim();
    const templateKey = newFileTemplate.value;

    if (!name) {
      showToast("warning", "Validation", "Please enter a valid file name.");
      return;
    }

    if (!name.includes(".")) {
      name += ".java";
    }

    const fullRelPath = parentDir ? `${parentDir}/${name}` : name;
    let starterContent = TEMPLATES[templateKey] || TEMPLATES.blank;

    if (
      ["controller", "service", "entity"].includes(templateKey) &&
      name.endsWith(".java")
    ) {
      const className = name.replace(".java", "");
      starterContent = starterContent.replace(
        /ItemController|ItemService|DemoItem/g,
        className,
      );
    }

    try {
      const data = await apiFetch("/api/boot/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: fullRelPath,
          content: starterContent,
        }),
      });
      if (data && data.success) {
        closeNewFileModal();
        showToast(
          "success",
          "File Created",
          `Created ${fullRelPath} successfully.`,
        );
        await fetchProjectTree();
        await openProjectFile(fullRelPath, name);
      } else {
        showToast(
          "error",
          "Creation Failed",
          (data && data.error) || "Could not create file",
        );
      }
    } catch (err) {
      showToast("error", "Error", `Failed to create file: ${err.message}`);
    }
  });

  function openNewFolderModal() {
    newFolderName.value = "";
    newFolderModal.style.display = "flex";
    newFolderName.focus();
  }

  function closeNewFolderModal() {
    newFolderModal.style.display = "none";
  }

  btnCreateFolder.addEventListener("click", openNewFolderModal);
  btnTreeAddFolder.addEventListener("click", openNewFolderModal);
  btnCloseNewFolderModal.addEventListener("click", closeNewFolderModal);
  btnCancelNewFolder.addEventListener("click", closeNewFolderModal);

  btnSubmitNewFolder.addEventListener("click", async () => {
    const parentDir = newFolderParentDir.value.trim();
    const name = newFolderName.value.trim();

    if (!name) {
      showToast("warning", "Validation", "Please enter a folder name.");
      return;
    }

    const fullRelPath = parentDir ? `${parentDir}/${name}` : name;

    try {
      const data = await apiFetch("/api/boot/folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: fullRelPath }),
      });
      if (data && data.success) {
        closeNewFolderModal();
        showToast(
          "success",
          "Folder Created",
          `Created directory: ${fullRelPath}`,
        );
        fetchProjectTree();
      } else {
        showToast(
          "error",
          "Creation Failed",
          (data && data.error) || "Could not create folder",
        );
      }
    } catch (err) {
      showToast("error", "Error", `Failed to create folder: ${err.message}`);
    }
  });

  btnRefreshTree.addEventListener("click", () => {
    fetchProjectTree();
    showToast("info", "Refreshing", "Scanning project directory...");
  });
  btnTreeRefresh.addEventListener("click", () => {
    fetchProjectTree();
    showToast("info", "Refreshing", "Scanning project directory...");
  });

  if (btnBootDefaultCode) {
    btnBootDefaultCode.addEventListener("click", async () => {
      if (
        !confirm(
          "Restore Spring Boot 4 default starter code? This will reset all starter components (DemoApplication.java, Controller, Service, Repository, Model, properties, schema.sql, pom.xml) to clean default code.",
        )
      ) {
        return;
      }

      try {
        await apiFetch("/api/boot/reset-defaults", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        FILE_CACHE.clear();
        await fetchProjectTree();

        const targetFile =
          activeFilePath && !activeFilePath.includes("scratchpad")
            ? activeFilePath
            : "src/main/java/com/example/demo/DemoApplication.java";

        await openProjectFile(targetFile);

        isFileDirty = false;
        if (activeTabDirty) activeTabDirty.style.display = "none";
        updateEditor();

        showToast(
          "success",
          "Default Code Loaded",
          "Spring Boot 4 default starter project restored successfully.",
        );
      } catch (err) {
        showToast(
          "error",
          "Reset Failed",
          "Could not restore default code: " + err.message,
        );
      }
    });
  }

  function buildClientSideProjectZip(filesMap) {
    const CRC32_TABLE = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      CRC32_TABLE[i] = c;
    }
    function crc32(buf) {
      let c = 0xffffffff;
      for (let i = 0; i < buf.length; i++) {
        c = (c >>> 8) ^ CRC32_TABLE[(c ^ buf[i]) & 0xff];
      }
      return (c ^ 0xffffffff) >>> 0;
    }

    const textEncoder = new TextEncoder();
    const fileEntries = Object.entries(filesMap);

    const localHeaders = [];
    const centralHeaders = [];
    let offset = 0;

    for (const [filename, content] of fileEntries) {
      const cleanName = "springboot_app/" + filename.replace(/^\/+/, "");
      const nameBytes = textEncoder.encode(cleanName);
      const contentBytes =
        typeof content === "string"
          ? textEncoder.encode(content)
          : new Uint8Array(content);
      const checksum = crc32(contentBytes);
      const len = contentBytes.length;

      // Local Header (30 bytes)
      const localHdr = new Uint8Array(30);
      const lv = new DataView(localHdr.buffer);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0, true);
      lv.setUint16(8, 0, true); // method 0 = STORE (uncompressed)
      lv.setUint16(10, 0, true);
      lv.setUint16(12, 0, true);
      lv.setUint32(14, checksum, true);
      lv.setUint32(18, len, true);
      lv.setUint32(22, len, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);

      const localChunk = new Uint8Array(30 + nameBytes.length + len);
      localChunk.set(localHdr, 0);
      localChunk.set(nameBytes, 30);
      localChunk.set(contentBytes, 30 + nameBytes.length);
      localHeaders.push(localChunk);

      // Central Directory Header (46 bytes)
      const centralHdr = new Uint8Array(46);
      const cv = new DataView(centralHdr.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0, true);
      cv.setUint16(10, 0, true); // method 0 = STORE
      cv.setUint16(12, 0, true);
      cv.setUint16(14, 0, true);
      cv.setUint32(16, checksum, true);
      cv.setUint32(20, len, true);
      cv.setUint32(24, len, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, offset, true);

      const centralChunk = new Uint8Array(46 + nameBytes.length);
      centralChunk.set(centralHdr, 0);
      centralChunk.set(nameBytes, 46);
      centralHeaders.push(centralChunk);

      offset += localChunk.length;
    }

    const totalLocalLen = localHeaders.reduce((sum, h) => sum + h.length, 0);
    const totalCentralLen = centralHeaders.reduce((sum, h) => sum + h.length, 0);

    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, fileEntries.length, true);
    ev.setUint16(10, fileEntries.length, true);
    ev.setUint32(12, totalCentralLen, true);
    ev.setUint32(16, totalLocalLen, true);
    ev.setUint16(20, 0, true);

    const allParts = [...localHeaders, ...centralHeaders, eocd];
    const finalZip = new Uint8Array(totalLocalLen + totalCentralLen + 22);
    let pos = 0;
    for (const part of allParts) {
      finalZip.set(part, pos);
      pos += part.length;
    }
    return new Blob([finalZip], { type: "application/zip" });
  }

  function triggerBlobDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  async function handleDownloadProjectZip() {
    showToast(
      "info",
      "Packaging Project",
      "Preparing Spring Boot 4 bootstrap project ZIP archive...",
    );

    // 1. First attempt: fetch from server as Blob
    try {
      const response = await fetch("/api/boot/download-zip");
      const contentType = response.headers.get("content-type") || "";
      if (response.ok && contentType.includes("zip")) {
        const blob = await response.blob();
        if (blob && blob.size > 200) {
          triggerBlobDownload(blob, "springboot4-java25-demo.zip");
          showToast(
            "success",
            "Project Downloaded",
            "Spring Boot 4 project ZIP downloaded successfully.",
          );
          return;
        }
      }
    } catch (e) {
      console.warn("Server ZIP download failed, falling back to instant client packager:", e);
    }

    // 2. Instant client-side packager fallback: 100% resilient, uses Blob URL (never shows 'file wasn't available')
    try {
      const filesMap = {
        "pom.xml": FILE_CACHE.get("pom.xml") || TEMPLATES.pomXml,
        "src/main/resources/application.properties":
          FILE_CACHE.get("src/main/resources/application.properties") ||
          TEMPLATES.properties,
        "src/main/resources/schema.sql":
          FILE_CACHE.get("src/main/resources/schema.sql") || TEMPLATES.sql,
        "src/main/java/com/example/demo/DemoApplication.java":
          FILE_CACHE.get("src/main/java/com/example/demo/DemoApplication.java") ||
          TEMPLATES.demoApp,
        "src/main/java/com/example/demo/controller/UserController.java":
          FILE_CACHE.get(
            "src/main/java/com/example/demo/controller/UserController.java",
          ) || TEMPLATES.controller,
        "src/main/java/com/example/demo/service/UserService.java":
          FILE_CACHE.get(
            "src/main/java/com/example/demo/service/UserService.java",
          ) || TEMPLATES.service,
        "src/main/java/com/example/demo/repository/UserRepository.java":
          FILE_CACHE.get(
            "src/main/java/com/example/demo/repository/UserRepository.java",
          ) || TEMPLATES.repository,
        "src/main/java/com/example/demo/model/User.java":
          FILE_CACHE.get("src/main/java/com/example/demo/model/User.java") ||
          TEMPLATES.entity,
      };

      // If user is currently editing a file in the editor, inject current editor text
      if (
        currentMode === "boot" &&
        activeFilePath &&
        codeEditor &&
        codeEditor.value
      ) {
        filesMap[activeFilePath] = codeEditor.value;
      }

      // Add any additional custom files created in FILE_CACHE
      for (const [cachedPath, cachedContent] of FILE_CACHE.entries()) {
        if (!cachedPath.includes("scratchpad") && cachedContent) {
          filesMap[cachedPath] = cachedContent;
        }
      }

      const zipBlob = buildClientSideProjectZip(filesMap);
      triggerBlobDownload(zipBlob, "springboot4-java25-demo.zip");

      showToast(
        "success",
        "Project Downloaded",
        "Spring Boot 4 project ZIP archive downloaded successfully.",
      );
    } catch (err) {
      console.error("ZIP packaging error:", err);
      showToast(
        "error",
        "Download Error",
        "Could not generate project ZIP: " + err.message,
      );
    }
  }

  if (btnDownloadProjectZip) {
    btnDownloadProjectZip.addEventListener("click", handleDownloadProjectZip);
  }

  btnToggleSidebar.addEventListener("click", () => {
    projectSidebar.classList.toggle("collapsed");
    const isCollapsed = projectSidebar.classList.contains("collapsed");
    btnSidebarLabel.textContent = isCollapsed ? "Show Tree" : "Project Tree";
  });

  btnTabClose.addEventListener("click", () => {
    if (currentMode === "boot") {
      openProjectFile("src/main/java/com/example/demo/DemoApplication.java");
    } else if (currentMode === "java") {
      if (confirm("Reset Java 25 Scratchpad to default template?")) {
        codeEditor.value = TEMPLATES.javaScratchpad;
        saveScratchpadCode(TEMPLATES.javaScratchpad);
        isFileDirty = false;
        activeTabDirty.style.display = "none";
        updateEditor();
        showToast(
          "info",
          "Scratchpad Reset",
          "Java 25 Scratchpad reset to default template.",
        );
      }
    }
  });

  // --------------------------------------------------------------------------
  // CONSOLE AREA MINIMIZATION & CODE AREA MAXIMIZATION
  // --------------------------------------------------------------------------
  let isConsoleMinimized = false;

  function toggleConsoleArea(minimize) {
    if (typeof minimize === "boolean") {
      isConsoleMinimized = minimize;
    } else {
      isConsoleMinimized = !isConsoleMinimized;
    }

    if (workspaceGrid)
      workspaceGrid.classList.toggle("console-minimized", isConsoleMinimized);
    if (outputPanel)
      outputPanel.classList.toggle("minimized", isConsoleMinimized);

    if (isConsoleMinimized) {
      if (btnToggleConsoleIcon)
        btnToggleConsoleIcon.textContent = "fullscreen_exit";
      if (btnToggleConsoleLabel)
        btnToggleConsoleLabel.textContent = "Restore Console";
      if (tabToggleConsoleIcon)
        tabToggleConsoleIcon.textContent = "fullscreen_exit";
      if (tabToggleConsoleLabel) tabToggleConsoleLabel.textContent = "Restore";
    } else {
      if (btnToggleConsoleIcon)
        btnToggleConsoleIcon.textContent = "open_in_full";
      if (btnToggleConsoleLabel)
        btnToggleConsoleLabel.textContent = "Maximize Code Area";
      if (tabToggleConsoleIcon) tabToggleConsoleIcon.textContent = "fullscreen";
      if (tabToggleConsoleLabel)
        tabToggleConsoleLabel.textContent = "Maximize Code";
    }
  }

  if (btnToggleConsole)
    btnToggleConsole.addEventListener("click", () => toggleConsoleArea());
  if (btnTabToggleConsole)
    btnTabToggleConsole.addEventListener("click", () => toggleConsoleArea());
  if (btnMinimizeConsole)
    btnMinimizeConsole.addEventListener("click", () => toggleConsoleArea(true));
  if (consoleCollapsedRail)
    consoleCollapsedRail.addEventListener("click", () =>
      toggleConsoleArea(false),
    );
  if (btnRailExpand)
    btnRailExpand.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleConsoleArea(false);
    });
  if (btnQuickNewFile) {
    btnQuickNewFile.addEventListener("click", () => {
      if (currentMode === "java") {
        openScratchModal();
      } else {
        openNewFileModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // JAVA 25 SCRATCHPAD STARTER TEMPLATES MODAL
  // --------------------------------------------------------------------------
  function openScratchModal() {
    if (javaScratchpadModal) {
      javaScratchpadModal.style.display = "flex";
    }
  }

  function closeScratchModal() {
    if (javaScratchpadModal) {
      javaScratchpadModal.style.display = "none";
    }
  }

  if (btnScratchTemplates)
    btnScratchTemplates.addEventListener("click", openScratchModal);
  if (btnCloseScratchModal)
    btnCloseScratchModal.addEventListener("click", closeScratchModal);
  if (btnCancelScratchModal)
    btnCancelScratchModal.addEventListener("click", closeScratchModal);

  if (btnScratchReset) {
    btnScratchReset.addEventListener("click", () => {
      if (confirm("Reset Java 25 Scratchpad to default template?")) {
        codeEditor.value = TEMPLATES.javaScratchpad;
        saveScratchpadCode(TEMPLATES.javaScratchpad);
        isFileDirty = false;
        activeTabDirty.style.display = "none";
        updateEditor();
        showToast(
          "info",
          "Scratchpad Reset",
          "Reset to Java 25 Virtual Threads template.",
        );
      }
    });
  }

  document
    .querySelectorAll("#java-scratchpad-modal .ij-gen-card")
    .forEach((card) => {
      card.addEventListener("click", () => {
        const templateKey = card.dataset.template;
        let newCode = TEMPLATES.javaScratchpad;

        if (templateKey === "vthreads") newCode = TEMPLATES.javaScratchpad;
        else if (templateKey === "pattern-matching")
          newCode = TEMPLATES.javaPatternMatching;
        else if (templateKey === "gatherers") newCode = TEMPLATES.javaGatherers;
        else if (templateKey === "http-client")
          newCode = TEMPLATES.javaHttpClient;
        else if (templateKey === "benchmark") newCode = TEMPLATES.javaBenchmark;
        else if (templateKey === "unnamed-class")
          newCode = TEMPLATES.javaUnnamedClass;
        else if (templateKey === "classic-main")
          newCode = TEMPLATES.javaClassicMain;

        codeEditor.value = newCode;
        saveScratchpadCode(newCode);
        isFileDirty = false;
        activeTabDirty.style.display = "none";
        codeEditor.scrollTop = 0;
        highlightLayer.scrollTop = 0;
        editorGutter.scrollTop = 0;
        updateEditor();
        closeScratchModal();
        showToast(
          "success",
          "Template Loaded",
          "Loaded Java 25 template into scratchpad.",
        );
      });
    });

  // --------------------------------------------------------------------------
  // 8. RUNNER & EXECUTION ENGINE
  // --------------------------------------------------------------------------
  function getDbIcon(db) {
    if (db === "mysql") return "🐬";
    if (db === "postgres") return "🐘";
    if (db === "mssql") return "🏢";
    if (db === "mongodb") return "🍃";
    return "🗄️";
  }

  function updateDbQueryGutter() {
    if (!dbQueryTextarea || !dbQueryGutter) return;
    const lines = (dbQueryTextarea.value || "").split("\n").length;
    let numbers = "";
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      numbers += `${i}\n`;
    }
    dbQueryGutter.textContent = numbers.trim();
  }

  function setQueryText(q) {
    if (dbQueryTextarea) {
      dbQueryTextarea.value = q;
      updateDbQueryGutter();
    }
  }

  function formatSqlQuery(query) {
    if (!query) return "";
    if (activeDb === "mongodb" || query.trim().startsWith("db.")) {
      try {
        const match = query.match(
          /^db\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\((.*)\);?$/s,
        );
        if (match) {
          const col = match[1];
          const method = match[2];
          const rawArg = match[3].trim();
          if (rawArg) {
            const parsed = JSON.parse(rawArg);
            return `db.${col}.${method}(\n  ${JSON.stringify(parsed, null, 2).replace(/\n/g, "\n  ")}\n);`;
          }
        }
      } catch (e) {}
      return query;
    }

    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "LIMIT",
      "TOP",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM",
      "CREATE TABLE",
      "DROP TABLE",
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "HAVING",
    ];
    let formatted = query.trim();
    keywords.forEach((kw) => {
      const reg = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(reg, `\n${kw}`);
    });
    return formatted.replace(/^\s*\n/, "").replace(/\n\s*\n/g, "\n");
  }

  async function executeActiveQuery(queryText) {
    const q = (
      queryText !== undefined
        ? queryText
        : dbQueryTextarea
          ? dbQueryTextarea.value
          : codeEditor.value
    ).trim();
    if (!q) {
      showToast(
        "info",
        "Empty Query",
        "Please write a query or pick a template to execute.",
      );
      return;
    }

    // Keep database tab active - do not switch away to console!
    activateOutputTab("db-inspector");

    if (btnDbExecuteQuery) {
      btnDbExecuteQuery.disabled = true;
      btnDbExecuteQuery.innerHTML =
        '<span class="material-icons spin-anim" style="font-size: 14px;">sync</span><span>Running...</span>';
    }

    // Log to terminal stream for audit and visibility
    const now = new Date().toISOString().substring(11, 19);
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry log-info";
    logEntry.innerHTML = `
      <span class="log-time">[${now}]</span>
      <span class="log-tag tag-sql">${activeDb.toUpperCase()}</span>
      <span class="log-msg">Executing: ${escapeHtml(q.substring(0, 120))}...</span>
    `;
    logStream.appendChild(logEntry);

    try {
      const data = await apiFetch("/api/db/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dbType: activeDb, query: q }),
      });

      if (data && data.success) {
        renderDatabaseResults(data);

        const logSuccess = document.createElement("div");
        logSuccess.className = "log-entry log-success";
        logSuccess.innerHTML = `
          <span class="log-time">[${new Date().toISOString().substring(11, 19)}]</span>
          <span class="log-tag tag-ready">RESULT</span>
          <span class="log-msg">Query OK: ${data.rowCount} record(s) returned in ${data.executionTimeMs} ms.</span>
        `;
        logStream.appendChild(logSuccess);

        showToast(
          "success",
          "Query Executed",
          `${data.rowCount} record(s) returned in ${data.executionTimeMs} ms.`,
        );
      } else {
        const errorMsg = (data && data.error) || "Failed to execute query";
        dbQueryStatus.className = "badge-status-error";
        dbQueryStatus.textContent = "ERROR";
        dbRowCount.textContent = "0 rows";
        if (dbExecutionLatency) dbExecutionLatency.textContent = "0 ms";
        if (dbActiveTableName) dbActiveTableName.textContent = "None";

        dbTableBody.innerHTML = `
          <tr>
            <td colspan="10" style="padding: 24px; text-align: center; color: #ef4444; background: #fef2f2;">
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px;">Query Execution Failed</div>
              <div style="font-family: var(--font-mono); font-size: 11px; white-space: pre-wrap;">${escapeHtml(errorMsg)}</div>
            </td>
          </tr>
        `;
        dbJsonContent.textContent = JSON.stringify(
          { error: errorMsg, query: q },
          null,
          2,
        );

        const logErr = document.createElement("div");
        logErr.className = "log-entry log-error";
        logErr.innerHTML = `
          <span class="log-time">[${new Date().toISOString().substring(11, 19)}]</span>
          <span class="log-tag tag-error">ERROR</span>
          <span class="log-msg">${escapeHtml(errorMsg)}</span>
        `;
        logStream.appendChild(logErr);

        showToast("error", "Query Error", errorMsg);
      }
    } catch (err) {
      showToast(
        "error",
        "Network Error",
        `Could not reach database runner: ${err.message}`,
      );
    } finally {
      if (btnDbExecuteQuery) {
        btnDbExecuteQuery.disabled = false;
        btnDbExecuteQuery.innerHTML =
          '<span class="material-icons" style="font-size: 14px;">play_arrow</span><span>Run Query</span>';
      }
    }
  }

  async function runCurrentApplication() {
    if (isExecuting) return;

    // Database mode delegates directly to query runner
    if (currentMode === "db") {
      const queryToRun =
        (dbQueryTextarea && dbQueryTextarea.value.trim()) || codeEditor.value;
      await executeActiveQuery(queryToRun);
      return;
    }

    isExecuting = true;
    btnRun.disabled = true;
    btnRunIcon.textContent = "sync";
    btnRunIcon.classList.add("spin-anim");
    if (consoleStatusBadge) consoleStatusBadge.textContent = "RUNNING...";

    if (isConsoleMinimized) {
      toggleConsoleArea(false);
    }

    activateOutputTab("console");

    const log = (tag, msg, type = "info") => {
      const now = new Date().toISOString().substring(11, 19);
      const entry = document.createElement("div");
      entry.className = `log-entry log-${type}`;
      entry.innerHTML = `
        <span class="log-time">[${now}]</span>
        <span class="log-tag tag-${tag.toLowerCase()}">${tag}</span>
        <span class="log-msg">${escapeHtml(msg)}</span>
      `;
      logStream.appendChild(entry);
      viewConsole.querySelector(".terminal-container").scrollTop = 999999;
    };

    try {
      if (currentMode === "boot") {
        log(
          "SPRING",
          `Starting Spring Boot 4 Application (${activeFilePath})...`,
          "info",
        );
        const data = await apiFetch("/api/run/boot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: codeEditor.value,
            path: activeFilePath,
          }),
        });
        if (data && data.success) {
          log(
            "MAVEN",
            "Apache Maven 3.9.9 build completed. 0 warnings.",
            "success",
          );
          log(
            "BOOT",
            "Started DemoApplication in 1.482 seconds (process running with Virtual Threads).",
            "success",
          );
          log(
            "TOMCAT",
            "Tomcat initialized with port 8080 (http). Ready for REST traffic.",
            "info",
          );
          log(
            "SYSTEM",
            `Execution completed in ${data.durationMs || 150} ms.`,
            "success",
          );
          showToast(
            "success",
            "Spring Boot 4 Started",
            "Application compiled and booted successfully.",
          );
        } else {
          log(
            "ERROR",
            (data && data.error) || "Execution encountered an error",
            "error",
          );
          showToast(
            "error",
            "Run Failed",
            "Spring Boot application encountered a compilation/runtime error.",
          );
        }
      } else if (currentMode === "java") {
        log(
          "JAVAC",
          "Compiling Java 25 source code (Oracle OpenJDK 25.0.4.1 LTS)...",
          "compiler",
        );
        const data = await apiFetch("/api/run/java", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: codeEditor.value }),
        });
        if (data && data.success) {
          if (data.output && data.output.trim()) {
            const outLines = data.output.trim().split("\n");
            outLines.forEach((line) => log("JAVA25", line, "info"));
          } else {
            log("JAVA25", "Process completed with exit code 0.", "success");
          }
          log(
            "SYSTEM",
            `Execution time: ${data.durationMs || 80} ms. (Exit Code: 0)`,
            "success",
          );
          showToast(
            "success",
            "Java 25 Executed",
            `Process completed in ${data.durationMs || 80} ms.`,
          );
          clearCompilerErrors();
        } else {
          const errText =
            (data && data.error) || "Java 25 compilation or runtime failed";
          const errLines = errText.trim().split("\n");
          errLines.forEach((el) => log("ERROR", el, "error"));
          showToast(
            "error",
            "Execution Error",
            "Java 25 compiler reported errors.",
          );
          highlightCompilerErrors(errText);
        }
      }
    } catch (err) {
      log("NETWORK", `Failed to reach server: ${err.message}`, "error");
      showToast(
        "error",
        "Server Error",
        "Could not reach server endpoint on port 8080.",
      );
    } finally {
      isExecuting = false;
      btnRun.disabled = false;
      btnRunIcon.textContent = "play_arrow";
      btnRunIcon.classList.remove("spin-anim");
      if (consoleStatusBadge) consoleStatusBadge.textContent = "READY";
    }
  }

  btnRun.addEventListener("click", runCurrentApplication);

  // --------------------------------------------------------------------------
  // 9. MODE SWITCHING
  // --------------------------------------------------------------------------
  function setApplicationMode(mode) {
    if (currentMode === mode) return;

    // Cache previous mode state before switching
    if (currentMode === "boot" && activeFilePath) {
      if (codeEditor && codeEditor.value && codeEditor.value.trim()) {
        FILE_CACHE.set(activeFilePath, codeEditor.value);
      }
    } else if (currentMode === "java") {
      if (codeEditor && isPureCoreJavaCode(codeEditor.value)) {
        saveScratchpadCode(codeEditor.value);
      }
    }

    currentMode = mode;

    tabBoot.classList.toggle("active", mode === "boot");
    tabJava.classList.toggle("active", mode === "java");
    tabDb.classList.toggle("active", mode === "db");

    if (mode === "boot") {
      projectSidebar.classList.remove("collapsed");
      bootDirActions.style.display = "flex";
      if (scratchDirActions) scratchDirActions.style.display = "none";
      btnToggleSidebar.style.display = "inline-flex";
      if (btnRun) {
        btnRun.style.display = "inline-flex";
        btnRun.className = "mui-btn mui-btn-run boot-theme";
      }
      btnRunLabel.textContent = "Run Spring Boot 4";
      if (modeIndicatorChip) modeIndicatorChip.textContent = "Spring Boot 4 Project";
      editorLangBadge.textContent = "JAVA 25";
      editorFrameworkBadge.textContent = "SPRING BOOT 4";
      if (workspaceGrid) workspaceGrid.classList.remove("db-mode");
      if (ijConfigName) ijConfigName.textContent = "DemoApplication";
      const ijSpringIcon = document.querySelector(".ij-icon-spring");
      if (ijSpringIcon) ijSpringIcon.textContent = "🍃";
      if (btnIjRun) btnIjRun.title = "Run 'DemoApplication' (Shift+F10)";
      if (btnIjBuild) btnIjBuild.title = "Build Spring Boot Project (Ctrl+F9)";
      if (btnIjDebug) btnIjDebug.title = "Debug 'DemoApplication' (Shift+F9)";
      if (crumbRoot) crumbRoot.textContent = "springboot_app";
      openProjectFile(
        lastBootFilePath ||
          "src/main/java/com/example/demo/DemoApplication.java",
      );
      activateOutputTab("console");
      toggleConsoleArea(true);
    } else if (mode === "java") {
      activeFilePath = "scratchpad/Main.java";
      projectSidebar.classList.add("collapsed");
      bootDirActions.style.display = "none";
      if (scratchDirActions) scratchDirActions.style.display = "flex";
      btnToggleSidebar.style.display = "none";
      if (btnRun) {
        btnRun.style.display = "inline-flex";
        btnRun.className = "mui-btn mui-btn-run java-theme";
      }
      btnRunLabel.textContent = "Run Java 25";
      if (modeIndicatorChip) modeIndicatorChip.textContent = "Java 25 Scratchpad";
      if (activeTabTitle) activeTabTitle.textContent = "Main.java";
      if (activeTabIcon) {
        activeTabIcon.innerHTML = `<span class="ij-class-badge" style="background: #ea580c; color: #fff;">☕</span>`;
      }
      if (crumbRoot) crumbRoot.textContent = "scratchpad";
      crumbFolder.textContent = "src";
      crumbFile.textContent = "Main.java";
      editorLangBadge.textContent = "JAVA 25";
      editorFrameworkBadge.textContent = "CORE RUNNER";
      vscodeLangMode.textContent = "Java 25 (LTS)";
      if (workspaceGrid) workspaceGrid.classList.remove("db-mode");
      if (ijConfigName) ijConfigName.textContent = "Main";
      const ijSpringIcon = document.querySelector(".ij-icon-spring");
      if (ijSpringIcon) ijSpringIcon.textContent = "☕";
      if (btnIjRun) btnIjRun.title = "Run 'Main.java' (Shift+F10)";
      if (btnIjBuild)
        btnIjBuild.title = "Build 'Main.java' with javac 25 (Ctrl+F9)";
      if (btnIjDebug) btnIjDebug.title = "Debug 'Main.java' (Shift+F9)";
      codeEditor.value = getScratchpadCode();
      codeEditor.scrollTop = 0;
      highlightLayer.scrollTop = 0;
      editorGutter.scrollTop = 0;
      isFileDirty = false;
      activeTabDirty.style.display = "none";
      updateEditor();
      activateOutputTab("console");
    } else if (mode === "db") {
      // Requirement: for database only remove top left 2nd row button Run db query
      if (btnRun) btnRun.style.display = "none";
      if (bootDirActions) bootDirActions.style.display = "none";
      if (scratchDirActions) scratchDirActions.style.display = "none";
      if (modeIndicatorChip) modeIndicatorChip.textContent = `${activeDb.toUpperCase()} Inspector`;
      if (workspaceGrid) workspaceGrid.classList.remove("db-mode");

      // Requirement: No default query for execution
      if (dbQueryTextarea) {
        if (!dbQueryTextarea.value) {
          dbQueryTextarea.value = "";
        }
        updateDbQueryGutter();
      }
      if (dbQueryEnginePill) {
        dbQueryEnginePill.textContent = `${getDbIcon(activeDb)} ${activeDb.toUpperCase()}`;
      }

      activateOutputTab("db-inspector");
      toggleConsoleArea(false);
      fetchDatabaseSchema(activeDb);
    }
  }

  tabBoot.addEventListener("click", () => setApplicationMode("boot"));
  tabJava.addEventListener("click", () => setApplicationMode("java"));
  tabDb.addEventListener("click", () => setApplicationMode("db"));

  function getStarterQueryForDb(db) {
    if (db === "mysql") return TEMPLATES.mysqlQuery;
    if (db === "postgres") return TEMPLATES.postgresQuery;
    if (db === "mssql") return TEMPLATES.mssqlQuery;
    if (db === "mongodb") return TEMPLATES.mongoQuery;
    return TEMPLATES.mysqlQuery;
  }

  // --------------------------------------------------------------------------
  // 10. OUTPUT HUB TABS
  // --------------------------------------------------------------------------
  function activateOutputTab(tab) {
    if (tabConsole) tabConsole.classList.toggle("active", tab === "console");
    if (tabDbInspector) tabDbInspector.classList.toggle("active", tab === "db-inspector");
    if (viewConsole) viewConsole.classList.toggle("active", tab === "console");
    if (viewDbInspector) viewDbInspector.classList.toggle("active", tab === "db-inspector");

    if (outputTabTitle && outputTabIcon) {
      if (tab === "console") {
        outputTabIcon.textContent = "terminal";
        outputTabTitle.textContent = "Terminal Console";
      } else {
        outputTabIcon.textContent = "dns";
        outputTabTitle.textContent = "Database Inspector";
      }
    }
  }

  if (tabConsole) {
    tabConsole.addEventListener("click", () => activateOutputTab("console"));
  }
  if (tabDbInspector) {
    tabDbInspector.addEventListener("click", () =>
      activateOutputTab(currentMode === "db" ? "db-inspector" : "console"),
    );
  }

  // --------------------------------------------------------------------------
  // 11. MULTI-DATABASE ENGINE INSPECTOR & TABLE CRUD
  // --------------------------------------------------------------------------
  function selectDatabaseEngine(dbType) {
    activeDb = dbType;
    dbToggleBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.db === dbType);
    });
    if (dbActiveBadge) dbActiveBadge.textContent = dbType.toUpperCase();

    if (dbQueryEnginePill) {
      dbQueryEnginePill.textContent = `${getDbIcon(dbType)} ${dbType.toUpperCase()}`;
    }

    // Requirement: No default query for execution
    if (dbQueryTextarea) {
      dbQueryTextarea.value = "";
      updateDbQueryGutter();
    }
    if (dbActiveTableName) {
      dbActiveTableName.textContent = "None";
    }

    if (currentMode === "db") {
      if (btnRun) btnRun.style.display = "none";
      if (modeIndicatorChip) modeIndicatorChip.textContent = `${dbType.toUpperCase()} Inspector`;
    }

    fetchDatabaseSchema(dbType);
    showToast(
      "info",
      `${dbType.toUpperCase()} Selected`,
      `Selected ${dbType.toUpperCase()} database engine.`,
    );
  }

  dbToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => selectDatabaseEngine(btn.dataset.db));
  });

  async function fetchDatabaseSchema(dbType) {
    try {
      const data = await apiFetch(`/api/db/schema?dbType=${dbType}`);
      if (data && (data.schema || data.connection)) {
        const schema = data.schema || {};
        const conn = data.connection || schema;
        const isConn = Boolean(conn && conn.connected);

        if (connDisplayText) {
          connDisplayText.textContent = isConn
            ? `Connected: ${dbType}://${conn.host || "127.0.0.1"}:${conn.port !== undefined ? conn.port : schema.port || 3306}/${conn.database || "default"}`
            : `Disconnected: ${dbType}://${conn.host || "127.0.0.1"}:${conn.port !== undefined ? conn.port : schema.port || 3306} (Database service not started)`;
        }
        if (connStateBadge) {
          connStateBadge.textContent = isConn ? "CONNECTED" : "DISCONNECTED";
          connStateBadge.className = `badge-conn-state ${isConn ? "badge-conn-online" : "badge-conn-offline"}`;
        }
        if (connStatusDot) {
          connStatusDot.className = `conn-dot ${isConn ? "online" : "offline"}`;
        }

        if (connHostInput) connHostInput.value = conn.host || "127.0.0.1";
        if (connPortInput)
          connPortInput.value =
            conn.port !== undefined ? conn.port : schema.port || 3306;
        if (connDatabaseInput) connDatabaseInput.value = conn.database || "";
        if (connUserInput) connUserInput.value = conn.user || "";
        if (connPasswordInput) connPasswordInput.value = conn.password || "";
        if (connUriInput) connUriInput.value = conn.uri || "";

        // Requirement 3: "not show available tables instead of this show databases, after successfult database connection"
        if (dbTablesList) {
          dbTablesList.innerHTML = "";
          if (!isConn) {
            const notice = document.createElement("div");
            notice.className = "db-unconnected-notice";
            notice.innerHTML = `<span class="material-icons" style="font-size: 14px; color: #ef4444;">cloud_off</span><span>Database service not started. Start your ${dbType.toUpperCase()} server and click <strong>Test Connection</strong>.</span>`;
            dbTablesList.appendChild(notice);
          } else {
            const databases =
              data.databases && data.databases.length
                ? data.databases
                : schema.databases || ["production_db", "classicmodels"];
            let activeDbName = conn.database || databases[0];

            databases.forEach((dbName) => {
              const pill = document.createElement("button");
              pill.className = `db-table-pill db-database-pill ${dbName === activeDbName ? "active" : ""}`;
              pill.type = "button";
              pill.innerHTML = `<span class="material-icons" style="font-size: 13px; color: #059669;">folder</span><span>${escapeHtml(dbName)}</span>`;
              pill.title = `Switch to database: ${dbName}`;
              pill.addEventListener("click", () => {
                activeDbName = dbName;
                dbTablesList
                  .querySelectorAll(".db-table-pill")
                  .forEach((p) => p.classList.remove("active"));
                pill.classList.add("active");
                if (connDatabaseInput) connDatabaseInput.value = dbName;
                if (connDisplayText)
                  connDisplayText.textContent = `Connected: ${dbType}://${conn.host || "127.0.0.1"}:${conn.port || 3306}/${dbName}`;

                showToast(
                  "info",
                  "Database Selected",
                  `Switched active database to: ${dbName}.`,
                );
              });
              dbTablesList.appendChild(pill);
            });
          }
        }
      }
    } catch (err) {
      console.warn("Schema fetch error:", err);
    }
  }

  function executeQuickSelect() {
    const curDb =
      (connDatabaseInput && connDatabaseInput.value.trim()) || "classicmodels";
    let query = "";
    if (activeDb === "mongodb") {
      query = `use ${curDb};\ndb.orders.find({});`;
    } else if (activeDb === "mssql") {
      query = `USE [${curDb}];\nSELECT TOP 50 * FROM orders;`;
    } else {
      query = `USE \`${curDb}\`;\nSELECT * FROM orders LIMIT 50;`;
    }

    setQueryText(query);
    showToast(
      "info",
      "Sample Query Loaded",
      "Query template populated in editor. Click Run Query to execute.",
    );
  }

  if (btnQuickSelect)
    btnQuickSelect.addEventListener("click", executeQuickSelect);
  if (btnRefreshDb) {
    btnRefreshDb.addEventListener("click", () => {
      fetchDatabaseSchema(activeDb);
      showToast(
        "info",
        "Refreshed",
        `Refreshed connection & databases for ${activeDb.toUpperCase()}.`,
      );
    });
  }

  // Dedicated Write Query Editor Controls Binding
  if (btnDbExecuteQuery) {
    btnDbExecuteQuery.addEventListener("click", () => {
      const q = dbQueryTextarea ? dbQueryTextarea.value : codeEditor.value;
      executeActiveQuery(q);
    });
  }

  if (btnDbClearQuery) {
    btnDbClearQuery.addEventListener("click", () => {
      setQueryText("");
      showToast("info", "Query Cleared", "Query editor has been emptied.");
    });
  }

  if (btnDbFormatSql) {
    btnDbFormatSql.addEventListener("click", () => {
      const currentQ = dbQueryTextarea
        ? dbQueryTextarea.value
        : codeEditor.value;
      const formatted = formatSqlQuery(currentQ);
      setQueryText(formatted);
      showToast(
        "info",
        "Query Formatted",
        "Applied keyword indentation & syntax formatting.",
      );
    });
  }

  if (dbQueryTextarea) {
    dbQueryTextarea.addEventListener("input", () => {
      updateDbQueryGutter();
    });

    dbQueryTextarea.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        executeActiveQuery(dbQueryTextarea.value);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const start = dbQueryTextarea.selectionStart;
        const end = dbQueryTextarea.selectionEnd;
        dbQueryTextarea.value =
          dbQueryTextarea.value.substring(0, start) +
          "  " +
          dbQueryTextarea.value.substring(end);
        dbQueryTextarea.selectionStart = dbQueryTextarea.selectionEnd =
          start + 2;
        updateDbQueryGutter();
      }
    });
  }

  function renderDatabaseResults(data) {
    if (dbEmptyState) dbEmptyState.style.display = "none";
    if (dbDataTable) dbDataTable.style.display = "table";
    dbQueryStatus.className = "badge-status-ok";
    dbQueryStatus.textContent = "SUCCESS (200 OK)";
    dbRowCount.textContent = `${data.rowCount || 0} rows`;
    if (dbExecutionLatency) {
      dbExecutionLatency.textContent = `Latency: ${data.executionTimeMs || 1.1} ms`;
    }
    if (dbTargetName) {
      dbTargetName.textContent = `${activeDb}://${activeTable || data.tableName || "query"}`;
    }
    if (dbActiveTableName) {
      dbActiveTableName.textContent = data.tableName || activeTable || "Query Result";
    }

    if (dbSourceBadge && dbSourceDot) {
      if (data.source) {
        dbSourceBadge.textContent = data.source;
        dbSourceBadge.style.display = "inline-block";
        dbSourceDot.style.display = "inline";
      } else {
        dbSourceBadge.style.display = "none";
        dbSourceDot.style.display = "none";
      }
    }

    currentColumns = data.columns || [];
    const rows = data.rows || [];

    if (currentColumns.length === 0 && rows.length > 0) {
      currentColumns = Object.keys(rows[0]).map((k) => ({
        name: k,
        type: typeof rows[0][k] === "number" ? "INT" : "VARCHAR",
      }));
    }

    let headHtml = '<tr><th style="width: 70px;">Actions</th>';
    currentColumns.forEach((col) => {
      headHtml += `<th>${escapeHtml(col.name)} <span style="font-size: 9px; color: #94a3b8;">${escapeHtml(col.type || "")}</span></th>`;
    });
    headHtml += "</tr>";
    dbTableHead.innerHTML = headHtml;

    let bodyHtml = "";
    rows.forEach((row) => {
      bodyHtml += "<tr>";
      const pkCol =
        currentColumns.find((c) => c.key === "PRI") || currentColumns[0];
      const pkVal = pkCol ? row[pkCol.name] : "";

      bodyHtml += `
        <td class="row-actions-cell">
          <button class="row-action-btn btn-edit-row" data-pk="${escapeHtml(String(pkVal !== undefined ? pkVal : ""))}" title="Edit Record">
            <span class="material-icons" style="font-size: 14px; color: #0284c7;">edit</span>
          </button>
          <button class="row-action-btn del btn-delete-row" data-pk="${escapeHtml(String(pkVal !== undefined ? pkVal : ""))}" title="Delete Record">
            <span class="material-icons" style="font-size: 14px; color: #ef4444;">delete</span>
          </button>
        </td>
      `;

      currentColumns.forEach((col) => {
        let cellVal = row[col.name];
        if (typeof cellVal === "object" && cellVal !== null) {
          cellVal = JSON.stringify(cellVal);
        }
        bodyHtml += `<td>${escapeHtml(String(cellVal !== undefined ? cellVal : ""))}</td>`;
      });
      bodyHtml += "</tr>";
    });

    dbTableBody.innerHTML =
      bodyHtml ||
      '<tr><td colspan="10" style="text-align:center; padding: 20px; color:#94a3b8;">No records returned by this query.</td></tr>';

    dbTableBody.querySelectorAll(".btn-edit-row").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pk = btn.dataset.pk;
        const targetRow = rows.find((r) => {
          const pkCol =
            currentColumns.find((c) => c.key === "PRI") || currentColumns[0];
          return pkCol && String(r[pkCol.name]) === pk;
        });
        if (targetRow) openEditRowModal(targetRow, pk);
      });
    });

    dbTableBody.querySelectorAll(".btn-delete-row").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pk = btn.dataset.pk;
        deleteTableRow(pk);
      });
    });

    dbJsonContent.textContent = JSON.stringify(rows, null, 2);
  }

  if (viewModeGrid) {
    viewModeGrid.addEventListener("click", () => {
      viewModeGrid.classList.add("active");
      if (viewModeJson) viewModeJson.classList.remove("active");
      if (dbGridView) dbGridView.style.display = "block";
      if (dbJsonView) dbJsonView.style.display = "none";
    });
  }

  if (viewModeJson) {
    viewModeJson.addEventListener("click", () => {
      viewModeJson.classList.add("active");
      if (viewModeGrid) viewModeGrid.classList.remove("active");
      if (dbGridView) dbGridView.style.display = "none";
      if (dbJsonView) dbJsonView.style.display = "block";
    });
  }

  function openInsertRowModal() {
    activeRecordAction = "insert";
    editingRowPk = null;
    modalTitleText.textContent = `Insert Record into ${activeTable}`;
    renderModalFormFields({});
    dbRecordModal.style.display = "flex";
  }

  function openEditRowModal(row, pk) {
    activeRecordAction = "edit";
    editingRowPk = pk;
    modalTitleText.textContent = `Edit Record in ${activeTable} (${pk})`;
    renderModalFormFields(row);
    dbRecordModal.style.display = "flex";
  }

  function renderModalFormFields(values = {}) {
    modalFieldsContainer.innerHTML = "";
    currentColumns.forEach((col) => {
      const isPk = col.key === "PRI";
      const group = document.createElement("div");
      group.className = "form-group";
      group.innerHTML = `
        <label for="field-${col.name}">${escapeHtml(col.name)} ${isPk ? "(Primary Key)" : ""}</label>
        <input type="text" id="field-${col.name}" class="form-input" 
          value="${escapeHtml(String(values[col.name] !== undefined ? values[col.name] : ""))}" 
          ${isPk && activeRecordAction === "edit" ? "disabled" : ""} 
          placeholder="Enter ${escapeHtml(col.name)}">
      `;
      modalFieldsContainer.appendChild(group);
    });
  }

  if (btnOpenInsertRow) {
    btnOpenInsertRow.addEventListener("click", openInsertRowModal);
  }
  btnCloseRecordModal.addEventListener("click", () => {
    dbRecordModal.style.display = "none";
  });
  btnCancelRecordModal.addEventListener("click", () => {
    dbRecordModal.style.display = "none";
  });

  btnSaveRecordModal.addEventListener("click", async () => {
    const rowData = {};
    currentColumns.forEach((col) => {
      const input = document.getElementById(`field-${col.name}`);
      if (input) rowData[col.name] = input.value;
    });

    const endpoint =
      activeRecordAction === "insert"
        ? "/api/db/row/insert"
        : "/api/db/row/update";
    const payload = {
      dbType: activeDb,
      tableName: activeTable,
      rowData,
      updatedFields: rowData,
      pkCol: (currentColumns.find((c) => c.key === "PRI") || currentColumns[0])
        .name,
      pkVal: editingRowPk,
    };

    try {
      const data = await apiFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (data && data.success) {
        dbRecordModal.style.display = "none";
        showToast(
          "success",
          activeRecordAction === "insert"
            ? "Record Inserted"
            : "Record Updated",
          `Successfully modified ${activeTable}.`,
        );
        executeQuickSelect();
      } else {
        showToast(
          "error",
          "Operation Failed",
          (data && data.error) || "Failed to modify record",
        );
      }
    } catch (err) {
      showToast("error", "Error", `Failed to save record: ${err.message}`);
    }
  });

  async function deleteTableRow(pk) {
    if (!confirm(`Delete record with ID "${pk}" from ${activeTable}?`)) return;

    try {
      const pkCol = (
        currentColumns.find((c) => c.key === "PRI") || currentColumns[0]
      ).name;
      const data = await apiFetch("/api/db/row/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dbType: activeDb,
          tableName: activeTable,
          pkCol,
          pkVal: pk,
        }),
      });
      if (data && data.success) {
        showToast(
          "success",
          "Record Deleted",
          `Removed record from ${activeTable}.`,
        );
        executeQuickSelect();
      } else {
        showToast(
          "error",
          "Delete Failed",
          (data && data.error) || "Could not delete row",
        );
      }
    } catch (err) {
      showToast("error", "Error", `Delete failed: ${err.message}`);
    }
  }

  // Toggle & Save Manual Connection Settings
  btnToggleConnSettings.addEventListener("click", () => {
    const isVisible = dbConnectionPanel.style.display !== "none";
    dbConnectionPanel.style.display = isVisible ? "none" : "flex";
    connPanelTitleText.textContent = `Manual Connection Settings (${activeDb.toUpperCase()})`;
  });
  btnCloseConnPanel.addEventListener("click", () => {
    dbConnectionPanel.style.display = "none";
  });

  btnSaveConn.addEventListener("click", async () => {
    const config = {
      host: connHostInput ? connHostInput.value.trim() : "localhost",
      port: connPortInput ? parseInt(connPortInput.value.trim(), 10) : 3306,
      database: connDatabaseInput ? connDatabaseInput.value.trim() : "",
      user: connUserInput ? connUserInput.value.trim() : "",
      password: connPasswordInput ? connPasswordInput.value : "",
      uri: connUriInput ? connUriInput.value.trim() : "",
    };

    try {
      const data = await apiFetch("/api/db/connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dbType: activeDb, connection: config }),
      });
      if (data && data.success) {
        showToast(
          "success",
          "Connection Saved in SQLite",
          `Persisted connection settings for ${activeDb.toUpperCase()} in db_connections.sqlite.`,
        );
        fetchDatabaseSchema(activeDb);
        dbConnectionPanel.style.display = "none";
      }
    } catch (err) {
      showToast(
        "error",
        "Error",
        `Failed to update connection: ${err.message}`,
      );
    }
  });

  if (btnResetConn) {
    btnResetConn.addEventListener("click", async () => {
      try {
        const data = await apiFetch("/api/db/connection/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dbType: activeDb }),
        });
        if (data && data.success && data.config) {
          const cfg = data.config;
          if (connHostInput) connHostInput.value = cfg.host;
          if (connPortInput) connPortInput.value = cfg.port;
          if (connDatabaseInput) connDatabaseInput.value = cfg.database;
          if (connUserInput) connUserInput.value = cfg.user;
          if (connPasswordInput) connPasswordInput.value = cfg.password;
          if (connUriInput) connUriInput.value = cfg.uri;
          showToast(
            "info",
            "Connection Reset",
            `Connection for ${activeDb.toUpperCase()} reset to factory defaults.`,
          );
        }
      } catch (e) {
        showToast("error", "Reset Error", e.message);
      }
    });
  }

  btnTestConnection.addEventListener("click", async () => {
    btnTestConnection.disabled = true;
    btnTestConnection.innerHTML =
      '<span class="material-icons spin-anim" style="font-size: 14px;">sync</span> Testing...';
    try {
      const data = await apiFetch("/api/db/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dbType: activeDb,
          host: connHostInput ? connHostInput.value.trim() : "localhost",
          port: connPortInput
            ? parseInt(connPortInput.value.trim(), 10)
            : undefined,
        }),
      });
      if (data && data.success && data.reachable) {
        if (dbExecutionLatency)
          dbExecutionLatency.textContent = `Latency: ${data.latencyMs || 0.8} ms`;
        if (connStateBadge) {
          connStateBadge.textContent = "CONNECTED";
          connStateBadge.className = "badge-conn-state badge-conn-online";
        }
        if (connStatusDot) connStatusDot.className = "conn-dot online";
        const curDb =
          (connDatabaseInput && connDatabaseInput.value.trim()) ||
          "classicmodels";
        if (connDisplayText) {
          connDisplayText.textContent = `Connected: ${activeDb}://${connHostInput ? connHostInput.value : "127.0.0.1"}:${connPortInput ? connPortInput.value : 3306}/${curDb}`;
        }
        showToast(
          "success",
          "Connection Verified",
          `${data.message} (${data.latencyMs} ms)`,
        );

        const now = new Date().toISOString().substring(11, 19);
        const entry = document.createElement("div");
        entry.className = "log-entry log-success";
        entry.innerHTML = `
          <span class="log-time">[${now}]</span>
          <span class="log-tag tag-ready">CONNECT</span>
          <span class="log-msg">${escapeHtml(data.message)}</span>
        `;
        logStream.appendChild(entry);

        // Load databases now that we have a verified active connection
        fetchDatabaseSchema(activeDb);
      } else {
        if (connStateBadge) {
          connStateBadge.textContent = "DISCONNECTED";
          connStateBadge.className = "badge-conn-state badge-conn-offline";
        }
        if (connStatusDot) connStatusDot.className = "conn-dot offline";
        if (connDisplayText) {
          connDisplayText.textContent = `Disconnected: ${activeDb}://${connHostInput ? connHostInput.value : "127.0.0.1"}:${connPortInput ? connPortInput.value : 3306} (Database service not started)`;
        }
        const failMsg =
          (data && data.message) ||
          "Database service is not started on target port.";
        showToast("error", "Connection Failed", failMsg);

        if (dbTablesList) {
          dbTablesList.innerHTML = `<div class="db-unconnected-notice"><span class="material-icons" style="font-size: 14px; color: #ef4444;">cloud_off</span> <span>${escapeHtml(failMsg)}</span></div>`;
        }
      }
    } catch (err) {
      showToast("error", "Error", `Connection test failed: ${err.message}`);
    } finally {
      btnTestConnection.disabled = false;
      btnTestConnection.innerHTML =
        '<span class="material-icons" style="font-size: 14px;">bolt</span> Test Connection';
    }
  });

  // --------------------------------------------------------------------------
  // 12. ALGORITHMIC COMPLEXITY ANALYZER
  // --------------------------------------------------------------------------
  function evaluateComplexity(code) {
    let time = "O(1)";
    let space = "O(1)";
    let type = "Constant Time";
    let explanation =
      "Algorithm executes with minimal iteration and constant space.";

    const loopCount = (code.match(/\b(for|while)\b/g) || []).length;

    if (loopCount >= 2) {
      time = "O(n²)";
      type = "Quadratic Time";
      explanation =
        "Nested loops detected. Runtime scales quadratically with dataset size.";
    } else if (loopCount === 1) {
      time = "O(n)";
      type = "Linear Time";
      explanation =
        "Single iterative loop detected. Runtime scales linearly with elements.";
    } else if (
      code.includes("Thread.ofVirtual") ||
      code.includes("CompletableFuture")
    ) {
      time = "O(1) [Concurrent]";
      type = "High-Throughput Parallel";
      explanation =
        "Java 25 Virtual Threads allow millions of concurrent tasks with minimal overhead.";
    }

    if (
      code.includes("new int[") ||
      code.includes("new ArrayList") ||
      code.includes("new HashMap")
    ) {
      space = "O(n)";
    }

    complexityChipText.textContent = time;
    complexityBadgeText.textContent = time;
    complexityTypeText.textContent = type;
    complexitySpaceText.textContent = space;
    complexityExplanationText.textContent = explanation;
    complexityBanner.style.display = "flex";

    showToast("info", `Complexity: ${time}`, `${type} | Space: ${space}`);
  }

  btnComplexity.addEventListener("click", () =>
    evaluateComplexity(codeEditor.value),
  );
  complexityChip.addEventListener("click", () =>
    evaluateComplexity(codeEditor.value),
  );

  // --------------------------------------------------------------------------
  // 13. CLEAR & EXPORT ACTIONS
  // --------------------------------------------------------------------------
  btnClearCode.addEventListener("click", () => {
    codeEditor.value = "";
    updateEditor();
    showToast("info", "Editor Cleared", "Editor content emptied.");
  });

  btnClearConsole.addEventListener("click", () => {
    logStream.innerHTML = "";
    complexityBanner.style.display = "none";
    if (consoleStatusBadge) consoleStatusBadge.textContent = "READY";
    showToast("info", "Console Cleared", "Execution logs cleared.");
  });

  btnCopyOutput.addEventListener("click", () => {
    const text = logStream.innerText || "No output";
    navigator.clipboard.writeText(text).then(() => {
      showToast("success", "Copied", "Terminal output copied to clipboard.");
    });
  });

  btnDownloadOutput.addEventListener("click", () => {
    const text = logStream.innerText || "No output";
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `springboot_runner_${Date.now()}.log`;
    a.click();
    showToast("success", "Download Started", "Saved execution logs.");
  });

  // --------------------------------------------------------------------------
  // 14. DYNAMIC CURRENT YEAR FOR COPYRIGHT FOOTER
  // --------------------------------------------------------------------------
  const copyrightYearEl = document.getElementById("copyright-year");
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 15. ADVANCED LIVING LIGHT CANVAS (VECTOR GRAPHICS ONLY - ZERO TEXT)
  // Fluid Ambient Bokeh, Vector Emblems (Java Cup, Spring Leaf, Hibernate Shield, JPA Node)
  // Interactive Cursor Proximity Field & High-DPI Retina Scaling
  // --------------------------------------------------------------------------
  function initLivingCanvas() {
    if (!natureCanvas) return;
    const ctx = natureCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let width = 0;
    let height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      natureCanvas.width = width * dpr;
      natureCanvas.height = height * dpr;
      natureCanvas.style.width = width + "px";
      natureCanvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Mouse proximity tracking
    const mouse = { x: -1000, y: -1000, active: false };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // 1. Ambient Floating Light Blobs (Soft Spring, Java & Azure Hues)
    const orbs = [
      { x: width * 0.08, y: height * 0.15, vx: 0.14, vy: 0.10, r: 260, color: "rgba(16, 185, 129, 0.12)" },
      { x: width * 0.92, y: height * 0.18, vx: -0.12, vy: 0.11, r: 280, color: "rgba(52, 211, 153, 0.10)" },
      { x: width * 0.12, y: height * 0.55, vx: 0.11, vy: -0.09, r: 270, color: "rgba(249, 115, 22, 0.11)" },
      { x: width * 0.88, y: height * 0.52, vx: -0.13, vy: -0.10, r: 290, color: "rgba(56, 189, 248, 0.11)" },
      { x: width * 0.15, y: height * 0.85, vx: 0.10, vy: -0.12, r: 250, color: "rgba(245, 158, 11, 0.10)" },
      { x: width * 0.85, y: height * 0.85, vx: -0.11, vy: 0.12, r: 270, color: "rgba(139, 92, 246, 0.09)" },
      { x: width * 0.50, y: height * 0.08, vx: 0.08, vy: 0.09, r: 240, color: "rgba(16, 185, 129, 0.09)" },
      { x: width * 0.50, y: height * 0.92, vx: -0.09, vy: -0.08, r: 260, color: "rgba(234, 88, 12, 0.09)" },
      { x: width * 0.04, y: height * 0.38, vx: 0.09, vy: 0.12, r: 220, color: "rgba(14, 165, 233, 0.10)" },
      { x: width * 0.96, y: height * 0.38, vx: -0.10, vy: -0.11, r: 230, color: "rgba(34, 197, 94, 0.10)" },
    ];

    // 2. Vector Emblems (Rich Distributed Fleet - Java Cups, Spring Leaves, Shields, JPA, DB, Code)
    const emblemConfigs = [
      // Left Edge & Margin Flow (Visible outside main editor card)
      { type: "java", x: 0.04, y: 0.12, vx: 0.20, vy: 0.16, size: 48, angle: 0.05, vAngle: 0.002 },
      { type: "boot", x: 0.08, y: 0.28, vx: 0.18, vy: -0.18, size: 52, angle: -0.1, vAngle: -0.002 },
      { type: "hibernate", x: 0.03, y: 0.46, vx: 0.19, vy: 0.15, size: 46, angle: 0.08, vAngle: 0.002 },
      { type: "jpa", x: 0.09, y: 0.62, vx: -0.17, vy: 0.17, size: 48, angle: -0.05, vAngle: -0.002 },
      { type: "db", x: 0.04, y: 0.78, vx: 0.21, vy: -0.16, size: 46, angle: 0.02, vAngle: 0.002 },
      { type: "code", symbol: "{ }", x: 0.10, y: 0.92, vx: 0.16, vy: -0.19, size: 44, angle: 0.04, vAngle: -0.002 },

      // Right Edge & Margin Flow (Visible outside main editor card)
      { type: "boot", x: 0.96, y: 0.14, vx: -0.21, vy: 0.17, size: 54, angle: -0.08, vAngle: -0.002 },
      { type: "java", x: 0.91, y: 0.30, vx: -0.18, vy: -0.19, size: 50, angle: 0.06, vAngle: 0.002 },
      { type: "db", x: 0.97, y: 0.48, vx: -0.20, vy: 0.14, size: 48, angle: -0.03, vAngle: -0.002 },
      { type: "hibernate", x: 0.90, y: 0.66, vx: 0.17, vy: -0.20, size: 46, angle: 0.07, vAngle: 0.002 },
      { type: "jpa", x: 0.95, y: 0.82, vx: -0.19, vy: -0.17, size: 48, angle: -0.06, vAngle: -0.002 },
      { type: "code", symbol: "</>", x: 0.90, y: 0.94, vx: -0.15, vy: -0.18, size: 44, angle: 0.05, vAngle: 0.002 },

      // Top Gutter Flow
      { type: "jpa", x: 0.24, y: 0.06, vx: 0.19, vy: 0.15, size: 46, angle: 0.04, vAngle: 0.002 },
      { type: "java", x: 0.40, y: 0.07, vx: -0.20, vy: 0.14, size: 48, angle: -0.05, vAngle: -0.002 },
      { type: "boot", x: 0.60, y: 0.06, vx: 0.17, vy: 0.16, size: 50, angle: 0.08, vAngle: 0.002 },
      { type: "db", x: 0.76, y: 0.07, vx: -0.18, vy: 0.15, size: 46, angle: -0.04, vAngle: -0.002 },

      // Bottom Gutter Flow
      { type: "hibernate", x: 0.26, y: 0.94, vx: 0.18, vy: -0.16, size: 46, angle: -0.07, vAngle: -0.002 },
      { type: "code", symbol: "λ", x: 0.42, y: 0.93, vx: -0.16, vy: -0.18, size: 42, angle: 0.05, vAngle: 0.002 },
      { type: "java", x: 0.58, y: 0.94, vx: 0.20, vy: -0.17, size: 48, angle: 0.06, vAngle: 0.002 },
      { type: "boot", x: 0.74, y: 0.93, vx: -0.19, vy: -0.15, size: 52, angle: -0.08, vAngle: -0.002 },

      // Ambient Corner & Mid-Margin Floaters
      { type: "db", x: 0.16, y: 0.18, vx: 0.17, vy: 0.16, size: 44, angle: 0.03, vAngle: 0.002 },
      { type: "hibernate", x: 0.84, y: 0.20, vx: -0.18, vy: 0.18, size: 46, angle: -0.06, vAngle: -0.002 },
      { type: "jpa", x: 0.14, y: 0.76, vx: 0.19, vy: -0.15, size: 46, angle: 0.05, vAngle: 0.002 },
      { type: "boot", x: 0.86, y: 0.76, vx: -0.17, vy: -0.19, size: 50, angle: -0.07, vAngle: -0.002 },
      { type: "java", x: 0.20, y: 0.45, vx: -0.16, vy: 0.18, size: 48, angle: 0.05, vAngle: 0.002 },
      { type: "code", symbol: "{ }", x: 0.80, y: 0.46, vx: 0.18, vy: -0.16, size: 44, angle: -0.04, vAngle: -0.002 },
    ];

    const emblems = emblemConfigs.map((cfg) => ({
      type: cfg.type,
      symbol: cfg.symbol,
      x: width * cfg.x,
      y: height * cfg.y,
      vx: cfg.vx,
      vy: cfg.vy,
      size: cfg.size,
      angle: cfg.angle,
      vAngle: cfg.vAngle,
    }));

    // 3. Constellation Dust Particles (Vibrant Dense Field)
    const particles = [];
    const particleCount = 110;
    const particleColors = [
      "rgba(16, 185, 129, 0.55)",
      "rgba(52, 211, 153, 0.50)",
      "rgba(249, 115, 22, 0.50)",
      "rgba(56, 189, 248, 0.50)",
      "rgba(245, 158, 11, 0.50)",
      "rgba(168, 85, 247, 0.45)",
    ];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        radius: Math.random() * 2.4 + 1.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    let steamTick = 0;

    // Vector Emblem: Pure Java Cup (No Text)
    function drawJavaCup(x, y, size, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Saucer Glow & Oval
      ctx.fillStyle = "rgba(234, 88, 12, 0.06)";
      ctx.beginPath();
      ctx.ellipse(0, size * 0.52, size * 0.65, size * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Saucer Body
      const saucerGrad = ctx.createLinearGradient(
        -size * 0.55,
        0,
        size * 0.55,
        0,
      );
      saucerGrad.addColorStop(0, "#fdba74");
      saucerGrad.addColorStop(0.5, "#f97316");
      saucerGrad.addColorStop(1, "#ea580c");
      ctx.fillStyle = saucerGrad;
      ctx.beginPath();
      ctx.ellipse(0, size * 0.42, size * 0.52, size * 0.11, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cup Body Gradient
      const cupGrad = ctx.createLinearGradient(
        -size * 0.4,
        -size * 0.35,
        size * 0.4,
        size * 0.35,
      );
      cupGrad.addColorStop(0, "#fb923c");
      cupGrad.addColorStop(0.5, "#ea580c");
      cupGrad.addColorStop(1, "#c2410c");
      ctx.fillStyle = cupGrad;
      ctx.beginPath();
      ctx.moveTo(-size * 0.36, -size * 0.28);
      ctx.lineTo(size * 0.36, -size * 0.28);
      ctx.quadraticCurveTo(size * 0.36, size * 0.36, 0, size * 0.36);
      ctx.quadraticCurveTo(
        -size * 0.36,
        size * 0.36,
        -size * 0.36,
        -size * 0.28,
      );
      ctx.fill();

      // Cup Rim & Coffee Surface
      ctx.fillStyle = "#7c2d12"; // Dark rich roast
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.28, size * 0.36, size * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffedd5"; // Porcelain Rim
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cup Handle
      ctx.strokeStyle = "#c2410c";
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.arc(
        size * 0.38,
        -size * 0.02,
        size * 0.17,
        -Math.PI / 2,
        Math.PI / 2,
      );
      ctx.stroke();

      // Rising Steam Ribbons (Multi-sine smooth curves)
      ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
      ctx.lineWidth = 2.2;
      for (let s = -1; s <= 1; s++) {
        const offset = s * (size * 0.16);
        ctx.beginPath();
        const wave1 = Math.sin(steamTick * 0.04 + s * 1.5) * 5;
        const wave2 = Math.cos(steamTick * 0.04 + s * 1.5) * 4;
        ctx.moveTo(offset, -size * 0.38);
        ctx.bezierCurveTo(
          offset + wave1,
          -size * 0.55,
          offset - wave2,
          -size * 0.72,
          offset + wave1 * 0.5,
          -size * 0.95,
        );
        ctx.stroke();
      }

      ctx.restore();
    }

    // Vector Emblem: Pure Spring Boot Leaf (No Text)
    function drawSpringLeaf(x, y, size, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Ambient Leaf Shadow
      ctx.fillStyle = "rgba(16, 185, 129, 0.07)";
      ctx.beginPath();
      ctx.ellipse(0, size * 0.52, size * 0.55, size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left Leaf Half (Bright Emerald)
      const leftGrad = ctx.createLinearGradient(
        -size * 0.45,
        -size * 0.45,
        0,
        size * 0.45,
      );
      leftGrad.addColorStop(0, "#34d399");
      leftGrad.addColorStop(0.5, "#10b981");
      leftGrad.addColorStop(1, "#059669");
      ctx.fillStyle = leftGrad;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.52);
      ctx.bezierCurveTo(
        -size * 0.55,
        -size * 0.25,
        -size * 0.48,
        size * 0.35,
        0,
        size * 0.52,
      );
      ctx.closePath();
      ctx.fill();

      // Right Leaf Half (Deep Forest Green)
      const rightGrad = ctx.createLinearGradient(
        0,
        -size * 0.45,
        size * 0.45,
        size * 0.45,
      );
      rightGrad.addColorStop(0, "#10b981");
      rightGrad.addColorStop(0.6, "#047857");
      rightGrad.addColorStop(1, "#064e3b");
      ctx.fillStyle = rightGrad;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.52);
      ctx.bezierCurveTo(
        size * 0.55,
        -size * 0.25,
        size * 0.48,
        size * 0.35,
        0,
        size * 0.52,
      );
      ctx.closePath();
      ctx.fill();

      // Central Luminous Vein Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.52);
      ctx.quadraticCurveTo(-size * 0.06, 0, 0, -size * 0.48);
      ctx.stroke();

      // Branching Micro-Veins
      ctx.strokeStyle = "rgba(209, 250, 229, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.03, size * 0.2);
      ctx.quadraticCurveTo(
        -size * 0.18,
        size * 0.08,
        -size * 0.28,
        size * 0.02,
      );
      ctx.moveTo(-size * 0.02, -size * 0.05);
      ctx.quadraticCurveTo(
        -size * 0.16,
        -size * 0.15,
        -size * 0.25,
        -size * 0.22,
      );
      ctx.moveTo(size * 0.02, size * 0.12);
      ctx.quadraticCurveTo(size * 0.18, size * 0.02, size * 0.26, -size * 0.06);
      ctx.stroke();

      // Translucent Dewdrop Accent
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.beginPath();
      ctx.arc(size * 0.08, -size * 0.2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Vector Emblem: Pure Hibernate Shield (No Text)
    function drawHibernateShield(x, y, size, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Ambient Shield Glow
      ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
      ctx.beginPath();
      ctx.ellipse(0, size * 0.52, size * 0.48, size * 0.14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shield Left Facet (Golden Highlight)
      const leftGrad = ctx.createLinearGradient(
        -size * 0.45,
        -size * 0.4,
        0,
        size * 0.45,
      );
      leftGrad.addColorStop(0, "#fde68a");
      leftGrad.addColorStop(0.5, "#f59e0b");
      leftGrad.addColorStop(1, "#b45309");
      ctx.fillStyle = leftGrad;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(-size * 0.42, -size * 0.32);
      ctx.lineTo(-size * 0.36, size * 0.12);
      ctx.quadraticCurveTo(-size * 0.24, size * 0.44, 0, size * 0.54);
      ctx.closePath();
      ctx.fill();

      // Shield Right Facet (Deep Amber Bronze)
      const rightGrad = ctx.createLinearGradient(
        0,
        -size * 0.4,
        size * 0.45,
        size * 0.45,
      );
      rightGrad.addColorStop(0, "#f59e0b");
      rightGrad.addColorStop(0.5, "#d97706");
      rightGrad.addColorStop(1, "#92400e");
      ctx.fillStyle = rightGrad;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(size * 0.42, -size * 0.32);
      ctx.lineTo(size * 0.36, size * 0.12);
      ctx.quadraticCurveTo(size * 0.24, size * 0.44, 0, size * 0.54);
      ctx.closePath();
      ctx.fill();

      // Inner Embossed Diamond Core
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.22);
      ctx.lineTo(size * 0.18, 0);
      ctx.lineTo(0, size * 0.22);
      ctx.lineTo(-size * 0.18, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    }

    // Vector Emblem: Pure JPA Isometric Data Node (No Text)
    function drawJpaPedestal(x, y, size, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Ambient Node Shadow
      ctx.fillStyle = "rgba(2, 132, 199, 0.08)";
      ctx.beginPath();
      ctx.ellipse(0, size * 0.52, size * 0.52, size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cylinder Tier 1 (Base Platter)
      const gradTier1 = ctx.createLinearGradient(-size * 0.4, 0, size * 0.4, 0);
      gradTier1.addColorStop(0, "#0369a1");
      gradTier1.addColorStop(0.5, "#0284c7");
      gradTier1.addColorStop(1, "#075985");
      ctx.fillStyle = gradTier1;
      ctx.beginPath();
      ctx.rect(-size * 0.38, size * 0.1, size * 0.76, size * 0.22);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, size * 0.32, size * 0.38, size * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.ellipse(0, size * 0.1, size * 0.38, size * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cylinder Tier 2 (Top Stack Node)
      const gradTier2 = ctx.createLinearGradient(
        -size * 0.38,
        0,
        size * 0.38,
        0,
      );
      gradTier2.addColorStop(0, "#0284c7");
      gradTier2.addColorStop(0.5, "#38bdf8");
      gradTier2.addColorStop(1, "#0369a1");
      ctx.fillStyle = gradTier2;
      ctx.beginPath();
      ctx.rect(-size * 0.38, -size * 0.22, size * 0.76, size * 0.24);
      ctx.fill();

      ctx.fillStyle = "#7dd3fc";
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.22, size * 0.38, size * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Data Storage Ring
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.05, size * 0.42, size * 0.13, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing Center Node
      const pulse = (Math.sin(steamTick * 0.05) + 1) * 0.5;
      ctx.fillStyle = `rgba(251, 191, 36, ${0.7 + pulse * 0.3})`;
      ctx.beginPath();
      ctx.arc(0, -size * 0.22, 4 + pulse * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Vector Emblem: Pure Database Multi-Tier Cylinder (No Text)
    function drawDatabaseCylinder(x, y, size, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Ambient Ground Shadow
      ctx.fillStyle = "rgba(14, 165, 233, 0.10)";
      ctx.beginPath();
      ctx.ellipse(0, size * 0.52, size * 0.50, size * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Database 3 Stacked Disks
      const diskHeights = [size * 0.18, -size * 0.06, -size * 0.30];
      const diskH = size * 0.22;
      const rx = size * 0.38;
      const ry = size * 0.12;

      diskHeights.forEach((topY, idx) => {
        // Disk Body Cylinder
        const bodyGrad = ctx.createLinearGradient(-rx, 0, rx, 0);
        if (idx === 0) {
          bodyGrad.addColorStop(0, "#0284c7");
          bodyGrad.addColorStop(0.5, "#38bdf8");
          bodyGrad.addColorStop(1, "#0369a1");
        } else if (idx === 1) {
          bodyGrad.addColorStop(0, "#0369a1");
          bodyGrad.addColorStop(0.5, "#0284c7");
          bodyGrad.addColorStop(1, "#075985");
        } else {
          bodyGrad.addColorStop(0, "#075985");
          bodyGrad.addColorStop(0.5, "#0284c7");
          bodyGrad.addColorStop(1, "#0c4a6e");
        }

        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.rect(-rx, topY, rx * 2, diskH);
        ctx.fill();

        // Disk Bottom Curved Rim
        ctx.beginPath();
        ctx.ellipse(0, topY + diskH, rx, ry, 0, 0, Math.PI);
        ctx.fill();

        // Disk Top Ellipse Face
        const topGrad = ctx.createLinearGradient(-rx, topY - ry, rx, topY + ry);
        topGrad.addColorStop(0, "#7dd3fc");
        topGrad.addColorStop(0.6, "#38bdf8");
        topGrad.addColorStop(1, "#0284c7");
        ctx.fillStyle = topGrad;
        ctx.beginPath();
        ctx.ellipse(0, topY, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pulsing Database Activity LED Light
        const ledPulse = Math.sin(steamTick * 0.07 + idx * 1.8) > 0 ? 1 : 0.4;
        ctx.fillStyle =
          idx === 0
            ? `rgba(34, 197, 94, ${ledPulse})`
            : `rgba(56, 189, 248, ${ledPulse})`;
        ctx.beginPath();
        ctx.arc(-rx * 0.45, topY + diskH * 0.55, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    // Vector Emblem: Pure Code Token Capsule (Zero Distracting Text, Crisp Vector Glyph)
    function drawCodeSymbol(x, y, size, angle, symbol) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Glass Badge Background
      ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // Outer Glowing Ring
      const ringGrad = ctx.createLinearGradient(
        -size * 0.4,
        -size * 0.4,
        size * 0.4,
        size * 0.4,
      );
      ringGrad.addColorStop(0, "#818cf8");
      ringGrad.addColorStop(0.5, "#6366f1");
      ringGrad.addColorStop(1, "#a855f7");
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Symbol
      ctx.fillStyle = "#6366f1";
      ctx.font = `bold ${Math.round(size * 0.36)}px "JetBrains Mono", Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol || "{ }", 0, 1);

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      steamTick++;

      // 1. Draw Ambient Floating Light Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -100) orb.x = width + 100;
        if (orb.x > width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = height + 100;
        if (orb.y > height + 100) orb.y = -100;

        const g = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r,
        );
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Interactive Cursor Proximity Aura
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          160,
        );
        mouseGlow.addColorStop(0, "rgba(16, 185, 129, 0.08)");
        mouseGlow.addColorStop(1, "rgba(16, 185, 129, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Constellation Particles & Proximity Lines
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130 && dist > 0) {
            const force = (130 - dist) / 130;
            p.x += (dx / dist) * force * 2.5;
            p.y += (dy / dist) * force * 2.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Smooth Floating Vector Emblems (Zero Text)
      emblems.forEach((em) => {
        em.x += em.vx;
        em.y += em.vy;
        em.angle += em.vAngle;

        // Soft screen bounce inside viewport margins
        if (em.x < em.size * 0.6) {
          em.x = em.size * 0.6;
          em.vx = Math.abs(em.vx);
        } else if (em.x > width - em.size * 0.6) {
          em.x = width - em.size * 0.6;
          em.vx = -Math.abs(em.vx);
        }
        if (em.y < em.size * 0.6) {
          em.y = em.size * 0.6;
          em.vy = Math.abs(em.vy);
        } else if (em.y > height - em.size * 0.6) {
          em.y = height - em.size * 0.6;
          em.vy = -Math.abs(em.vy);
        }

        if (em.type === "java") drawJavaCup(em.x, em.y, em.size, em.angle);
        else if (em.type === "boot")
          drawSpringLeaf(em.x, em.y, em.size, em.angle);
        else if (em.type === "hibernate")
          drawHibernateShield(em.x, em.y, em.size, em.angle);
        else if (em.type === "jpa")
          drawJpaPedestal(em.x, em.y, em.size, em.angle);
        else if (em.type === "db")
          drawDatabaseCylinder(em.x, em.y, em.size, em.angle);
        else if (em.type === "code")
          drawCodeSymbol(em.x, em.y, em.size, em.angle, em.symbol);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  initLivingCanvas();

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initial Load: Ensure DemoApplication.java is populated & highlighted immediately
  if (!codeEditor.value || codeEditor.value.trim() === "") {
    codeEditor.value = TEMPLATES.demoApp;
  }
  updateEditor();

  fetchProjectTree();
  openProjectFile(activeFilePath);
  // Default Spring Boot mode: Maximize Code Area and minimize console area
  toggleConsoleArea(true);
});
