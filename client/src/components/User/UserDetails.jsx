import { Box, Container, Typography, Paper } from "@mui/material";
import EditUserProfile from "../User/EditUserProfile";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProfileDetails from "../User/ProfileDetails";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Page component for the User Profile page
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function UserDetails() {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="55vh"
      paddingTop={isMobile ? "6rem" : "3rem"}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Your Profile
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
            <ProfileDetails user={user} />
          </Paper>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EditUserProfile />
        </motion.div>
      </Container>
    </Box>
  );
}

export default UserDetails;
