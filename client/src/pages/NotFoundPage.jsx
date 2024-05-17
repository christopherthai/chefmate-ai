import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{ textAlign: "center", padding: "0rem", marginTop: "16rem" }}
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
