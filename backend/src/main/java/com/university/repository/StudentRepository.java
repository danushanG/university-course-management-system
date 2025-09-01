package com.university.repository;

import com.university.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Find student by email
    Optional<Student> findByEmail(String email);
    
    // Find student by student ID
    Optional<Student> findByStudentId(String studentId);
    
    // Find students by name (first or last name containing)
    @Query("SELECT s FROM Student s WHERE LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Student> findByNameContainingIgnoreCase(@Param("name") String name);
    
    // Find students by academic status
    List<Student> findByAcademicStatus(Student.AcademicStatus status);
    
    // Find students enrolled in a specific course
    @Query("SELECT s FROM Student s JOIN s.enrollments e WHERE e.course.id = :courseId")
    List<Student> findStudentsByCourseId(@Param("courseId") Long courseId);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Check if student ID exists
    boolean existsByStudentId(String studentId);
}
