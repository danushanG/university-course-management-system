package com.university.repository;

import com.university.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
    // Find enrollments by student ID
    List<Enrollment> findByStudentId(Long studentId);
    
    // Find enrollments by course ID
    List<Enrollment> findByCourseId(Long courseId);
    
    // Find enrollment by student and course
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
    
    // Find enrollments by status
    List<Enrollment> findByStatus(Enrollment.EnrollmentStatus status);
    
    // Find enrollments with grades
    @Query("SELECT e FROM Enrollment e WHERE e.grade IS NOT NULL")
    List<Enrollment> findEnrollmentsWithGrades();
    
    // Find enrollments by student and status
    List<Enrollment> findByStudentIdAndStatus(Long studentId, Enrollment.EnrollmentStatus status);
    
    // Count enrollments for a course
    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.id = :courseId AND e.status = 'ENROLLED'")
    Long countEnrollmentsByCourseId(@Param("courseId") Long courseId);
    
    // Check if student is enrolled in course
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
}
