package com.university.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "enrollment_status", nullable = false)
    private EnrollmentStatus status = EnrollmentStatus.ENROLLED;
    
    @Min(value = 0, message = "Grade must be at least 0")
    @Max(value = 100, message = "Grade must be at most 100")
    @Column(name = "grade")
    private Double grade;
    
    @Column(name = "grade_letter")
    private String gradeLetter;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Enrollment() {
        this.enrollmentDate = LocalDate.now();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Enrollment(Student student, Course course) {
        this();
        this.student = student;
        this.course = course;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Student getStudent() {
        return student;
    }
    
    public void setStudent(Student student) {
        this.student = student;
    }
    
    public Course getCourse() {
        return course;
    }
    
    public void setCourse(Course course) {
        this.course = course;
    }
    
    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }
    
    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
    
    public EnrollmentStatus getStatus() {
        return status;
    }
    
    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }
    
    public Double getGrade() {
        return grade;
    }
    
    public void setGrade(Double grade) {
        this.grade = grade;
        this.gradeLetter = calculateGradeLetter(grade);
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getGradeLetter() {
        return gradeLetter;
    }
    
    public void setGradeLetter(String gradeLetter) {
        this.gradeLetter = gradeLetter;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // Helper method to calculate grade letter
    private String calculateGradeLetter(Double grade) {
        if (grade == null) return null;
        
        if (grade >= 90) return "A";
        else if (grade >= 80) return "B";
        else if (grade >= 70) return "C";
        else if (grade >= 60) return "D";
        else return "F";
    }
    
    @Override
    public String toString() {
        return "Enrollment{" +
                "id=" + id +
                ", student=" + (student != null ? student.getFullName() : "null") +
                ", course=" + (course != null ? course.getTitle() : "null") +
                ", enrollmentDate=" + enrollmentDate +
                ", status=" + status +
                ", grade=" + grade +
                ", gradeLetter='" + gradeLetter + '\'' +
                '}';
    }
    
    public enum EnrollmentStatus {
        ENROLLED, COMPLETED, DROPPED, WITHDRAWN
    }
}
