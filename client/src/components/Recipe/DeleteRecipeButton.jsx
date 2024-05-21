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
} from "@mui/material";

/**
 * Component to render the delete recipe button
 * @component
 * @returns {JSX.Element}
 */
function DeleteRecipeButton() {
  const { isLoggedIn, userHasAccess } = useSelector((state) => state.user); // Get user from Redux store
  const [openDialogBox, setOpenDialogBox] = useState(false); // State for the dialog box open status

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

  // Disable the button if the user does not have access
  const buttonDisabled = !userHasAccess;

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        disabled={buttonDisabled}
        sx={{
          backgroundColor: "#dc004e",
          "&:hover": {
            backgroundColor: "#9a0036",
          },
          color: "#fff",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        Delete Recipe
      </Button>
      <Dialog open={openDialogBox} onClose={handleCloseDialogBox}>
        <DialogTitle>{"You are not logged in"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete recipes, you need to be logged in. Please log in to
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
    </>
  );
}

export default DeleteRecipeButton;
