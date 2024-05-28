import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Page component for the 404 Not Found page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function NotFoundPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * Redirects the user to the home page
   * @returns {void}
   */
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        padding: "0rem",
        marginTop: "16rem",
        paddingBottom: "40rem",
        paddingLeft: isMobile ? "2rem" : "",
        paddingRight: isMobile ? "2rem" : "",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: "bold",
            color: "primary.main",
            marginBottom: "1rem",
          }}
        >
          404
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          This page cannot be found
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography variant="body1" paragraph>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: "20px" }}
          onClick={handleGoHome}
        >
          Go to Home
        </Button>
      </motion.div>
    </Container>
  );
}

export default NotFoundPage;
