import Board from "../../components/Board/Board.tsx";
import useTheme from "../../zustand/themeStore.tsx";
import ThemeSettingsModal from "../../components/Modals/ThemeSettingsModal.tsx";
import useUser from "../../zustand/userStore.tsx";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import Dropdown from "../../components/Generic/Dropdown.tsx";
import {gameDurations} from "../../utils/constants/game.ts";
import {useLocation} from "react-router-dom";

const CreateGame = () => {

   const {setModal} = useTheme()
   const user = useUser()
   const location = useLocation()
   if (user.username === '') {
      return null
   }
   // on
   console.log(location.state)
   return (
       <div className={'flex gap-5'}>

          <div className={'flex'}>
             <div className={'flex flex-col'}>
                {/*Opponent row*/}
                <div className={'flex items-center gap-3 mb-2 h-[44px]'}>
                   <img src={'opponent.png'} height={'43px'} width={'43px'}/>
                   <div className={'flex  w-full gap-5 justify-between'}>
                      <span>Opponent</span>
                   </div>
                </div>

                <Board height={600} width={600}/>

                {/* User row  */}
                <div className={'flex items-center gap-3 mt-2 h-[44px]'}>
                   <div
                       className={`flex items-center justify-center bg-primaryLight rounded-full h-[2.75rem] w-[3rem] text-lg`}>
                      {user.username[0].toUpperCase()}
                   </div>
                   <div className={'flex  w-full gap-5 justify-between'}>
                      <span>{user.username}</span>
                      <span className={'text-primaryGreen'}>{user.rating} elo</span>
                   </div>
                </div>

             </div>
             <div className={'flex flex-col ml-2 mt-[52px]'}>
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

             </div>
             <div className={'flex flex-col bg-primary'}>
                <div className={'text-center'}>
                   <span>Play</span>
                </div>

                {/*Game Duration*/}
                <div>
                   {/*<Dropdown options={gameDurations} title={location.state.gameDurationLabel}/>*/}
                   {/*   Custom option*/}
                </div>

                {/*Opponent from friends*/}
                <div>
                   {/*<Dropdown/>*/}
                </div>

                {/*I play as white or black*/}
                <div>
                   {/*<Dropdown/>*/}
                </div>

                {/*Game Duration*/}
                <div>
                   <button className={'bg-primaryGreen'}>Create Game</button>
                   <button className={'bg-primaryGreen'}>Join by link</button>
                </div>
             </div>
          </div>


          <ThemeSettingsModal/>

       </div>
   );
};

export default CreateGame;
