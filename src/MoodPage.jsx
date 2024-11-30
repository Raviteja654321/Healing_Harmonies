import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { moodDetails } from './data/moodData';

// Dictionary for mood-specific YouTube links along with timestamps (in seconds)
const moodSongs = {
  energetic: { id: "sm_8eh8BEJQ", timestamp: 455 }, // Start at 30 seconds
  calming: { id: "YKr8NvPfiBk", timestamp: 122 },  // Start at 15 seconds
  sleepy: { id: "W-om--Sm68E", timestamp: 0 },    // Start at 0 seconds (default)
  "mood shifting": { id: "3A6uPGBCEdQ", timestamp: 1268 }, // Start at 20 seconds
  "improve focus": { id: "NVR-psJ3jnM", timestamp: 0 }, // Start at 10 seconds
  boring: { id: "Dsb2ukwYTmc", timestamp: 0 },   // Start at 45 seconds
};

const MoodPage = ({ name, videoId }) => {
  const moodDetail = moodDetails[name];

  // Get the video data (ID and timestamp) for the current mood
  const moodVideo = moodSongs[name.toLowerCase()] || { id: videoId, timestamp: 0 };  // Default to videoId if not found

  const { id, timestamp } = moodVideo;
  const videoLink = `https://www.youtube.com/embed/${id}?start=${timestamp}`;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Title */}
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
        {name}
      </Typography>

      {/* Current Feeling Text */}
      <Typography variant="h5" paragraph align="center" sx={{ fontStyle: 'italic', color: 'orange' }}>
        {moodDetail?.currentFeeling}
      </Typography>

      {/* Steps Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Action Steps:
        </Typography>
        <Box sx={{ listStyleType: 'decimal', pl: 4 }}>
          {moodDetail?.steps?.map((step, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              <strong>Step {index + 1}:</strong> {step}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Video Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Song for the Mood:
        </Typography>
        <div className="youtube-container" style={{ marginTop: '20px' }}>
          <iframe
            width="860"
            height="515"
            src={videoLink} // Use the modified video URL with the timestamp
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Box>
    </Container>
  );
};

export default MoodPage;
