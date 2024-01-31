import {FC} from 'react';
import useUser from "../../zustand/userStore.tsx";

interface ProfileIconProps {
   size?: 'sm' | 'md' | 'lg';
   iconStyles?: string;
   textStyles?: string;
   withText?: boolean;
   textValue?: string;
   bgColor?: string;
   isMyProfile: boolean;
}

const sizes = {
   sm: 'h-[1.75rem] w-[1.75rem] text-sm',
   md: 'h-[2.5rem] w-[2.5rem] text-lg',
   lg: 'h-[4rem] w-[4rem] text-3xl',
}



const ProfileIcon: FC<ProfileIconProps> = ({size, iconStyles, textStyles, withText, textValue, isMyProfile, bgColor}) => {

   const user = useUser()
   const defineStyles = sizes[size]
   const providedText = () => {
      if(isMyProfile) {
         return {
            firstLetter: user.username[0].toUpperCase(),
            username:user.username
         }
      }
      return {
         firstLetter: textValue === undefined ? '' : textValue[0].toUpperCase(),
         username: textValue === undefined ? '' : textValue
      }
   }

   if (isMyProfile && user.username === '') {
      return null
   }

   if (withText) {
      return (
          <div className={'flex items-center gap-3'}>
             <div className={`flex items-center justify-center bg-primaryLight rounded-full ${defineStyles} ${iconStyles}`} style={{backgroundColor: bgColor}}>
                {providedText().firstLetter}
             </div>
             <div className={`${textStyles}`}>{providedText().username}</div>
          </div>

      );
   }

   return (
       <div className={`flex items-center justify-center bg-primaryLight rounded-full ${defineStyles} ${iconStyles}`} style={{backgroundColor: bgColor}}>
          {providedText().firstLetter}
       </div>
   );
};



export default ProfileIcon;
