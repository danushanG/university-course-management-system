package com.university.controller;

import com.university.entity.Course;
import com.university.entity.Enrollment;
import com.university.entity.Student;
import com.university.repository.CourseRepository;
import com.university.repository.EnrollmentRepository;
import com.university.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {
    
    @Autowired
    private EnrollmentRepository enrollmentRepo;
    
    @Autowired
    private StudentRepository studentRepo;
    
    @Autowired
    private CourseRepository courseRepo;
    
    // Get all enrollments
    @GetMapping
    public List<Enrollment> getAll() {
        return enrollmentRepo.findAll();
    }
    
    // Get enrollment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getById(@PathVariable Long id) {
        Optional<Enrollment> enrollment = enrollmentRepo.findById(id);
        return enrollment.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }
    
    // Get enrollments by student ID
    @GetMapping("/student/{studentId}")
    public List<Enrollment> getByStudentId(@PathVariable Long studentId) {
        return enrollmentRepo.findByStudentId(studentId);
    }
    
    // Get enrollments by course ID
    @GetMapping("/course/{courseId}")
    public List<Enrollment> getByCourseId(@PathVariable Long courseId) {
        return enrollmentRepo.findByCourseId(courseId);
    }
    
    // Get enrollments by status
    @GetMapping("/status/{status}")
    public List<Enrollment> getByStatus(@PathVariable Enrollment.EnrollmentStatus status) {
        return enrollmentRepo.findByStatus(status);
    }
    
    // Get enrollments with grades
    @GetMapping("/with-grades")
    public List<Enrollment> getEnrollmentsWithGrades() {
        return enrollmentRepo.findEnrollmentsWithGrades();
    }
    
    // Enroll student in course
    @PostMapping
    public ResponseEntity<Enrollment> enroll(@Valid @RequestBody EnrollmentRequest request) {
        Optional<Student> student = studentRepo.findById(request.getStudentId());
        Optional<Course> course = courseRepo.findById(request.getCourseId());
        
        if (student.isEmpty() || course.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        // Check if student is already enrolled in this course
        if (enrollmentRepo.existsByStudentIdAndCourseId(request.getStudentId(), request.getCourseId())) {
            return ResponseEntity.badRequest().build();
        }
        
        // Check course capacity
        Course courseEntity = course.get();
        if (courseEntity.getMaxCapacity() != null) {
            Long currentEnrollments = enrollmentRepo.countEnrollmentsByCourseId(request.getCourseId());
            if (currentEnrollments >= courseEntity.getMaxCapacity()) {
                return ResponseEntity.badRequest().build();
            }
        }
        
        Enrollment enrollment = new Enrollment(student.get(), course.get());
        enrollment.setStatus(request.getStatus() != null ? request.getStatus() : Enrollment.EnrollmentStatus.ENROLLED);
        
        Enrollment savedEnrollment = enrollmentRepo.save(enrollment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEnrollment);
    }
    
    // Update enrollment status
    @PutMapping("/{id}/status")
    public ResponseEntity<Enrollment> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        Optional<Enrollment> enrollmentOptional = enrollmentRepo.findById(id);
        
        if (enrollmentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Enrollment enrollment = enrollmentOptional.get();
        enrollment.setStatus(request.getStatus());
        
        Enrollment updatedEnrollment = enrollmentRepo.save(enrollment);
        return ResponseEntity.ok(updatedEnrollment);
    }
    
    // Update grade
    @PutMapping("/{id}/grade")
    public ResponseEntity<Enrollment> updateGrade(@PathVariable Long id, @RequestBody GradeUpdateRequest request) {
        Optional<Enrollment> enrollmentOptional = enrollmentRepo.findById(id);
        
        if (enrollmentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Enrollment enrollment = enrollmentOptional.get();
        enrollment.setGrade(request.getGrade());
        
        Enrollment updatedEnrollment = enrollmentRepo.save(enrollment);
        return ResponseEntity.ok(updatedEnrollment);
    }
    
    // Delete enrollment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Enrollment> enrollment = enrollmentRepo.findById(id);
        
        if (enrollment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        enrollmentRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    // DTO classes for request handling
    public static class EnrollmentRequest {
        private Long studentId;
        private Long courseId;
        private Enrollment.EnrollmentStatus status;
        
        // Getters and setters
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        
        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
        
        public Enrollment.EnrollmentStatus getStatus() { return status; }
        public void setStatus(Enrollment.EnrollmentStatus status) { this.status = status; }
    }
    
    public static class StatusUpdateRequest {
        private Enrollment.EnrollmentStatus status;
        
        public Enrollment.EnrollmentStatus getStatus() { return status; }
        public void setStatus(Enrollment.EnrollmentStatus status) { this.status = status; }
    }
    
    public static class GradeUpdateRequest {
        private Double grade;
        
        public Double getGrade() { return grade; }
        public void setGrade(Double grade) { this.grade = grade; }
    }
}
