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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${id}`);
        fetchCourses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. It may have associated enrollments.');
      }
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await axios.get(`/api/courses/search?title=${searchTerm}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error searching courses:', error);
      }
    } else {
      fetchCourses();
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading courses...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Courses
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/courses/new')}
        >
          Add Course
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search courses by title or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
          {searchTerm && (
            <Button variant="text" onClick={() => { setSearchTerm(''); fetchCourses(); }}>
              Clear
            </Button>
          )}
        </Box>
      </Paper>

      {/* Courses Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Credit Hours</strong></TableCell>
              <TableCell><strong>Capacity</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id} hover>
                <TableCell>
                  <Chip 
                    label={course.code} 
                    color="primary" 
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {course.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
                    {course.description || 'No description'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${course.creditHours || 0} credits`}
                    color="secondary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {course.maxCapacity ? `${course.maxCapacity} students` : 'Unlimited'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/courses/edit/${course.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(course.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary">
                    {searchTerm ? 'No courses found matching your search.' : 'No courses available.'}
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

export default CourseList;
