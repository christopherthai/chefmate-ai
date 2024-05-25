import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExploreRecipes from "./pages/ExploreRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipeForm from "./pages/CreateRecipeForm";
import EditRecipePage from "./pages/EditRecipePage";
import UserProfile from "./pages/UserProfile";
import YourRecipes from "./pages/YourRecipes";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import NotFoundPage from "./pages/NotFoundPage";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import YourGroceryList from "./pages/YourGroceryList";

/**
 * The App component is the root component of the application.
 * @component
 * @return {JSX.Element}
 */
function App() {
  const theme = useTheme(); // Get the theme object from the context
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small
  const navBarWidth = 6; // Width of the navigation bar in rem units

  return (
    <>
      <div className="app">
        <NavBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            marginLeft: { sm: isSmallScreen ? 0 : navBarWidth },
          }}
        >
          <Box sx={{ flex: "1 0 auto" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExploreRecipes />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/create-recipe" element={<CreateRecipeForm />} />
              <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/your-recipes" element={<YourRecipes />} />
              <Route path="/your-grocery-list" element={<YourGroceryList />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default App;
