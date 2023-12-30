import {FC} from "react";

interface DividerProps {
   my?: string;
   color?: string;
}

const Divider: FC<DividerProps> = ({my, color}) => {
   return (
       <div className={`h-[3px] w-full bg-${color ? color : 'horizontal'}`}/>
   );
};

export default Divider;
