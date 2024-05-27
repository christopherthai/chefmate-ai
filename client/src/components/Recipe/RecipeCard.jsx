import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Rating,
} from "@mui/material";
import PropTypes from "prop-types";
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
import { motion } from "framer-motion";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  RecipeCard.propTypes = {
    recipe: PropTypes.shape({
      user_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      title: PropTypes.string,
      preparation_time: PropTypes.number,
      saved_recipes: PropTypes.array,
      reviews: PropTypes.array,
    }),
  };

  const {
    user_id,
    id,
    image_url,
    title,
    preparation_time,
    saved_recipes,
    reviews,
  } = recipe;

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

  const {
    data: loginUser,
    isLoading,
    isError,
  } = useQuery("loginUser", checkSession);

  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  const handleCheckUserHasAccess = () => {
    if (loginUser && user_id === loginUser.id) {
      dispatch(setUserHasAccess(true));
    } else {
      dispatch(setUserHasAccess(false));
    }
  };

  const isRecipeSavedByUser = saved_recipes.some(
    (recipe) => loginUser && recipe.user_id === loginUser.id
  );

  const handleCheckSavedRecipes = () => {
    if (loginUser && isRecipeSavedByUser) {
      dispatch(setSavedRecipes(true));
    } else {
      dispatch(setSavedRecipes(false));
    }
  };

  const handleClick = () => {
    handleCheckUserHasAccess();
    handleCheckSavedRecipes();
    navigate(`/recipes/${id}`);
    window.scrollTo(0, 0);
  };

  const averageRating =
    reviews && reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ maxWidth: 350, cursor: "pointer" }} onClick={handleClick}>
          <CardHeader
            title={
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            }
            subheader={
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Rating value={averageRating} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {averageRating.toFixed(1)} ({reviews?.length || 0} reviews)
                </Typography>
              </Box>
            }
          />
          <CardMedia sx={{ height: 250 }} image={image_url} title={title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Preparation time: {preparation_time} minutes
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
}

export default RecipeCard;
