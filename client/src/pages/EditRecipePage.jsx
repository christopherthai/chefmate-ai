import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import EditRecipeForm from "../components/Recipe/EditRecipeForm";

function EditRecipePage() {
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
    return <CircularProgress />;
  }

  // Display an error message if the request fails
  if (isError) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  return (
    <div>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
}

export default EditRecipePage;
