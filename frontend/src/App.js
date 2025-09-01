import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import StudentList from './components/StudentList';
import EnrollmentList from './components/EnrollmentList';
import CourseForm from './components/CourseForm';
import StudentForm from './components/StudentForm';
import EnrollmentForm from './components/EnrollmentForm';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/enrollments" element={<EnrollmentList />} />
          <Route path="/enrollments/new" element={<EnrollmentForm />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
