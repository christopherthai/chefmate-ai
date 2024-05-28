import { Typography, Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import UserDetails from "../components/UserDetails";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../store/userSlice";
import { motion } from "framer-motion";

/**
 * UserProfile page component
 * @return {React.Component} UserProfile page component
 */
function UserProfile() {
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

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
      dispatch(setIsLoggedIn(false));
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
      dispatch(setIsLoggedIn(false));
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5">
          An error occurred: {isError.message}
        </Typography>
      </motion.div>
    );
  }

  return <UserDetails />;
}

export default UserProfile;
