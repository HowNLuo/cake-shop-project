package com.example.backend.controller;

import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import com.example.backend.service.OrderService;
import com.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final ProductService productService;


    public OrderController(OrderService orderService, ProductService productService) {
        this.orderService = orderService;
        this.productService = productService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        for (Order order : orders) {
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    var product = productService.getProductById(item.getProductId());
                    if (product != null) {
                        item.setProductName(product.getName());
                    }
                }
            }
        }
        return orders;
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id).orElseThrow();
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                var product = productService.getProductById(item.getProductId());
                if (product != null) {
                    item.setProductName(product.getName());
                }
            }
        }
        return order;
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
                    var product = productService.getProductById(item.getProductId());
                    if (product != null) {
                        item.setProductName(product.getName());
                    }
                }
            }
        }
        return orders;
    }
}