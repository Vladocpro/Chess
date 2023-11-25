import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {logout} from "../../utils/auth.ts";
import Logo from "../Generic/Logo.tsx";


const BurgerMenu = () => {
   const [burgerVisible, setBurgerVisible] = useState<boolean>(false)

   return (
       <div className="block mr-5 sm:hidden">
          <div
              className="block relative  cursor-pointer z-20 sm:hidden  h-[18px] w-[24px]  after:top-[-9px] after:left-[-8px] after:h-[200%] after:w-[165%] space-y-1.5 "
              onClick={() => setBurgerVisible(!burgerVisible)}>
             <hr className={`headerBurgerLine ${burgerVisible && "rotate-45  translate-y-[0.5rem] "}`}/>
             <hr className={`headerBurgerLine mx-auto ${burgerVisible ? "w-[1%]" : "w-[100%]"}`}/>
             <hr className={`headerBurgerLine ${burgerVisible && "rotate-[-45deg] translate-y-[-0.5rem] "}`}/>
          </div>


          <div
              className={`absolute z-10 inset-0 transition-all duration-300 h-screen w-screen opacity-[45%] burgerBlockingLayer ${burgerVisible ? "visible" : "invisible opacity-0"}`}
              onClick={() => setBurgerVisible(!burgerVisible)}/>
          <div
              className={`fixed z-10 right-0 top-0 h-screen   transition-all duration-300 bg-header opacity-100  ${burgerVisible ? "w-screen visible" : "invisible"} h-full w-[0] space-y-1.5 `}>
             <div className="flex flex-col ml-10 mr-10 h-full text-left overflow-hidden text-2xl mt-16">

                {/*<span className={'font-mono'}>MAIN MENU</span>*/}
                <Link to={"/home"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="headerSvg w-7 h-7" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                   </svg>
                   <span className={'font-mono'}>HOME</span>

                </Link>
                <Link to={"/play"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-3">
                   <Logo styles={'w-7 h-7'} fill={'white'}/>
                   <span className={'font-mono'}>PLAY</span>
                </Link>
                <Link to={"/friends"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink  mt-3">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className=" headerSvg w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                   </svg>
                   <span className={'font-mono'}>FRIENDS</span>

                </Link>
                <Link to={"/clubs"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-3">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/>
                   </svg>

                   <span className={'font-mono'}>CLUBS</span>
                </Link>
                <hr className="h-[2.5px] rounded-md bg-black mt-5"/>
                <div className="headerBurgerLink mt-3" onClick={() => {
                   setBurgerVisible(false)
                   logout()
                }}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                   </svg>
                   <span>{"LOG OUT"}</span>
                </div>
             </div>
          </div>
       </div>
   );
};

export default BurgerMenu;
