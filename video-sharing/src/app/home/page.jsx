"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const YouTubeHome = () => {
  const [videos, setVideos] = useState([
    // {
    //   id: 0,
    //   title: "testing testing testing testing testing testing ",
    //   author: "author",
    //   description: "desc",
    //   url: "https://playverse-v2.s3.ap-south-1.amazonaws.com/output/test_mp4_master.m3u8",
    //   thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
    // },
  ]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [page,setPage]=useState(1);
  useEffect(() => {
    const getVideos = async () => {
      // setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8082/watch/home?limit=10&page=${page}`);
        // setVideos(res.data);
        console.log(res.data.length);
        console.log(videos.length);
        setVideos((prev)=>[...prev, ...res.data]) // add the new data in the videos array without changing the previous data in it
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching videos: ", error);
        // setLoading(false);
      }
    };
    getVideos();
  }, [page]);

  useEffect(()=>{
    window.addEventListener("scroll",handleInfiniteScroll);
    return ()=>window.removeEventListener("scroll",handleInfiniteScroll);
  },[])

  const handleInfiniteScroll =()=>{
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerheight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    try{
      if(window.innerHeight + document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
        setPage((prev)=>prev+1)
      }
    }catch(err){
      console.log(err);
    }
  }


  const handleVideoClick = (id) => {
    router.push(`page/${id}`);
  };

  return (
    <div className="container flex-1  ml-auto p-4 ">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className=" rounded-2xl w-full h-[290px] overflow-hidden cursor-pointer transition-transform transform hover:scale-105  bg-gray-50"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className=" w-full h-[200px] rounded-3xl ">
                <ReactPlayer
                  
                  url={video.url}
                  width="100%"
                  height="100%"
                  controls={false}
                  className="rounded-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-md font-medium line-clamp-2">{video.title}</h2>
                <p className="text-gray-700 text-[10px] mb-1">{video.author}</p>
                {/* <p className="text-gray-700 text-sm">{video.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeHome;
