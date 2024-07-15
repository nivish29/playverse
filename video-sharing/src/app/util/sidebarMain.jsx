
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar, { SidebarItem } from "../components/sidebar";
import { Calendar, Flag, Home, Layers, LayoutDashboard, LifeBuoy, LogInIcon, LogOut, Settings, StickyNote, TrendingUp, Upload } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const SideBarMain = () => {
  const [userStream, setUserStream] = useState();
  const [activeItem, setActiveItem] = useState('Home');
  const router=useRouter()
  const path=usePathname()
  const { data } = useSession();
  console.log("data---------- ", data);
  

  const handleItemClick = (item,path) => {
    if(item==='Upload'){
        if(!data){
            // console.log(path);

            alert('You have to sign in to Upload a video')
            return
        }
    }
    setActiveItem(item);
    router.push(path)
    
  };

  return (

    <>
      <div className="flex ">
        <Sidebar loginData={data}> 
          <SidebarItem icon={<Upload size={20} />} text="Upload" alert active={activeItem === 'Upload'} onClick={() => handleItemClick('Upload','/upload')} />
          <SidebarItem icon={<Home size={20} />} text="Home" alert active={activeItem === 'Home'} onClick={() => handleItemClick('Home','/home')} />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeItem === 'Dashboard'} onClick={() => handleItemClick('Dashboard')} />
          <SidebarItem icon={<TrendingUp size={20} />} text="Trending" active={activeItem === 'Trending'} onClick={() => handleItemClick('Trending')} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" active={activeItem === 'Settings'} onClick={() => handleItemClick('Settings')} />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={activeItem === 'Help'} onClick={() => handleItemClick('Help')} />
           {data?<SidebarItem icon={<LogOut size={20} />} text="Log Out" active={activeItem === 'Help'} onClick={signOut} />:
           <SidebarItem icon={<LogInIcon size={20} />} text="Log In" active={activeItem === 'Help'} onClick={signIn}/>
           }
        </Sidebar>
        {/* <div>Nihal</div> */}
      </div>
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

export default SideBarMain;
