package com.typespeedtest.repository;

import com.typespeedtest.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT t FROM TestResult t WHERE t.user.id = :userId ORDER BY t.wpm DESC")
    List<TestResult> findTopResultsByUserId(Long userId);
}