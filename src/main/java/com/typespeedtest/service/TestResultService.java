package com.typespeedtest.service;

import com.typespeedtest.dto.TestResultRequest;
import com.typespeedtest.dto.TestResultResponse;
import com.typespeedtest.model.TestResult;
import com.typespeedtest.model.User;
import com.typespeedtest.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public TestResultResponse saveTestResult(Long userId, TestResultRequest request) {
        User user = userService.getUserById(userId);

        TestResult testResult = TestResult.builder()
                .user(user)
                .wpm(request.getWpm())
                .accuracy(request.getAccuracy())
                .difficulty(request.getDifficulty())
                .duration(request.getDuration())
                .build();

        TestResult savedResult = testResultRepository.save(testResult);

        return convertToResponse(savedResult);
    }

    public List<TestResultResponse> getUserTestResults(Long userId) {
        List<TestResult> results = testResultRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return results.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<TestResultResponse> getUserBestResults(Long userId) {
        List<TestResult> results = testResultRepository.findTopResultsByUserId(userId);
        return results.stream()
                .limit(10)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private TestResultResponse convertToResponse(TestResult testResult) {
        return TestResultResponse.builder()
                .id(testResult.getId())
                .wpm(testResult.getWpm())
                .accuracy(testResult.getAccuracy())
                .difficulty(testResult.getDifficulty())
                .duration(testResult.getDuration())
                .createdAt(testResult.getCreatedAt())
                .build();
    }
}