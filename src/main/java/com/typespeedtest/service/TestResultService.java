package com.typespeedtest.service;

import com.typespeedtest.dto.TestResultRequest;
import com.typespeedtest.dto.TestResultResponse;
import com.typespeedtest.dto.TestResultStatsResponse;
import com.typespeedtest.model.TestResult;
import com.typespeedtest.model.User;
import com.typespeedtest.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
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

    public TestResultStatsResponse getUserStats(Long userId) {
        Integer totalTests = testResultRepository.countByUserId(userId);
        Integer bestWpm = testResultRepository.findMaxWpmByUserId(userId);
        Double averageWpm = testResultRepository.findAverageWpmByUserId(userId);
        Double averageAccuracy = testResultRepository.findAverageAccuracyByUserId(userId);

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);

        Integer testsLast7Days = testResultRepository.countByUserIdAndCreatedAtAfter(userId, sevenDaysAgo);
        Integer testsLast30Days = testResultRepository.countByUserIdAndCreatedAtAfter(userId, thirtyDaysAgo);

        return TestResultStatsResponse.builder()
                .totalTests(totalTests != null ? totalTests : 0)
                .bestWpm(bestWpm != null ? bestWpm : 0)
                .averageWpm(averageWpm != null ? averageWpm : 0.0)
                .averageAccuracy(averageAccuracy != null ? averageAccuracy : 0.0)
                .testsLast7Days(testsLast7Days != null ? testsLast7Days : 0)
                .testsLast30Days(testsLast30Days != null ? testsLast30Days : 0)
                .build();
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