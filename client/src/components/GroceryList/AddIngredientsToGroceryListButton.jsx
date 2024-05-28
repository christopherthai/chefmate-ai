import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

/**
 * The AddIngredientsToGroceryListButton component displays a button to add ingredients to the grocery list
 * @component
 * @param {Object} recipe - The recipe object
 * @return {JSX.Element} The AddIngredientsToGroceryListButton component
 */
function AddIngredientsToGroceryListButton({ recipe }) {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false);
  const { id } = useParams();
  const { recipe_ingredients } = recipe;

  /**
   * Snackbar close handler function for success message
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleCloseSuccessMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMessageBox(false);
  };

  /**
   * Function to close the dialog box
   * @function
   * @returns {void}
   */
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };

  // Get the IDs of the ingredients in the recipe
  const ingredientIds = recipe_ingredients.map(
    (ingredient) => ingredient.ingredient.id
  );

  // Patch request to add ingredients to the grocery list
  const patchIngredients = async () => {
    const response = await axios.patch(
      `/api/grocery-lists/${user.id}/add_items`,
      {
        user_id: user.id,
        recipe_id: id,
        ingredient_ids: ingredientIds,
      }
    );
    return response.data;
  };

  // Mutation to add ingredients to the grocery list
  const addIngredientsToGroceryListMutation = useMutation(patchIngredients, {
    onSuccess: () => {
      setOpenSuccessMessageBox(true);
    },
    onError: () => {
      console.log("Error adding ingredients to grocery list");
    },
  });

  /**
   * Function to handle adding ingredients to the grocery list
   * @function
   * @returns {void}
   */
  const handleAddIngredientsToGroceryList = () => {
    if (isLoggedIn) {
      addIngredientsToGroceryListMutation.mutate();
    } else if (!isLoggedIn) {
      setOpenDialogBox(true);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleAddIngredientsToGroceryList}
        sx={{
          backgroundColor: "#9c27b0",
          "&:hover": {
            backgroundColor: "#7b1fa2",
          },
          color: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          width: "200px",
        }}
      >
        Add Ingredients to Grocery List
      </Button>
      <Dialog open={openDialogBox} onClose={handleCloseDialogBox}>
        <DialogTitle>{"You are not logged in"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add ingredients to your grocery list, you need to be logged in.
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
      <Snackbar
        open={openSuccessMessageBox}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessageBox}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSuccessMessageBox}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {"Ingredients added to grocery list successfully!"}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

AddIngredientsToGroceryListButton.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    preparation_time: PropTypes.number,
    serving_size: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    image_url: PropTypes.string,
    instructions: PropTypes.string,
    recipe_ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        quantity: PropTypes.string,
        ingredient: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }),
};

export default AddIngredientsToGroceryListButton;
