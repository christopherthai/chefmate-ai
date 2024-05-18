import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [open, setOpen] = useState(false); // State for the snackbar open status
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

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
      onSuccess: (user_data) => {
        console.log("User logged in:", user_data.data);
        dispatch(setUser(user_data.data));
        dispatch(setIsLoggedIn(true));
        navigate("/");
      },
      onError: (error) => {
        console.error("Error logging in:", error);
        setOpen(true);
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
                Log In
              </Button>
            </Form>
          )}
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
            {"Invalid username or password"}
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
