import { Box, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import Proptypes from "prop-types";

/**
 * Component to display user profile details
 * @component
 * @param {Object} user - User object containing profile details
 * @returns {JSX.Element} JSX.Element
 */
function ProfileDetails({ user }) {
  const { username, email, created_at, avatarUrl } = user;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
        <Avatar
          alt={username}
          src={avatarUrl}
          sx={{ width: 56, height: 56, marginRight: 2 }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h6">{username}</Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography variant="body2" color="textSecondary">
              Member since {new Date(created_at).toLocaleDateString()}
            </Typography>
          </motion.div>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography variant="h6" sx={{ marginRight: 1 }}>
            Username:
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography variant="body1">{username}</Typography>
        </motion.div>
      </Box>
      <Box display="flex" alignItems="center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography variant="h6" sx={{ marginRight: 1 }}>
            Email Address:
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Typography variant="body1">{email}</Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
}

ProfileDetails.propTypes = {
  user: Proptypes.object.isRequired,
};

export default ProfileDetails;
