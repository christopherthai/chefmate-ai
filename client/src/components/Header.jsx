import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { PersonOutline } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setIsSidebarCollapsed, setIsSidebarOpen } from "../store/navbarSlice";
import LogOut from "./LogOut";

/**
 * The Header component displays the header of the application.
 * @returns {JSX.Element}
 */
function Header() {
  const theme = useTheme(); // Get the theme object from the context
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const [anchorEl, setAnchorEl] = useState(null); // Set the anchor element for the menu
  const { isLoggedIn } = useSelector((state) => state.user); // Get the user object from the store
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  // Get the navbar state from the store
  const { isSidebarCollapsed, isSidebarOpen } = useSelector(
    (state) => state.navbar
  );

  // Toggle the sidebar collapse state
  const toggleCollapse = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // Toggle the sidebar open state
  const toggleOpen = () => {
    dispatch(setIsSidebarOpen(!isSidebarOpen));
  };

  /**
   * Handle the click event for the account icon
   * @param {Event} event
   * @returns {void}
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handle the close event for the menu
   * @returns {void}
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle the redirect to the profile page
   * @returns {void}
   */
  const handleRedirectToProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleRedirectToYourRecipes = () => {
    setAnchorEl(null);
    navigate("/your-recipes");
  };

  const handleRedirectToYourGroceryList = () => {
    setAnchorEl(null);
    navigate("/your-grocery-list");
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
          {!isLoggedIn ? (
            <IconButton color="inherit" component={NavLink} to="/login">
              <PersonOutline sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                {"Log In"}
              </Typography>
            </IconButton>
          ) : (
            <>
              <IconButton color="inherit" onClick={handleClick}>
                <AccountCircle sx={{ mr: 1 }} />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleRedirectToProfile}>
                  Your Profile
                </MenuItem>
                <MenuItem onClick={handleRedirectToYourRecipes}>
                  Your Recipes
                </MenuItem>
                <MenuItem onClick={handleRedirectToYourGroceryList}>
                  Your Grocery List
                </MenuItem>
                <LogOut handleClose={handleClose} />
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
