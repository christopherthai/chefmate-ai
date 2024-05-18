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

/**
 * Handles the form submission
 * @param {Object} values - Form values
 * @param {Object} formikBag - Formik bag
 * @param {Function} formikBag.setSubmitting - Set the submitting state
 * @returns {void}
 */
const handleSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

function RegistrationForm() {
  const navigate = useNavigate(); // Navigation object

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
      </Box>
    </Container>
  );
}
export default RegistrationForm;
