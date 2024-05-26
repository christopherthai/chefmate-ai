import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import {
  CircularProgress,
  Typography,
  Grid,
  Container,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";

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
  const [groceryList, setGroceryList] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch the grocery list from the server
  const fetchGroceryList = async () => {
    const { data } = await axios.get(`/api/grocery-lists/${user.id}`);
    return data.grocery_lists[0];
  };

  const { isLoading, isError } = useQuery("groceryList", fetchGroceryList, {
    onSuccess: (data) => {
      console.log(data);
      setGroceryList(data);
    },
  });

  // Mutations for updating teh grocery list
  const updateGroceryListMutation = useMutation(
    async (updatedGroceryList) => {
      await axios.put(`/api/grocery-lists/${user.id}`, updatedGroceryList);
    },
    {
      onSuccess: () => {
        console.log("Grocery list updated successfully");
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
                            <TextField
                              name={`grocery_list_items[${index}].quantity`}
                              label="Quantity"
                              type="number"
                              variant="outlined"
                              fullWidth
                              value={item.quantity}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              name={`grocery_list_items[${index}].ingredient_name`}
                              label="Ingredient"
                              variant="outlined"
                              fullWidth
                              value={item.ingredient_name}
                              onChange={handleChange}
                              readOnly
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: "4.5rem" }}
                  >
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {groceryList === undefined ? (
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Your grocery list is empty
              </Typography>
            ) : (
              <CircularProgress />
            )}
          </Typography>
        </Container>
      )}
    </>
  );
}

export default GroceryList;
