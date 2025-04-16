package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductDTO {
    public Long id;
    public String name;
    public String description;
    public Double price;
    public String imageName;
    public Long categoryId;
    public String categoryName;
    public String ingredients;
    public LocalDateTime createdAt;
}