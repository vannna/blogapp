package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogPostDto {
    @Schema(description = "Post ID", example = "1")
    private Long id;

    @Schema(description = "Post title", example = "My First Post", required = true)
    private String title;

    @Schema(description = "Post content", example = "Hello, world!", required = true)
    private String content;

    @Schema(description = "Author's username", example = "author123")
    private String authorUsername;

    @Schema(description = "Creation timestamp", example = "2024-01-01T12:00:00")
    private LocalDateTime createdAt;

    @Schema(description = "Last update timestamp", example = "2024-01-01T12:00:00")
    private LocalDateTime updatedAt;
}