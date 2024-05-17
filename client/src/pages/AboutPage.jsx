import { Typography, Container, Box, Grid } from "@mui/material";
import RecipeImage from "../images/Recipes.jpg";

/**
 * Page component for the About page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function AboutPage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      style={{ minHeight: "10vh" }}
    >
      <Container sx={{ padding: { xs: "5rem", md: "10rem" } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          About ChefMate AI
        </Typography>

        <Grid container justifyContent="center">
          <Box sx={{ marginBottom: "3rem" }}>
            <img
              src={RecipeImage}
              alt="Recipe Image"
              style={{ width: "120%", height: "auto", marginLeft: "-10%" }}
            />
          </Box>
        </Grid>

        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h6" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" paragraph>
            Using the OpenAI API, ChefMate AI analyzes the ingredients you input
            and suggests recipes that you can create with them.
          </Typography>
        </Box>

        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h6" gutterBottom>
            Technology Stack
          </Typography>
          <Typography variant="body1" paragraph>
            ChefMate AI is built using modern web technologies including React
            for the frontend, Flask for the backend, and SQLAlchemy for database
            management. We leverage the OpenAI API to deliver accurate and
            diverse recipe suggestions.
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
}

export default AboutPage;
