import React, {FC} from 'react';
import useUser from "../../zustand/userStore.tsx";

interface ProfileIconProps {
   size: 'sm',
   styles?: string,
   withText?: boolean
}

const ProfileIcon: FC<ProfileIconProps> = ({size, styles, withText}) => {

   const user = useUser()
   const defineStyles = sizes[size]

   if (!user.username) {
      return null
   }

   if (withText) {
      return (
          <div className={'flex items-center gap-3'}>
             <div className={`flex items-center justify-center bg-primaryLight rounded-full ${defineStyles} ${styles}`}>
                {user.username[0].toUpperCase()}
             </div>
             <span>{user.username}</span>
          </div>

      );
   }

   return (
       <div className={`flex items-center justify-center bg-primaryLight rounded-full ${defineStyles} ${styles}`}>
          {user.username[0].toUpperCase()}
       </div>
   );
};

const sizes = {
   sm: 'h-[2.5rem] w-[2.5rem]',
   md: 'h-[3rem] w-[3rem] text-xl',
}

export default ProfileIcon;
