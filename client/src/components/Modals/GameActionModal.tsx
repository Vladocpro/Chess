import useGameModal from "../../zustand/gameModalStore.tsx";
import {FC, useState} from "react";

interface GameActionModalProps {
   restartGame?: () => void
   newGame?: () => void
   offerDraw?: () => void
   acceptDraw?: () => void;
   declineDraw?: () => void;
   offerRematch?: () => void
   acceptRematch?: () => void;
   declineRematch?: () => void;
}

const GameActionModal: FC<GameActionModalProps> = ({
                                                      restartGame,
                                                      newGame,
                                                      offerDraw,
                                                      acceptDraw,
                                                      declineDraw,
                                                      offerRematch,
                                                      acceptRematch,
                                                      declineRematch
                                                   }) => {
   const modal = useGameModal()
   const [rematchIsOffered, setRematchIsOffered] = useState<boolean>(false)
   if (modal.leftPlayer?.username === '') return null
   const ModalFooter = () => {
      switch (modal.type) {
         case "rematch": {
            return (
                <>
                   <button
                       className={'bg-primaryLight hover:bg-red-600 duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                       onClick={() => {
                          modal.closeModal()
                          if (declineRematch) {
                             declineRematch()
                          }
                       }}>
                      Decline offer
                   </button>
                   <button
                       className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                       onClick={() => {
                          modal.closeModal()
                          if (acceptRematch) {
                             acceptRematch()
                          }
                       }}>
                      Accept offer
                   </button>

                </>
            )
         }
         case "draw": {
            return (
                <>
                   <button
                       className={'bg-primaryLight hover:bg-red-600 duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                       onClick={() => {
                          modal.closeModal()
                          if (declineDraw) {
                             declineDraw()
                          }
                       }}>
                      Decline draw
                   </button>
                   <button
                       className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                       onClick={() => {
                          modal.closeModal()
                          if (acceptDraw) {
                             acceptDraw()
                          }
                       }}>
                      Accept draw
                   </button>

                </>
            )
         }
         case "regular": {
            return (
                <>
                   {
                      rematchIsOffered ? (
                          <button
                              className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                              onClick={() => {
                                 modal.closeModal()
                                 if (declineRematch) {
                                    declineRematch()
                                 }
                              }}>
                             Cancel Rematch
                          </button>
                      ) : (
                          <button
                              className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                              onClick={() => {
                                 modal.closeModal()
                                 if (offerRematch) {
                                    offerRematch()
                                 }
                              }}>
                             Rematch
                          </button>
                      )
                   }
                   <button
                       className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                       onClick={() => {
                          modal.closeModal()
                          if (newGame) {
                             newGame()
                          }
                       }}>
                      {'New Game'}
                   </button>
                </>
            )

         }
         case "training": {
            return (
                <button
                    className={'bg-primaryLight hover:bg-secondaryGreen duration-200 text-sm w-full py-2 rounded-lg font-medium sm:text-base'}
                    onClick={() => {
                       modal.closeModal()
                       if (restartGame) {
                          restartGame()
                       }
                    }}>
                   {'Restart Game'}
                </button>
            )
         }
      }
   }


   return (
       <div
           className={`flex items-center justify-center cartPage:items-end fixed inset-0 z-20 transition-all duration-300 ${modal.isOpen ? "visible" : "invisible opacity-0"}`}>
          <div
              className={`absolute inset-0 z-30 bg-[rgba(111,111,111,0.1)] transition-all duration-300 h-full w-full ${modal.isOpen ? "visible" : "invisible opacity-0"}`}
              onClick={modal.closeModal}/>

          <div
              className={`relative z-30 w-80 py-4 px-3 sm:p-6 bg-primary rounded-lg border-2 border-primaryGreen transition-all ${modal.isOpen ? "translate-y-0 scale-100 duration-300 pointer-events-auto" : "-translate-y-32 scale-50 opacity-0 duration-200 pointer-events-none"}`}
          >

             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                  onClick={modal.closeModal}
                  stroke="currentColor" className="absolute top-2 right-2 w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
             </svg>


             {/* Body */}
             <div className={'flex flex-col gap-3 mt-2 '}>
                <div className={'text-center text-xl font-bold break-words mb-2.5 line-clamp-2'}>{modal.outcomeText}
                </div>
                <div className={'flex justify-center items-center'}>
                   {
                      modal.type === 'regular' || modal.type === 'training' ? (
                          <>
                             <div className={'flex flex-col w-[102px] '}>
                                <div
                                    className={`flex relative items-center justify-center self-center uppercase bg-primaryLight rounded-xl border-2  ${modal.leftPlayer?.outcome === 'w' ? 'border-primaryGreen' : 'border-primaryLight'} text-base sm:text-lg  h-[76px] w-[76px]`}>
                                   <span
                                       className={'text-lg font-medium uppercase'}>{modal.leftPlayer?.username[0]}</span>
                                   {
                                      modal.leftPlayer?.outcome === 'w' ? (
                                          <div
                                              className={'absolute flex items-center justify-center h-7 w-7 -right-0.5 bottom-0 bg-primaryGreen rounded-xl'}>
                                             <img src={'/victory.png'} className={'h-5 w-5'} alt={''}/>
                                          </div>
                                      ) : null
                                   }
                                </div>
                                <span
                                    className={'mt-1 text-sm text-center break-words truncate'}>{modal.leftPlayer?.username}</span>
                             </div>
                             <span className={'text-lg font-semibold mx-1.5 mb-4'}>vs</span>
                             <div className={'flex flex-col  w-[102px] '}>
                                <div
                                    className={`flex relative items-center justify-center  self-center  uppercase bg-primaryLight rounded-xl border-2 ${modal.rightPlayer?.outcome === 'w' ? 'border-primaryGreen' : 'border-primaryLight'} text-base sm:text-lg  h-[76px] w-[76px]`}>
                                   <span
                                       className={'text-lg font-medium uppercase'}>{modal.rightPlayer?.username[0]}</span>
                                   {
                                      modal.rightPlayer?.outcome === 'w' ? (
                                          <div
                                              className={'absolute flex items-center justify-center h-7 w-7 -right-0.5 bottom-0 bg-primaryGreen rounded-xl'}>
                                             <img src={'/victory.png'} className={'h-5 w-5'} alt={''}/>
                                          </div>
                                      ) : null
                                   }

                                </div>
                                <span
                                    className={'mt-1 text-sm text-center break-words truncate'}>{modal.rightPlayer?.username}</span>
                             </div>
                          </>
                      ) : null
                   }


                </div>

                {/* Footer */}
                <div className={'flex justify-between mt-3 sm:mt-3.5 gap-3'}>

                   <ModalFooter/>

                </div>
             </div>
          </div>
       </div>

   );
};

export default GameActionModal;
