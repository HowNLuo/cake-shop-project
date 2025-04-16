package com.example.backend.controller;

import com.example.backend.dto.login.LoginRequest;
import com.example.backend.dto.login.LoginResponse;
import com.example.backend.dto.register.RegisterRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, JwtService jwtService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        User user = userOptional.get();

        if (!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        user.setLastLoginTime(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtService.generateToken(user);

        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setToken(token);
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setLastLoginTime(user.getLastLoginTime());
        response.setCreatedAt(user.getCreatedAt());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setRole("User"); // 預設為一般使用者
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}