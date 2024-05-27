import { useState, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

const CookingTimer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const fetchRecipe = async () => {
    const { data } = await axios.get(`/api/recipes/${id}`);
    return data;
  };

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
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  const handleStart = () => setTimerOn(true);
  const handlePause = () => setTimerOn(false);
  const handleReset = () => setTime(recipe.preparation_time * 60);
  const handleChange = (event) => setTime(event.target.value);

  return (
    <Box sx={{ textAlign: "center", marginTop: isMobile ? "1rem" : "2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant={isMobile ? "h6" : "h5"}>Cooking Timer</Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant={isMobile ? "h4" : "h3"}>
          {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
          {time % 60}
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={handleStart}
              disabled={timerOn}
            >
              Start
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={handlePause}
              disabled={!timerOn}
            >
              Pause
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </motion.div>
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <TextField
            label="Set Timer (seconds)"
            type="number"
            value={time}
            onChange={handleChange}
            sx={{ width: isMobile ? "100%" : "auto" }}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default CookingTimer;
