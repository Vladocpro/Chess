import Club from "../../models/Club.js";
import User from "../../models/User.js";
import {getClubByID} from "../../utils/clubUtils.js";

export const leaveClub = async (req,res) => {
   try {
      const club = await Club.findOne({_id: req.body.clubID})
      if (!club) {
         return res
             .status(404)
             .send("Club does not exist!")
      }
      club.members = club.members.filter((member) => member.toString() !== req.user.userID.toString())
      await club.save();

      const user = await User.findById(req.user.userID)
      user.club = ''
      await user.save()

      const updatedClub = await getClubByID(req.body.clubID)
      if (club.isError) {
         return res.status(club.status).send(club.message);
      }

      return res.status(200).json({
         currentClub: updatedClub,
         message: 'You successfully left the club'
      })
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
