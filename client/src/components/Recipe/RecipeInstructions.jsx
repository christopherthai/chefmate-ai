import { Typography, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

/**
 * The RecipeInstructions component displays the instructions for a recipe
 * @component
 * @param {Object} props The component props
 * @param {string} props.instructions The instructions for the recipe
 * @return {JSX.Element} The RecipeInstructions component
 */
function RecipeInstructions({ instructions }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define the prop types for the RecipeInstructions component
  RecipeInstructions.propTypes = {
    instructions: PropTypes.string,
  };

  return (
    <Grid item xs={12} sm={6} sx={{ marginTop: isMobile ? 0 : "-1rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ marginBottom: "2rem", padding: isMobile ? "1rem" : "2rem" }}>
          <Box
            sx={{
              marginBottom: "1rem",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"}>
              Instructions
            </Typography>
          </Box>
          <Typography variant="body1">{instructions}</Typography>
        </Box>
      </motion.div>
    </Grid>
  );
}

export default RecipeInstructions;
