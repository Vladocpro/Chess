import {FC} from "react";

interface DividerProps {
   styles?: string;
}

const Divider: FC<DividerProps> = ({styles}) => {
   return (
       <div className={` w-full ${styles}`}/>
   );
};

export default Divider;
