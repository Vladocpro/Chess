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
      return res.status(500).send(err);
   }
};
