import {io} from "socket.io-client";
import useGameModal from "../zustand/gameModalStore.tsx";
import {
   IGame,
   IGameInvitation,
   InvitationInfo,
   IOnlineActionsPayload,
   IPlayerLeftGame,
   ISetGameOverPayload
} from "../types.ts";
import useToast, {ToastPositions, ToastType} from "../zustand/toastModalStore.tsx";
import useGameState from "../zustand/gameState.tsx";
import useRematch from "../zustand/rematchState.tsx";
import useUser from "../zustand/userStore.tsx";

let socket: any = null;


export const connectWithSocketServer = (token: string) => {

   socket = io(import.meta.env.VITE_SERVER_URL, {
      auth: {
         token: token,
      },
   });

   socket.on("connect", () => {
      console.log(socket.id)
   });

   socket.on("opponent-resigned-game", (resignitionInfo: IOnlineActionsPayload) => {
      if ('error' in resignitionInfo) {
         const toastModal = useToast.getState()
         toastModal.openToast({
            message: resignitionInfo.error,
            duration: 3000,
            position: ToastPositions.AUTH,
            type: ToastType.ERROR
         })
         return
      }
      const state = useGameModal.getState()
      state.openModal({
         type: 'regular',
         leftPlayer: {
            username: resignitionInfo.user.username,
            outcome: 'w'
         },
         rightPlayer: {
            username: resignitionInfo.opponent.username,
            outcome: 'l'
         },
         outcomeText: `${resignitionInfo.opponent.username} Resigned`,
      })
      const game = useGameState.getState()
      game.setIsFinished(true)
   });

   socket.on("user-received-draw-offer", (drawPayload: IOnlineActionsPayload) => {
      const toastModal = useToast.getState()
      const gameActionModal = useGameModal.getState()
      if ('error' in drawPayload) {
         toastModal.openToast({
            message: drawPayload.error,
            duration: 3000,
            position: ToastPositions.AUTH,
            type: ToastType.ERROR
         })
      } else {
         gameActionModal.openModal({
            type: 'draw',
            outcomeText: `${drawPayload.opponent.username} offered a draw`,
         })
      }
   });

   socket.on("received-accepted-draw-offer", (drawPayload: IOnlineActionsPayload) => {
      const toastModal = useToast.getState()
      const gameActionModal = useGameModal.getState()
      if ('error' in drawPayload) {
         toastModal.openToast({
            message: drawPayload.error,
            duration: 3000,
            position: ToastPositions.AUTH,
            type: ToastType.ERROR
         })
      } else {
         gameActionModal.openModal({
            type: 'regular',
            leftPlayer: {
               username: drawPayload.user.username,
               outcome: 'd'
            },
            rightPlayer: {
               username: drawPayload.opponent.username,
               outcome: 'd'
            },
            outcomeText: `Draw`,
         })
         const game = useGameState.getState()
         game.setIsFinished(true)
      }
   });

   socket.on("received-rejected-draw-offer", (drawPayload: IOnlineActionsPayload) => {
      const toastModal = useToast.getState()
      if ('error' in drawPayload) {
         toastModal.openToast({
            message: drawPayload.error,
            duration: 3000,
            position: ToastPositions.AUTH,
            type: ToastType.ERROR
         })
      } else {
         toastModal.openToast({
            message: `${drawPayload.opponent.username} declined draw offer`,
            type: ToastType.WARNING,
            position: ToastPositions.AUTH,
            duration: 6000
         })
      }
   });

   socket.on("user-made-move", (movePayload: IGame) => {
      const toastModal = useToast.getState()
      if ('error' in movePayload) {
         toastModal.openToast({
            message: movePayload.error,
            duration: 3000,
            position: ToastPositions.AUTH,
            type: ToastType.ERROR
         })
      } else {
         const game = useGameState.getState()
         const user = useUser.getState()
         if (user.userID === movePayload.user1.userID) {
            game.setNextTurn({
               pgn: movePayload.pgn,
               playerTimeLeft: movePayload.user1.timeLeft,
               opponentTimeLeft: movePayload.user2.timeLeft,
            })
         } else {
            game.setNextTurn({
               pgn: movePayload.pgn,
               playerTimeLeft: movePayload.user2.timeLeft,
               opponentTimeLeft: movePayload.user1.timeLeft,
            })
         }

      }
   });

   socket.on("player-abandoned-game", (payload) => {
      const gameActionModal = useGameModal.getState()
      const game = useGameState.getState()
      gameActionModal.openModal({
         type: 'regular',
         leftPlayer: {
            username: payload.winner.username,
            outcome: 'w'
         },
         rightPlayer: {
            username: payload.loser.username,
            outcome: 'l'
         },
         outcomeText: `${payload.loser.username} abandoned the game`,
      })
      game.setIsFinished(true)
   });

   socket.on("received-game-invitation", () => {
      openNotificationToast('game')
   })
   socket.on("received-friend-invitation", () => {
      openNotificationToast('friend')
   })
   socket.on("received-rematch", (payload) => {
      if (window.location.href.includes('play')) {
         const gameActionModal = useGameModal.getState()
         const game = useRematch.getState()
         game.setRematch(payload)
         gameActionModal.openModal({
            type: 'rematch',
            outcomeText: `${payload.senderUsername} offered a rematch`
         })
      }
   })


   socket.on("game-time-expired", (payload) => {
      console.log(payload)
      const gameActionModal = useGameModal.getState()
      const game = useGameState.getState()
      gameActionModal.openModal({
         type: 'regular',
         leftPlayer: {
            username: payload.winner.username,
            outcome: 'w'
         },
         rightPlayer: {
            username: payload.loser.username,
            outcome: 'l'
         },
         outcomeText: `${payload.loser.username} lost on time`,
      })
      game.setIsFinished(true)
   })


   socket.on("opponent-accepted-game", (gameID: string) => {
      relocateToTheGame(gameID)
   });

};

