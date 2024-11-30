import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const [status, setStatus] = useState("Analyzing your input...");
  const navigate = useNavigate();

  useEffect(() => {
    // First timer to change the status after 5 seconds
    const timer1 = setTimeout(() => {
      setStatus("Matching with pretrained text embedding...");
    }, 3000); // 5 seconds for "Matching with pretrained text embedding..."

    // Second timer to change the status after 10 seconds (5 + 5)
    const timer2 = setTimeout(() => {
      setStatus("Finding top 3 relevant songs...");
    }, 6000); // 5 seconds after the first timer

    // Third timer to navigate to the result page after 15 seconds (5 + 5 + 5)
    const timer3 = setTimeout(() => {
      navigate("/result"); // Navigate to the results page after 15 seconds
    }, 10000); // 5 seconds after the second timer

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        {status}
      </Typography>
    </Box>
  );
};

export default LoadingPage;
