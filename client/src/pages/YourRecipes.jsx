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

function YourRecipes() {
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const { deleteMessage } = useSelector((state) => state.recipe); // Get deleteMessage from Redux store

  /**
   * Function to check the session of the user
   * @async
   * @function
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  const checkSession = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || accessToken.split(".").length !== 3) {
      console.error("Invalid access token: ", accessToken);
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

  // Fetch the user data from the server
  const { data: user, isLoading, isError } = useQuery("user", checkSession);

  // Display a loading spinner while fetching the recipes
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

  /**
   * Snackbar close handler function for delete message box
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleDeleteMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setDeleteRecipeDeleteMessage(false));
  };

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 1, pl: 1 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Your Saved and Created Recipes
      </Typography>
      <SavedRecipesList />
      <CreatedRecipesList />
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
