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
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card sx={{ maxWidth: 350 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={recipe.image_url}
                title={recipe.title}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {recipe.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default RecipeList;
