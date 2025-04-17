package com.example.backend.service;

import com.example.backend.dto.category.UpdateCategoryRequest;
import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, UpdateCategoryRequest request) {
        return categoryRepository.findById(id)
            .map(category -> {
                category.setName(request.getName());
                category.setDescription(request.getDescription());
                category.setImageName(request.getImageName());
                return categoryRepository.save(category);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found with id: " + id));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}