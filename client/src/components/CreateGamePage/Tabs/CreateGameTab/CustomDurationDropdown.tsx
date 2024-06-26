import {FC, useRef, useState} from "react";
import useClickOutside from "../../../../hooks/useClickOutside.tsx";
import {gameDurations, GameDurationType} from "../../../../utils/constants/game.ts";
import GameDuration from "../../../GameDuration/GameDuration.tsx";

interface CustomDurationDropdownProps {
   selectedGameDuration: GameDurationType;
   onChange: (gameDurationItem: GameDurationType) => void;
}

const CustomDurationDropdown: FC<CustomDurationDropdownProps> = ({selectedGameDuration, onChange}) => {
   const [isOpen, setIsOpen] = useState(false)
   const dropdownRef = useRef<HTMLDivElement | null>(null);
   useClickOutside(dropdownRef, () => {
      setIsOpen(false);
   });

   return (
       <div className={`relative`} ref={dropdownRef}>
          <div
              className={`flex gap-3 items-center px-2.5 sm:px-3 cursor-pointer select-none hover:bg-secondaryGreen justify-between h-10 sm:h-12 ${isOpen ? 'rounded-t-lg ' : 'rounded-lg'} bg-primaryLight transition-all duration-300`}
              onClick={() => setIsOpen(!isOpen)}>
             <GameDuration type={selectedGameDuration.type} iconStyles={'h-[24px] sm:h-[32px] w-[24px] sm:w-[32px]'}
                           labelStyles={'text-lg'} isWithLabel={true} labelText={selectedGameDuration.label}/>
             <div className={`relative w-8 h-8 `}>
                <hr className={`absolute h-[2.4px] w-4 rounded-xl bottom-[14px] left-0.5  bg-white   ${!isOpen ? "rotate-45" : "-rotate-45"}  transition-all duration-300 bg-black`}/>
                <hr className={`absolute h-[2.4px] w-4 rounded-xl bottom-[14px] right-1 bg-white   ${!isOpen ? "-rotate-45" : "rotate-45"}       transition-all duration-300 bg-black`}/>
             </div>
          </div>
          {/*Dropdown Options*/}
          <div
              className={`${isOpen ? "translate-y-0  opacity-100 visible duration-300 pointer-events-auto" : "-translate-y-5 opacity-0 invisible pointer-events-none duration-150"}  transition-all rounded-b-lg select-none  absolute z-10 right-0 w-full bg-primaryLight pt-4 space-y-1`}>
             {gameDurations.map((item, index) => (
                 <div
                     key={index}
                     className={'cursor-pointer hover:bg-secondaryGreen rounded-sm  py-1.5 sm:py-2 px-2.5 sm:px-3'}
                     onClick={() => {
                        setIsOpen(!isOpen)
                        onChange(item)
                     }}>
                    <GameDuration type={item.type} isWithLabel={true} labelText={item.label}
                                  iconStyles={'h-[24px] sm:h-[32px] w-[24px] sm:w-[32px]'} labelStyles={'text-lg'}/>
                 </div>
             ))}

          </div>
       </div>
   );
};

export default CustomDurationDropdown;
