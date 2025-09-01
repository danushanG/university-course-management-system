# University Course Management System

A modern enterprise application for managing university courses, student registrations, and academic results.

## 🏗️ Architecture

- **Backend**: Spring Boot with JPA/Hibernate
- **Frontend**: React.js with modern UI components
- **Database**: H2 (development) / PostgreSQL (production)
- **Containerization**: Docker
- **Deployment**: Ready for cloud platforms (Render, Heroku, Railway)

## 📁 Project Structure

```
university-course-management/
├── backend/                 # Spring Boot Application
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/                # React.js Application
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml       # Multi-container setup
└── README.md
```

## 🚀 Quick Start

### Manual Startup

#### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Backend will be available at: http://localhost:8080

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```
Frontend will be available at: http://localhost:3000

## 📚 Features

- **Course Management**: Complete CRUD operations for courses with validation
- **Student Registration**: Comprehensive student management with academic status tracking
- **Enrollment System**: Student course enrollments with status management
- **Grade Management**: Track and manage student results with automatic grade letter calculation
- **Modern UI**: Beautiful, responsive design with Material-UI components and gradients
- **RESTful API**: Complete REST endpoints with proper error handling
- **Data Validation**: Input validation and error handling on both frontend and backend
- **Search & Filter**: Advanced search and filtering capabilities
- **Real-time Updates**: Dynamic UI updates without page refresh

## 🛠️ Tech Stack

### Backend
- Spring Boot 3.2
- Spring Data JPA
- Spring Web
- H2 Database
- Maven

### Frontend
- React 18
- Material-UI (MUI)
- Axios for API calls
- React Router
- React Hook Form

## 📋 API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/code/{code}` - Get course by code
- `GET /api/courses/search?title={title}` - Search courses by title
- `GET /api/courses/available` - Get courses with available capacity
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `GET /api/students/email/{email}` - Get student by email
- `GET /api/students/student-id/{studentId}` - Get student by student ID
- `GET /api/students/search?name={name}` - Search students by name
- `GET /api/students/status/{status}` - Get students by academic status
- `POST /api/students` - Register new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/{id}` - Get enrollment by ID
- `GET /api/enrollments/student/{studentId}` - Get enrollments by student
- `GET /api/enrollments/course/{courseId}` - Get enrollments by course
- `GET /api/enrollments/status/{status}` - Get enrollments by status
- `GET /api/enrollments/with-grades` - Get enrollments with grades
- `POST /api/enrollments` - Enroll student in course
- `PUT /api/enrollments/{id}/status` - Update enrollment status
- `PUT /api/enrollments/{id}/grade` - Update enrollment grade
- `DELETE /api/enrollments/{id}` - Delete enrollment



## 🐳 Deployment

The application is containerized and ready for deployment on:

### Cloud Platforms
- **Render**: Easy deployment with automatic builds
- **Heroku**: Simple deployment with Git integration
- **Railway**: Fast deployment with automatic scaling

### Production Considerations
- Replace H2 database with PostgreSQL or MySQL
- Configure environment variables for database connections
- Set up proper CORS configuration for production domains
- Enable HTTPS/SSL certificates
- Configure logging and monitoring
- Set up CI/CD pipelines for automated deployments

### Environment Variables
```bash
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/universitydb
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# Server Configuration
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=production



# CORS Configuration
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

## 👥 Target Audience

This project is designed for undergraduate students learning:
- **Full-stack development** with modern technologies
- **Spring Boot microservices** and RESTful API design
- **React.js frontend development** with Material-UI
- **Database design** and JPA/Hibernate ORM
- **Modern software architecture** and best practices
- **Containerization** with Docker and Docker Compose
- **DevOps practices** and cloud deployment

## 🎯 Learning Objectives

- Build a complete enterprise application
- RESTful API design principles and implementation
- Modern frontend development with React and Material-UI
- Database relationships and JPA entity management
- Form validation and error handling
- Responsive design and user experience
- Containerization and deployment strategies
- Version control and collaborative development

## 📖 Project Structure Explanation

### Backend Architecture
- **Entities**: JPA entities representing database tables
- **Repositories**: Data access layer using Spring Data JPA
- **Controllers**: REST API endpoints for client communication
- **Configuration**: Application settings and CORS configuration
- **Data Loading**: Sample data for testing and demonstration

### Frontend Architecture
- **Components**: Reusable UI components using Material-UI
- **Routing**: Client-side routing with React Router
- **State Management**: Local state management with React hooks
- **API Integration**: HTTP requests using Axios
- **Form Handling**: Form validation with React Hook Form

## 🧪 Testing the Application

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing
- Use the H2 Console at http://localhost:8080/h2-console
- Test API endpoints using Postman or curl
- Sample data is automatically loaded on startup

## 🔧 Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 8080 and 3000 are available
2. **Java version**: Ensure Java 17+ is installed
3. **Node.js version**: Ensure Node.js 18+ is installed
4. **Database connection**: Check H2 console for database issues
5. **CORS errors**: Verify CORS configuration in backend

### Getting Help
- Check the application logs for error messages
- Verify all dependencies are installed correctly
- Ensure all required services are running
- Review the API documentation for endpoint details

## Author
- Danushan (CT/2019/032)
