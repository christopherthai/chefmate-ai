import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  CircularProgress,
  Typography,
  Grid,
  Container,
  Box,
  IconButton,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion";

// Define the schema for the form validation
const groceryListSchema = Yup.object().shape({
  grocery_list_items: Yup.array().of(
    Yup.object().shape({
      ingredient_name: Yup.string().required("Required"),
      quantity: Yup.number()
        .required("Required")
        .min(1, "Must be greater than 0"),
    })
  ),
});

/**
 * The GroceryList component displays the user's grocery list
 * @component
 * @return {JSX.Element} The GroceryList component
 */
function GroceryList() {
  const { user } = useSelector((state) => state.user);
  const [groceryList, setGroceryList] = useState(undefined);
  const [openSuccessMessageBox, setOpenSuccessMessageBox] = useState(false);
  const queryClient = useQueryClient();

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

  // Fetch the grocery list from the server
  const fetchGroceryList = async () => {
    const { data } = await axios.get(`/api/grocery-lists/${user.id}`);
    return data.grocery_lists[0];
  };

  const { isLoading, isError } = useQuery("groceryList", fetchGroceryList, {
    onSuccess: (data) => {
      setGroceryList(data);
    },
  });

  // Mutations for updating the grocery list
  const updateGroceryListMutation = useMutation(
    async (updatedGroceryList) => {
      await axios.patch(
        `/api/grocery-lists/${user.id}/update`,
        updatedGroceryList
      );
    },
    {
      onSuccess: () => {
        setOpenSuccessMessageBox(true);
      },
      onError: (error) => {
        console.error(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("groceryList");
      },
    }
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h5">An error occurred: {isError.message}</Typography>
    );
  }

  return (
    <>
      {groceryList && groceryList.grocery_list_items.length > 0 ? (
        <Container maxWidth="md">
          <Formik
            initialValues={groceryList}
            validationSchema={groceryListSchema}
            onSubmit={(values) => {
              updateGroceryListMutation.mutate(values);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FieldArray name="grocery_list_items">
                  {({ remove }) => (
                    <Grid container spacing={2}>
                      {values.grocery_list_items.map((item, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={3}>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <TextField
                                name={`grocery_list_items[${index}].quantity`}
                                label="Quantity"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={item.quantity}
                                onChange={handleChange}
                              />
                              <ErrorMessage
                                name={`grocery_list_items[${index}].quantity`}
                                component="div"
                                style={{ color: "red" }}
                              />
                            </motion.div>
                          </Grid>
                          <Grid item xs={8}>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <TextField
                                label="Ingredient"
                                variant="outlined"
                                fullWidth
                                value={item.ingredient_name}
                                onChange={handleChange}
                                readOnly
                              />
                            </motion.div>
                          </Grid>
                          <Grid item xs={1}>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <IconButton
                                color="secondary"
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </motion.div>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
                <Box
                  mt={3}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: "4.5rem" }}
                    >
                      Save
                    </Button>
                  </motion.div>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {fetchGroceryList.isLoading ? (
              <CircularProgress />
            ) : groceryList &&
              groceryList.grocery_list_items &&
              groceryList.grocery_list_items.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Your grocery list is empty
                </Typography>
              </motion.div>
            ) : groceryList === undefined ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Your grocery list is empty
                </Typography>
              </motion.div>
            ) : (
              <CircularProgress />
            )}
          </Typography>
        </Container>
      )}
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
          {"Grocery list updated successfully"}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default GroceryList;
