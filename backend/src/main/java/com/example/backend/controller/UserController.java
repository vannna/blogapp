package com.example.backend.controller;

import com.example.backend.dto.UserProfileDto;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Update user profile",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateProfile(
            @AuthenticationPrincipal String username,
            @RequestBody UserProfileDto userProfileDto
    ) {
        return ResponseEntity.ok(userService.updateProfile(username, userProfileDto));
    }
}