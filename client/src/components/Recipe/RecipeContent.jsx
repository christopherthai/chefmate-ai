import { Typography, Box, Grid, Container, CardMedia } from "@mui/material";
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
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";
import CookingTimer from "../CookingTimer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/**
 * The RecipeContent component displays the content of a recipe
 * @component
 * @param {Object} props The component props
 * @param {Object} props.recipe The recipe object
 * @return {JSX.Element} The RecipeContent component
 */
function RecipeContent({ recipe }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Destructure the recipe object
  const {
    title,
    preparation_time,
    serving_size,
    user,
    image_url,
    instructions,
    recipe_ingredients,
  } = recipe;

  // Define the prop types for the RecipeContent component
  RecipeContent.propTypes = {
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

  const shareUrl = window.location.href; // Get the current URL
  const shareTitle = title; // Get the recipe title

  return (
    <Container sx={{ padding: { xs: "4rem", md: "10rem" } }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem", marginTop: "-2rem" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ textAlign: "center", marginBottom: "1rem", marginTop: "-1rem" }}
      >
        <strong>Preparation Time:</strong> {preparation_time} minutes
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ textAlign: "center", marginBottom: "1rem", marginTop: "-1rem" }}
      >
        <strong>Serving Size:</strong> {serving_size} servings
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ textAlign: "center", marginBottom: "1rem", marginTop: "-1rem" }}
      >
        <strong>Author:</strong> {user.username}
      </Typography>

      <Grid container justifyContent="center">
        <CardMedia
          component="img"
          image={image_url}
          alt="Recipe Image"
          sx={{
            width: "100%",
            height: 600,
            marginLeft: "-2%",
            paddingBottom: "2rem",
          }}
        />
      </Grid>

      <Box
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          marginTop: "-0.5rem",
          gap: "1rem", // Add space between buttons
        }}
      >
        <Box sx={{ mx: 1 }}>
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </Box>
        <Box sx={{ mx: 1 }}>
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Box>
        <Box sx={{ mx: 1 }}>
          <PinterestShareButton
            url={shareUrl}
            media={image_url}
            description={shareTitle}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </Box>
        <Box sx={{ mx: 1 }}>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Box>
      </Box>

      <Grid container spacing={18}>
        <RecipeInstructions instructions={instructions} />
        <IngredientList recipe_ingredients={recipe_ingredients} />
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "2rem",
          maxWidth: "8.6rem",
        }}
      >
        <EditRecipeButton />
        <DeleteRecipeButton />
      </Box>
      <Grid container justifyContent="center">
        <Box
          sx={{
            position: isMobile ? "relative" : "absolute",
            display: "flex",
            marginTop: isMobile ? "1rem" : "-11rem",
            marginLeft: "-1rem",
          }}
        >
          <CookingTimer />
        </Box>
      </Grid>
      <SavedRecipeButton />
    </Container>
  );
}

export default RecipeContent;
