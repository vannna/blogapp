package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {
    @Schema(description = "Like ID", example = "1")
    private Long id;

    @Schema(description = "Author's username", example = "user123")
    private String authorUsername;

    @Schema(description = "Post ID", example = "1")
    private Long blogPostId;

    @Schema(description = "Creation timestamp", example = "2024-01-01T12:00:00")
    private LocalDateTime createdAt;
}