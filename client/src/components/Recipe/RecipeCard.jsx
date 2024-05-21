import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import PropType from "prop-types";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
  const navigate = useNavigate(); // Get the navigate function from the context

  // Define the prop types for the RecipeCard component
  RecipeCard.propTypes = {
    recipe: PropType.shape({
      id: PropType.number,
      image_url: PropType.string,
      title: PropType.string,
    }),
  };

  const { id, image_url, title } = recipe; // Destructure the recipe object

  /**
   * The handleClick function navigates to the recipe details page
   * @function
   * @param {Event} event The event object
   */
  const handleClick = () => {
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
