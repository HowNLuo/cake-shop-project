package com.example.backend.repository;

import com.example.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(o.total) FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
    Double sumTotalByCreatedAtBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
