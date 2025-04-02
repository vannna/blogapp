package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(
        description = "Authentication response details",
        example = "{\n" +
                "  \"token\": \"eyJhbGciOiJIUzI1Ni...\",\n" + // Example JWT token
                "  \"username\": \"john_doe\",\n" +
                "  \"role\": \"ROLE_READER\",\n" +
                "  \"email\": \"john@example.com\"\n" +
                "}"
)
public class AuthResponseDto {
    @Schema(description = "JWT token", example = "eyJhbGciOiJIUzI1Ni...")
    private String token;

    @Schema(description = "Username", example = "john_doe")
    private String username;

    @Schema(description = "User role", example = "ROLE_AUTHOR")
    private String role;
}