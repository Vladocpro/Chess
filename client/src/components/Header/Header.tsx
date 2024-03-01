import {Link, useLocation} from 'react-router-dom'
import BurgerMenu from "./BurgerMenu.tsx";
import Logo from "../Generic/Logo.tsx";
import {COLORS} from "../../utils/constants/colors.ts";
import useUser from "../../zustand/userStore.tsx";
import ProfileDropdown from "./ProfileDropDown.tsx";
import {relocateToTheGame} from "../../websockets/socketConnection.ts";


const Header = () => {

   const location = useLocation();
   const {userID} = useUser();
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
       <div className={`sticky top-0 flex items-center  w-full  z-10 bg-header`}>
          <nav className={'flex items-center justify-between w-full py-[18px] ml-2 mr-6'}>
             {/* LOGO */}
             <div className={'flex items-center'} onClick={() => relocateToTheGame('3441231231')}>
                <Logo styles={'w-9 h-9 sm:w-11 sm:h-11'} fill={COLORS.primaryGreen}/>
                <span className={'text-2xl sm:text-3xl'}>Chess</span>
             </div>

             <div className={'hidden sm:flex sm:gap-10 md:gap-16'}>
                <Link to={'/home'} className={`headerLinks ${isActive('/home')}`}>Home</Link>
                <Link to={'/create-game'} className={`headerLinks ${isActive('/create-game')}`}>Play</Link>
                <Link to={'/friends'} className={`headerLinks ${isActive('/friends')}`}>Friends</Link>
                <Link to={'/clubs'} className={`headerLinks ${isActive('/clubs')}`}>Clubs</Link>
             </div>

             <ProfileDropdown userID={userID}/>
             <BurgerMenu userID={userID}/>
          </nav>
       </div>
   );
};

export default Header;
