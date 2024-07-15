import Image from 'next/image';
import logo from './../asset/logo.png';
import { ChevronFirst, ChevronLast, FlameIcon, LogOut, MoreVertical } from 'lucide-react';
import { createContext, useContext, useRef, useState } from 'react';
import Flame from './flame';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const SidebarContext = createContext();

const Sidebar = ({ children ,loginData}) => {
  const [expanded, setExpanded] = useState(true);
  const cardsRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [mouseOnCard, setMouseOnCard] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  console.log("data from sidbar.jsx---------- ", loginData);

  const handleMouseMove = (event) => {
    if (cardsRef.current !== null) {
      const rect = cardsRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setCursor({ x: x, y: y });
    }
  };

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm " >
          <div className="p-4 pb-2 flex justify-between items-center " >
            {/* <div  className={` items-center justify-center w-32 overflow-hidden transition-all ${expanded ? 'w-16' : 'w-0 h-0'}`}ref={cardsRef} onMouseEnter={() => setMouseOnCard(true)} onMouseLeave={() => setMouseOnCard(false)} onMouseMove={(event) => { handleMouseMove(event); }}>
            <Flame cardRef={cardsRef} cursor={cursor} mouseOnCard={mouseOnCard} />
            </div> */}
            <div className='flex'>
            <div ><FlameIcon size={ expanded? 40:0}/></div>
            {expanded && <div className={`ml-2 flex font-bold text-lg justify-center items-center `}>Play Verse</div>}
            </div>
            {/* <Image src={logo} alt="Not found" className={`w-32 overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`} /> */}
            <button className='p-1.5 rounded-bg bg-gray-50 hover:bg-gray-100' onClick={() => { setExpanded((curr) => !curr); }}> {expanded ? <ChevronFirst /> : <ChevronLast />}</button>
          </div>

          <SidebarContext.Provider value={expanded}>
            <ul className='flex-1 px-3' >{children}</ul>
          </SidebarContext.Provider>

          <div className='border-t flex p-3'>
          <FlameIcon size={32}/>
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
              <div className='leading-4'>
                <h4 className='font-semibold'>{ loginData? loginData.user.name :'User'}</h4>
                <span className='text-xs text-gray-600'>{loginData?loginData.user.email:'Email'}</span>
              </div>
              <MoreVertical size={20} onClick={()=>console.log('testing')}/>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export const SidebarItem = ({ icon, text, active, alert,onClick }) => {
  const expanded = useContext(SidebarContext);
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"} ` }onClick={onClick}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      {alert && ( 
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebar;
