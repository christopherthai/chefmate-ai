import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import PropType from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import {
  setUser,
  setIsLoggedIn,
  setUserHasAccess,
  setSavedRecipes,
} from "../../store/userSlice";

function RecipeCard({ recipe }) {
  const navigate = useNavigate(); // Get the navigate function from the context
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

  // Define the prop types for the RecipeCard component
  RecipeCard.propTypes = {
    recipe: PropType.shape({
      user_id: PropType.number,
      id: PropType.number,
      image_url: PropType.string,
      title: PropType.string,
      preparation_time: PropType.number,
      saved_recipes: PropType.array,
    }),
  };

  const { user_id, id, image_url, title, preparation_time, saved_recipes } =
    recipe; // Destructure the recipe object

  /**
   * Function to check the session of the user
   * @async
   * @function
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  const checkSession = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || accessToken.split(".").length !== 3) {
      dispatch(setIsLoggedIn(false));
      return null;
    }
    try {
      const response = await axios.get("/api/users/check-session", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      localStorage.removeItem("accessToken");
      dispatch(setIsLoggedIn(false));
      return null;
    }
  };

  // Fetch the user data from the server
  const {
    data: loginUser,
    isLoading,
    isError,
  } = useQuery("loginUser", checkSession);

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  /**
   * The handleCheckUserHasAccess function checks if the logged in user has access to edit or delete the recipe
   * @function
   * @returns {void}
   */
  const handleCheckUserHasAccess = () => {
    if (loginUser && user_id === loginUser.id) {
      dispatch(setUserHasAccess(true));
    } else {
      dispatch(setUserHasAccess(false));
    }
  };

  // Check if the recipe is saved by the logged in user
  const isRecipeSavedByUser = saved_recipes.some(
    (recipe) => loginUser && recipe.user_id === loginUser.id
  );

  /**
   * The handleCheckSavedRecipes function checks if the logged in user has saved the recipe
   * @function
   * @returns {void}
   */
  const handleCheckSavedRecipes = () => {
    if (loginUser && isRecipeSavedByUser) {
      dispatch(setSavedRecipes(true));
    } else {
      dispatch(setSavedRecipes(false));
    }
  };

  /**
   * The handleClick function navigates to the recipe details page
   * @function
   * @param {Event} event The event object
   */
  const handleClick = () => {
    handleCheckUserHasAccess();
    handleCheckSavedRecipes();
    navigate(`/recipes/${id}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <Card sx={{ maxWidth: 350, cursor: "pointer" }} onClick={handleClick}>
        <CardMedia sx={{ height: 140 }} image={image_url} title={title} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RecipeCard;
