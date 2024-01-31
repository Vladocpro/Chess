import {FC, useEffect, useMemo} from 'react'
import {CellComponentProps} from "./GameTypes.ts";
import useTheme from "../../zustand/themeStore.tsx";


const CellComponent: FC<CellComponentProps> = ({key, cell, cellColor, selected, width, height, click}) => {

   const theme = useTheme()

   const calculatedCellColor = useMemo(() => {
      if (selected) {
         return theme.cellHighlight;
      }
      if (cellColor === 'black') {
         return theme.cellBlack;
      }
      if (cellColor === 'white') {
         return theme.cellWhite;
      }
      return '';
   }, [theme, cellColor, selected])

   return (
       <div className={`relative flex justify-center items-center`}
            style={{backgroundColor: calculatedCellColor, width: width + 'px', height: height + 'px'}}
            onClick={() => click(cell)} key={key}>
          {/*{cell.available && !cell.figure && <div className={"available"}/>}*/}
          {cell !== null && <img src={theme[`${cell.color}${cell.type}`]} className={'h-full w-full'} alt=""/>}
          {/*{cell.y === 7 && (*/}
          {/*    <span*/}
          {/*        className={`notationLetter ${cell.color === Colors.WHITE ? "notationColorBlack" : "notationColorWhite"}`}>*/}
          {/*  {notationString[0]}*/}
          {/*</span>*/}
          {/*)}*/}
          {/*{cell.x === 0 && (*/}
          {/*    <span*/}
          {/*        className={`notationNumber ${cell.color === Colors.WHITE ? "notationColorBlack" : "notationColorWhite"}`}>*/}
          {/*  {notationString[1]}*/}
          {/*</span>*/}
          {/*)}*/}
       </div>
   )
}
export default CellComponent


