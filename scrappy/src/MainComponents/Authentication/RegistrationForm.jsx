import React, { useState } from "react";
import { TextField, Box, Typography, Paper, Stack } from "@mui/material";
import axios from "axios";
import "./RegistrationForm.scss";
import { useNavigate } from "react-router-dom";
import DumbLogoComponent from "./DumbLogoComponent";
import Button from "../../UIBaseComponents/Button";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const validationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    // Username validation
    if (!formData.username) {
      validationErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      validationErrors.username =
        "Username must contain only alphanumeric characters";
    } else if (formData.username.length < 8 || formData.username.length > 30) {
      validationErrors.username =
        "Username must be between 8 and 30 characters long";
    }

    // Phone number validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number format";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        formData
      );
      const responseData = response.data;

      if (response.status === 201) {
        // Successful registration
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          phoneNumber: "",
        });
        setErrors({});
        setRegistrationError("");
        setRegistrationSuccess(responseData.message);
        navigate("/");
      } else {
        // Display error message for 401 and 500 status codes
        setErrors({});
        setRegistrationSuccess("");
        setRegistrationError(responseData.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrors({});
      setRegistrationSuccess("");
      setRegistrationError(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <Stack spacing={2}>
        <Box sx={{ width: "500px", margin: 2 }}>
          <Paper variant="outlined" sx={{ padding: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Registration Form
            </Typography>
            {registrationError && (
              <Typography variant="bodySmall" color="error" gutterBottom>
                {registrationError}
              </Typography>
            )}
            {registrationSuccess && (
              <Typography variant="bodySmall" color="success" gutterBottom>
                {registrationSuccess}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={errors.name ? true : false}
                helperText={errors.name}
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={errors.username ? true : false}
                helperText={errors.username}
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
                error={errors.password ? true : false}
                helperText={errors.password}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                fullWidth
                margin="normal"
                required
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                margin="normal"
                required
                error={errors.email ? true : false}
                helperText={errors.email}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber}
              />
              <Button type="submit" fullWidth sx={{ marginY: 1.5 }}>
                Register
              </Button>
            </form>
          </Paper>
        </Box>
        <Box sx={{ width: "70%" }}>
          <DumbLogoComponent />
        </Box>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;
