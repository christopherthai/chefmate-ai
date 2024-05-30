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
import { motion } from "framer-motion";

/**
 * Fetch recipes from the server using the ingredients provided by the user in the
 * form submission and return the recipes to the component for rendering on the page as a list of cards
 * @param {Array} ingredients - The ingredients provided by the user in the form submission
 * @returns {Array} - The recipes fetched from the server
 * @throws {Error} - If there is an error fetching the recipes
 * @async
 * @function fetchRecipes
 *
 */
const fetchRecipes = async (ingredients) => {
  const response = await axios.post("/api/recipes/suggestions", {
    ingredients,
  });
  return response.data.recipes;
};

// Initial values for the form
const initialValues = {
  ingredient: "",
};

/**
 * HomePage component
 * @component
 * @return {JSX.Element}
 */
function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fetchRecipesMutation = useMutation(fetchRecipes);

  return (
    <Container sx={{ marginTop: 19 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          AI Recipe Suggester
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ paddingBottom: "20px" }}
        >
          Enter the ingredients you have and we will suggest a recipe for you
        </Typography>
      </motion.div>
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
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ width: "60%" }}
              >
                <Field
                  as={TextField}
                  name="ingredient"
                  label="Enter Ingredients"
                  variant="outlined"
                  fullWidth
                  error={touched.ingredient && !!errors.ingredient}
                  helperText={touched.ingredient && errors.ingredient}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{ marginLeft: 2, paddingLeft: 5 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!values.ingredient}
                  sx={{ height: "100%" }}
                >
                  Find Recipe
                </Button>
              </motion.div>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
              minHeight: "50vh",
              width: isMobile ? "90vw" : "600px",
              margin: isMobile ? 0 : "auto",
              paddingTop: "30px",
            }}
          >
            {fetchRecipesMutation.data.map((recipe, index) => (
              <Grid key={index}>
                <Card
                  component={motion.div}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
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
        </motion.div>
      )}
    </Container>
  );
}

export default HomePage;
