import { Typography, Box, Grid, Container, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import RecipeInstructions from "./RecipeInstructions";
import IngredientList from "./IngredientList";
import SavedRecipeButton from "./SavedRecipeButton";
import DeleteRecipeButton from "./DeleteRecipeButton";
import EditRecipeButton from "./EditRecipeButton";

/**
 * The RecipeContent component displays the content of a recipe
 * @component
 * @param {Object} props The component props
 * @param {Object} props.recipe The recipe object
 * @return {JSX.Element} The RecipeContent component
 */
function RecipeContent({ recipe }) {
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
      <SavedRecipeButton />
    </Container>
  );
}

export default RecipeContent;
