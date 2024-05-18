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
 * Handles the form submission
 * @param {Object} values - Form values
 * @param {Object} formikBag - Formik bag
 * @param {Function} formikBag.setSubmitting - Set the submitting state
 * @returns {void}
 *
 */
const handleSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

/**
 * Login form component
 * @component
 * @return {JSX.Element}
 */
function LoginForm() {
  const navigate = useNavigate(); // Navigation object

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
