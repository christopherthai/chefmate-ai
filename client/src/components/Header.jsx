import { NavLink } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { PersonOutline } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsSidebarCollapsed,
  setIsSidebarOpen,
} from "../store/actions/navbarActions";

/**
 * The Header component displays the header of the application.
 * @returns {JSX.Element}
 */
function Header() {
  const theme = useTheme(); // Get the theme object from the context
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile

  // Get the navbar state from the store
  const { isSidebarCollapsed, isSidebarOpen } = useSelector(
    (state) => state.navbar
  );
  const { isLoggedIn } = useSelector((state) => state.user); // Get the user object from the store
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

  // Toggle the sidebar collapse state
  const toggleCollapse = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // Toggle the sidebar open state
  const toggleOpen = () => {
    dispatch(setIsSidebarOpen(!isSidebarOpen));
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
          <IconButton color="inherit" component={NavLink} to="/">
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
          </IconButton>
        </Box>
        <Box flexGrow={1} />
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" component={NavLink} to="/login">
            {isLoggedIn ? (
              <AccountCircle sx={{ mr: 1 }} />
            ) : (
              <PersonOutline sx={{ mr: 1 }} />
            )}
            <Typography variant="h6" component="div">
              {isLoggedIn ? "" : "Log In"}
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
