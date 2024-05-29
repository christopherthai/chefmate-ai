import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../store/userSlice";
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
   */
  const logOutMutation = useMutation(
    () =>
      axios.delete("/api/users/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        handleClose();
        navigate("/login");
      },
      onError: (error) => {
        console.error("Error logging out: ", error);
      },
    }
  );

  /**
   * Handle the logout event
   * @returns {void}
   */
  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  return <MenuItem onClick={handleLogOut}>Log Out</MenuItem>;
}
export default LogOut;
