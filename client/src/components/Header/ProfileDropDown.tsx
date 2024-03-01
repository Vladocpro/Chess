import ProfileIcon from "../Generic/ProfileIcon.tsx";
import {Link} from "react-router-dom";
import {FC, useRef, useState} from "react";
import useClickOutside from "../../hooks/useClickOutside.tsx";
import {logout} from "../../utils/auth.ts";

interface ProfileDropdownProps {
   userID: string;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({userID}) => {

   const [isOpen, setIsOpen] = useState(false)
   const dropdownRef = useRef(undefined);
   useClickOutside(dropdownRef, () => {
      setIsOpen(false);
   });

   return (
       <div className={'hidden sm:block relative'} ref={dropdownRef}>
          <div className={'cursor-pointer'} onClick={() => setIsOpen(!isOpen)}>
             <ProfileIcon size={'md'} isMyProfile={true}/>
          </div>

          {/* Dropdown options */}

          <div
              className={`${isOpen ? "translate-y-3  opacity-100 visible duration-300 pointer-events-auto" : "-translate-y-5 opacity-0 invisible pt-4 pointer-events-none duration-150"} py-1.5 w-32 transition-all bg-primary rounded-lg select-none absolute z-10 right-0`}>
             <Link to={`/profile/${userID}`} onClick={() => setIsOpen(!isOpen)}
                   className={'flex items-center gap-2.5 cursor-pointer transition-all pl-2.5 pr-3 py-1.5 rounded-sm duration-300 hover:bg-secondaryGreen'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                     className="w-5 h-5">
                   <path fillRule="evenodd"
                         d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                         clipRule="evenodd"/>
                </svg>
                <span className={'font-medium'}>Profile</span>
             </Link>
             <div
                 className={"flex items-center gap-2.5  cursor-pointer transition-all pl-3.5 py-1.5 rounded-sm duration-300 hover:bg-secondaryGreen"}
                 onClick={() => {
                    setIsOpen(!isOpen)
                    logout()
                 }}>
                <img className={'w-4 h-4'} src={'/logout.png'}
                     alt={'Log Out'}/>
                <span className={'font-medium'}>Log Out</span>
             </div>
          </div>

       </div>

   )
};

export default ProfileDropdown;
