package com.example.backend.dto.common;

import lombok.Data;

@Data
public class DashboardDTO {
    public long todayOrders;
    public double monthlyRevenue;
    public long productCount;
    public long userCount;
}