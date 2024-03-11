import {FC, useEffect, useState} from "react";
import {IGameInvitation} from "../../../types.ts";
import CreateGameTab from "./CreateGameTab/CreateGameTab.tsx";
import WaitingTab from "./WaitingTab.tsx";
import InvitationTab from "./InvitationTab.tsx";
import {getFetch} from "../../../utils/axios/fetcher.ts";
import useToast, {ToastPositions, ToastType} from "../../../zustand/toastModalStore.tsx";

interface TabsProps {
   currentTab: string;
   setCurrentTab: (tab: string) => void;
}

const Tabs:FC<TabsProps> = ({currentTab, setCurrentTab}) => {

   const [waitingInvitation, setWaitingInvitation] = useState<IGameInvitation | null>(null)
   const [receivedInvitations, setReceivedInvitations] = useState<IGameInvitation[]>([])
   const [sentInvitations, setSentInvitations] = useState<IGameInvitation[]>([])
   const {openToast} = useToast()

   const getGameInvitations = () => {
      getFetch('/game-invitation/getGameInvitations').then((data) => {
         setSentInvitations(data.sentInvitations)
         setReceivedInvitations(data.receivedInvitations)
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 1800})
      })
   }

   useEffect(() => {
      getGameInvitations()
   }, []);
   // useEffect(() => {
   //    getGameInvitations()
   // }, [currentTab]);

   switch (currentTab) {
      case "create game": return <CreateGameTab setCurrentTab={setCurrentTab}  setWaitingInvitation={setWaitingInvitation} sentInvitations={sentInvitations} setSentInvitations={setSentInvitations}/>
      case "waiting": return <WaitingTab setCurrentTab={setCurrentTab} waitingInvitation={waitingInvitation} setWaitingInvitation={setWaitingInvitation} sentInvitations={sentInvitations} setSentInvitations={setSentInvitations}  />
      case "invitations":  return <InvitationTab receivedInvitations={receivedInvitations} setReceivedInvitations={setReceivedInvitations} sentInvitations={sentInvitations} setSentInvitations={setSentInvitations} getGameInvitations={getGameInvitations} />
      default: return null;
   }
};

export default Tabs;
