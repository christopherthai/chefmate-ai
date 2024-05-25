import axios from "axios";
import { useQuery } from "react-query";
import {
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";

/**
 * Fetches the recipes from the server
 * @returns {Promise<Array>} An array of recipe objects
 * @throws {Error} An error if the request fails
 * @async
 * @function
 */
const fetchRecipes = async () => {
  const { data } = await axios.get("/api/recipes");
  return data;
};

/**
 * The RecipeList component displays a list of recipes
 * @component
 * @return {JSX.Element} The RecipeList component
 */
function RecipeList() {
  const { searchQuery, sortCriteria } = useSelector((state) => state.recipe);

  // Fetch the recipes from the server
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery("recipes", fetchRecipes);

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

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearchQuery = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearchQuery;
  });

  // Sorted recipes based on selected criteria (recent, oldest, shortestPrep, longestPrep)
  const sortedRecipes = filteredRecipes.sort((a, b) => {
    switch (sortCriteria) {
      case "recent":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "shortestPrep":
        return a.preparation_time - b.preparation_time;
      case "longestPrep":
        return b.preparation_time - a.preparation_time;
      case "All":
        return 1;
      default:
        return 1;
    }
  });

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 2, pl: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Explore Recipes
      </Typography>
      <SearchBar />
      <Grid container spacing={3}>
        {sortedRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </Grid>
    </Container>
  );
}
export default RecipeList;
