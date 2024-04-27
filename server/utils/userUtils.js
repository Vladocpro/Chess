import Game from "../models/Game.js";
import User from "../models/User.js";

export const getUserGames = async (gameHistory,withLimit) => {
   try {
      let userGames = [];
      if (gameHistory.length > 0) {
         if (withLimit) {
            userGames = await Game.find({_id: {$in: gameHistory}}).limit(3).sort({createdAt: 'desc'})
         } else {
            userGames = await Game.find({_id: {$in: gameHistory}}).sort({createdAt: 'desc'})
         }
      }
      return userGames
   } catch (e) {
      await Promise.reject(e)
   }
}

export const getUserGamesByID = async (id) => {
   try {

      const user = await User.findById(id)
      const games = await Game.find({_id: {$in: user.gameHistory}}).sort({createdAt: 'desc'})

      return res.status(200).json({
         games: games
      });
   } catch (err) {
      if (err.message.toString() === 'BSONError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer') {
         await Promise.reject('User does not exist!');
      }
      await Promise.reject(err);
   }
}

