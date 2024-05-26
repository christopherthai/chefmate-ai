import { Button } from "@mui/material";

function AddIngredientsToGroceryListButton() {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#9c27b0",
        "&:hover": {
          backgroundColor: "#7b1fa2",
        },
        color: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        width: "200px",
        marginLeft: "-2rem",
      }}
    >
      Add Ingredients to Grocery List
    </Button>
  );
}

export default AddIngredientsToGroceryListButton;
