package com.typespeedtest.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestResultResponse {
    private Long id;
    private Integer wpm;
    private Double accuracy;
    private String difficulty;
    private Integer duration;
    private LocalDateTime createdAt;
}
