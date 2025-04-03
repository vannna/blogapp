package com.example.backend.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "API error details")
public class ApiError {
    @Schema(
            description = "HTTP status code",
            example = "400"
    )
    private int status;

    @Schema(
            description = "Error message",
            example = "Validation failed"
    )
    private String message;

    @Schema(
            description = "Field-specific validation errors",
            example = "{\"title\": \"Title is required\"}"
    )
    private Map<String, String> errors;

    public ApiError(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiError(int status, String message, String error) {
        this.status = status;
        this.message = message;
        this.errors = Map.of("error", error);
    }
}