package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginDto {
    @NotBlank(message = "Username is required")
    @Schema(description = "Username", example = "john_doe")
    private String username;

    @NotBlank(message = "Password is required")
    @Schema(description = "Password", example = "secure_password")
    private String password;
}