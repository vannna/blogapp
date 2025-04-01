package com.example.backend.controller;

import com.example.backend.dto.AuthResponseDto;
import com.example.backend.dto.UserLoginDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> registerUser(
            @Valid @RequestBody UserRegistrationDto userRegistrationDto) {
        AuthResponseDto response = authenticationService.register(userRegistrationDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> loginUser(
            @Valid @RequestBody UserLoginDto userLoginDto) {
        AuthResponseDto response = authenticationService.authenticate(userLoginDto);
        return ResponseEntity.ok(response);
    }
}