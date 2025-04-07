package com.example.backend.dto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // <--- ADD THIS
@Builder
public class UserProfileDto {
    @Schema(description = "Username", example = "john_doe")
    private String username;
    @Schema(description = "Email", example = "john@example.com")
    private String email;
    @Schema(description = "Bio (optional)", example = "Full-stack developer")
    private String bio;
}