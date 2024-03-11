import {FC} from "react";
import {userCapturedPieces} from "./GameTypes.ts";

interface UserRowProps {
   isTraining: boolean;
   username: string;
   rating?: number;
   timer?: number;
   pieceColor: string;
   capturedPoints: number;
   capturedPieces: userCapturedPieces;
}

const UserRow: FC<UserRowProps> = ({
                                      isTraining,
                                      username,
                                      rating,
                                      timer,
                                      pieceColor,
                                      capturedPoints,
                                      capturedPieces
                                   }) => {


   return (
       <div className={'flex items-center gap-2 my-2 h-[44px] pointer-events-none select-none'}>

          {/* Avatar */}
          {isTraining ? (
              // <div>
              <img src={'/opponent.png'}
                   className={'rounded-full  text-base sm:text-lg  h-[44px] w-[44px]'}/>
              // </div>

          ) : (
              <div
                  className={`flex items-center justify-center uppercase bg-primaryLight rounded-full  text-base sm:text-lg  h-[44px] w-[46px]`}>
                 {username[0]}
              </div>)
          }

          <div className={'flex flex-col'}>
             <span className={'text-sm pl-1 select-text'}>{username}
                {rating !== undefined
                    && <span className={'text-sm text-gray-400 font-light'}> ({rating})</span>}
            </span>

             {/* Captured pieces */}
             <div className={'flex items-center h-6'}>
                {
                    capturedPieces.p > 0 && (
                        <div className={'flex'}>
                           {Array.from({length: capturedPieces.p}, (_, index) =>
                               <img src={`/themes/pieces/Neo/${pieceColor}p.png`}
                                    className={`h-6 w-6 ${index === 0 ? 'ml-0' : 'ml-[-13px]'}`}
                               />
                           )
                           }
                        </div>
                    )
                }
                {
                    capturedPieces.n > 0 && (
                        <div className={'flex'}>
                           {Array.from({length: capturedPieces.n}, (_, index) =>
                               <img src={`/themes/pieces/Neo/${pieceColor}n.png`}
                                    className={`h-6 w-6 ${index === 0 ? 'ml-0' : 'ml-[-13px]'}`}
                               />
                           )
                           }
                        </div>
                    )
                }
                {
                    capturedPieces.b > 0 && (
                        <div className={'flex'}>
                           {Array.from({length: capturedPieces.b}, (_, index) =>
                               <img src={`/themes/pieces/Neo/${pieceColor}b.png`}
                                    className={`h-6 w-6 ${index === 0 ? 'ml-0' : 'ml-[-13px]'}`}/>)
                           }
                        </div>
                    )
                }
                {
                    capturedPieces.r > 0 && (
                        <div className={'flex'}>
                           {Array.from({length: capturedPieces.r}, (_, index) =>
                               <img src={`/themes/pieces/Neo/${pieceColor}r.png`}
                                    className={`h-6 w-6 ${index === 0 ? 'ml-0' : 'ml-[-13px]'}`}/>)
                           }
                        </div>
                    )
                }
                {
                    capturedPieces.q > 0 && (
                        <div className={'flex'}>
                           {Array.from({length: capturedPieces.q}, (_, index) =>
                               <img src={`/themes/pieces/Neo/${pieceColor}q.png`}
                                    className={`h-6 w-6 ${index === 0 ? 'ml-0' : 'ml-[-13px]'}`}/>)
                           }
                        </div>
                    )
                }


                {
                    capturedPoints > 0 &&
                    <div
                        className={'text-sm text-gray-300 font-light ml-1 sm:text-base'}>+{capturedPoints}</div>
                }
             </div>
          </div>
          {timer !== undefined && (
              <div
                  className={'flex items-center justify-center font-bold h-full ml-auto bg-primaryDark border-[1.5px] px-4 border-primaryGreen rounded-lg'}>
                 10:22
              </div>
          )}
       </div>
   );
};

export default UserRow;
