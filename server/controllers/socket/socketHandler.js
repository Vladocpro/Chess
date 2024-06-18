import {getUserByID,removeActiveGame} from "../../serverStore.js";
import Game from "../../models/Game.js";
import User from "../../models/User.js";

export const redirectUserToGame = (socket,data) => {
   try {
      console.log(data)
      socket.to(getUserByID(data.opponentID)).emit("opponent-accepted-game",(data.gameID));
   } catch (e) {
      // TODO handle errors like game does not exist
      console.log(e)
   }

}


export const resignGame = async (socket,resignitionInfo) => {
   try {
      let convertedData = Object.assign({},resignitionInfo)
      convertedData.user = resignitionInfo.opponent;
      convertedData.opponent = resignitionInfo.user;

      let game = await Game.findById(resignitionInfo.gameID)
      if (game === undefined) {
         return
      }
      let firstUser = await User.findById(game.user1.userID)
      let secondUser = await User.findById(game.user2.userID)
      if (game.user1.userID.toString() === resignitionInfo.user.userID) {
         game.user1.outcome = 'l'
         game.user2.outcome = 'w'
         const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"loss");
         const user2RatingChane = calculateRatingChange(secondUser.rating,firstUser.rating,"win");
         firstUser.rating += user1RatingChange
         secondUser.rating += user2RatingChane
      } else {
         game.user2.outcome = 'l'
         game.user1.outcome = 'w'
         const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"win");
         const user2RatingChane = calculateRatingChange(secondUser.rating,firstUser.rating,"loss");
         firstUser.rating += user1RatingChange
         secondUser.rating += user2RatingChane
      }
      game.isFinished = true
      await game.save()
      await firstUser.save()
      await secondUser.save()
      socket.to(getUserByID(resignitionInfo.opponent.userID)).emit('opponent-resigned-game',(convertedData))
      removeActiveGame(resignitionInfo.gameID)
   } catch (error) {
      socket.to(getUserByID(resignitionInfo.opponent.userID)).emit('opponent-resigned-game',({error: error}))
   }

}
export const sendDrawOfferToOpponent = async (socket,drawPayload) => {
   try {
      let convertedData = Object.assign({},drawPayload)
      convertedData.user = drawPayload.opponent;
      convertedData.opponent = drawPayload.user;
      socket.to(getUserByID(drawPayload.opponent.userID)).emit('user-received-draw-offer',(convertedData))
   } catch (error) {
      socket.to(getUserByID(drawPayload.opponent.userID)).emit('user-received-draw-offer',({error: error}))
   }

}

export const userAcceptedDrawOffer = async (socket,drawPayload) => {
   try {
      let convertedData = Object.assign({},drawPayload)
      convertedData.user = drawPayload.opponent;
      convertedData.opponent = drawPayload.user;
      let game = await Game.findById(drawPayload.gameID)
      game.user1.outcome = 'd'
      game.user2.outcome = 'd'
      game.isFinished = true
      await game.save()
      socket.to(getUserByID(drawPayload.opponent.userID)).emit('received-accepted-draw-offer',(convertedData))
      removeActiveGame(drawPayload.gameID)
   } catch (error) {
      socket.to(getUserByID(drawPayload.opponent.userID)).emit('received-accepted-draw-offer',({error: error}))
   }

}

export const userRejectedDrawOffer = async (socket,drawPayload) => {
   try {
      let convertedData = Object.assign({},drawPayload)
      convertedData.user = drawPayload.opponent;
      convertedData.opponent = drawPayload.user;
      socket.to(getUserByID(drawPayload.opponent.userID)).emit('received-rejected-draw-offer',(convertedData))
   } catch (error) {
      socket.to(getUserByID(drawPayload.opponent.userID)).emit('received-rejected-draw-offer',({error: error}))
   }
}

export const userMadeMove = async (socket,movePayload) => {
   try {
      let game = await Game.findById(movePayload.gameID)
      game.pgn = movePayload.pgn

      if (game.user1.userID.toString() === movePayload.opponent.userID) {
         // user1 is a player and his time didn't change
         // Calculate difference in seconds between opponents move
         const currentOpponentMoveTimestamp = new Date(movePayload.user.moveDate).getTime();
         const opponentDBMoveTimestamp = new Date(game.user2.startTurnDate).getTime();
         const moveDifferenceInSeconds = Math.floor((currentOpponentMoveTimestamp - opponentDBMoveTimestamp) / 1000);
         const opponentTimeLeft = game.user2.timeLeft - moveDifferenceInSeconds + game.increment
         game.user2.timeLeft = opponentTimeLeft
         // convertedData.opponent.playerTimeLeft = opponentTimeLeft;
         // Assign current user startTurnDate
         game.user1.startTurnDate = new Date(Date.now()).toISOString()
      } else {
         // user2 is a player and his time didn't change
         // Calculate difference in seconds between opponents move
         const currentOpponentMoveTimestamp = new Date(movePayload.user.moveDate).getTime();
         const opponentDBMoveTimestamp = new Date(game.user1.startTurnDate).getTime();
         const moveDifferenceInSeconds = Math.floor((currentOpponentMoveTimestamp - opponentDBMoveTimestamp) / 1000);
         const opponentTimeLeft = game.user1.timeLeft - moveDifferenceInSeconds + game.increment
         game.user1.timeLeft = opponentTimeLeft
         // convertedData.opponent.playerTimeLeft = opponentTimeLeft;
         // Assign current user startTurnDate
         game.user2.startTurnDate = new Date(Date.now()).toISOString()
      }
      await game.save()
      socket.to(getUserByID(movePayload.opponent.userID)).emit('user-made-move',(game))
      socket.emit('user-made-move',(game))

   } catch (error) {
      socket.to(getUserByID(movePayload.opponent.userID)).emit('opponent-made-move',({error: error}))
   }
}


