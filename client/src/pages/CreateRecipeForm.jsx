import { useSelector } from "react-redux";
import LoginPrompt from "../components/LoginPrompt";

function CreateRecipeForm() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <>
      {isLoggedIn ? (
        <div>
          <h1>Create Recipe Form</h1>
        </div>
      ) : (
        <LoginPrompt />
      )}
    </>
  );
}

export default CreateRecipeForm;
