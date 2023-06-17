import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);

      // Store the access token and refresh token in local storage for now
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setFormData({
        username: '',
        password: ''
      });
      setErrors('');
      onLogin()
      console.log("Login Successful")
      setLoginSuccess(true);

      // Redirect or perform any necessary actions after successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors('Invalid username or password');
      } else {
        setErrors('Error occurred during login');
      }
      setLoginSuccess(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4} p={3} border="1px solid #ccc" borderRadius={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      {errors && (
        <Typography variant="body1" color="error" gutterBottom>
          {errors}
        </Typography>
      )}
      {loginSuccess && (
        <Typography variant="body1" color="success" gutterBottom>
          Login successful!
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
