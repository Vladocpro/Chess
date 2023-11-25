import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import BurgerMenu from "./BurgerMenu.tsx";
import {logout} from "../../utils/auth.ts";
import Logo from "../Generic/Logo.tsx";
import {COLORS} from "../../utils/constants/colors.ts";
import ProfileIcon from "../Generic/ProfileIcon.tsx";


const Header = () => {

   const location = useLocation();
   const isActive = (link: string) => {
      if (link === location.pathname) {
         return 'headerLinkActive'
      }
      return ''
   }

   if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' || !window.localStorage.token) {
      return null
   }

   return (
       <div className={`sticky top-0 flex items-center  w-full  z-10 bg-header h-20 mb-10`}>
          <nav className={'flex items-center justify-between w-full ml-2 mr-6'}>
             {/*LOGO*/}
             <div className={'flex items-center'}>
                <Logo styles={'w-9 h-9 sm:w-11 sm:h-11'} fill={COLORS.primaryGreen}/>
                <span className={'text-2xl sm:text-3xl'}>Chess</span>
             </div>

             <div className={'hidden sm:flex sm:gap-10 md:gap-16'}>
                <Link to={'/home'} className={`headerLinks ${isActive('/home')}`}>Home</Link>
                <Link to={'/play'} className={`headerLinks ${isActive('/play')}`}>Play</Link>
                <Link to={'/friends'} className={`headerLinks ${isActive('/friends')}`}>Friends</Link>
                <Link to={'/clubs'} className={`headerLinks ${isActive('/clubs')}`} onClick={logout}>Clubs</Link>
             </div>

             <Link to={'/profile'} className={'hidden sm:block'}>
                <ProfileIcon size={'sm'} styles={''}/>
             </Link>
             <BurgerMenu/>
          </nav>


       </div>
   );
};

export default Header;