export const sendResignition = (resignitionPayload: IOnlineActionsPayload) => {
   socket.emit("user-resigned-game", resignitionPayload)
};

export const connectUserToActiveGame = (payload: { gameID: string, userID: string, username: string }) => {
   socket.emit("connect-user-to-active-game", payload)
};


export const sendDrawOffer = (drawPayload: IOnlineActionsPayload) => {
   socket.emit("user-sent-draw-offer", drawPayload)
};
export const acceptDrawOffer = (drawPayload: IOnlineActionsPayload) => {
   socket.emit("user-accepted-draw-offer", drawPayload)
};
export const rejectDrawOffer = (drawPayload: IOnlineActionsPayload) => {
   socket.emit("user-rejected-draw-offer", drawPayload)
};

export const makeMove = (movePayload: IOnlineActionsPayload) => {
   socket.emit("user-made-move", movePayload)
};

export const relocateToTheGame = (gameID: string) => {
   window.location.assign(`/play/${gameID}`)
};
export const acceptGameInvitation = (invitationInfo: InvitationInfo) => {
   socket.emit("user-accepted-game", invitationInfo)
}

export const setGameOver = (payload: ISetGameOverPayload) => {
   socket.emit("set-game-over", payload)
}
export const setGameDraw = (payload: string) => {
   socket.emit("set-game-draw", payload)
}

export const sendGameInvitation = (userID: string) => {
   socket.emit("send-game-invitation", userID)
};
export const sendRematch = (payload: IGameInvitation) => {
   socket.emit("send-rematch", payload)
};
export const sendFriendInvitation = (userID: string) => {
   socket.emit("send-friend-invitation", userID)
};

export const playerTimeExpired = (payload: IOnlineActionsPayload) => {
   socket.emit("player-time-expired", payload)
};

export const playerLeftGame = (payload: IPlayerLeftGame) => {
   socket.emit("player-left-game", payload)
};

export const playerReconnectedToGame = (payload: { gameID: string, userID: string }) => {
   socket.emit("player-reconnected-to-game", payload)
};

const openNotificationToast = (type: 'game' | 'friend') => {
   const toastModal = useToast.getState()
   toastModal.openToast({
      message: `You received new ${type} invitation!`,
      duration: 5000,
      position: ToastPositions.AUTH,
      type: ToastType.SUCCESS
   })
}


