package com.example.backend.controller;

import com.example.backend.entity.OrderItem;
import com.example.backend.service.OrderItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {
    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id).orElseThrow();
    }

    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItem item) {
        return orderItemService.createOrderItem(item);
    }
}