import { Typography, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";

/**
 * The RecipeInstructions component displays the instructions for a recipe
 * @component
 * @param {Object} props The component props
 * @param {string} props.instructions The instructions for the recipe
 * @return {JSX.Element} The RecipeInstructions component
 */
function RecipeInstructions({ instructions }) {
  // Define the prop types for the RecipeInstructions component
  RecipeInstructions.propTypes = {
    instructions: PropTypes.string,
  };

  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ marginBottom: "2rem" }}>
        <Box sx={{ marginRight: "3rem", marginBottom: "1rem" }}>
          <Typography variant="h6" align="center">
            Instructions
          </Typography>
        </Box>
        <Typography variant="body1">{instructions}</Typography>
      </Box>
    </Grid>
  );
}

export default RecipeInstructions;
