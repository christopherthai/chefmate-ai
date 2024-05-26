import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Rating,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  comment: Yup.string().required("Comment is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5),
});

const initialValues = {
  comment: "",
  rating: 0,
};
/**
 * The CommentRatingForm component displays a form to submit a comment and rating
 * @component
 * @param {Object} props Component props
 * @param {Function} props.handleReviews Function to update the reviews list
 * @return {JSX.Element} The CommentRatingForm component
 */
function CommentRatingForm({ handleReviews }) {
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false); // State for the snackbar MessageBox status
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { id } = useParams();

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
   * Function to close the dialog box
   * @function
   * @returns {void}
   */
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };

  // Mutation hook to submit the form data
  const reviewsMutation = useMutation(
    async (values) => {
      const response = await axios.post(
        `/api/recipes/${id}/reviews/${user.id}`,
        values
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        setOpenSuccessMessageBox(true);
        handleReviews(data);
      },
    }
  );

  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (isLoggedIn == false) {
        setOpenDialogBox(true);
      } else if (isLoggedIn == true) {
        reviewsMutation.mutate(values);
        resetForm();
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "50%",
        margin: "auto",
        paddingTop: "2rem",
      }}
    >
      <Typography variant="h4" sx={{ mb: 0 }}>
        Leave a Review
      </Typography>
      <Rating
        name="rating"
        value={formik.values.rating}
        onChange={(event, value) => formik.setFieldValue("rating", value)}
        error={formik.touched.rating && Boolean(formik.errors.rating)}
      />
      <TextField
        label="Comment"
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "90px", marginLeft: "auto" }}
      >
        Submit
      </Button>
      <Dialog open={openDialogBox} onClose={handleCloseDialogBox}>
        <DialogTitle>{"You are not logged in"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To leave a review, you need to be logged in. Please log in to
            continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogBox} color="primary">
            Cancel
          </Button>
          <Button component={Link} to="/login" color="primary" autoFocus>
            Go to Login
          </Button>
        </DialogActions>
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
          {"Review submitted successfully!"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

CommentRatingForm.propTypes = {
  handleReviews: PropTypes.func.isRequired,
};

export default CommentRatingForm;
