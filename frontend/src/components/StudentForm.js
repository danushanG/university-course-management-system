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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [student, setStudent] = useState(null);
  const isEditMode = Boolean(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      studentId: '',
      phoneNumber: '',
      academicStatus: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (isEditMode) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/students/${id}`);
      const studentData = response.data;
      setStudent(studentData);
      reset({
        firstName: studentData.firstName || '',
        lastName: studentData.lastName || '',
        email: studentData.email || '',
        studentId: studentData.studentId || '',
        phoneNumber: studentData.phoneNumber || '',
        academicStatus: studentData.academicStatus || 'ACTIVE',
      });
    } catch (error) {
      console.error('Error fetching student:', error);
      setError('Error loading student data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const studentData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        studentId: data.studentId,
        phoneNumber: data.phoneNumber,
        academicStatus: data.academicStatus,
      };

      if (isEditMode) {
        await axios.put(`/api/students/${id}`, studentData);
      } else {
        await axios.post('/api/students', studentData);
      }

      navigate('/students');
    } catch (error) {
      console.error('Error saving student:', error);
      if (error.response?.status === 400) {
        setError('Email or Student ID already exists. Please use different values.');
      } else {
        setError('Error saving student. Please try again.');
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
          onClick={() => navigate('/students')}
          sx={{ mr: 2 }}
        >
          Back to Students
        </Button>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Student' : 'Add New Student'}
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
                name="firstName"
                control={control}
                rules={{
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'First name must be less than 50 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Last name must be less than 50 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="studentId"
                control={control}
                rules={{
                  required: 'Student ID is required',
                  pattern: {
                    value: /^[0-9]{8}$/,
                    message: 'Student ID must be exactly 8 digits',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Student ID"
                    fullWidth
                    error={!!errors.studentId}
                    helperText={errors.studentId?.message}
                    required
                    placeholder="e.g., 20240001"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    placeholder="e.g., 555-0101"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="academicStatus"
                control={control}
                rules={{ required: 'Academic status is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.academicStatus}>
                    <InputLabel>Academic Status</InputLabel>
                    <Select {...field} label="Academic Status">
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                      <MenuItem value="GRADUATED">Graduated</MenuItem>
                      <MenuItem value="SUSPENDED">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/students')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : (isEditMode ? 'Update Student' : 'Create Student')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentForm;
