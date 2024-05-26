import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import RecipeContent from "../components/Recipe/RecipeContent";
import { Box } from "@mui/material";
import CommentRatingForm from "../components/CommentRatingForm";
import { List, Rating, Avatar, Grid } from "@mui/material";
import { useState, useEffect } from "react";

/**
 * The RecipeDetails component fetches and displays the details of a recipe
 * @component
 * @return {JSX.Element} The RecipeDetails component
 */
function RecipeDetails() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

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

  // Update the reviews list when the recipe changes
  useEffect(() => {
    if (recipe) {
      setReviews(recipe.reviews_list);
    }
  }, [recipe]);

  useEffect(() => {
    setAverageRating(0);
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      setAverageRating(totalRating / reviews.length);
    }
  }, [reviews]);

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

  /**
   * Updates the reviews list with the new review
   * @param {Object} review The new review object
   */
  const handleReviews = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  return (
    <Box sx={{ padding: 0 }}>
      <RecipeContent
        recipe={recipe}
        averageRating={averageRating}
        reviews={reviews}
      />
      <CommentRatingForm handleReviews={handleReviews} />
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
          Reviews
        </Typography>
        <List>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box
                key={index}
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
              </Box>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                No reviews yet
              </Typography>
            </Grid>
          )}
        </List>
      </Box>
    </Box>
  );
}

export default RecipeDetails;
