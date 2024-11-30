import React from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link for navigation
import YouTube from "react-youtube";

// Define the YouTube video IDs along with their corresponding timestamps
const youtubeVideos = {
  0: { id: "YKr8NvPfiBk", timestamp: 122 }, // Start at 30 seconds
  1: { id: "sm_8eh8BEJQ", timestamp: 455 },
  2: { id: "7Ic89NhV_xI", timestamp: 5 },
  3: { id: "3A6uPGBCEdQ", timestamp: 1268 },
  4: { id: "vYqDTHlypWE", timestamp: 303 },
  5: { id: "qnKqUMFwSdg", timestamp: 0 },
  6: { id: "Dsb2ukwYTmc", timestamp: 0 },
  7: { id: "NVR-psJ3jnM", timestamp: 0 },
  8: { id: "-eKhsvkxIDg", timestamp: 12 },
  9: { id: "W-om--Sm68E", timestamp: 0 },
  10: { id: "WjSVD4dLVSA", timestamp: 0 },
};

function VideoCard({ videoId, probability, index }) {
  const videoData = youtubeVideos[index];
  const { id, timestamp } = videoData;

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex-shrink-0 w-[100px] h-[100px] bg-gray-900">
        <YouTube
          videoId={id}
          opts={{
            width: "1050px",
            height: "500px",
            playerVars: {
              autoplay: 0,
              modestbranding: 1,
              controls: 1,
              rel: 0,
              start: timestamp, // Start the video at the specified timestamp
            },
          }}
          iframeProps={{
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          }}
        />
      </div>
      <div
        className="flex items-center gap-2 mt-2"
        style={{ bottom: "100px", right: "100px" }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor:
              probability > 0.7
                ? "#22c55e"
                : probability > 0.4
                ? "#eab308"
                : "#ef4444",
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }} />
    </div>
  );
}

function ResultsHeader({ error, resultsCount }) {
  return (
    <div className="text-center mb-8">
      {error ? (
        <h1 className="text-3xl font-bold text-white mb-2">
          Oops! Something went wrong
        </h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Music Recommendations
          </h1>
          <p className="text-gray-400">
            We've found {resultsCount} tracks perfectly tuned to match your mood
            🎶
          </p>
        </>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const location = useLocation();
  const { results = [], error } = location.state || {
    results: [],
    error: false,
  };
  const sortedResults = results.sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Home Button */}
      <div
        className="absolute m-4"
        style={{
          top: 0,
          left: 0,
          bottom: 100,
        }} // Positioned to the top-left
      >
        <Link to="/">
          <button
            className="text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "#3b82f6", // Tailwind's blue-600 color
              width: "85px",
              height: "45px",
            }}
          >
            Home
          </button>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ResultsHeader error={error} resultsCount={sortedResults.length} />

        {!sortedResults.length && !error && (
          <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg">
            <p className="text-gray-400">
              No results found. Please try again with different criteria.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {sortedResults.map(([index, probability], idx) => (
            <VideoCard
              key={idx}
              videoId={youtubeVideos[index]?.id}
              probability={probability}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
