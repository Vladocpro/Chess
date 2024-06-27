import Game from "../../models/Game.js";
import {getUserByID,removeActiveGame} from "../../serverStore.js";
import User from "../../models/User.js";
import {calculateRatingChange} from "../socket/socketHandler.js";

export const playerAbandonedGame = async (gameID,userID,socket) => {
   try {
      let game = await Game.findById(gameID)
      if (game === undefined || game.isFinished) {
         return
      }
      let eventPayload = {
         loser: undefined,
         winner: undefined
      }
      let firstUser = await User.findById(game.user1.userID)
      let secondUser = await User.findById(game.user2.userID)

      if (game.user1.userID.toString() === userID) {
         game.user1.outcome = 'l'
         game.user2.outcome = 'w'
         game.isFinished = true
         eventPayload.loser = {userID: game.user1.userID,username: game.user1.username}
         eventPayload.winner = {userID: game.user2.userID,username: game.user2.username}
         const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"loss");
         const user2RatingChange = calculateRatingChange(secondUser.rating,firstUser.rating,"win");
         firstUser.rating += user1RatingChange
         game.user1.rating += user1RatingChange
         secondUser.rating += user2RatingChange
         game.user2.rating += user2RatingChange
      } else {
         game.user1.outcome = 'w'
         game.user2.outcome = 'l'
         game.isFinished = true
         eventPayload.winner = {userID: game.user1.userID,username: game.user1.username}
         eventPayload.loser = {userID: game.user2.userID,username: game.user2.username}
         const user1RatingChange = calculateRatingChange(firstUser.rating,secondUser.rating,"win");
         const user2RatingChange = calculateRatingChange(secondUser.rating,firstUser.rating,"loss");
         firstUser.rating += user1RatingChange
         game.user1.rating += user1RatingChange
         secondUser.rating += user2RatingChange
         game.user2.rating += user2RatingChange
      }
      await game.save()
      await firstUser.save()
      await secondUser.save()
      socket.to(getUserByID(eventPayload.winner.userID.toString())).emit('player-abandoned-game',({
         ...eventPayload,
      }))
      socket.emit('player-abandoned-game',({
         ...eventPayload,
      }))
      removeActiveGame(gameID)
   } catch (e) {
      console.log(e)
   }
}
