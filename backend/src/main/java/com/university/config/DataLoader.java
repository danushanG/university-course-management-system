package com.university.config;

import com.university.entity.Course;
import com.university.entity.Student;
import com.university.repository.CourseRepository;
import com.university.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Load sample courses
        loadSampleCourses();
        
        // Load sample students
        loadSampleStudents();
    }
    
    private void loadSampleCourses() {
        if (courseRepository.count() == 0) {
            Course course1 = new Course("Introduction to Computer Science", "CS101", 
                "Fundamental concepts of computer science and programming", 3);
            course1.setMaxCapacity(30);
            courseRepository.save(course1);
            
            Course course2 = new Course("Data Structures and Algorithms", "CS201", 
                "Advanced data structures and algorithm analysis", 4);
            course2.setMaxCapacity(25);
            courseRepository.save(course2);
            
            Course course3 = new Course("Database Management Systems", "CS301", 
                "Design and implementation of database systems", 3);
            course3.setMaxCapacity(20);
            courseRepository.save(course3);
            
            Course course4 = new Course("Web Development", "CS401", 
                "Modern web development with React and Spring Boot", 4);
            course4.setMaxCapacity(35);
            courseRepository.save(course4);
            
            Course course5 = new Course("Software Engineering", "CS501", 
                "Software development methodologies and practices", 3);
            course5.setMaxCapacity(28);
            courseRepository.save(course5);
            
            System.out.println("Sample courses loaded successfully!");
        }
    }
    
    private void loadSampleStudents() {
        if (studentRepository.count() == 0) {
            Student student1 = new Student("John", "Doe", "john.doe@university.edu", "20240001");
            student1.setDateOfBirth(LocalDate.of(2000, 5, 15));
            student1.setPhoneNumber("555-0101");
            studentRepository.save(student1);
            
            Student student2 = new Student("Jane", "Smith", "jane.smith@university.edu", "20240002");
            student2.setDateOfBirth(LocalDate.of(1999, 8, 22));
            student2.setPhoneNumber("555-0102");
            studentRepository.save(student2);
            
            Student student3 = new Student("Mike", "Johnson", "mike.johnson@university.edu", "20240003");
            student3.setDateOfBirth(LocalDate.of(2001, 3, 10));
            student3.setPhoneNumber("555-0103");
            studentRepository.save(student3);
            
            Student student4 = new Student("Sarah", "Williams", "sarah.williams@university.edu", "20240004");
            student4.setDateOfBirth(LocalDate.of(2000, 11, 5));
            student4.setPhoneNumber("555-0104");
            studentRepository.save(student4);
            
            Student student5 = new Student("David", "Brown", "david.brown@university.edu", "20240005");
            student5.setDateOfBirth(LocalDate.of(1998, 12, 18));
            student5.setPhoneNumber("555-0105");
            studentRepository.save(student5);
            
            System.out.println("Sample students loaded successfully!");
        }
    }
}
