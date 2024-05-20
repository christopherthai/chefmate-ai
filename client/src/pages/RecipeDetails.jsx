import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  Box,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardMedia,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function RecipeDetails() {
  const { id } = useParams();
  const fetchRecipe = async () => {
    const { data } = await axios.get(`/api/recipes/${id}`);
    return data;
  };

  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useQuery("recipe", fetchRecipe);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  console.log(recipe.recipe_ingredients);

  return (
    <Container sx={{ padding: { xs: "5rem", md: "10rem" } }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        {recipe.title}
      </Typography>

      <Grid container justifyContent="center">
        <CardMedia
          component="img"
          image={recipe.image_url}
          alt="Recipe Image"
          sx={{ width: "120%", height: "auto", marginLeft: "-10%" }}
        />
      </Grid>

      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6">Instructions</Typography>
        <Typography variant="body1">{recipe.instructions}</Typography>
      </Box>

      <List sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6">Ingredients</Typography>
        {recipe.recipe_ingredients.map((ingredient) => (
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
    </Container>
  );
}

export default RecipeDetails;
