import React, { useState } from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError(true);
      return;
    }
    setError(false);

    navigate("/loading");
    try {
      const response = await axios.post("http://localhost:5000/process-text", {
        text: searchText,
      });
      const results = response.data.results || [];
      navigate("/result", { state: { results } }); // Pass the results
    } catch (err) {
      console.error(err);
      navigate("/result", { state: { results: [], error: true } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="How are you feeling ... What would you like to hear ...."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#038dfc",
              borderWidth: 2,
              borderRadius: 25,
            },
            "&:hover fieldset": {
              borderColor: "#4da4eb",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#42a5f5",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(255, 255, 255, 0.9)", // Adjust opacity if necessary to make it whiter
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                <SearchIcon />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBox;
