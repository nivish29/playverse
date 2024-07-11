"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import axios from "axios"; // Make sure axios is imported
// import { cookies } from "next/headers";

const VideoPlayerPage = () => {
  // cookies()
  const { id } = useParams(); // Assuming the video ID is passed as a route parameter
  const [subscribeAnimation, setSubscribeAnimation] = useState(false);
  const [timeStamp, setTimeStamp] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/watch/video/${id}`,{caches:'no-store'});
        setVideo(res.data[0]);
        setTimeStamp(res.data[0].timeStamp);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.log("Error fetching video:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    if (id) {
      fetchVideo();
    }
  }, [id]);

  const handleProgress = (state) => {
    const currentTimestamp = formatTime(state.playedSeconds); // Format current time to match timeStamp format
    // Check if the current timestamp matches any timestamp in the timeStamp array
    if (timeStamp.includes(currentTimestamp)) {
      setSubscribeAnimation(true);
    } else {
      setSubscribeAnimation(false);
    }
  };

  // Function to format seconds to 'mm:ss' format
  const formatTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  if (!video) {
    return <div>Error loading video data</div>; // Display error if video data is not available
  }

  return (
    <div className="container ml-10 p-10">
      <div className="mb-4">
        <ReactPlayer
          url={video.url} // Use the video URL from the fetched data
          // url='https://playverse-v2.s3.ap-south-1.amazonaws.com/test2.mp4' // Use the video URL from the fetched data
          width="75%"
          height="600px"
          controls={true}
          // playing={true}
          onProgress={handleProgress}
          onPause={() => setSubscribeAnimation(false)}
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-700 mb-4">Author - {video.author}</p>
      <p className="text-gray-700 mb-4">{video.description}</p>
      <button
        className={`${
          subscribeAnimation ? "bg-blue-500" : "bg-red-500"
        } text-white px-4 py-2 rounded`}
      >
        Subscribe
      </button>
    </div>
  );
};

export default VideoPlayerPage;
