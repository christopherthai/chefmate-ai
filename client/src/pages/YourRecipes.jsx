import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function YourRecipes() {
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
  return <div>YourRecipes</div>;
}

export default YourRecipes;
