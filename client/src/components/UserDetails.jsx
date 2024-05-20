import { Box, Typography, Container, Paper } from "@mui/material";
import EditUserProfile from "../components/EditUserProfile";
import { useQuery } from "react-query";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Page component for the User Profile page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function UserDetails() {
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
    return <CircularProgress />;
  }

  // Display an error message if the request fails
  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="55vh"
      paddingTop="3rem"
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
            <Typography variant="h6" sx={{ marginRight: 1 }}>
              Username:
            </Typography>
            <Typography variant="h7">{user.username}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ marginRight: 1 }}>
              Email Address:{" "}
            </Typography>
            <Typography variant="h7">{user.email}</Typography>
          </Box>
        </Paper>
        <EditUserProfile />
      </Container>
    </Box>
  );
}

export default UserDetails;
