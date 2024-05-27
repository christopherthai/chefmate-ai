import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

/**
 * The IngredientList component displays the ingredients for a recipe
 * @component
 * @param {Object} props The component props
 * @param {Array} props.recipe_ingredients The ingredients for the recipe
 * @return {JSX.Element} The IngredientList component
 */
function IngredientList({ recipe_ingredients }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define the prop types for the IngredientList component
  IngredientList.propTypes = {
    recipe_ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        quantity: PropTypes.string,
        ingredient: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  };

  return (
    <Grid item xs={12} sm={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <List
          sx={{ marginBottom: "2rem", marginTop: isMobile ? "-8rem" : "0" }}
        >
          <Box sx={{ marginRight: isMobile ? "1rem" : "3rem" }}>
            <Typography variant={isMobile ? "h5" : "h4"} align="center">
              Ingredients
            </Typography>
          </Box>
          {recipe_ingredients.map((ingredient) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ListItem sx={{ padding: isMobile ? "0.5rem" : "1rem" }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "fontWeightBold" }}
                        component="span"
                      >
                        {`${ingredient.quantity}`}
                      </Typography>
                      <Typography variant="body1" component="span">
                        {` ${ingredient.ingredient.name}`}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </motion.div>
    </Grid>
  );
}

export default IngredientList;
