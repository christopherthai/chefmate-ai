import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "2rem",
        width: "100%",
        paddingTop: "3rem",
      }}
    >
      <Typography variant="body1" color="text.secondary">
        &copy; {new Date().getFullYear()} ChefMate AI. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
