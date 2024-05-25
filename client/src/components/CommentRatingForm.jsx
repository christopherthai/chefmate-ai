import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addComment, addRating } from "../store/recipeSlice";
import { Box, Button, TextField, Rating, Typography } from "@mui/material";

const validationSchema = Yup.object({
  comment: Yup.string().required("Comment is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5),
});

const initialValues = {
  comment: "",
  rating: 0,
};

function CommentRatingForm({ recipeId }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `/api/recipes/${recipeId}/comment`,
          values
        );
        dispatch(addComment(response.data.comment));
        dispatch(addRating(response.data.rating));
        resetForm();
      } catch (error) {
        console.error(error);
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
        paddingTop: "7rem",
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

export default CommentRatingForm;
