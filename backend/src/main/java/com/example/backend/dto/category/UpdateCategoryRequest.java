package com.example.backend.dto.category;

import lombok.Data;

@Data
public class UpdateCategoryRequest {
    private String name;
    private String description;
    private String imageName;
}
