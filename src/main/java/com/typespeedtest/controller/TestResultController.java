package com.typespeedtest.controller;

import com.typespeedtest.dto.TestResultRequest;
import com.typespeedtest.dto.TestResultResponse;
import com.typespeedtest.service.TestResultService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @PostMapping
    public ResponseEntity<TestResultResponse> saveTestResult(
            @Valid @RequestBody TestResultRequest request,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        TestResultResponse response = testResultService.saveTestResult(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<List<TestResultResponse>> getUserResults(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        List<TestResultResponse> results = testResultService.getUserTestResults(userId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/user/best")
    public ResponseEntity<List<TestResultResponse>> getUserBestResults(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        List<TestResultResponse> results = testResultService.getUserBestResults(userId);
        return ResponseEntity.ok(results);
    }
}