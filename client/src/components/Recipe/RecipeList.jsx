import axios from "axios";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";

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
  // Fetch the recipes from the server
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery("recipes", fetchRecipes);

  // Display a loading spinner while fetching the recipes
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 1, pl: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Explore Recipes
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </Grid>
    </Container>
  );
}
export default RecipeList;
