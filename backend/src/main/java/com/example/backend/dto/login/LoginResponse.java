package com.example.backend.dto.login;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginResponse {
    private Long id;
    private String token;
    private String name;
    private String email;
    private String role;
    private LocalDateTime lastLoginTime;
    private LocalDateTime createdAt;
}