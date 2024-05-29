import { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation } from "react-query";

/**
 * Edit user profile component
 * @component
 * @returns {JSX.Element}
 */
function EditUserProfile() {
  const { user } = useSelector((state) => state.user); // Get user from Redux store
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const [openDialogBox, setOpenDialogBox] = useState(false); // State for the dialog box open status
  const [openErrorMessageBox, setOpenErrorMessageBox] = useState(false); // State for the snackbar MessageBox status
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false); // State for the snackbar MessageBox status
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  // Validation schema for the edit profile form
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  // Initial values for the edit profile form
  const initialValues = {
    username: user.username,
    email: user.email,
  };

  /**
   * Dialog box open handler function
   * @function
   * @returns {void}
   */
  const handleOpenDialogBox = () => {
    setOpenDialogBox(true);
  };

  /**
   * Dialog box close handler function
   * @function
   * @returns {void}
   */
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };

  /**
   * Snackbar close handler function for error message
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleCloseErrorMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorMessageBox(false);
  };

  /**
   * Snackbar close handler function for success message
   * @function
   * @param {Event} event - Event object
   * @param {string} reason - Reason for the close
   * @returns {void}
   */
  const handleCloseSuccessMessageBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMessageBox(false);
  };

  /**
   * Mutation function for updating the user profile information using axios patch request
   * @function
   * @param {Object} values - User profile information
   * @returns {Promise}
   * @returns {void}
   */
  const userProfileMutation = useMutation(
    (values) => axios.patch(`/api/users/${user.id}`, values),
    {
      onSuccess: (user_data) => {
        dispatch(setUser(user_data.data)); // Update the user in the Redux store
        setOpenSuccessMessageBox(true); // Open the success message box
        handleCloseDialogBox(); // Close the dialog box
      },
      onError: (error) => {
        setErrorMessage(error.response.data.message);
        setOpenErrorMessageBox(true);
      },
    }
  );

  /**
   * Form submit handler function
   * @function
   * @param {Object} values - User profile information
   * @param {Object} setSubmitting - Formik setSubmitting function
   * @returns {void}
   */
  const handleSubmit = (values, { setSubmitting }) => {
    userProfileMutation.mutate(values);
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ paddingTop: "1rem" }}
    >
      <Button variant="contained" color="primary" onClick={handleOpenDialogBox}>
        Edit Profile
      </Button>
      <Dialog
        open={openDialogBox}
        onClose={handleCloseDialogBox}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <strong>Edit Profile</strong>
        </DialogTitle>
        <IconButton
          color="inherit"
          onClick={handleCloseDialogBox}
          aria-label="close"
          style={{
            marginLeft: "auto",
            marginRight: "10px",
            marginTop: "-50px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <List>
                <ListItem>
                  <Field
                    fullWidth
                    as={TextField}
                    variant="outlined"
                    label="Username"
                    name="username"
                  />
                </ListItem>
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ marginLeft: "30px", color: "red" }}
                />
                <ListItem>
                  <Field
                    fullWidth
                    as={TextField}
                    variant="outlined"
                    label="Email Address"
                    name="email"
                  />
                </ListItem>
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ marginLeft: "30px", color: "red" }}
                />
                <ListItem style={{ justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "1rem" }}
                  >
                    Update
                  </Button>
                </ListItem>
              </List>
              <Snackbar
                open={openErrorMessageBox}
                autoHideDuration={6000}
                onClose={handleCloseErrorMessageBox}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MuiAlert
                  onClose={handleCloseErrorMessageBox}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {errorMessage}
                </MuiAlert>
              </Snackbar>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSuccessMessageBox}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessageBox}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSuccessMessageBox}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {"Update was successful"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default EditUserProfile;
