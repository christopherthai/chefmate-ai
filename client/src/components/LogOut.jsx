import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../store/actions/userActions";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * The LogOut component displays the logout menu item.
 * @param {Function} props.handleClose
 * @returns {JSX.Element}
 */
function LogOut({ handleClose }) {
  // The handleClose prop is a function that closes the menu when the logout button is clicked.
  LogOut.propTypes = {
    handleClose: PropTypes.func.isRequired,
  };

  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  /**
   * The useMutation hook is used to create a mutation function that can be used to log out the user.
   * The mutation function is created using an axios delete request to the /api/users/logout endpoint.
   * The onSuccess callback is called when the mutation is successful.
   * It dispatches the setIsLoggedIn action with a value of false to update the user state in the store. It then closes the menu and navigates to the login page.
   * The onError callback is called when the mutation fails. It logs the error to the console.
   */
  const logOutMutation = useMutation(() => axios.delete("/api/users/logout"), {
    onSuccess: () => {
      dispatch(setIsLoggedIn(false));
      handleClose();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error logging out: ", error);
    },
  });

  /**
   * Handle the logout event
   * @returns {void}
   */
  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  return <MenuItem onClick={handleLogOut}>Logout</MenuItem>;
}
export default LogOut;
