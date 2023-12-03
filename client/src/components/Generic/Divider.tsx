import {FC} from "react";

interface DividerProps {
   height?: string;
   color?: string;
}

const Divider: FC<DividerProps> = ({height, color}) => {
   return (
       <div className={`h-[3px] w-full bg-${color ? color : 'horizontal'}`}/>
   );
};

export default Divider;
