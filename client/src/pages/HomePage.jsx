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
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";

/**
 * Fetch recipes from the server
 * @param {string} ingredients - The ingredients to search for
 * @returns {Promise} - The response data
 */
const fetchRecipes = async (ingredients) => {
  const response = await axios.post("/api/recipes/suggestions", {
    ingredients,
  });
  return response.data.recipes;
};

/**
 * Initial values for the form
 * @type {Object}
 * @property {string} ingredients - The ingredient to search for
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
  const [ingredients, setIngredients] = useState("");

  const { data, error, isLoading, refetch } = useQuery(
    ["recipes", ingredients],
    () => fetchRecipes(ingredients),
    {
      enabled: false, // Disable automatic refetching
    },
    {
      onSuccess: () => {
        console.log("Recipes fetched successfully");
      },
      onError: (error) => {
        console.error("Error fetching recipes", error);
      },
    }
  );
  return (
    <Container sx={{ marginTop: 19 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        AI Recipe Suggester
      </Typography>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ paddingBottom: "20px" }}
      >
        Enter the ingredients you have and we will suggest recipes for you
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setIngredients(values.ingredient);
          refetch();
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <ErrorOutlineIcon style={{ marginRight: "5px" }} />
          <Typography>No ingredients provided</Typography>
        </Box>
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
