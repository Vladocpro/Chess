import Game from "../../models/Game.js";

export const getGame = async (req,res) => {
   try {

      const game = await Game.findById(req.params.id)
      if (game === null) {
         return res.status(404).send('Game was not found')
      }

      return res.status(200).json(game);
   } catch (err) {
      return res.status(500).send(err);
   }
};
