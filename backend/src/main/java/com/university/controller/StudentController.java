package com.university.controller;

import com.university.entity.Student;
import com.university.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    
    @Autowired
    private StudentRepository repo;
    
    // Get all students
    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }
    
    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable Long id) {
        Optional<Student> student = repo.findById(id);
        return student.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // Get student by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getByEmail(@PathVariable String email) {
        Optional<Student> student = repo.findByEmail(email);
        return student.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // Get student by student ID
    @GetMapping("/student-id/{studentId}")
    public ResponseEntity<Student> getByStudentId(@PathVariable String studentId) {
        Optional<Student> student = repo.findByStudentId(studentId);
        return student.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // Search students by name
    @GetMapping("/search")
    public List<Student> searchByName(@RequestParam String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }
    
    // Get students by academic status
    @GetMapping("/status/{status}")
    public List<Student> getByStatus(@PathVariable Student.AcademicStatus status) {
        return repo.findByAcademicStatus(status);
    }
    
    // Create new student
    @PostMapping
    public ResponseEntity<Student> create(@Valid @RequestBody Student student) {
        // Check if email already exists
        if (repo.existsByEmail(student.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        
        // Check if student ID already exists
        if (repo.existsByStudentId(student.getStudentId())) {
            return ResponseEntity.badRequest().build();
        }
        
        Student savedStudent = repo.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }
    
    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @Valid @RequestBody Student studentDetails) {
        Optional<Student> studentOptional = repo.findById(id);
        
        if (studentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Student student = studentOptional.get();
        
        // Check if new email conflicts with existing student
        if (!student.getEmail().equals(studentDetails.getEmail()) && repo.existsByEmail(studentDetails.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        
        // Check if new student ID conflicts with existing student
        if (!student.getStudentId().equals(studentDetails.getStudentId()) && repo.existsByStudentId(studentDetails.getStudentId())) {
            return ResponseEntity.badRequest().build();
        }
        
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setStudentId(studentDetails.getStudentId());
        student.setDateOfBirth(studentDetails.getDateOfBirth());
        student.setPhoneNumber(studentDetails.getPhoneNumber());
        student.setAcademicStatus(studentDetails.getAcademicStatus());
        
        Student updatedStudent = repo.save(student);
        return ResponseEntity.ok(updatedStudent);
    }
    
    // Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Student> student = repo.findById(id);
        
        if (student.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
