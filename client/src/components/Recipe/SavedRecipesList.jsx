import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import {
  CircularProgress,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import RecipeCard from "./RecipeCard";

/**
 * The SavedRecipesList component displays a list of saved recipes
 * @component
 * @return {JSX.Element} The SavedRecipesList component
 */
function SavedRecipesList() {
  const { user } = useSelector((state) => state.user); // Get user from Redux store

  /**
   * Fetches the saved recipes from the server
   * @returns {Promise<Array>} An array of saved recipe objects
   * @throws {Error} An error if the request fails
   * @async
   * @function
   */
  const fetchSavedRecipes = async () => {
    const { data } = await axios.get(`/api/users/${user.id}/saved-recipes`);
    return data;
  };

  // Fetch the saved recipes from the server
  const {
    data: savedRecipes,
    isLoading,
    isError,
  } = useQuery("savedRecipes", fetchSavedRecipes);

  // Display a loading spinner while fetching the saved recipes
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

  return (
    <Container maxWidth="lg" sx={{ pt: 5, pb: 8, pl: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Saved Recipes
      </Typography>
      <Grid container spacing={3}>
        {savedRecipes.saved_recipes && savedRecipes.saved_recipes.length > 0 ? (
          savedRecipes.saved_recipes.map((recipe) => (
            <RecipeCard recipe={recipe.recipe} key={recipe.recipe.id} />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              No saved recipes found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default SavedRecipesList;
