import { useState, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CookingTimer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * The useEffect hook is used to start the timer when the timerOn state is true
   * and the time is greater than 0. The timer decrements the time by 1 second
   * every second. When the time reaches 0, the timer is stopped.
   */
  useEffect(() => {
    let timer;
    if (timerOn && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setTimerOn(false);
    }

    return () => clearInterval(timer);
  }, [timerOn, time]);

  /**
   * Fetches the recipe from the server
   * @returns {Promise<Object>} The recipe object
   */
  const fetchRecipe = async () => {
    const { data } = await axios.get(`/api/recipes/${id}`);
    return data;
  };

  // Fetch the recipe from the server using the useQuery hook from react-query
  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useQuery("recipe", fetchRecipe);

  useEffect(() => {
    if (recipe) {
      setTime(recipe.preparation_time * 60);
    }
  }, [recipe]);

  // Display a loading spinner while fetching the recipe
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

  // Display an error message if the request fails
  if (isError) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  const handleStart = () => setTimerOn(true);
  const handlePause = () => setTimerOn(false);
  const handleReset = () => setTime(recipe.preparation_time * 60);

  const handleChange = (event) => setTime(event.target.value);

  return (
    <Box sx={{ textAlign: "center", marginTop: isMobile ? "1rem" : "2rem" }}>
      <Typography variant={isMobile ? "h6" : "h5"}>Cooking Timer</Typography>
      <Typography variant={isMobile ? "h4" : "h3"}>
        {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
        {time % 60}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        <Button variant="contained" onClick={handleStart} disabled={timerOn}>
          Start
        </Button>
        <Button variant="contained" onClick={handlePause} disabled={!timerOn}>
          Pause
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </Box>
      <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
        <TextField
          label="Set Timer (seconds)"
          type="number"
          value={time}
          onChange={handleChange}
          sx={{ width: isMobile ? "100%" : "auto" }}
        />
      </Box>
    </Box>
  );
};

export default CookingTimer;
