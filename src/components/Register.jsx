import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shanture-backend-4s8t.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      setSuccess('User registered successfully');
      setError(null);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: '#1d1d1d' }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff', backgroundColor: '#2a2a2a' } }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff', backgroundColor: '#2a2a2a' } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff', backgroundColor: '#2a2a2a' } }}
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
          <Button onClick={() => navigate('/login')} color="secondary">
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;