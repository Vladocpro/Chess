import {FC, useEffect, useRef, useState} from "react";
import useClickOutside from "../../hooks/useClickOutside.tsx";


interface OptionType {
   label: any,
   value: any,
}

interface DropDownProps {
   title?: string;
   titleStyles?: string,
   containerStyles?: string,
   itemStyles?: string,
   selectStyles?: string,
   svgStyles?: string,
   dropdownStyles?: string,
   svgBox?: string,
   options: OptionType[],
   onChange: (title: string) => void,
}

const Dropdown: FC<DropDownProps> = ({
                                        title,
                                        titleStyles,
                                        svgStyles,
                                        containerStyles,
                                        itemStyles,
                                        svgBox,
                                        options,
                                        selectStyles,
                                        dropdownStyles,
                                        onChange
                                     }) => {

   const [isOpen, setIsOpen] = useState(false)
   const [selectedTitle, setSelectedTitle] = useState(title)
   const dropdownRef = useRef(undefined);
   useClickOutside(dropdownRef, () => {
      setIsOpen(false);
   });

   useEffect(() => {
      setSelectedTitle(title)
   }, [title]);


   return (
       <div className={`relative ${dropdownStyles}`} ref={dropdownRef}>
          <div
              className={`flex gap-3 items-center px-1 cursor-pointer ${isOpen ? 'rounded-t-lg' : 'rounded-lg'} select-none ${selectStyles}`}
              onClick={() => setIsOpen(!isOpen)}>
             <div className={titleStyles}>{selectedTitle}</div>
             <div className={`relative w-8 h-8 ${svgBox}`}>
                <hr className={`absolute h-[2.4px] w-4 rounded-xl bottom-[14px] left-0.5  bg-white   ${!isOpen ? "rotate-45" : "-rotate-45"} ${svgStyles} transition-all duration-300 bg-black`}/>
                <hr className={`absolute h-[2.4px] w-4 rounded-xl bottom-[14px] right-1 bg-white   ${!isOpen ? "-rotate-45" : "rotate-45"}    ${svgStyles}    transition-all duration-300 bg-black`}/>
             </div>
          </div>
          {/*Dropdown Options*/}
          <div
              className={`${isOpen ? "translate-y-0  opacity-100 visible pointer-events-auto" : "-translate-y-5 opacity-0 invisible pt-4 pointer-events-none"} ${containerStyles} transition-all duration-300  rounded-b-lg select-none  absolute z-10 right-0`}>
             {options.map((item, index) => (
                 <div key={index}
                      className={` cursor-pointer ${itemStyles}`}
                      onClick={() => {
                         setSelectedTitle(item.label)
                         setIsOpen(!isOpen)
                         onChange(item)
                      }}
                 >
                    {item.label}
                 </div>
             ))}

          </div>
       </div>
   );
};

export default Dropdown;
