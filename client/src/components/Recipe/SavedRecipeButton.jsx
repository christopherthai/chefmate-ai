import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";

/**
 * Component to render the saved recipe button
 * @component
 * @returns {JSX.Element}
 */
function SavedRecipeButton() {
  const { user, isLoggedIn } = useSelector((state) => state.user); // Get user from Redux store
  const [openDialogBox, setOpenDialogBox] = useState(false); // State for the dialog box open status
  const { id } = useParams(); // Get the recipe ID from the URL

  const handleClick = () => {
    if (isLoggedIn == false) {
      setOpenDialogBox(true);
    }
  };

  /**
   * Function to close the dialog box
   * @function
   * @returns {void}
   */
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "-7.5rem",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          backgroundColor: "#4caf50",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
          color: "#fff",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        Save Recipe
      </Button>
      <Dialog open={openDialogBox} onClose={handleCloseDialogBox}>
        <DialogTitle>{"You are not logged in"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To save recipes, you need to be logged in. Please log in to
            continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogBox} color="primary">
            Cancel
          </Button>
          <Button component={Link} to="/login" color="primary" autoFocus>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SavedRecipeButton;
