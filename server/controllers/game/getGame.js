import Game from "../../models/Game.js";

export const getGame = async (req,res) => {
   try {

      const game = await Game.findById(req.params.id)
      return res.status(200).json(game);
   } catch (err) {
      return res.status(500).send(err);
   }
};
