import { useState } from "react";
import { useSelector } from "react-redux";
import LoginPrompt from "../components/LoginPrompt";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { setUser, setIsLoggedIn } from "../store/userSlice";
import { useMutation } from "react-query";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "formik-mui";

// Validation schema for the form fields using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  instructions: Yup.string()
    .min(10, "Instructions must be at least 10 characters")
    .required("Instruction is required"),
  preparation_time: Yup.number()
    .required("Preparation time is required")
    .min(1, "Must be greater than 0"),
  serving_size: Yup.number().required("Serving size is required"),
  image_url: Yup.string()
    .required("Image URL is required")
    .test(
      "isValidUrl",
      "Must be a valid URL",
      (value) => value.startsWith("http://") || value.startsWith("https://")
    )
    .test(
      "isValidFile",
      "Must be a valid image file",
      (value) =>
        value.endsWith(".png") ||
        value.endsWith(".jpg") ||
        value.endsWith(".jpeg")
    ),
  ingredients: Yup.array().of(
    Yup.object().shape({
      quantity: Yup.string().required("Quantity is required"),
      name: Yup.string().required("Ingredient is required"),
    })
  ),
});

/**
 * CreateRecipeForm component is a form that allows users to create a new recipe.
 * It uses Formik for form state management and Yup for form validation.
 * @returns {JSX.Element} CreateRecipeForm component
 * @component
 */
function CreateRecipeForm() {
  const { isLoggedIn } = useSelector((state) => state.user); // Get the isLoggedIn state from the user slice of the Redux store
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const [openErrorMessageBox, setOpenErrorMessageBox] = useState(false);
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  /**
   * Snackbar close handler function for error message
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleCloseErrorMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorMessageBox(false);
  };

  /**
   * Snackbar close handler function for success message
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleCloseSuccessMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMessageBox(false);
  };

  /**
   * Create a new recipe on the server using the POST /api/users/:id/create-recipes route
   * @async
   * @function
   * @param {Object} newRecipe - New recipe object
   * @returns {Promise<Object>}
   */
  const createRecipe = async (newRecipe) => {
    const response = await axios.post(
      `/api/users/${loginUser.id}/create-recipes`,
      newRecipe
    );
    return response.data;
  };

  /**
   * Function to check the session of the user
   * @async
   * @function
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  const checkSession = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || accessToken.split(".").length !== 3) {
      dispatch(setIsLoggedIn(false));
      return null;
    }
    try {
      const response = await axios.get("/api/users/check-session", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      localStorage.removeItem("accessToken");
      dispatch(setIsLoggedIn(false));
      return null;
    }
  };

  // Fetch the user data from the server
  const {
    data: loginUser,
    isLoading,
    isError,
  } = useQuery("loginUser", checkSession);

  // Mutation to create a new recipe on the server using the createRecipe function
  const createRecipeMutation = useMutation(createRecipe, {
    onSuccess: () => {
      setOpenSuccessMessageBox(true);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.error);
      setOpenErrorMessageBox(true);
    },
  });

  // Display a loading spinner while fetching the recipes
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  // Initial values for the form fields using Formik
  let initialValues = {
    title: "",
    instructions: "",
    preparation_time: "",
    serving_size: "",
    image_url: "",
    user_id: isLoggedIn && loginUser ? loginUser.id : "",
    ingredients: [{ quantity: "", name: "" }],
  };

  return (
    <>
      {isLoggedIn ? (
        <Container
          component="main"
          maxWidth="lg"
          sx={{ marginTop: 16, paddingBottom: 8 }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createRecipeMutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                  setOpenSuccessMessageBox(true);
                  setSubmitting(false);
                },
                onError: (error) => {
                  setErrorMessage(error.response.data.error);
                  setOpenErrorMessageBox(true);
                },
              });
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                      Create a New Recipe
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Fill out the form below to create and share a new recipe
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="title"
                      component={TextField}
                      label="Title"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="instructions"
                      component={TextField}
                      label="Instructions"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="preparation_time"
                      component={TextField}
                      label="Preparation Time (minutes)"
                      fullWidth
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="serving_size"
                      component={TextField}
                      label="Serving Size"
                      fullWidth
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="image_url"
                      component={TextField}
                      label="Image URL"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray name="ingredients">
                      {({ push, remove }) => (
                        <Grid container spacing={2}>
                          {values.ingredients.map((ingredient, index) => (
                            <Grid item xs={12} key={index}>
                              <Grid container spacing={2}>
                                <Grid item xs={3}>
                                  <Field
                                    name={`ingredients[${index}].quantity`}
                                    component={TextField}
                                    label={`Quantity`}
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={9}>
                                  <Field
                                    name={`ingredients[${index}].name`}
                                    component={TextField}
                                    label={`Ingredient ${index + 1} `}
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => remove(index)}
                                sx={{ mt: 1, ml: 1 }}
                              >
                                <DeleteIcon />
                              </Button>
                            </Grid>
                          ))}
                          <Box
                            style={{
                              marginRight: "auto",
                              marginLeft: "1rem",
                              marginTop: "-1rem",
                              marginBottom: "2rem",
                            }}
                          >
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                onClick={() => push("")}
                                sx={{ mt: 4 }}
                              >
                                Add Ingredient
                              </Button>
                            </Grid>
                          </Box>
                        </Grid>
                      )}
                    </FieldArray>
                  </Grid>
                  <Box style={{ marginLeft: "auto", marginTop: "-5.34rem" }}>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
          <Snackbar
            open={openErrorMessageBox}
            autoHideDuration={6000}
            onClose={handleCloseErrorMessageBox}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleCloseErrorMessageBox}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={openSuccessMessageBox}
            autoHideDuration={6000}
            onClose={handleCloseSuccessMessageBox}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleCloseSuccessMessageBox}
              severity="success"
              elevation={6}
              variant="filled"
            >
              {"Recipe created successfully"}
            </MuiAlert>
          </Snackbar>
        </Container>
      ) : (
        <LoginPrompt />
      )}
    </>
  );
}

export default CreateRecipeForm;
