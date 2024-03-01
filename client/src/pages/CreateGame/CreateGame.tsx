import useTheme from "../../zustand/themeStore.tsx";
import ThemeSettingsModal from "../../components/Modals/ThemeSettingsModal.tsx";
import useUser from "../../zustand/userStore.tsx";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import CreateGamePanel from "../../components/CreateGamePage/CreateGamePanel.tsx";
import {useState} from "react";
import BoardCreateGame from "../../components/Board/BoardCreateGame.tsx";
import UserRow from "../../components/Board/UserRow.tsx";
import {ICapturedPieces} from "../../components/Board/GameTypes.ts";


const capturedPieces = {
   w: {p: 0, n: 0, b: 0, r: 0, q: 0},
   b: {p: 0, n: 0, b: 0, r: 0, q: 0}
}

const CreateGame = () => {
   const [inverted, setInverted] = useState<boolean>(false)


   const {setModal} = useTheme()
   const user = useUser()
   if (user.username === '') {
      return null
   }


   return (
       <div
           className={'flex justify-center  gap-5 mt-0 md:mt-5 lg:mt-7 border-t-2 border-t-primaryGreen sm:border-t-0'}>

          <div className={'flex'}>
             <div className={'hidden xl:flex flex-col'}>
                <UserRow
                    isTraining={!inverted}
                    username={inverted ? user.username : 'Opponent'}
                    rating={inverted ? user.rating : undefined}
                    pieceColor={inverted ? 'b' : 'w'}
                    capturedPoints={0}
                    capturedPieces={inverted ? capturedPieces.b : capturedPieces.w}
                />

                <BoardCreateGame height={600} width={600} pgn={''} inverted={inverted}/>

                {/* User row  */}
                <UserRow
                    isTraining={inverted}
                    username={inverted ? 'Opponent' : user.username}
                    rating={inverted ? undefined : user.rating}
                    pieceColor={inverted ? 'w' : 'b'}
                    capturedPoints={0}
                    capturedPieces={inverted ? capturedPieces.w : capturedPieces.b}
                />
             </div>

             <div className={'hidden xl:flex flex-col gap-2 ml-2 mt-[52px]'}>
                <Tooltip text={'Settings'}>
                   <div className={'cursor-pointer'} onClick={() => setModal(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-8 h-8 fill-primaryLight stroke-white">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                   </div>
                </Tooltip>
                <Tooltip text={'Rotate the board'}>
                   <div className={'cursor-pointer'} onClick={() => setInverted(!inverted)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                           className="w-8 h-8 fill-primaryLight stroke-white">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                      </svg>
                   </div>
                </Tooltip>
             </div>
             <CreateGamePanel/>
          </div>


          <ThemeSettingsModal/>

       </div>
   );
};

export default CreateGame;
