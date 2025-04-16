package com.example.backend.controller;

import com.example.backend.dto.DashboardDTO;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public DashboardController(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public DashboardDTO getStats() {
        LocalDate today = LocalDate.now();
        LocalDate firstOfMonth = today.withDayOfMonth(1);

        long todayOrders = orderRepository.countByCreatedAtBetween(today.atStartOfDay(), today.plusDays(1).atStartOfDay());
        Double monthlyRevenue = orderRepository.sumTotalByCreatedAtBetween(firstOfMonth.atStartOfDay(), today.plusDays(1).atStartOfDay());
        long productCount = productRepository.count();
        long userCount = userRepository.count();

        DashboardDTO stats = new DashboardDTO();
        stats.todayOrders = todayOrders;
        stats.monthlyRevenue = monthlyRevenue != null ? monthlyRevenue : 0.0;
        stats.productCount = productCount;
        stats.userCount = userCount;

        return stats;
    }
}