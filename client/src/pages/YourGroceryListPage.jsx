import { Typography, Box, Container, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import GroceryList from "../components/GroceryList/GroceryList";
import { motion } from "framer-motion";

/**
 * The YourGroceryListPage component displays the user's grocery list
 * @component
 * @return {JSX.Element} The YourGrocery component
 */
function YourGroceryListPage() {
  const dispatch = useDispatch();

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

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 14, pb: 1, pl: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Your Grocery List
        </Typography>
      </motion.div>

      <GroceryList />
    </Container>
  );
}

export default YourGroceryListPage;
