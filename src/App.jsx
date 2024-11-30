import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import MoodPage from "./MoodPage";
import LoadingPage from "./LoadingPage";
import ResultPage from "./ResultPage";
import { moods } from "./data/moodData";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
        {moods.map((mood, index) => (
          <Route
            key={index}
            path={`/${mood.path}`}
            element={<MoodPage name={mood.name} videoId="Uk2kmK318bc" />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
