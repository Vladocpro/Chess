import React, {useState} from 'react';
import {logout} from "../../utils/auth.ts";

const Sidebar = () => {

   const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

   return (
       <div className={`sticky flex flex-col ${isCollapsed ? '-left-10' : 'left-0'} z-10 bg-neutral-600 transition-all duration-500 w-56 h-screen rounded-r-lg`} onClick={() => setIsCollapsed(!isCollapsed)}>
         {/*<div className={'flex flex-col mt-2'}>*/}

         {/*   <div className={'bg-primaryGreen px-2 cursor-pointer'}>*/}
         {/*      <span>Play</span>*/}
         {/*   </div>*/}
         {/*   <div>*/}
         {/*      Games</div>*/}
         {/*   <div className={'mt-auto'} onClick={logout}>Log out</div>*/}
         {/*</div>*/}
         {/*<div>*/}

         {/*</div>*/}

       </div>
   );
};

export default Sidebar;
