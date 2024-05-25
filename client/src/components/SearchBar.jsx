import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSortCriteria, setSearchQuery } from "../store/recipeSlice";

/**
 * The SearchBar component displays the search bar and sort criteria dropdown.
 * @returns {JSX.Element} JSX.Element
 * */
const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortCriteria } = useSelector((state) => state.recipe);

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "center",
        gap: 2,
        marginLeft: "-4rem",
      }}
    >
      <FormControl variant="outlined" sx={{ width: "21%" }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortCriteria}
          onChange={(e) => dispatch(setSortCriteria(e.target.value))}
          label="Sort By"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="recent">Recent to Oldest</MenuItem>
          <MenuItem value="oldest">Oldest to Recent</MenuItem>
          <MenuItem value="shortestPrep">Shortest Preparation Time</MenuItem>
          <MenuItem value="longestPrep">Longest Preparation Time</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Search Recipes"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        sx={{ width: "40%" }}
      />
    </Box>
  );
};

export default SearchBar;
