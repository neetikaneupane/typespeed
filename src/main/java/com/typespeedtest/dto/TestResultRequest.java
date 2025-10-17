package com.typespeedtest.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class TestResultRequest {
    @NotNull(message = "WPM is required")
    @Min(value = 0, message = "WPM must be positive")
    private Integer wpm;

    @NotNull(message = "Accuracy is required")
    @Min(value = 0, message = "Accuracy must be between 0 and 100")
    @Max(value = 100, message = "Accuracy must be between 0 and 100")
    private Double accuracy;

    @NotBlank(message = "Difficulty is required")
    @Pattern(regexp = "easy|medium|hard", message = "Difficulty must be easy, medium, or hard")
    private String difficulty;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be positive")
    private Integer duration;
}
