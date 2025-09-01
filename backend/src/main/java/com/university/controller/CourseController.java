package com.university.controller;

import com.university.entity.Course;
import com.university.repository.CourseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    
    @Autowired
    private CourseRepository repo;
    
    // Get all courses
    @GetMapping
    public List<Course> getAll() {
        return repo.findAll();
    }
    
    // Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getById(@PathVariable Long id) {
        Optional<Course> course = repo.findById(id);
        return course.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Get course by code
    @GetMapping("/code/{code}")
    public ResponseEntity<Course> getByCode(@PathVariable String code) {
        Optional<Course> course = repo.findByCode(code);
        return course.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Search courses by title
    @GetMapping("/search")
    public List<Course> searchByTitle(@RequestParam String title) {
        return repo.findByTitleContainingIgnoreCase(title);
    }
    
    // Get available courses (with capacity)
    @GetMapping("/available")
    public List<Course> getAvailableCourses() {
        return repo.findAvailableCourses();
    }
    
    // Create new course
    @PostMapping
    public ResponseEntity<Course> create(@Valid @RequestBody Course course) {
        // Check if course code already exists
        if (repo.existsByCode(course.getCode())) {
            return ResponseEntity.badRequest().build();
        }
        
        Course savedCourse = repo.save(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }
    
    // Update course
    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable Long id, @Valid @RequestBody Course courseDetails) {
        Optional<Course> courseOptional = repo.findById(id);
        
        if (courseOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Course course = courseOptional.get();
        
        // Check if new code conflicts with existing course
        if (!course.getCode().equals(courseDetails.getCode()) && repo.existsByCode(courseDetails.getCode())) {
            return ResponseEntity.badRequest().build();
        }
        
        course.setTitle(courseDetails.getTitle());
        course.setCode(courseDetails.getCode());
        course.setDescription(courseDetails.getDescription());
        course.setCreditHours(courseDetails.getCreditHours());
        course.setMaxCapacity(courseDetails.getMaxCapacity());
        
        Course updatedCourse = repo.save(course);
        return ResponseEntity.ok(updatedCourse);
    }
    
    // Delete course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Course> course = repo.findById(id);
        
        if (course.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
