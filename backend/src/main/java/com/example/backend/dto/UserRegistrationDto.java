package com.example.backend.dto;

import com.example.backend.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationDto {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Invalid username format")
    @Schema(description = "Username", example = "john_doe")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255)
    @Schema(description = "Email", example = "john@example.com")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 128)
    @Schema(description = "Password", example = "secure_password")
    private String password;

    @Schema(description = "User role", example = "ROLE_AUTHOR")
    private Role role;
}