import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import RecipeContent from "../components/Recipe/RecipeContent";
import { Box } from "@mui/material";

/**
 * The RecipeDetails component fetches and displays the details of a recipe
 * @component
 * @return {JSX.Element} The RecipeDetails component
 */
function RecipeDetails() {
  const { id } = useParams(); // Get the recipe ID from the URL

  /**
   * Fetches the recipe from the server
   * @returns {Promise<Object>} The recipe object
   */
  const fetchRecipe = async () => {
    const { data } = await axios.get(`/api/recipes/${id}`);
    return data;
  };

  // Fetch the recipe from the server using the useQuery hook from react-query
  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useQuery("recipe", fetchRecipe);

  // Display a loading spinner while fetching the recipe
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
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  return <RecipeContent recipe={recipe} />;
}

export default RecipeDetails;
