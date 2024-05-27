import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginPrompt from "../components/LoginPrompt";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { setUser, setIsLoggedIn } from "../store/userSlice";
import { motion } from "framer-motion";

// Validation schema for the form fields using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  instructions: Yup.string()
    .min(10, "Instructions must be at least 10 characters")
    .required("Instruction is required"),
  preparation_time: Yup.number().required("Preparation time is required"),
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

function CreateRecipeForm() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openErrorMessageBox, setOpenErrorMessageBox] = useState(false);
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorMessageBox(false);
  };

  const handleCloseSuccessMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMessageBox(false);
  };

  const createRecipe = async (newRecipe) => {
    const response = await axios.post(
      `/api/users/${loginUser.id}/create-recipes`,
      newRecipe
    );
    return response.data;
  };

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

  const {
    data: loginUser,
    isLoading,
    isError,
  } = useQuery("loginUser", checkSession);

  const createRecipeMutation = useMutation(createRecipe, {
    onSuccess: () => {
      setOpenSuccessMessageBox(true);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.error);
      setOpenErrorMessageBox(true);
    },
  });

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

  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

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
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="h4" align="center" gutterBottom>
                        Create a New Recipe
                      </Typography>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Typography variant="h5" align="center" gutterBottom>
                        Fill out the form below to create and share a new recipe
                      </Typography>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Field
                        name="title"
                        as={TextField}
                        label="Title"
                        fullWidth
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
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
                    </motion.div>
                  </Grid>
                  <Grid item xs={6}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
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
                    </motion.div>
                  </Grid>
                  <Grid item xs={6}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
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
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
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
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray name="ingredients">
                      {({ push, remove }) => (
                        <Grid container spacing={2}>
                          {values.ingredients.map((ingredient, index) => (
                            <Grid item xs={12} key={index}>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.5,
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
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
                                  <Grid item xs={9}>
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
                                  <DeleteIcon />
                                </Button>
                              </motion.div>
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
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    push({ quantity: "", name: "" })
                                  }
                                  sx={{ mt: 4 }}
                                >
                                  Add Ingredient
                                </Button>
                              </motion.div>
                            </Grid>
                          </Box>
                        </Grid>
                      )}
                    </FieldArray>
                  </Grid>
                  <Box style={{ marginLeft: "auto", marginTop: "-5.34rem" }}>
                    <Grid item xs={12}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </motion.div>
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
