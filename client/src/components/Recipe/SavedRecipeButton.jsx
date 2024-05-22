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
import { setSavedRecipes } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";

/**
 * Component to render the saved recipe button
 * @component
 * @returns {JSX.Element}
 */
function SavedRecipeButton() {
  const { user, isLoggedIn, savedRecipes } = useSelector((state) => state.user); // Get user from Redux store
  const [openDialogBox, setOpenDialogBox] = useState(false); // State for the dialog box open status
  const { id } = useParams(); // Get the recipe ID from the URL
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

  const handleClick = () => {
    if (isLoggedIn == false) {
      setOpenDialogBox(true);
    } else if (isLoggedIn == true && savedRecipes == false) {
      savedRecipeMutation.mutate(id);
    } else {
      unSavedRecipeMutation.mutate(id);
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

  /**
   * Mutation to save the recipe to the user's saved recipes list in the database
   * @constant
   * @type {Mutation}
   * @returns {void}
   */
  const savedRecipeMutation = useMutation(
    (recipeId) =>
      axios.post(`/api/users/${user.id}/saved-recipes/${id}`, {
        user_id: user.id,
        recipe_id: recipeId,
      }),
    {
      onSuccess: (response) => {
        dispatch(setSavedRecipes(true));
      },
      onError: (error) => {
        console.error("Error saving recipe:", error.response.data.error);
      },
    }
  );

  /**
   * Mutation to remove the recipe from the user's saved recipes list in the database
   * @constant
   * @type {Mutation}
   * @returns {void}
   */
  const unSavedRecipeMutation = useMutation(
    (recipeId) =>
      axios.delete(`/api/users/${user.id}/saved-recipes/${id}`, {
        user_id: user.id,
        recipe_id: recipeId,
      }),
    {
      onSuccess: (response) => {
        dispatch(setSavedRecipes(false));
      },
      onError: (error) => {
        console.error("Error unsaving recipe:", error.response.data.error);
      },
    }
  );

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
        color={savedRecipes ? "primary" : "secondary"}
        onClick={handleClick}
        sx={{
          backgroundColor: savedRecipes ? "grey" : "green",
          "&:hover": {
            backgroundColor: savedRecipes ? "grey" : "green",
          },
          color: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        {savedRecipes ? "Recipe Saved" : "Save Recipe"}
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
