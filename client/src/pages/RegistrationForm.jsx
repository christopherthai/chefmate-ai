import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import {
  Box,
  Button,
  Typography,
  Container,
  Avatar,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../store/actions/userActions";

/**
 * Validation schema for the registration form
 * @constant
 * @type {Yup.ObjectSchema}
 */
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .required("Email is required"),
});

/**
 * Initial values for the registration form
 * @constant
 * @type {Object}
 */
const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
};

function RegistrationForm() {
  const navigate = useNavigate(); // Navigation object
  const [open, setOpen] = useState(false); // State for the snackbar open status
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const [errorMessage, setErrorMessage] = useState(""); // Add this line

  /**
   * Snackbar close handler function
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const registrationMutation = useMutation(
    (values) => axios.post("/api/users/register", values),
    {
      onSuccess: (user_data) => {
        console.log("Registration:", user_data.data);
        dispatch(setUser(user_data.data));
        dispatch(setIsLoggedIn(true));
        navigate("/");
      },
      onError: (error) => {
        console.error("Error logging in:", error.response.data.error);
        setErrorMessage(error.response.data.error);
        setOpen(true);
      },
    }
  );

  const handleSubmit = (values, { setSubmitting }) => {
    registrationMutation.mutate(values);
    setSubmitting(false);
  };

  /**
   * Navigates to the login page
   * @function
   * @returns {void}
   */
  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: 25, paddingBottom: "31rem" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ paddingBottom: "1rem" }}>
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  variant="outlined"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  variant="outlined"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  variant="outlined"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleGoToLogin}
                >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
}
export default RegistrationForm;
