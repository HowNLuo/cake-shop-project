package com.example.backend.service;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(this::toDTO).toList();
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return toDTO(product);
    }

    public ProductDTO createProduct(Product product) {
        Product saved = productRepository.save(product);
        return toDTO(saved);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public ProductDTO updateProduct(Long id, Product updatedProduct) {
        Product product = productRepository.findById(id)
                .map(p -> {
                    p.setName(updatedProduct.getName());
                    p.setDescription(updatedProduct.getDescription());
                    p.setPrice(updatedProduct.getPrice());
                    p.setCategoryId(updatedProduct.getCategoryId());
                    p.setIngredients(updatedProduct.getIngredients());
                    p.setImageName(updatedProduct.getImageName());
                    return productRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        return toDTO(product);
    }

    private ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.id = product.getId();
        dto.name = product.getName();
        dto.description = product.getDescription();
        dto.price = product.getPrice();
        dto.imageName = product.getImageName();
        dto.categoryId = product.getCategoryId();
        dto.ingredients = product.getIngredients();
        dto.createdAt = product.getCreatedAt();

        categoryRepository.findById(product.getCategoryId())
                .ifPresent(category -> dto.categoryName = category.getName());

        return dto;
    }
}
