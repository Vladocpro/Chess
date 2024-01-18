import User from "../../models/User.js";
import Club from "../../models/Club.js";
import mongoose,{ObjectId} from "mongoose";

export const getUser = async (req,res) => {
   try {
      const user = await User.findById(req.user.userID)
          .populate({path: "friends", select: ['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v']});


      let userClub = null
      if(user.club !== '' ) {
         const fetchedClub =  await Club.aggregate([
            {
               $match: {
                  _id: new mongoose.Types.ObjectId(user.club)
               }
            },
            {
               $project: {
                  _id: 1,
                  clubname: 1,
                  createdAt: 1,
                  membersCount: { $size: '$members' },
               }
            }
         ]);
         if(fetchedClub.length > 0) {
            userClub = fetchedClub[0]
         }
      }
      return res.status(200).json({
         userDetails: {
            userID: user._id,
            username: user.username,
            friends: user.friends,
            club: userClub,
            rating: user.rating,
         }
      });
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
