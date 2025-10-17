package com.typespeedtest.repository;

import com.typespeedtest.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT t FROM TestResult t WHERE t.user.id = :userId ORDER BY t.wpm DESC")
    List<TestResult> findTopResultsByUserId(Long userId);

    @Query("SELECT COUNT(t) FROM TestResult t WHERE t.user.id = :userId")
    Integer countByUserId(@Param("userId") Long userId);

    @Query("SELECT MAX(t.wpm) FROM TestResult t WHERE t.user.id = :userId")
    Integer findMaxWpmByUserId(@Param("userId") Long userId);

    @Query("SELECT AVG(t.wpm) FROM TestResult t WHERE t.user.id = :userId")
    Double findAverageWpmByUserId(@Param("userId") Long userId);

    @Query("SELECT AVG(t.accuracy) FROM TestResult t WHERE t.user.id = :userId")
    Double findAverageAccuracyByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(t) FROM TestResult t WHERE t.user.id = :userId AND t.createdAt >= :startDate")
    Integer countByUserIdAndCreatedAtAfter(@Param("userId") Long userId, @Param("startDate") LocalDateTime startDate);
}