import Club from "../../models/Club.js";

export const leaveClub = async (req,res) => {
   try {
      const club = await Club.findOne({_id: req.body.clubID})
      if(!club) {
         return res
             .status(404)
             .send("Club does not exist!")
      }
      club.members = club.members.filter((member) => member.toString() !== req.user.userID.toString())

      await club.save();
      return res.status(200).json('You successfully left the club');
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
