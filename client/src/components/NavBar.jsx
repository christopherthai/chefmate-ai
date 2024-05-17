import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  ListItemButton,
  List,
  ListItemText,
  Box,
  Toolbar,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ExploreIcon from "@mui/icons-material/Explore";
import KitchenIcon from "@mui/icons-material/Kitchen";
import UserContext from "../UserContext";
import Header from "./Header";

/**
 * The NavBar component displays the navigation bar of the application.
 * @returns {JSX.Element}
 */
function NavBar() {
  const theme = useTheme(); // Get the theme object from the context
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(isMobile); // Set the initial state of the sidebar when it is collapsed
  const [isSideBarOpen, setIsSideBarOpen] = useState(!isMobile); // Set the initial state of the sidebar when it is open
  const { isLogin, setIsLogin } = useContext(UserContext); // Use the UserContext to access the user's login status

  //Update the state of the side bar based on the screen size.
  useEffect(() => {
    setIsSideBarCollapsed(isMobile);
    setIsSideBarOpen(!isMobile);
  }, [isMobile]);

  /**
   * Toggles the state of the side bar.
   * @returns {void}
   */
  const toggleCollapse = () => {
    setIsSideBarCollapsed(!isSideBarCollapsed);
  };

  /**
   * Toggles the state of the side bar.
   * @returns {void}
   */
  const toggleOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        isMobile={isMobile}
        toggleCollapse={toggleCollapse}
        toggleOpen={toggleOpen}
      />
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? 220 : isSideBarCollapsed ? 220 : 60,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
        anchor="left"
        open={isSideBarOpen}
        variant="persistent"
      >
        <Toolbar />
        <Box sx={{ overflow: "hidden" }}>
          <List>
            <ListItemButton component={NavLink} to="/">
              {!isSideBarCollapsed ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  width="25px"
                >
                  <HomeIcon />
                  <Typography variant="caption">Home</Typography>
                </Box>
              ) : (
                <>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </>
              )}
            </ListItemButton>
            <ListItemButton component={NavLink} to="/about">
              {!isSideBarCollapsed ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  width="25px"
                >
                  <InfoIcon />
                  <Typography variant="caption">About</Typography>
                </Box>
              ) : (
                <>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </>
              )}
            </ListItemButton>
            <ListItemButton component={NavLink} to="/explore">
              {!isSideBarCollapsed ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  width="25px"
                >
                  <ExploreIcon />
                  <Typography variant="caption">Explore</Typography>
                </Box>
              ) : (
                <>
                  <ListItemIcon>
                    <ExploreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Explore Recipes" />
                </>
              )}
            </ListItemButton>
            <ListItemButton component={NavLink} to="/create-recipe">
              {!isSideBarCollapsed ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  width="25px"
                >
                  <KitchenIcon />
                  <Typography variant="caption">Create</Typography>
                </Box>
              ) : (
                <>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Recipes" />
                </>
              )}
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NavBar;
