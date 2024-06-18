import {FC, useEffect, useState} from "react";

interface PlayerTimerProps {
   time?: number
   isYourTurn: boolean;
   gameIsFinished: boolean;
   onTimeExpire?: () => void
}

const PlayerTimer: FC<PlayerTimerProps> = ({time, isYourTurn, gameIsFinished, onTimeExpire}) => {
   const [timeLeft, setTimeLeft] = useState<number>(time);

   const getFormattedTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
   };

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (timeLeft <= 0 || !isYourTurn || gameIsFinished) {
            clearInterval(intervalId);
            if (onTimeExpire !== undefined && timeLeft <= 0) {
               onTimeExpire();
            }
         } else {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
         }
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup
   }, [isYourTurn, timeLeft, onTimeExpire]);


   useEffect(() => {
      setTimeLeft(time)
   }, [time]);

   if (time === undefined) return null
   return (
       <div
           className={'flex items-center justify-center font-bold h-full ml-auto bg-primaryDark border-[1.5px] w-20 border-primaryGreen rounded-lg'}>
          {getFormattedTime(timeLeft)}
       </div>
   );
};

export default PlayerTimer;
