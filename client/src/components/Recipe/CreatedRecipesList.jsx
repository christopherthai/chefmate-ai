import { useSelector } from "react-redux";

function CreatedRecipesList() {
  const { user } = useSelector((state) => state.user); // Get user from Redux store
  return <div>CreatedRecipesList</div>;
}

export default CreatedRecipesList;
