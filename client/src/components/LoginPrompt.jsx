import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

/**
 * Page component for the login prompt page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function LoginPrompt() {
  const navigate = useNavigate(); // Hook from react-router-dom to navigate to different pages
  window.scrollTo(0, 0);

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
      <Typography variant="h4" component="h1" gutterBottom>
        Enjoy creating new recipe with us!
      </Typography>
      <Typography variant="body1" paragraph>
        Log in to access this page so you can create your own recipe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ marginTop: "20px" }}
        onClick={handleGoLogin}
      >
        Go to Login Page
      </Button>
    </Container>
  );
}

export default LoginPrompt;
