import {
  Typography,
  Box,
  Grid,
  Container,
  CardMedia,
  Rating,
  List,
  ListItem,
} from "@mui/material";
import PropTypes from "prop-types";
import RecipeInstructions from "./RecipeInstructions";
import IngredientList from "./IngredientList";
import SavedRecipeButton from "./SavedRecipeButton";
import DeleteRecipeButton from "./DeleteRecipeButton";
import EditRecipeButton from "./EditRecipeButton";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  RedditIcon,
} from "react-share";
import CookingTimer from "../CookingTimer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddIngredientsToGroceryListButton from "../GroceryList/AddIngredientsToGroceryListButton";
import { motion } from "framer-motion";

function RecipeContent({ recipe, averageRating, reviews }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    title,
    preparation_time,
    serving_size,
    user,
    image_url,
    instructions,
    recipe_ingredients,
  } = recipe;

  RecipeContent.propTypes = {
    averageRating: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          username: PropTypes.string,
        }),
        rating: PropTypes.number,
        comment: PropTypes.string,
      })
    ),
    recipe: PropTypes.shape({
      title: PropTypes.string,
      preparation_time: PropTypes.number,
      serving_size: PropTypes.number,
      user: PropTypes.shape({
        username: PropTypes.string,
      }),
      image_url: PropTypes.string,
      instructions: PropTypes.string,
      recipe_ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          quantity: PropTypes.string,
          ingredient: PropTypes.shape({
            name: PropTypes.string,
          }),
        })
      ),
    }),
  };

  const shareUrl = window.location.href;
  const shareTitle = title;

  return (
    <Container sx={{ padding: { xs: "2rem 1rem", md: "6rem 2rem" } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: "1rem" }}
        >
          {title}
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{ textAlign: "center", marginBottom: "0.5rem" }}
        >
          <strong>Preparation Time:</strong> {preparation_time} minutes
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{ textAlign: "center", marginBottom: "0.5rem" }}
        >
          <strong>Serving Size:</strong> {serving_size} servings
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{ textAlign: "center", marginBottom: "0.5rem" }}
        >
          <strong>Author:</strong> {user.username}
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            pb: 2,
          }}
        >
          <Rating value={averageRating} readOnly />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </Typography>
        </Box>
      </motion.div>
      <Grid container justifyContent="center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CardMedia
            component="img"
            image={image_url}
            alt="Recipe Image"
            sx={{
              width: "100%",
              height: isMobile ? 300 : 600,
              paddingBottom: "2rem",
            }}
          />
        </motion.div>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box sx={{ mx: 1 }}>
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box sx={{ mx: 1 }}>
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box sx={{ mx: 1 }}>
            <PinterestShareButton
              url={shareUrl}
              media={image_url}
              description={shareTitle}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box sx={{ mx: 1 }}>
            <RedditShareButton url={shareUrl} title={shareTitle}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </Box>
        </motion.div>
      </Box>
      <Grid
        container
        spacing={19}
        sx={{
          paddingBottom: isMobile ? 0 : "3rem",
          paddingTop: isMobile ? 0 : "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RecipeInstructions instructions={instructions} />

        <IngredientList recipe_ingredients={recipe_ingredients} />
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: isMobile ? "1rem" : "-5rem",
          marginLeft: isMobile ? "0rem" : "auto",
          paddingBottom: isMobile ? "2rem" : "4rem",
        }}
      >
        <CookingTimer />
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Box
          sx={{
            marginTop: "2rem",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "center" : "flex-end",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <ListItem sx={{ justifyContent: isMobile ? "center" : "flex-end" }}>
              <AddIngredientsToGroceryListButton recipe={recipe} />
            </ListItem>
            <ListItem sx={{ justifyContent: isMobile ? "center" : "flex-end" }}>
              <SavedRecipeButton />
            </ListItem>
            <ListItem sx={{ justifyContent: isMobile ? "center" : "flex-end" }}>
              <EditRecipeButton />
            </ListItem>
            <ListItem sx={{ justifyContent: isMobile ? "center" : "flex-end" }}>
              <DeleteRecipeButton />
            </ListItem>
          </List>
        </Box>
      </motion.div>
    </Container>
  );
}

export default RecipeContent;
