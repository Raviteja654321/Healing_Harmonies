import React from "react";
import { Link } from "react-router-dom";
import { Container, Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { moods } from "./data/moodData";
import SearchBox from "./components/SearchBox";

const MotionLink = motion(Link);

const Home = () => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Typography variant="h2" align="center" gutterBottom>
      Music Therapy
    </Typography>
    <Typography variant="h5" align="center" sx={{ mb: 6 }}>
      Explore the Music tuned to enhance your mental and physical health.
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 4,
      }}
    >
      {moods.map((mood, index) => (
        <MotionLink
          to={`/${mood.path}`}
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card sx={{ backgroundColor: mood.color }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {mood.name}
              </Typography>
              <Typography variant="body2">{mood.description}</Typography>
            </CardContent>
          </Card>
        </MotionLink>
      ))}
    </Box>
    <SearchBox />
  </Container>
);

export default Home;
