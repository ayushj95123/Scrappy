import React, { useState } from "react";
import { TextField, Box, Typography, Stack, Paper } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DumbLogoComponent from "./DumbLogoComponent";
import Button from "../../UIBaseComponents/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );
      console.log(response);

      // Store the access token and refresh token in local storage for now
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setFormData({
        username: "",
        password: "",
      });
      setErrors("");
      console.log("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors("Invalid username or password");
      } else {
        setErrors("Error occurred during login");
      }
    }
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <Stack spacing={2}>
        <Box sx={{ width: "500px", margin: 2 }}>
          <Paper variant="outlined" sx={{ padding: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            {errors && (
              <Typography variant="bodySmall" color="error" gutterBottom>
                {errors}
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
              <Button sx={{ marginY: 1.5 }} type="submit" fullWidth>
                Login
              </Button>
            </form>
            <Typography sx={{ marginY: 2 }} align="center">
              Don't have an account?{" "}
              <Link to="/registration">Create an account</Link>
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ width: "70%" }}>
          <DumbLogoComponent />
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
