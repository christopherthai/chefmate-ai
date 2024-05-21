import { Box, Typography, Container, Paper } from "@mui/material";
import EditUserProfile from "../components/EditUserProfile";
import { useSelector } from "react-redux";

/**
 * Page component for the User Profile page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function UserDetails() {
  const { user } = useSelector((state) => state.user); // Get user from Redux store

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
