import {FC, useMemo} from "react";

interface ClubActionButtonProps {
   clubID: string;
   userID: string;
   handleJoin: () => void;
   handleLeave: () => void;
}
const ClubActionButton:FC<ClubActionButtonProps> = ({clubID, userID, handleJoin, handleLeave}) => {

   const isLeaveButton = useMemo(() => {
      return
   },[clubID, userID])

   return (
       <div>

       </div>
   );
};

export default ClubActionButton;
