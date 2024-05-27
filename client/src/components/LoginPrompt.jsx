import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Page component for the login prompt page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function LoginPrompt() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Redirects the user to the login page
   * @returns {void}
   */
  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        padding: "0rem",
        marginTop: "16rem",
        paddingBottom: "40rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Enjoy creating new recipes with us!
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="body1" paragraph>
          Log in to access this page so you can create your own recipe.
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: "20px" }}
          onClick={handleGoLogin}
        >
          Go to Login Page
        </Button>
      </motion.div>
    </Container>
  );
}

export default LoginPrompt;
