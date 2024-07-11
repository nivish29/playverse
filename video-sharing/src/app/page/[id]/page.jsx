"use client";
import React, { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ReactPlayer from "react-player";

const VideoPlayerPage = () => {
  const router = useRouter();
  // console.log(useParams());
  const { id } = useParams().id; // Assuming the video ID is passed as a route parameter
  const [subscribeAnimation, setSubscribeAnimation] = useState(false);
  const [timeStamp, setTimeStamp] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log('nihal');
        const res = await axios.get(`http://localhost:8082/watch/video/${id}`);
        setVideo(res.data);
        setTimeStamp(res.data[0].timeStamp);
      } catch (error) {
        console.log("Error fetching video:", error);
      }
    };
    if (id) {
      fetchVideo();
    }
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const handleProgress = (state) => {
    const currentTimestamp = formatTime(state.playedSeconds); // Format current time to match timeStamp format
    console.log(currentTimestamp);
    // Check if the current timestamp matches any timestamp in the timeStamp array
    if (timeStamp.includes(currentTimestamp)) {
      console.log("add animation");
      setSubscribeAnimation(true);
    } else {
      console.log("removing animation");
      setSubscribeAnimation(false);
    }
  };

  // Function to format seconds to 'mm:ss' format
  const formatTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  };

  return (
    <div className="container ml-10 p-10">
      <div className="mb-4 ">
        <ReactPlayer
            url='https://playverse-v2.s3.ap-south-1.amazonaws.com/test2.mp4'
          // url="https://playverse-v2.s3.ap-south-1.amazonaws.com/output/test_mp4_master.m3u8"
          width="75%"
          height="600px"
          controls={true}
          playing={true}
          onProgress={handleProgress}
          onPause={() => setSubscribeAnimation(false)}
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-700 mb-4">Author - {video.author}</p>
      <p className="text-gray-700 mb-4">{video.description}</p>
      <button
        className={` ${
          subscribeAnimation ? "bg-blue-500" : "bg-red-500"
        } text-white px-4 py-2 rounded`}
      >
        Subscribe
      </button>
    </div>
  );
};

export default VideoPlayerPage;
