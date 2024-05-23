import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/**
 * Fetch recipes from the server
 * @param {string} ingredients - The ingredients to search for
 * @returns {Promise<Array>} - The recipes
 */
const fetchRecipes = async (ingredients) => {
  const response = await axios.post("/api/recipes/suggestions", {
    ingredients,
  });
  return response.data.recipes;
};

/**
 * Initial values for the form
 * @type {Object}
 * @property {string} ingredients - The ingredient to search for
 * @returns {Object} - The initial values
 */
const initialValues = {
  ingredient: "",
};

/**
 * The home page component
 * @returns {JSX.Element} - The home page component
 */
function HomePage() {
  const theme = useTheme(); // Get the theme object from the context
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile
  const fetchRecipesMutation = useMutation(fetchRecipes);

  return (
    <Container sx={{ marginTop: 19 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        AI Recipe Suggester
      </Typography>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ paddingBottom: "20px" }}
      >
        Enter the ingredients you have and we will suggest a recipe for you
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          fetchRecipesMutation.mutate(values.ingredient);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Field
                as={TextField}
                name="ingredient"
                label="Enter Ingredients"
                variant="outlined"
                fullWidth
                error={touched.ingredient && !!errors.ingredient}
                helperText={touched.ingredient && errors.ingredient}
                sx={{ width: "60%" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
                disabled={!values.ingredient}
              >
                Search
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {fetchRecipesMutation.isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {fetchRecipesMutation.error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <Alert severity="error" style={{ marginRight: "5px" }} />
          <Typography>Error fetching recipes</Typography>
        </Box>
      )}
      {fetchRecipesMutation.isSuccess && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            minHeight: "50vh",
            width: isMobile ? "90vw" : "40vw",
            margin: isMobile ? 0 : "auto",
            paddingTop: "30px",
          }}
        >
          {fetchRecipesMutation.data.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ paddingBottom: "25px" }}
                  >
                    {recipe.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Ingredients:</strong>
                  </Typography>
                  <List>
                    {recipe.ingredients.split("\n").map((ingredient, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText primary={ingredient.trim()} />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="subtitle1">
                    <strong>Instructions:</strong>
                  </Typography>
                  <List>
                    {recipe.instructions.split("\n").map((instruction, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText primary={instruction.trim()} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default HomePage;
