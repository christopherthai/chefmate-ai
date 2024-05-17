import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

/**
 * The Header component displays the header of the application.
 * @param {object} props - The props of the component.
 * @param {boolean} props.isMobile - The flag to indicate if the screen is mobile.
 * @param {function} props.toggleCollapse - The function to toggle the collapse state of the sidebar.
 * @param {function} props.toggleOpen - The function to toggle the open state of the sidebar.
 * @returns {JSX.Element}
 */
function Header({ isMobile, toggleCollapse, toggleOpen }) {
  Header.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    toggleOpen: PropTypes.func.isRequired,
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="collapse drawer"
          edge="start"
          onClick={isMobile ? toggleOpen : toggleCollapse}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: "flex", width: "35%" }}>
          <Typography
            variant="h1"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: "25px",
              fontFamily: "'Roboto', sans-serif",
              width: "20%",
            }}
          >
            ChefMate AI
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" component={NavLink} to="/login">
            <AccountCircle sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              Sign In
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
