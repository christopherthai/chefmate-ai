import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExploreRecipes from "./pages/ExploreRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipeForm from "./pages/CreateRecipeForm";
import EditRecipeForm from "./pages/EditRecipeForm";
import UserProfile from "./pages/UserProfile";
import MyRecipes from "./pages/MyRecipes";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import NotFoundPage from "./pages/NotFoundPage";
import UserContext from "./UserContext";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false); // State to store the login status
  const [user, setUser] = useState(null); // State to store the user's information

  return (
    <>
      <UserContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
        <div className="app">
          {/* <Header /> */}
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExploreRecipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/create-recipe" element={<CreateRecipeForm />} />
            <Route path="/edit-recipe/:id" element={<EditRecipeForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-recipe" element={<MyRecipes />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
