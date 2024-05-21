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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditRecipeButton() {
  const { isLoggedIn, userHasAccess } = useSelector((state) => state.user); // Get user from Redux store
  const [openDialogBox, setOpenDialogBox] = useState(false); // State for the dialog box open status
  const navigate = useNavigate(); // Get the navigate function from the context
  const { id } = useParams(); // Get the recipe ID from the URL

  const handleClick = () => {
    if (isLoggedIn == false) {
      setOpenDialogBox(true);
    } else if (isLoggedIn == true && userHasAccess == true) {
      navigate(`/edit-recipe/${id}`);
    }
  };

  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };

  // Disable the button if the user does not have access
  const buttonDisabled = !userHasAccess;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={buttonDisabled}
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
          color: "#fff",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        Edit Recipe
      </Button>
      <Dialog open={openDialogBox} onClose={handleCloseDialogBox}>
        <DialogTitle>{"You are not logged in"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit recipes, you need to be logged in. Please log in to
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

export default EditRecipeButton;
