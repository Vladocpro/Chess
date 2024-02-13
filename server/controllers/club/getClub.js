import {getClubByID} from "../../utils/clubUtils.js";

export const getClub = async (req,res) => {
   try {
      const club = await getClubByID(req.params.id)
      if (club.isError) {
         return res.status(club.status).send(club.message);
      }
      return res.status(200).json({
         club: club
      });
   } catch (err) {
      if (err.message.toString() === 'BSONError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer') {
         return res.status(500).send('Club does not exist!');
      }
      return res.status(500).send(err);
   }
};
