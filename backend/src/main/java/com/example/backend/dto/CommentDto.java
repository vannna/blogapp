package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    @Schema(description = "Comment ID", example = "1")
    private Long id;

    @NotBlank(message = "Comment content cannot be empty")
    @Size(min = 1, max = 1000, message = "Comment must be between 1 and 1000 characters")
    @Schema(description = "Comment text", example = "Great post!", required = true)
    private String content;

    @Schema(description = "Author's username", example = "user123")
    private String authorUsername;

    @Schema(description = "Creation timestamp", example = "2024-01-01T12:00:00")
    private LocalDateTime createdAt;
}