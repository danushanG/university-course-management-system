package com.university.repository;

import com.university.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    // Find course by code
    Optional<Course> findByCode(String code);
    
    // Find courses by title containing (case-insensitive)
    List<Course> findByTitleContainingIgnoreCase(String title);
    
    // Find courses by credit hours
    List<Course> findByCreditHours(Integer creditHours);
    
    // Find courses with available capacity
    @Query("SELECT c FROM Course c WHERE c.maxCapacity IS NULL OR c.maxCapacity > (SELECT COUNT(e) FROM Enrollment e WHERE e.course = c AND e.status = 'ENROLLED')")
    List<Course> findAvailableCourses();
    
    // Find courses by student enrollment
    @Query("SELECT c FROM Course c JOIN c.enrollments e WHERE e.student.id = :studentId")
    List<Course> findCoursesByStudentId(@Param("studentId") Long studentId);
    
    // Check if course code exists
    boolean existsByCode(String code);
}
