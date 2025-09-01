import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [course, setCourse] = useState(null);
  const isEditMode = Boolean(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      code: '',
      description: '',
      creditHours: '',
      maxCapacity: '',
    },
  });

  useEffect(() => {
    if (isEditMode) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/courses/${id}`);
      const courseData = response.data;
      setCourse(courseData);
      reset({
        title: courseData.title || '',
        code: courseData.code || '',
        description: courseData.description || '',
        creditHours: courseData.creditHours || '',
        maxCapacity: courseData.maxCapacity || '',
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Error loading course data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const courseData = {
        title: data.title,
        code: data.code,
        description: data.description,
        creditHours: data.creditHours ? parseInt(data.creditHours) : null,
        maxCapacity: data.maxCapacity ? parseInt(data.maxCapacity) : null,
      };

      if (isEditMode) {
        await axios.put(`/api/courses/${id}`, courseData);
      } else {
        await axios.post('/api/courses', courseData);
      }

      navigate('/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      if (error.response?.status === 400) {
        setError('Course code already exists. Please choose a different code.');
      } else {
        setError('Error saving course. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
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
          onClick={() => navigate('/courses')}
          sx={{ mr: 2 }}
        >
          Back to Courses
        </Button>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Course' : 'Add New Course'}
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
                name="title"
                control={control}
                rules={{
                  required: 'Course title is required',
                  minLength: {
                    value: 3,
                    message: 'Title must be at least 3 characters',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Title must be less than 100 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Course Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="code"
                control={control}
                rules={{
                  required: 'Course code is required',
                  minLength: {
                    value: 2,
                    message: 'Code must be at least 2 characters',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Code must be less than 10 characters',
                  },
                  pattern: {
                    value: /^[A-Z0-9]+$/,
                    message: 'Code must contain only uppercase letters and numbers',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Course Code"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    required
                    placeholder="e.g., CS101"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  maxLength: {
                    value: 500,
                    message: 'Description must be less than 500 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    placeholder="Enter course description..."
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="creditHours"
                control={control}
                rules={{
                  min: {
                    value: 1,
                    message: 'Credit hours must be at least 1',
                  },
                  max: {
                    value: 6,
                    message: 'Credit hours must be at most 6',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Credit Hours"
                    type="number"
                    fullWidth
                    error={!!errors.creditHours}
                    helperText={errors.creditHours?.message}
                    inputProps={{ min: 1, max: 6 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="maxCapacity"
                control={control}
                rules={{
                  min: {
                    value: 1,
                    message: 'Capacity must be at least 1',
                  },
                  max: {
                    value: 100,
                    message: 'Capacity must be at most 100',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Maximum Capacity"
                    type="number"
                    fullWidth
                    error={!!errors.maxCapacity}
                    helperText={errors.maxCapacity?.message || 'Leave empty for unlimited capacity'}
                    inputProps={{ min: 1, max: 100 }}
                    placeholder="Optional"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/courses')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : (isEditMode ? 'Update Course' : 'Create Course')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CourseForm;