export const setGameOver = async (socket,payload) => {
   try {
      let game = await Game.findById(payload.gameID)
      if (!game.isFinished) {
         let firstUser = await User.findById(game.user1.userID)
         let secondUser = await User.findById(game.user2.userID)
         if (game.user1.userID.toString() === payload.winner) {
            game.user1.outcome = 'w'
            game.user2.outcome = 'l'
            const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"win");
            const user2RatingChane = calculateRatingChange(secondUser.rating,firstUser.rating,"loss");
            firstUser.rating += user1RatingChange
            secondUser.rating += user2RatingChane
         } else {
            game.user1.outcome = 'l'
            game.user2.outcome = 'w'
            const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"loss");
            const user2RatingChane = calculateRatingChange(secondUser.rating,firstUser.rating,"win");
            firstUser.rating += user1RatingChange
            secondUser.rating += user2RatingChane
         }
         game.isFinished = true
         await game.save()
         await firstUser.save()
         await secondUser.save()
         removeActiveGame(payload.gameID)
      }
   } catch (error) {
      console.log(error)
   }
}

export const setGameDraw = async (socket,payload) => {
   try {
      let game = await Game.findById(payload)
      if (!game.isFinished) {
         game.user1.outcome = 'd'
         game.user2.outcome = 'd'
         game.isFinished = true
         await game.save()
         removeActiveGame(payload.gameID)
      }
   } catch (error) {
      console.log(error)
   }
}

export const sendGameInvitation = async (socket,payload) => {
   try {
      socket.to(getUserByID(payload)).emit('received-game-invitation')
   } catch (error) {
      console.log(error)
   }
}

export const sendFriendInvitation = async (socket,payload) => {
   try {
      socket.to(getUserByID(payload)).emit('received-friend-invitation')
   } catch (error) {
      console.log(error)
   }
}
export const sendRematch = async (socket,payload) => {
   try {
      socket.to(getUserByID(payload.receiverID)).emit('received-rematch',(payload))
   } catch (error) {
      console.log(error)
   }
}

export const playerTimerExpired = async (socket,payload) => {
   try {
      let game = await Game.findById(payload.gameID)
      if (game === null || game?.isFinished) return

      let firstUser = await User.findById(game.user1.userID)
      let secondUser = await User.findById(game.user2.userID)

      if (game.user1.userID.toString() === payload.loser.userID) {
         game.user1.outcome = 'l'
         game.user2.outcome = 'w'
         const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"loss");
         const user2RatingChane = calculateRatingChange(secondUser.rating,firstUser.rating,"win");
         firstUser.rating += user1RatingChange
         secondUser.rating += user2RatingChane
      } else {
         game.user1.outcome = 'w'
         game.user2.outcome = 'l'
         const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"win");
         const user2RatingChane = calculateRatingChange(secondUser.rating,firstUser.rating,"loss");
         firstUser.rating += user1RatingChange
         secondUser.rating += user2RatingChane
      }
      game.isFinished = true
      await game.save()
      await firstUser.save()
      await secondUser.save()
      socket.to(getUserByID(payload.winner.userID)).emit('game-time-expired',({
         ...payload,
      }))
      socket.emit('game-time-expired',({
         ...payload,
      }))
      removeActiveGame(payload.gameID)
   } catch (error) {
      console.log(error)
   }
}

export const calculateRatingChange = (playerRating,opponentRating,result) => {
   const expectedScore = 1 / (1 + Math.pow(10,(opponentRating - playerRating) / 400));

   // Adjust factor based on rating difference (more volatile for close ratings)
   const factor = Math.min(16,Math.max(25,Math.abs(playerRating - 800)));

   let ratingChange = 0;
   if (result === "win") {
      ratingChange = factor * (1 - expectedScore);
   } else if (result === "loss") {
      ratingChange = -factor * expectedScore;
   }

   return Math.round(ratingChange);
}


