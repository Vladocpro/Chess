import React, {FC, useMemo} from 'react';
import {GameDurationProps} from "./GameDuration.types.ts";
import GameDurationIcon from "./GameDurationIcon.tsx";

const GameDuration: FC<GameDurationProps> = ({type, size, isWithLabel, labelText}) => {

   const defineStyles = useMemo(() => {
      if (size === 'sm') {
         return {
            iconSize: '2rem',
            labelSize: 'xl'
         }
      }
      if (size === 'lg') {
         return {
            iconSize: '3rem',
            labelSize: '3xl'
         }
      }
      return {
         iconSize: '2rem',
         labelSize: 'xl'
      }
   }, [size])


   return (
       <div className={'flex items-center gap-2'}>
          <GameDurationIcon type={type} size={defineStyles.iconSize}/>
          {isWithLabel && <span className={`text-${defineStyles.labelSize}`}>{labelText}</span>}
       </div>
   )
};

export default GameDuration;
