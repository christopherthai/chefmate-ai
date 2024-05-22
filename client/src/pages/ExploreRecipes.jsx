import RecipeList from "../components/Recipe/RecipeList";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteRecipeDeleteMessage } from "../store/recipeSlice";

/**
 * The ExploreRecipes page displays a list of recipes.
 * @return {jsx}
 * @description This function returns the ExploreRecipes page.
 */
function ExploreRecipes() {
  const { deleteMessage } = useSelector((state) => state.recipe); // Get deleteMessage from Redux store
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

  /**
   * Snackbar close handler function for delete message box
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleDeleteMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setDeleteRecipeDeleteMessage(false));
  };

  return (
    <>
      <RecipeList />;
      <Snackbar
        open={deleteMessage}
        autoHideDuration={6000}
        onClose={handleDeleteMessageBox}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleDeleteMessageBox}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {"Recipe deleted successfully!"}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ExploreRecipes;
