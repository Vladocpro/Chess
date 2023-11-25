import React, {FC, useMemo} from 'react';
import {GameDurationProps} from "./GameDuration.types.ts";
import GameDurationIcon from "./GameDurationIcon.tsx";

interface GameDurationProps {
   type: 'blitz' | 'bullet' | 'rapid' | 'custom';
   size: 'sm' | 'lg';
   isWithLabel: boolean;
   isLabelBottom?: boolean;
   labelText?: string;
}

const GameDuration: FC<GameDurationProps> = ({type, size, isWithLabel, isLabelBottom, labelText}) => {

   const defineStyles = sizes[size]

   return (
       <div className={`flex items-center ${isLabelBottom && 'flex-col'} gap-2`}>
          <GameDurationIcon type={type} size={defineStyles.iconSize}/>
          {isWithLabel && <span className={`text-${defineStyles.labelSize}`}>{labelText}</span>}
       </div>
   )
};

const sizes = {
   sm: {
      iconSize: '2rem',
      labelSize: 'lg'
   },
   lg: {
      iconSize: '3rem',
      labelSize: '3xl'
   }
}

export default GameDuration;
