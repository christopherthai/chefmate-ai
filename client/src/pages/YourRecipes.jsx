import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import SavedRecipesList from "../components/Recipe/SavedRecipesList";
import CreatedRecipesList from "../components/Recipe/CreatedRecipesList";
import { Container } from "@mui/material";
import { Snackbar, Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { setDeleteRecipeDeleteMessage } from "../store/recipeSlice";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Page component for the user's saved and created recipes
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function YourRecipes() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { deleteMessage } = useSelector((state) => state.recipe);

  const checkSession = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || accessToken.split(".").length !== 3) {
      return null;
    }
    try {
      const response = await axios.get("/api/users/check-session", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      localStorage.removeItem("accessToken");
      return null;
    }
  };

  const { data: user, isLoading, isError } = useQuery("user", checkSession);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  const handleDeleteMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setDeleteRecipeDeleteMessage(false));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: 12, pb: 1, pl: 1, marginLeft: isMobile ? "-1.5rem" : "" }}
    >
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
            marginLeft: isMobile ? "3rem" : "",
            marginTop: isMobile ? "1rem" : "2rem",
          }}
        >
          Your Saved and Created Recipes
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SavedRecipesList />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CreatedRecipesList />
      </motion.div>
      <Snackbar
        open={deleteMessage}
        autoHideDuration={6000}
        onClose={handleDeleteMessageBox}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleDeleteMessageBox}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {"Recipe deleted successfully!"}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default YourRecipes;
