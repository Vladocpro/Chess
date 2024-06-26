import {FC} from 'react';
import GameDurationIcon from "./GameDurationIcon.tsx";

interface GameDurationProps {
   type: string;
   isWithLabel: boolean;
   isLabelBottom?: boolean;
   labelText?: string;
   iconStyles?: string;
   labelStyles?: string;
}

const GameDuration: FC<GameDurationProps> = ({
                                                type,
                                                isWithLabel,
                                                isLabelBottom,
                                                labelText,
                                                labelStyles,
                                                iconStyles
                                             }) => {


   return (
       <div className={`flex items-center ${isLabelBottom && 'flex-col'} gap-2`}>
          <GameDurationIcon type={type} iconStyles={iconStyles}/>
          {isWithLabel && <span className={`${labelStyles}`}>{labelText}</span>}
       </div>
   )
};
export default GameDuration;
