import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: '',
      courseId: '',
      status: 'ENROLLED',
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [studentsRes, coursesRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/courses/available'),
      ]);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading students and courses');
    } finally {
      setLoadingData(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const enrollmentData = {
        studentId: parseInt(data.studentId),
        courseId: parseInt(data.courseId),
        status: data.status,
      };

      await axios.post('/api/enrollments', enrollmentData);
      navigate('/enrollments');
    } catch (error) {
      console.error('Error creating enrollment:', error);
      if (error.response?.status === 400) {
        setError('Student is already enrolled in this course or course is at capacity.');
      } else {
        setError('Error creating enrollment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/enrollments')}
          sx={{ mr: 2 }}
        >
          Back to Enrollments
        </Button>
        <Typography variant="h4" component="h1">
          New Enrollment
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="studentId"
                control={control}
                rules={{ required: 'Student is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.studentId}>
                    <InputLabel>Student</InputLabel>
                    <Select {...field} label="Student">
                      {students.map((student) => (
                        <MenuItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName} ({student.studentId})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="courseId"
                control={control}
                rules={{ required: 'Course is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.courseId}>
                    <InputLabel>Course</InputLabel>
                    <Select {...field} label="Course">
                      {courses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.code} - {course.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Enrollment Status</InputLabel>
                    <Select {...field} label="Enrollment Status">
                      <MenuItem value="ENROLLED">Enrolled</MenuItem>
                      <MenuItem value="COMPLETED">Completed</MenuItem>
                      <MenuItem value="DROPPED">Dropped</MenuItem>
                      <MenuItem value="WITHDRAWN">Withdrawn</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/enrollments')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Create Enrollment'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EnrollmentForm;
