package com.typespeedtest.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestResultStatsResponse {
    private Integer totalTests;
    private Integer bestWpm;
    private Double averageWpm;
    private Double averageAccuracy;
    private Integer testsLast7Days;
    private Integer testsLast30Days;
}