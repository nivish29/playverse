"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import UploadPage from "./page/uploadPage";
import YouTubeHome from "./page/home";
import AuthPage from "./page/auth";
import NavBar from "./components/navbar";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Room = () => {
  const [userStream, setUserStream] = useState();

  const callUser = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setUserStream(stream);
  };

  return (
    // <UploadPage />
    <div>
        <NavBar/>
        <YouTubeHome />
    </div>
    // <AuthPage />
  );
};

export default Room;
