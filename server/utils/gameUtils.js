import Game from "../models/Game.js";

export const playerAbandonedGame = async (gameID,playerID) => {
   try {
      console.log('Executed')
      let game = await Game.findById(gameID)
      if (game === undefined) {
         return new Error('Game does not exist')
      }

      if (game.user1.userID === playerID) {
         game.user1.outcome = 'l'
         game.user2.outcome = 'w'
         game.isFinished = true
      } else {
         game.user1.outcome = 'w'
         game.user2.outcome = 'l'
         game.isFinished = true
      }

      await game.save()

   } catch (e) {
      return new Error(e)
   }
}
