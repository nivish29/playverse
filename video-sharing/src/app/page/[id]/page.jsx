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
      setTimeout(() => {
        setSubscribeAnimation(false);
      }, 2000); 
    } 
    // else {
    //   setSubscribeAnimation(false);
    // }
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
    <div className="container pl-3 pt-5 ">
      <div className="relative pb-[35.25%] w-[80%] h-0 mb-4">
        <ReactPlayer
          url={video.url} // Use the video URL from the fetched data
          className="absolute top-0 left-0 w-full h-full"
          width="70%"
          height="100%"
          controls={true}
          onProgress={handleProgress}
          onPause={() => setSubscribeAnimation(false)}
        />
      </div>
      <h1 className="text-xl font-bold ">{video.title}</h1>
      <p className="text-gray-700 text-sm font-bold"> {video.author}</p>
      <p className="text-gray-700 mb-4 font-normal text-sm">{video.description}</p>

     <button className={`m-4 p-1 rounded-full bg-gradient-to-r ${subscribeAnimation ? " transition-all duration-300 animate-gradient from-blue-600   to-red-500 " : ""}`}>
      <span className="block text-white px-4 py-2 font-semibold rounded-full bg-black ">
        Subscribe
      </span>
    </button>
    </div>
  );
};

export default VideoPlayerPage;
