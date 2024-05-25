import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import RecipeContent from "../components/Recipe/RecipeContent";
import { Box } from "@mui/material";
import CommentRatingForm from "../components/CommentRatingForm";
import { useSelector, useDispatch } from "react-redux";
import { List, Rating, Divider, Avatar } from "@mui/material";

/**
 * The RecipeDetails component fetches and displays the details of a recipe
 * @component
 * @return {JSX.Element} The RecipeDetails component
 */
function RecipeDetails() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const comments = useSelector((state) => state.recipe.comments);
  const ratings = useSelector((state) => state.recipe.ratings);
  const dispatch = useDispatch();

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

  console.log(recipe);

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

  return (
    <Box sx={{ padding: 0 }}>
      <RecipeContent recipe={recipe} />
      <CommentRatingForm recipeId={id} />
      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: "column",
          width: "55%",
          margin: "auto",
          paddingTop: "5rem",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Comments
        </Typography>
        <List>
          {recipe.reviews.length > 0 ? (
            recipe.reviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ mr: 2 }}>{review.username.charAt(0)}</Avatar>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {review.username}
                  </Typography>
                  <Rating value={review.rating} readOnly sx={{ ml: "auto" }} />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {new Date(review.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          ) : (
            <Typography variant="body1">No comments yet</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
}

export default RecipeDetails;
