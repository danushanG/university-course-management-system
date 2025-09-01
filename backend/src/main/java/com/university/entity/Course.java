package com.university.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Course title is required")
    @Size(min = 3, max = 100, message = "Course title must be between 3 and 100 characters")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Course code is required")
    @Size(min = 2, max = 10, message = "Course code must be between 2 and 10 characters")
    @Column(unique = true, nullable = false)
    private String code;
    
    @Column(length = 500)
    private String description;
    
    @Column(name = "credit_hours")
    private Integer creditHours;
    
    @Column(name = "max_capacity")
    private Integer maxCapacity;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Enrollment> enrollments = new HashSet<>();
    
    // Constructors
    public Course() {}
    
    public Course(String title, String code) {
        this.title = title;
        this.code = code;
    }
    
    public Course(String title, String code, String description, Integer creditHours) {
        this.title = title;
        this.code = code;
        this.description = description;
        this.creditHours = creditHours;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getCreditHours() {
        return creditHours;
    }
    
    public void setCreditHours(Integer creditHours) {
        this.creditHours = creditHours;
    }
    
    public Integer getMaxCapacity() {
        return maxCapacity;
    }
    
    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
    
    public Set<Enrollment> getEnrollments() {
        return enrollments;
    }
    
    public void setEnrollments(Set<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }
    
    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", code='" + code + '\'' +
                ", description='" + description + '\'' +
                ", creditHours=" + creditHours +
                ", maxCapacity=" + maxCapacity +
                '}';
    }
}
