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

/**
 * The IngredientList component displays the ingredients for a recipe
 * @component
 * @param {Object} props The component props
 * @param {Array} props.recipe_ingredients The ingredients for the recipe
 * @return {JSX.Element} The IngredientList component
 */
function IngredientList({ recipe_ingredients }) {
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
      <List sx={{ marginBottom: "2rem" }}>
        <Box sx={{ marginRight: "3rem" }}>
          <Typography variant="h6" align="center">
            Ingredients
          </Typography>
        </Box>
        {recipe_ingredients.map((ingredient) => (
          <ListItem key={ingredient.id}>
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
        ))}
      </List>
    </Grid>
  );
}

export default IngredientList;
