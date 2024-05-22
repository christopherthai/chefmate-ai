import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useQuery } from "react-query";
import axiosInstance from "../services/axiosInstance";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

/**
 * Fetch recipes from the server
 * @param {string} ingredients - The ingredients to search for
 * @returns {Promise} - The response data
 */
const fetchRecipes = async (ingredients) => {
  const response = await axiosInstance.post("/recipes", {
    prompt: `Provide recipes using the following ingredients: ${ingredients}`,
    max_tokens: 150,
  });
  return response.data;
};

/**
 * Initial values for the form
 * @type {Object}
 * @property {string} ingredient - The ingredient to search for
 * @returns {Object} - The initial values
 */
const initialValues = {
  ingredient: "",
};

/**
 * The home page component
 * @returns {JSX.Element} - The home page component
 */
function HomePage() {
  const [ingredients, setIngredients] = useState(""); // Ingredients state for the search form
  const { data, isLoading, error, refresh } = useQuery(
    ["recipes", ingredients],
    () => fetchRecipes(ingredients),
    {
      enabled: false, // Disable automatic fetching
    }
  );
  return (
    <Container sx={{ marginTop: 19 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        AI Recipe Generator
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setIngredients(values.ingredient);
          refresh();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Field
                as={TextField}
                name="ingredient"
                label="Enter Ingredients"
                variant="outlined"
                fullWidth
                error={touched.ingredient && !!errors.ingredient}
                helperText={touched.ingredient && errors.ingredient}
                sx={{ width: "60%" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
              >
                Search
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {isLoading && (
        <Typography variant="body1">
          <CircularProgress size={40} />
        </Typography>
      )}
      {error && (
        <Typography>
          <ErrorOutlineIcon /> Error fetching recipes
        </Typography>
      )}
      {data && (
        <Grid container spacing={2}>
          {data.choices.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://via.placeholder.com/150?text=Recipe+Image+${
                    index + 1
                  }`} // Placeholder image
                  alt={`Recipe ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="h6">Recipe {index + 1}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomePage;
