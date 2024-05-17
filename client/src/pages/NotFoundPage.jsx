import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

/**
 * Page component for the 404 Not Found page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function NotFoundPage() {
  const navigate = useNavigate(); // Hook from react-router-dom to navigate to different pages

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
      }}
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
      <Typography variant="h4" component="h1" gutterBottom>
        This page cannot be found
      </Typography>
      <Typography variant="body1" paragraph>
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ marginTop: "20px" }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default NotFoundPage;
