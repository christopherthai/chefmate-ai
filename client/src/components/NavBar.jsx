import { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

function NavBar() {
  const theme = useTheme(); // Get the theme object
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Update isCollapsed when isMobile changes and set isOpen to !isMobile
  useEffect(() => {
    setIsCollapsed(isMobile);
    setIsOpen(!isMobile);
  }, [isMobile]);

  // Toggle the collapsed state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle the open state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: isMobile ? 220 : isCollapsed ? 60 : 220, // Set the width of the drawer
          flexShrink: 0, // Prevent the drawer from shrinking in flex layout
          "& .MuiDrawer-paper": {
            width: isMobile ? 220 : isCollapsed ? 60 : 220, // Set the width of the drawer
            boxSizing: "border-box", // Prevent the width from increasing due to padding
            backgroundColor: "#f5f5f5", // Set the background color of the drawer
          },
        }}
        anchor="left"
        open={isOpen}
        variant="persistent"
      >
        <Toolbar /> {/* This is the spacer */}
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Explore Recipe" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Create Recipe" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="My Recipes" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default NavBar;
