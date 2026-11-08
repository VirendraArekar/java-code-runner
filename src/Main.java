// =========================================================
// Java 25 LTS: High-Throughput Virtual Threads Benchmark
// Oracle JDK 25.0.4.1 Runtime
// =========================================================

import java.util.concurrent.*;
import java.util.stream.IntStream;
import java.time.Duration;
import java.time.Instant;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("☕ Java 25 (LTS) Virtual Threads Benchmark");
        System.out.println("Java Specification Version: " + System.getProperty("java.specification.version"));
        System.out.println("JVM Architecture: " + System.getProperty("os.arch"));
        System.out.println("--------------------------------------------------");

        int totalTasks = 10_000;
        Instant start = Instant.now();

        // Launch 10,000 lightweight Virtual Threads with Structured Task Executor
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(1, totalTasks + 1).forEach(taskId -> {
                executor.submit(() -> {
                    Thread.sleep(Duration.ofMillis(2));
                    if (taskId % 2500 == 0) {
                        System.out.printf("  [VirtualThread #%05d] Executed on %s%n", 
                            taskId, Thread.currentThread());
                    }
                    return taskId;
                });
            });
        }

        Duration elapsed = Duration.between(start, Instant.now());
        System.out.println("--------------------------------------------------");
        System.out.printf("✅ Successfully executed %,d Virtual Threads in %d ms!%n", 
            totalTasks, elapsed.toMillis());
        System.out.println("🚀 Virtual threads allow millions of concurrent tasks with minimal RAM footprint.");
    }
}

