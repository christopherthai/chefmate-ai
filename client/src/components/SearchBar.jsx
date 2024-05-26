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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/**
 * The SearchBar component displays the search bar and sort criteria dropdown.
 * @returns {JSX.Element} JSX.Element
 * */
const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortCriteria } = useSelector((state) => state.recipe);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        gap: 2,
        marginLeft: isMobile ? 0 : "-4rem",
      }}
    >
      <FormControl variant="outlined" sx={{ width: isMobile ? "90%" : "21%" }}>
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
        sx={{ width: isMobile ? "90%" : "40%" }}
      />
    </Box>
  );
};

export default SearchBar;
