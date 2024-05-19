import { useSelector } from "react-redux";
import { Box, Typography, Container, Paper } from "@mui/material";

function UserDetails() {
  const { user } = useSelector((state) => state.user);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            User Profile
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
      </Container>
    </Box>
  );
}

export default UserDetails;
