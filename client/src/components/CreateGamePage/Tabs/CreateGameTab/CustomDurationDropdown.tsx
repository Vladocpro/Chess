import { useRef, useState} from "react";
import useClickOutside from "../../../../hooks/useClickOutside.tsx";
import {gameDurations} from "../../../../utils/constants/game.ts";
import GameDuration from "../../../GameDuration/GameDuration.tsx";

const CustomDurationDropdown = ({ selectedGameDuration, onChange }) => {
   const [isOpen, setIsOpen] = useState(false)
   const dropdownRef = useRef(undefined);
   useClickOutside(dropdownRef, () => {
      setIsOpen(false);
   });

   return (
       <div className={`relative`} ref={dropdownRef}>
          <div className={`flex gap-3 items-center px-2.5 sm:px-3 cursor-pointer select-none hover:bg-secondaryGreen justify-between h-10 sm:h-12 ${isOpen ? 'rounded-t-lg ' : 'rounded-lg'} bg-primaryLight transition-all duration-300`}
               onClick={() => setIsOpen(!isOpen)}>
             <GameDuration type={selectedGameDuration.type} iconStyles={'h-[1.5rem] sm:h-[2rem] w-[1.5rem] sm:w-[2rem]'} labelStyles={'text-lg'} isWithLabel={true} labelText={selectedGameDuration.label}/>
             <div className={`relative w-8 h-8 `}>
                <hr className={`absolute h-[2.4px] w-4 rounded-xl bottom-[14px] left-0.5  bg-white   ${!isOpen ? "rotate-45" : "-rotate-45"}  transition-all duration-300 bg-black`}/>
                <hr className={`absolute h-[2.4px] w-4 rounded-xl bottom-[14px] right-1 bg-white   ${!isOpen ? "-rotate-45" : "rotate-45"}       transition-all duration-300 bg-black`}/>
             </div>
          </div>
          {/*Dropdown Options*/}
          <div
              className={`${isOpen ? "translate-y-0  opacity-100 visible" : "-translate-y-5 opacity-0 invisible "}  transition-all duration-300  rounded-b-lg select-none  absolute z-10 right-0 w-full bg-primaryLight pt-4 space-y-1`}>
             {gameDurations.map((item, index) => (
                 <div
                     className={'cursor-pointer hover:bg-secondaryGreen rounded-sm py-1.5 sm:py-2 px-2.5 sm:px-3'}
                     onClick={() => {
                        setIsOpen(!isOpen)
                        onChange(item)
                     }}>
                    <GameDuration type={item.type} isWithLabel={true} labelText={item.label} iconStyles={'h-[1.5rem] sm:h-[2rem] w-[1.5rem] sm:w-[2rem]'} labelStyles={'text-lg'}/>
                 </div>
             ))}

          </div>
       </div>
   );
};

export default CustomDurationDropdown;
