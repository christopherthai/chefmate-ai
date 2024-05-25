import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Box, Button, TextField, Rating, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

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
  const { user } = useSelector((state) => state.user); // Get user from Redux store
  const { id } = useParams();

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
        console.log("Reviews", data);
        handleReviews(data);
      },
    }
  );

  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      reviewsMutation.mutate(values);
      resetForm();
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
        Leave a Comment
      </Typography>
      <Rating
        name="rating"
        value={formik.values.rating}
        onChange={(event, value) => formik.setFieldValue("rating", value)}
        error={formik.touched.rating && Boolean(formik.errors.rating)}
        helperText={formik.touched.rating && formik.errors.rating}
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
    </Box>
  );
}

CommentRatingForm.propTypes = {
  handleReviews: PropTypes.func.isRequired,
};

export default CommentRatingForm;
