import { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { setUser, setIsLoggedIn } from "../../store/actions/userActions";
import { useMutation } from "react-query";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

// Validation schema for the form fields using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  instructions: Yup.string().required("Instruction is required"),
  preparation_time: Yup.number().required("Preparation time is required"),
  serving_size: Yup.number().required("Serving size is required"),
  image_url: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  ingredients: Yup.array().of(
    Yup.object().shape({
      quantity: Yup.string().required("Quantity is required"),
      name: Yup.string().required("Ingredient is required"),
    })
  ),
});

function EditRecipeForm({ recipe }) {
  const { isLoggedIn } = useSelector((state) => state.user); // Get the isLoggedIn state from the user slice of the Redux store
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const [openErrorMessageBox, setOpenErrorMessageBox] = useState(false); // State for the snackbar MessageBox status
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false); // State for the snackbar MessageBox status
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  // Prop types for the EditRecipeForm component
  EditRecipeForm.propTypes = {
    recipe: PropTypes.object,
  };

  // Destructure the recipe object
  const {
    id,
    title,
    instructions,
    preparation_time,
    serving_size,
    image_url,
    recipe_ingredients,
  } = recipe;

  // Map the recipe ingredients to the required format for the form
  const ingredients = recipe_ingredients.map((ingredient) => {
    return {
      id: ingredient.ingredient.id,
      quantity: ingredient.quantity,
      name: ingredient.ingredient.name,
    };
  });

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
   * Function to update the recipe on the server using axios patch request
   * @async
   * @function
   * @param {Object} updatedRecipe - Updated recipe object
   * @returns {Promise<Object>}
   */
  const updateRecipe = async (updatedRecipe) => {
    const response = await axios.patch(
      `/api/recipes/${updatedRecipe.id}`,
      updatedRecipe
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

  // Mutation to update the recipe on the server
  const updateRecipeMutation = useMutation(updateRecipe, {
    onSuccess: (response) => {
      setOpenSuccessMessageBox(true);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.error);
      setOpenErrorMessageBox(true);
    },
  });

  // Display a loading spinner while fetching the user data
  if (isLoading) {
    return <CircularProgress />;
  }

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  // Initial values for the form fields using Formik
  let initialValues = {
    id: id,
    title: title,
    instructions: instructions,
    preparation_time: preparation_time,
    serving_size: serving_size,
    image_url: image_url,
    user_id: isLoggedIn && loginUser ? loginUser.id : "",
    ingredients: ingredients,
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ marginTop: 16, paddingBottom: 8 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          updateRecipeMutation.mutate(values, {
            onSuccess: () => {
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
                  Edit Recipe
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" gutterBottom>
                  Edit your recipe here
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Field name="title" as={TextField} label="Title" fullWidth />
                <ErrorMessage
                  name="title"
                  component="div"
                  style={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="instructions"
                  as={TextField}
                  label="Instructions"
                  fullWidth
                  multiline
                  rows={4}
                />
                <ErrorMessage
                  name="instructions"
                  component="div"
                  style={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="preparation_time"
                  as={TextField}
                  label="Preparation Time (minutes)"
                  fullWidth
                  type="number"
                />
                <ErrorMessage
                  name="preparation_time"
                  component="div"
                  style={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="serving_size"
                  as={TextField}
                  label="Serving Size"
                  fullWidth
                  type="number"
                />
                <ErrorMessage
                  name="serving_size"
                  component="div"
                  style={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="image_url"
                  as={TextField}
                  label="Image URL"
                  fullWidth
                />
                <ErrorMessage
                  name="image_url"
                  component="div"
                  style={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <Grid container spacing={2}>
                      {values.ingredients.map((ingredient, index) => (
                        <Grid item xs={12} key={index}>
                          <Grid container spacing={2}>
                            <Grid item xs={2}>
                              <Field
                                name={`ingredients[${index}].quantity`}
                                as={TextField}
                                label={`Quantity`}
                                fullWidth
                              />
                              <ErrorMessage
                                name={`ingredients[${index}].quantity`}
                                component="div"
                                style={{ color: "red" }}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <Field
                                name={`ingredients[${index}].name`}
                                as={TextField}
                                label={`Ingredient ${index + 1} `}
                                fullWidth
                              />
                              <ErrorMessage
                                name={`ingredients[${index}].name`}
                                component="div"
                                style={{ color: "red" }}
                              />
                            </Grid>
                          </Grid>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => remove(index)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Remove
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
                    Update
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
          {"Recipe was updated successfully!"}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default EditRecipeForm;
