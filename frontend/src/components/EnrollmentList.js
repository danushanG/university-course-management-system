import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';
import axios from 'axios';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('/api/enrollments');
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        await axios.delete(`/api/enrollments/${id}`);
        fetchEnrollments(); // Refresh the list
      } catch (error) {
        console.error('Error deleting enrollment:', error);
        alert('Error deleting enrollment.');
      }
    }
  };

  const handleStatusChange = async (enrollmentId, newStatus) => {
    try {
      await axios.put(`/api/enrollments/${enrollmentId}/status`, { status: newStatus });
      fetchEnrollments(); // Refresh the list
    } catch (error) {
      console.error('Error updating enrollment status:', error);
      alert('Error updating enrollment status.');
    }
  };

  const handleGradeUpdate = async (enrollmentId, grade) => {
    if (grade < 0 || grade > 100) {
      alert('Grade must be between 0 and 100');
      return;
    }

    try {
      await axios.put(`/api/enrollments/${enrollmentId}/grade`, { grade: parseFloat(grade) });
      fetchEnrollments(); // Refresh the list
    } catch (error) {
      console.error('Error updating grade:', error);
      alert('Error updating grade.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ENROLLED': return 'primary';
      case 'COMPLETED': return 'success';
      case 'DROPPED': return 'error';
      case 'WITHDRAWN': return 'warning';
      default: return 'default';
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'success';
    if (grade >= 80) return 'primary';
    if (grade >= 70) return 'warning';
    return 'error';
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.student?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.student?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course?.code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || enrollment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading enrollments...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Enrollments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/enrollments/new')}
        >
          New Enrollment
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Search by student name or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="ENROLLED">Enrolled</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="DROPPED">Dropped</MenuItem>
              <MenuItem value="WITHDRAWN">Withdrawn</MenuItem>
            </Select>
          </FormControl>
          {(searchTerm || statusFilter) && (
            <Button variant="text" onClick={() => { setSearchTerm(''); setStatusFilter(''); }}>
              Clear
            </Button>
          )}
        </Box>
      </Paper>

      {/* Enrollments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>Course</strong></TableCell>
              <TableCell><strong>Enrollment Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Grade</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEnrollments.map((enrollment) => (
              <TableRow key={enrollment.id} hover>
                <TableCell>
                  <Typography variant="subtitle1">
                    {enrollment.student?.firstName} {enrollment.student?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {enrollment.student?.studentId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {enrollment.course?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {enrollment.course?.code}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {enrollment.enrollmentDate ? new Date(enrollment.enrollmentDate).toLocaleDateString() : 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <FormControl size="small">
                    <Select
                      value={enrollment.status}
                      onChange={(e) => handleStatusChange(enrollment.id, e.target.value)}
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="ENROLLED">Enrolled</MenuItem>
                      <MenuItem value="COMPLETED">Completed</MenuItem>
                      <MenuItem value="DROPPED">Dropped</MenuItem>
                      <MenuItem value="WITHDRAWN">Withdrawn</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={enrollment.grade || ''}
                      onChange={(e) => handleGradeUpdate(enrollment.id, e.target.value)}
                      sx={{ width: 80 }}
                      inputProps={{ min: 0, max: 100, step: 0.1 }}
                    />
                    {enrollment.gradeLetter && (
                      <Chip
                        label={enrollment.gradeLetter}
                        color={getGradeColor(enrollment.grade)}
                        size="small"
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(enrollment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredEnrollments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary">
                    {searchTerm || statusFilter ? 'No enrollments found matching your criteria.' : 'No enrollments available.'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EnrollmentList;
