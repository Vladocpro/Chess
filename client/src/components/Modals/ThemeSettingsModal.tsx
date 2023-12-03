import useTheme, {BoardThemes, FigureThemes} from "../../zustand/themeStore.tsx";
import Dropdown from "../Generic/Dropdown.tsx";
import {boardPreviewCells, BoardThemeOptions, FiguresThemeOptions} from "../../utils/constants/themes.ts";
import CellComponent from "../Board/CellComponent.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import {useMemo} from "react";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";

const ThemeSettingsModal = () => {

   const theme = useTheme()
   const {openToast} = useToast()
   const windowSize = useWindowSize();

   const onFiguresChange = (item) => {
      // @ts-ignore
      let figureTheme = FigureThemes[item.value];
      figureTheme.figuresThemeName = item.label;
      theme.setFigures(figureTheme)
      openToast({message: 'Pieces Theme Updated Successfully', type: ToastType.BLACK, position: ToastPositions.AUTH, duration: 1500})

   }
   const onBoardChange = (item) => {
      // @ts-ignore
      let figureTheme = BoardThemes[item.value];
      figureTheme.boardThemeName = item.label;
      theme.setBoard(figureTheme)
      openToast({message: 'Board Theme Updated Successfully', type: ToastType.BLACK, position: ToastPositions.AUTH, duration: 1500})
   }

   const boardSize = useMemo(() => {
      if (windowSize === 'xs') {
         return {
            width: 300,
            height: 80
         }
      }
      return {
         width: 600,
         height: 150
      }
   }, [windowSize])

   return (
       <div
           className={`flex items-center justify-center cartPage:items-end fixed inset-0 z-20 transition-all duration-300 ${theme.themeSettingsOpen ? "visible" : "invisible opacity-0"}`}>
          <div
              className={`absolute inset-0 z-30 bg-[rgba(111,111,111,0.5)] transition-all duration-300 h-full w-full ${theme.themeSettingsOpen ? "visible" : "invisible opacity-0"}`}
              onClick={() => theme.setModal(false)}/>

          <div
              className={`relative z-30  py-4 px-3 sm:p-6 bg-primary rounded-lg  transition-all  duration-300 ${theme.themeSettingsOpen ? "translate-y-0" : "-translate-y-32 opacity-0"}`}>


             {/* Body */}
             <div className={'flex flex-col gap-3'}>
                <div className='grid grid-cols-8 grid-rows-2 mb-2'
                     style={{height: boardSize.height + 'px', width: boardSize.width + 'px'}}>
                   {boardPreviewCells.map((cell, index) =>
                       <CellComponent
                           // click={click}
                           cell={cell}
                           cellColor={cell.cellColor}
                           key={index}
                           width={boardSize.width / 8}
                           height={boardSize.height / 2}
                           // selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                       />
                   )}
                </div>
                <div className={'flex items-center justify-between'}>
                   <span>Pieces</span>
                   <Dropdown title={theme.figuresThemeName} options={FiguresThemeOptions}
                             onChange={onFiguresChange}
                             titleStyles={'w-[9rem] hover:bg-secondaryGreen  sm:w-[15rem]'}
                             containerStyles={'bg-[#51504C] px-4 py-2 w-full'}
                             selectStyles={'bg-[#51504C] hover:bg-secondaryGreen rounded-lg pl-2.5 pr-1.5 py-1'}
                             itemStyles={'hover:text-primaryGreen'}
                   />
                </div>
                <div className={'flex items-center justify-between'}>
                   <span>Board</span>
                   <Dropdown title={theme.boardThemeName} options={BoardThemeOptions} onChange={onBoardChange}
                             titleStyles={'w-[9rem] sm:w-[15rem]'}
                             containerStyles={'bg-[#51504C] px-4 py-2 w-full'}
                             selectStyles={'bg-[#51504C] hover:bg-secondaryGreen rounded-lg pl-2.5 pr-1.5 py-1'}
                             itemStyles={'hover:text-primaryGreen'}
                   />
                </div>
                {/* Footer */}
                <div className={'flex justify-between mt-3 sm:mt-5'}>
                   <button className={'bg-primaryLight hover:bg-secondaryGreen px-4 py-2 rounded-lg'} onClick={() => {
                      theme.resetTheme()
                      openToast({message: 'Theme was successfully reset', type: ToastType.BLACK, position: ToastPositions.AUTH, duration: 1500})
                   }}>Reset
                      Theme
                   </button>
                   <button className={'bg-primaryLight hover:bg-secondaryGreen px-10 py-2 rounded-lg'}
                           onClick={() => theme.setModal(false)}>Done
                   </button>

                </div>
             </div>
          </div>
       </div>
   );
};

export default ThemeSettingsModal;
