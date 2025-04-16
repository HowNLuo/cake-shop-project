package com.example.backend.dto.register;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
}