import { Typography, Container, Box, Grid } from "@mui/material";
import RecipeImage from "../assets/images/Recipes.jpg";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Page component for the About page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      style={{
        minHeight: "10vh",
        paddingBottom: "0.2rem",
        paddingTop: isMobile ? "2rem" : "",
      }}
    >
      <Container sx={{ padding: { xs: "4rem", md: "10rem" } }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
              width: "100%",
            }}
          >
            About ChefMate AI
          </Typography>
        </motion.div>

        <Grid container justifyContent="center">
          <Box sx={{ marginBottom: "3rem" }}>
            <motion.img
              src={RecipeImage}
              alt="Recipe Image"
              style={{ width: "120%", height: "auto", marginLeft: "-10%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </Box>
        </Grid>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography variant="h6" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body1" paragraph>
              Using the OpenAI API, ChefMate AI analyzes the ingredients you
              input and suggests recipes that you can create with them.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography variant="h6" gutterBottom>
              Technology Stack
            </Typography>
            <Typography variant="body1" paragraph>
              ChefMate AI is built using modern web technologies including React
              for the frontend, Flask for the backend, and SQLAlchemy for
              database management. We leverage the OpenAI API to deliver
              accurate and diverse recipe suggestions.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Grid>
  );
}

export default AboutPage;
