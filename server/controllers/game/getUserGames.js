import User from "../../models/User.js";
import GameInvitation from "../../models/GameInvitation.js";
import Game from "../../models/Game.js";

export const getUserGames = async (req,res) => {
   try {
      console.log('Work')
      const userID = req.params.id
      const user = await User.findById(userID)
      const games = await Game.find({_id: {$in: user.gameHistory}}).sort({createdAt: 'desc'})

      return res.status(200).json(games);
   } catch (err) {
      if (err.message.toString() === 'BSONError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer') {
         return res.status(500).send('User does not exist!');
      }
      return res.status(500).send(err);
   }
};
