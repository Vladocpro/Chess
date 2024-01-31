import Club from "../../models/Club.js";
import User from "../../models/User.js";

export const joinClub = async (req,res) => {
   try {
      const user = await User.findById(req.user.userID);

      const club = await Club.findById(req.body.clubID)
      if(!club) {
         return res
             .status(404)
             .send("Club does not exist!")
      }
      if(club.members.find((member) => member.toString() === req.user.userID)) {
         return res
             .status(409)
             .send("You are already a member of this club!")
      }


      // If user is already in the club, we need to remove him fom current club and then join other one
      if(user.club !== '') {
         const currentClub = await Club.findById(user.club)
         currentClub.members = currentClub.members.filter((member) => member.toString() !== user._id.toString())
         await currentClub.save()
      }

      console.log(req.user.userID)
      // Joining chosen club
      club.members.push(req.user.userID)
      await club.save();

      // Adding id of the club to the user's club field
      user.club = club._id;
      await user.save()

      let userClub = null
      if(user.club !== '' ) {
         userClub = await Club.findById(user.club, {description: 0, creator: 0, members: 0, updatedAt: 0,  __v: 0});
      }

      return res.status(200).json({
         club: {
            _id: club._id,
            clubname: club.clubname,
            createdAt: club.createdAt,
            membersCount: club.membersCount
         },
         message:'You have joined the club'});
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
