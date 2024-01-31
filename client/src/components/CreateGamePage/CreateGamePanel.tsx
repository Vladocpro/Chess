import { useState} from "react";
import Tabs from "./Tabs/Tabs.tsx";

const CreateGamePanel = () => {
   const [currentTab, setCurrentTab] = useState<'create game' | 'waiting' | 'invitations'>('create game')


   return (
       <div className={'flex flex-col  bg-primary w-screen mb-0 sm:mb-7 pb-4 sm:w-[450px] max-w-[450px] h-auto min-h-[450px] sm:h-[600px]  rounded-lg  sm:mt-12  xl:ml-8'}>
          <div className={'flex justify-between rounded-t-lg'}>
             <div className={`flex-1 text-center cursor-pointer py-4 sm:py-5 font-medium rounded-tl-lg ${currentTab === 'create game' || currentTab === 'waiting' ? 'bg-primary' : 'bg-[#0B1418]'} `} onClick={() => setCurrentTab('create game')}>Play</div>
             <div className={`flex-1 text-center cursor-pointer py-4 sm:py-5 font-medium rounded-tr-lg ${currentTab === 'invitations' ? 'bg-primary' : 'bg-[#0B1418]'}`} onClick={() => setCurrentTab('invitations')}>Invitations</div>
          </div>
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

       </div>
   );
};

export default CreateGamePanel;
