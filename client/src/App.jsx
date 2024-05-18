import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExploreRecipes from "./pages/ExploreRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipeForm from "./pages/CreateRecipeForm";
import EditRecipeForm from "./pages/EditRecipeForm";
import UserProfile from "./pages/UserProfile";
import YourRecipes from "./pages/YourRecipes";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import NotFoundPage from "./pages/NotFoundPage";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div className="app">
            <NavBar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "99vh", // This makes sure the container takes up the full height of the viewport
              }}
            >
              <Box sx={{ flex: "1 0 auto" }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExploreRecipes />} />
                  <Route path="/recipes/:id" element={<RecipeDetails />} />
                  <Route path="/create-recipe" element={<CreateRecipeForm />} />
                  <Route path="/edit-recipe/:id" element={<EditRecipeForm />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/your-recipe" element={<YourRecipes />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </div>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
