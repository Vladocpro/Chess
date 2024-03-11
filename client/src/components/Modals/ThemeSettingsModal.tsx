import useTheme, {BoardThemes, FigureThemes} from "../../zustand/themeStore.tsx";
import Dropdown from "../Generic/Dropdown.tsx";
import {
   boardPreviewCells,
   BoardThemeOptions,
   FiguresThemeOptions, PawnPromotionsLabels,
   PawnPromotionsOptions
} from "../../utils/constants/themes.ts";
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
      openToast({
         message: 'Pieces Theme Updated Successfully',
         type: ToastType.SUCCESS,
         position: ToastPositions.AUTH,
         duration: 1500
      })

   }
   const onBoardChange = (item) => {
      // @ts-ignore
      let boardTheme = BoardThemes[item.value];
      boardTheme.boardThemeName = item.label;
      theme.setBoard(boardTheme)
      openToast({
         message: 'Board Theme Updated Successfully',
         type: ToastType.SUCCESS,
         position: ToastPositions.AUTH,
         duration: 1500
      })

   }
   const onPawnPromotionChange = (item) => {
      theme.setPawnPromotion(item.value)
      openToast({
         message: 'Pawn Promotion Updated Successfully',
         type: ToastType.SUCCESS,
         position: ToastPositions.AUTH,
         duration: 1500
      })
   }

   const boardSize = useMemo(() => {
      if (windowSize === 'xs') {
         return {
            width: 328,
            height: 85
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
              className={`relative z-30  py-4 px-3 sm:p-6 bg-primary rounded-lg  transition-all   ${theme.themeSettingsOpen ? "translate-y-0 scale-100 duration-300 pointer-events-auto" : "-translate-y-32 scale-50 opacity-0 duration-200 pointer-events-none"}`}>


             {/* Body */}
             <div className={'flex flex-col gap-3'}>
                <div className='grid grid-cols-8 grid-rows-2 mb-2 rounded-sm overflow-hidden'
                     style={{height: boardSize.height + 'px', width: boardSize.width + 'px'}}>
                   {boardPreviewCells.map((cell, index) =>
                       <CellComponent
                           // click={click}
                           cell={cell}
                           cellColor={cell.cellColor}
                           key={index}
                           width={boardSize.width / 8}
                           height={boardSize.height / 2}
                           showNotations={false}
                           // selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                       />
                   )}
                </div>
                <div className={'flex items-center justify-between'}>
                   <span className={'text-sm sm:text-base'}>Pieces</span>
                   <Dropdown title={theme.figuresThemeName} options={FiguresThemeOptions}
                             onChange={onFiguresChange}
                             titleStyles={'w-[135px] sm:w-[240px]'}
                             containerStyles={'bg-[#51504C] pt-2 w-full'}
                             selectStyles={'bg-[#51504C] text-sm sm:text-base hover:bg-secondaryGreen duration-200 pl-3 pr-1.5 py-0.5 sm:py-1'}
                             itemStyles={' hover:bg-secondaryGreen text-sm sm:text-base px-3 py-1 sm:py-1.5 transition-all duration-200'}
                   />
                </div>
                <div className={'flex items-center justify-between'}>
                   <span className={'text-sm sm:text-base'}>Board</span>
                   <Dropdown title={theme.boardThemeName} options={BoardThemeOptions} onChange={onBoardChange}
                             titleStyles={'w-[135px] sm:w-[240px]'}
                             containerStyles={'bg-[#51504C] pt-2 w-full'}
                             selectStyles={'bg-[#51504C] text-sm sm:text-base hover:bg-secondaryGreen duration-200 pl-3 pr-1.5 py-0.5 sm:py-1'}
                             itemStyles={' hover:bg-secondaryGreen text-sm sm:text-base px-3 py-1 sm:py-1.5 transition-all duration-200'}
                   />
                </div>
                <div className={'flex items-center justify-between'}>
                   <span className={'text-sm sm:text-base'}>Pawn Promotion</span>
                   <Dropdown title={PawnPromotionsLabels[theme.pawnPromotion]}
                             options={PawnPromotionsOptions}
                             onChange={onPawnPromotionChange}
                             titleStyles={'w-[135px] sm:w-[240px]'}
                             containerStyles={'bg-[#51504C] pt-2 w-full'}
                             selectStyles={'bg-[#51504C] text-sm sm:text-base hover:bg-secondaryGreen duration-200 pl-3 pr-1.5 py-0.5 sm:py-1'}
                             itemStyles={' hover:bg-secondaryGreen text-sm sm:text-base px-3 py-1 sm:py-1.5 transition-all duration-200'}
                   />
                </div>
                <div className={'flex items-center mt-1 justify-between'}>
                   <span className={'text-sm sm:text-base'}>Play Sounds</span>
                   <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={theme.playSounds} className="sr-only peer "
                             onChange={(e) => theme.setPlaySounds(e.target.checked)}/>
                      <div
                          className="relative w-12 h-6 bg-gray-700 rounded-full peer peer-focus:ring-1 peer-focus:ring-secondaryGreen  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondaryGreen"></div>
                   </label>
                </div>
                {/* Footer */}
                <div className={'flex justify-between mt-3 sm:mt-5'}>
                   <button
                       className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm px-4 py-2 rounded-lg sm:text-base'}
                       onClick={() => {
                          theme.resetTheme()
                          openToast({
                             message: 'Theme was successfully reset',
                             type: ToastType.BLACK,
                             position: ToastPositions.AUTH,
                             duration: 1500
                          })
                       }}>
                      Reset Configuration
                   </button>
                   <button
                       className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm px-10 py-2 rounded-lg sm:text-base'}
                       onClick={() => theme.setModal(false)}>Done
                   </button>

                </div>
             </div>
          </div>
       </div>
   );
};

export default ThemeSettingsModal;
