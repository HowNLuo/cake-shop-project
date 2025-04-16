package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Double total;

    private String status;

    private String email;
    private String phoneNumber;
    private String fullName;
    private String address;
    private String postalCode;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;

    @PrePersist
    public void generateOrderNumber() {
        this.orderNumber = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}