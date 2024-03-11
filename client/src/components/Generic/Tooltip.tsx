import {useState, ReactNode, FC, useMemo} from "react";

interface TooltipProps {
   children: ReactNode;
   text: string;
   textStyles?: string;
   containerStyles?: string;
   placement?: 'top' | 'bottom';
   onClick?: () => void;
}

export const Tooltip: FC<TooltipProps> = ({children, text, textStyles, containerStyles, placement, onClick}) => {
   const [showTooltip, setShowTooltip] = useState(false);

   const positioningStyles = useMemo(() => {
      switch (placement) {
         case 'top' : {
            return {
               position: 'bottom-full',
               animation: `${showTooltip ? "-translate-y-2 opacity-100 visible" : "delay-0 translate-y-2 opacity-0 invisible"}`
            }
         }
         case 'bottom': {
            return {
               position: 'top-full',
               animation: `${showTooltip ? "translate-y-2 opacity-100 visible" : "delay-0 -translate-y-2 opacity-0 invisible"}`
            }
         }
         default: {
            return {
               position: 'top-full',
               animation: `${showTooltip ? "translate-y-2 opacity-100 visible" : "delay-0 -translate-y-2 opacity-0 invisible"}`
            }
         }
      }

   }, [placement, showTooltip])


   const handleMouseEnter = () => {
      setShowTooltip(true)
   };

   const handleMouseLeave = () => {
      setShowTooltip(false);
   };

   return (
       <div
           className={`relative inline-flex justify-center ${containerStyles}`}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
           onClick={() => {
              setShowTooltip(false)
              if (onClick) {
                 onClick()
              }
           }}
       >
          {children}
          <span onMouseEnter={handleMouseLeave}
                className={`absolute z-30 ${positioningStyles.position} delay-300 whitespace-nowrap transform-all ${textStyles}  ${positioningStyles.animation}  duration-300 cursor-default bg-black bg-opacity-70 text-white text-base py-1 px-3 rounded-md`}>
                 {text}
              </span>
       </div>
   );
}

export default Tooltip;
