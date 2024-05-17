import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "4rem",
        position: "relative",
        bottom: 20,
        width: "100%",
      }}
    >
      <Typography variant="body1" color="text.secondary">
        &copy; {new Date().getFullYear()} ChefMate AI. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
