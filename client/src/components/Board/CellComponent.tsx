import {FC, useMemo} from 'react'
import {Cell, CellComponentProps} from "./GameTypes.ts";
import useTheme from "../../zustand/themeStore.tsx";

interface CellComponentProps {
   key: string;
   cell: Cell;
   selected?: boolean;
   cellColor: string;
   height: number;
   width: number;
   click?: (cell: Cell) => void;
   inverted: boolean;
   showNotations: boolean;
   available: boolean;
   attacked: boolean;
   inCheck: boolean
}

const CellComponent: FC<CellComponentProps> = ({
                                                  key,
                                                  cell,
                                                  cellColor,
                                                  selected,
                                                  width,
                                                  height,
                                                  click,
                                                  inverted,
                                                  showNotations,
                                                  available,
                                                  attacked,
                                                  inCheck
                                               }) => {
   const theme = useTheme()
   const calculatedCellColor = useMemo(() => {
      if (inCheck) {
         return '#dc2626'
      }
      if (selected) {
         return theme.cellHighlight;
      }
      if (cellColor === 'b') {
         return theme.cellBlack;
      }
      if (cellColor === 'w') {
         return theme.cellWhite;
      }
      return '';
   }, [theme, cellColor, selected, inCheck])


   return (
       <div
           className={`relative flex justify-center items-center  select-none`}
           style={{backgroundColor: calculatedCellColor, width: width + 'px', height: height + 'px'}}
           onClick={() => click(cell)} key={key}>

          {/* Available cell to move */}
          {available && !cell?.type && <div className={`absolute z-10 rounded-full h-4 w-4 sm:h-[22px] sm:w-[22px]`}
                                            style={{backgroundColor: theme.cellAvailable}}/>}

          {/* Available cell to attack */}
          {attacked && cell?.type && <div className={`absolute z-10 rounded-full`}
                                          style={{
                                             border: `5px solid ${theme.cellAvailable}`,
                                             height: `${height * 0.9}px`,
                                             width: `${width * 0.9}px`,
                                          }}/>}

          {/* Piece Icon */}
          {cell?.color !== undefined &&
              <img src={theme[`${cell?.color}${cell.type}`]}
                   className={`h-full w-full pointer-events-none select-none ${inverted ? 'rotate-180' : 'rotate-0'}`}
                   alt=""/>}

          {/* Notation Letter */}
          {showNotations && cell.square[0] === 'a' && (
              <span
                  className={`absolute z-10 font-bold text-sm lg:text-base select-none left-[4%] top-[3%] ${inverted ? 'rotate-180' : 'rotate-0'}`}
                  style={{color: cellColor === 'w' ? theme.cellBlack : theme.cellWhite}}>
            {cell.square[1]}
          </span>
          )}

          {/* Notation Number */}
          {showNotations && cell.square[1] === '1' && (
              <span
                  className={`absolute z-10 font-bold text-sm lg:text-base select-none left-[4%] bottom-[2%] ${inverted ? 'rotate-180' : 'rotate-0'} `}
                  style={{color: cellColor === 'w' ? theme.cellBlack : theme.cellWhite}}>
            {cell.square[0]}
          </span>
          )}
       </div>
   )
}
export default CellComponent


