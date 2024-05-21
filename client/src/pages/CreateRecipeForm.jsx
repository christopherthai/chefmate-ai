import { useSelector } from "react-redux";
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
} from "@mui/material";

// Validation schema for the form fields using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  instructions: Yup.string().required("Instruction is required"),
  preparation_time: Yup.number().required("Preparation time is required"),
  serving_size: Yup.number().required("Serving size is required"),
  image_url: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  ingredients: Yup.array()
    .of(Yup.string().required("Ingredient is required"))
    .min(1, "At least one ingredient is required"),
});

// Initial values for the form fields using Formik
const initialValues = {
  title: "",
  instructions: "",
  preparation_time: "",
  serving_size: "",
  image_url: "",
  ingredients: [""],
};

/**
 * CreateRecipeForm component is a form that allows users to create a new recipe.
 * It uses Formik for form state management and Yup for form validation.
 * @returns {JSX.Element} CreateRecipeForm component
 * @component
 */
function CreateRecipeForm() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
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
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center " gutterBottom>
                      Create Recipe
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                              <Field
                                name={`ingredients[${index}]`}
                                as={TextField}
                                label={`Ingredient ${index + 1}`}
                                fullWidth
                              />
                              <ErrorMessage
                                name={`ingredients[${index}]`}
                                component="div"
                                style={{ color: "red" }}
                              />
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
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      ) : (
        <LoginPrompt />
      )}
    </>
  );
}

export default CreateRecipeForm;
