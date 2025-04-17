package com.example.backend.controller;

import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.OrderService;
import com.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final ProductService productService;
    private final ProductRepository productRepository;

    public OrderController(OrderService orderService, ProductService productService, ProductRepository productRepository) {
        this.orderService = orderService;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        for (Order order : orders) {
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    var productOpt = productRepository.findById(item.getProductId());
                    productOpt.ifPresent(product -> item.setProductName(product.getName()));
                }
            }
        }
        return orders;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }
        return orderService.createOrder(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        for (Order order : orders) {
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    var productOpt = productRepository.findById(item.getProductId());
                    productOpt.ifPresent(product -> item.setProductName(product.getName()));
                }
            }
        }
        return orders;
    }
}