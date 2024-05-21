import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { CircularProgress, Typography, Grid, Container } from "@mui/material";
import RecipeCard from "./RecipeCard";

/**
 * The CreatedRecipesList component displays a list of created recipes
 * @component
 * @return {JSX.Element} The CreatedRecipesList component
 * */
function CreatedRecipesList() {
  const { user } = useSelector((state) => state.user); // Get user from Redux store

  /**
   * Fetches the created recipes from the server
   * @returns {Promise<Array>} An array of created recipe objects
   * @throws {Error} An error if the request fails
   * @async
   * @function
   * */
  const fetchCreatedRecipes = async () => {
    const { data } = await axios.get(`/api/users/${user.id}/recipes`);
    return data;
  };

  // Fetch the created recipes from the server
  const {
    data: createdRecipes,
    isLoading,
    isError,
  } = useQuery("createdRecipes", fetchCreatedRecipes);

  // Display a loading spinner while fetching the created recipes
  if (isLoading) {
    return <CircularProgress />;
  }

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 5, pb: 1, pl: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Created Recipes
      </Typography>
      <Grid container spacing={3}>
        {createdRecipes.recipes && createdRecipes.recipes.length > 0 ? (
          createdRecipes.recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <Typography variant="h5">
            You have not created any recipes yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default CreatedRecipesList;
