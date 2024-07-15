"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import UploadPage from "./page/uploadPage";
import YouTubeHome from "./home/page";
import AuthPage from "./page/auth";
import NavBar from "./components/navbar";
import VideoPlayer from "./page/videoPlayer";
import Sidebar, { SidebarItem } from "./components/sidebar";
import { Calendar, Flag, Home, Layers, LayoutDashboard, LifeBuoy, Settings, StickyNote, TrendingUp, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Room = () => {
  const [userStream, setUserStream] = useState();
  const [activeItem, setActiveItem] = useState('Home');
  const router=useRouter()
  const callUser = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setUserStream(stream);
  };

  const handleItemClick = (item,path) => {
    setActiveItem(item);
    router.push(path)
  };

  return (

    <>
      {/* <div className="flex">
        <Sidebar> 
          <SidebarItem icon={<Upload size={20} />} text="Upload" alert active={activeItem === 'Upload'} onClick={() => handleItemClick('Upload','/upload')} />
          <SidebarItem icon={<Home size={20} />} text="Home" alert active={activeItem === 'Home'} onClick={() => handleItemClick('Home','/home')} />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeItem === 'Dashboard'} onClick={() => handleItemClick('Dashboard')} />
          <SidebarItem icon={<TrendingUp size={20} />} text="Trending" active={activeItem === 'Trending'} onClick={() => handleItemClick('Trending')} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" active={activeItem === 'Settings'} onClick={() => handleItemClick('Settings')} />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={activeItem === 'Help'} onClick={() => handleItemClick('Help')} />
        </Sidebar> */}
        {/* <div>Nihal</div> */}
      {/* </div> */}
    </>

    // <UploadPage />
    // <div>
    //   <div className=" grid grid-cols-2">
    //     <NavBar/>
    //     <YouTubeHome />
    //   </div>
    //     {/* <VideoPlayer/> */}
    // </div>
    // <AuthPage />
  );
};

export default Room;
