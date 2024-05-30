import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../store/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";

/**
 * Validation schema for the login form
 * @constant
 * @type {Yup.ObjectSchema}
 */
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

/**
 * Initial values for the login form
 * @constant
 * @type {Object}
 */
const initialValues = {
  username: "",
  password: "",
};

/**
 * Login form component
 * @component
 * @return {JSX.Element}
 */
function LoginForm() {
  const navigate = useNavigate(); // Navigation object
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const [openMessageBox, setOpenMessageBox] = useState(false); // State for the snackbar openMessageBox status
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  /**
   * Snackbar close handler function
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleCloseMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessageBox(false);
  };

  /**
   * Login mutation function using axios post request to the server
   * @function
   * @param {Object} values - Login form values
   * @returns {Promise}
   * @throws {Error}
   * @returns {void}
   * @async
   */
  const loginMutation = useMutation(
    (values) => axios.post("/api/users/login", values),
    {
      onSuccess: (response) => {
        localStorage.setItem("accessToken", response.data.access_token);
        dispatch(setUser(response.data.user));
        dispatch(setIsLoggedIn(true));
        navigate("/");
      },
      onError: (error) => {
        setErrorMessage(error.response.data.error);
        setOpenMessageBox(true);
      },
    }
  );

  /**
   * Handles the form submission
   * @function
   * @param {Object} values - Form values
   * @param {Object} formikHelpers - Formik helper functions
   * @returns {void}
   */
  const handleSubmit = (values, { setSubmitting }) => {
    loginMutation.mutate(values);
    setSubmitting(false);
  };

  /**
   * Google login mutation function using axios post request to the server
   * with the google token response object
   * @function
   * @param {Object} tokenResponse - Google token response
   * @returns {Promise}
   * @throws {Error}
   */
  const googleLoginMutation = useMutation(
    (tokenResponse) =>
      axios.post("/api/users/google-login", {
        token: tokenResponse.access_token,
      }),
    {
      onSuccess: (response) => {
        localStorage.setItem("accessToken", response.data.access_token);
        dispatch(setUser(response.data.user));
        dispatch(setIsLoggedIn(true));
        navigate("/");
      },
      onError: (error) => {
        setErrorMessage(error.response?.data?.error || "Google login failed");
        setOpenMessageBox(true);
      },
    }
  );

  /**
   * Handles the google login success
   * @function
   * @param {Object} tokenResponse - Google token response
   * @returns {void}
   * @async
   */
  const handleGoogleLoginSuccess = (tokenResponse) => {
    googleLoginMutation.mutate(tokenResponse);
  };

  /**
   * Handles the google login failure
   * @function
   * @returns {void}
   */
  const handleGoogleLoginFailure = () => {
    setErrorMessage("Google login failed");
    setOpenMessageBox(true);
  };

  /**
   * Google login hook function to trigger
   * the google login popup window when the google button is clicked
   * @function
   * @async
   */
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
  });

  /**
   * Navigates to the register page
   * @function
   * @returns {void}
   */
  const handleGoToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: 25, paddingBottom: "42rem" }}
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
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name="username"
                type="text"
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
                sx={{ marginTop: "0px" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {loginMutation.isLoading ? (
                  <CircularProgress size={24} color="action" />
                ) : (
                  "Log In"
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <Box style={{ paddingTop: "10px" }}>
          <GoogleButton onClick={() => googleLogin()}></GoogleButton>
        </Box>
        <Snackbar
          open={openMessageBox}
          autoHideDuration={6000}
          onClose={handleCloseMessageBox}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={handleCloseMessageBox}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: "1rem" }}
        >
          <Grid item>
            <Link
              onClick={handleGoToRegisterPage}
              variant="body2"
              component="button"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LoginForm;
