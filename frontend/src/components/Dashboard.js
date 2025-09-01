import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEnrollments: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, studentsRes, enrollmentsRes] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/students'),
        axios.get('/api/enrollments'),
      ]);

      setStats({
        totalCourses: coursesRes.data.length,
        totalStudents: studentsRes.data.length,
        totalEnrollments: enrollmentsRes.data.length,
      });

      // Get recent courses (last 5)
      setRecentCourses(coursesRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, gradient }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: gradient,
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              p: 2,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            {React.cloneElement(icon, { sx: { color: 'white', fontSize: 28 } })}
          </Box>
          <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {value}
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, path, color }) => (
    <Card
      component={RouterLink}
      to={path}
      sx={{
        height: '100%',
        textDecoration: 'none',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(255,255,255,0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '& .MuiTypography-root': {
            color: 'white',
          },
          '& .MuiBox-root': {
            backgroundColor: 'rgba(255,255,255,0.2)',
          },
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 2,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            {React.cloneElement(icon, { sx: { color: 'white', fontSize: 24 } })}
          </Box>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              transition: 'color 0.3s ease',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            transition: 'color 0.3s ease',
            mb: 2,
          }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ArrowForwardIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <LinearProgress sx={{ width: '100%', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            mb: 1,
          }}
        >
          Welcome to Course Management
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ textAlign: 'center', mb: 4 }}
        >
          Manage your university courses, students, and enrollments efficiently
        </Typography>
      </Box>
      
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<SchoolIcon />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<PeopleIcon />}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Enrollments"
            value={stats.totalEnrollments}
            icon={<AssignmentIcon />}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="Add Course"
                description="Create a new course"
                icon={<AddIcon sx={{ color: 'white' }} />}
                path="/courses/new"
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="Add Student"
                description="Register a new student"
                icon={<AddIcon sx={{ color: 'white' }} />}
                path="/students/new"
                color="#2e7d32"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="New Enrollment"
                description="Enroll student in course"
                icon={<AddIcon sx={{ color: 'white' }} />}
                path="/enrollments/new"
                color="#ed6c02"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="View Reports"
                description="View enrollment statistics"
                icon={<TrendingUpIcon sx={{ color: 'white' }} />}
                path="/enrollments"
                color="#9c27b0"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Courses */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Recent Courses
          </Typography>
          <Paper 
            sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            <List>
              {recentCourses.map((course, index) => (
                <ListItem 
                  key={course.id}
                  sx={{
                    borderBottom: index < recentCourses.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Box
                      sx={{
                        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SchoolIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {course.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip 
                          label={course.code} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {course.creditHours || 0} credits
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
              {recentCourses.length === 0 && (
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                        No courses available
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
