"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
// import { cookies } from "next/headers";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// {
//   id: 0,
//   title: "testing",
//   author: "author",
//   description: "desc",
//   url: "https://playverse-v2.s3.ap-south-1.amazonaws.com/output/test_mp4_master.m3u8",
// },

const YouTubeHome = () => {
  // cookies()
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8082/watch/home");
        console.log(res);
        setVideos(res.data);
        setLoading(false); // Set loading to false when videos are fetched
      } catch (error) {
        console.log("Error in fetching videos : ", error);
        setLoading(false);
      }
    };
    getVideos();
    // setVideos[
    //   {
    //     id: 0,
    //     title: "testing",
    //     author: "author",
    //     description: "desc",
    //     url: "https://playverse-v2.s3.ap-south-1.amazonaws.com/test2.mp4",
    //   }
    // ];
  }, []);

  const handleProgress = (state) => {
    // state.playedSeconds gives the played time in seconds
    if (Math.floor(state.playedSeconds) === 11) {
      console.log("nihal");
    }
  };

  const handleVideoClick = (id) => {
    router.push(`page/${id}`);
    // router.push(`page/7`);
  };
  return (
    <div>
      {loading ? (
        <div className="container mx-auto flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="border rounded-md overflow-hidden cursor-pointer"
              // onClick={() => handleVideoClick(video.id)}
            >
              <div>
                <ReactPlayer
                  onPlay={() => handleVideoClick(video.id)}
                  url={video.url}
                  width="360px"
                  height="180px"
                  controls={true}
                  onProgress={handleProgress} // Add this line
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-700">Author - {video.author}</p>
                <p className="text-gray-700">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeHome;
