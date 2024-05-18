import { useDispatch, useSelector } from "react-redux";
import {
  setIsSidebarCollapsed,
  setIsSidebarOpen,
  setWidth,
  setPrevIsMobile,
} from "../store/actions/navbarActions";
import { setIsLoggedIn, setUser } from "../store/actions/userActions";
import { useEffect } from "react";
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
import Header from "./Header";
import axios from "axios";
import { useQuery } from "react-query";
/**
 * The NavBar component displays the navigation bar of the application.
 * @returns {JSX.Element}
 */
function NavBar() {
  const theme = useTheme(); // Get the theme object from the context
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const { isSidebarCollapsed, isSidebarOpen, width, prevIsMobile } =
    useSelector((state) => state.navbar); // Get the navbar state from the store

  /**
   * Function to check the session of the user
   * @async
   * @function
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  const checkSession = async () => {
    try {
      const response = await axios.get("/api/users/check-session");
      console.log(response.data);
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.error("Error checking session: ", error);
      return null;
    }
  };
  // Check the session of the user when the component mounts using the useQuery hook
  const { data, isError, error, isLoading } = useQuery("session", checkSession);

  // Set the initial state of the sidebar based on the screen size.
  useEffect(() => {
    dispatch(setIsSidebarCollapsed(isMobile));
    dispatch(setIsSidebarOpen(!isMobile));
  }, [isMobile, dispatch]);

  // Set the width of the sidebar based on the screen size.
  useEffect(() => {
    if (isMobile && width === 60) {
      dispatch(setWidth(60));
      setTimeout(() => dispatch(setWidth(220)), 500);
    } else {
      dispatch(setWidth(isSidebarCollapsed ? 220 : 60));
    }
    if (!isMobile && prevIsMobile && isSidebarOpen) {
      dispatch(setIsSidebarCollapsed(true));
    }
    dispatch(setPrevIsMobile(isMobile));
  }, [
    isMobile,
    isSidebarCollapsed,
    isSidebarOpen,
    prevIsMobile,
    width,
    dispatch,
  ]);

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: width,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
      >
        <Toolbar />
        <Box sx={{ overflow: "hidden" }}>
          <List>
            <ListItemButton component={NavLink} to="/">
              {!isSidebarCollapsed ? (
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
              {!isSidebarCollapsed ? (
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
              {!isSidebarCollapsed ? (
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
              {!isSidebarCollapsed ? (
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
