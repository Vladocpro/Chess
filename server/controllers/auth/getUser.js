import User from "../../models/User.js";
import Club from "../../models/Club.js";
import mongoose from "mongoose";
import Game from "../../models/Game.js";
import {getUserGames} from "../../utils/userUtils.js";

export const getUser = async (req,res) => {
   try {
      const user = await User.findById(req.user.userID)
          .populate({path: "friends",select: ['-friends','-gameHistory','-passwordHash','-updatedAt','-__v']});

      const userGames = await getUserGames(user.gameHistory,true)


      let userClub = null
      if (user.club !== '') {
         const fetchedClub = await Club.aggregate([
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
                  membersCount: {$size: '$members'},
               }
            }
         ]);
         if (fetchedClub.length > 0) {
            userClub = fetchedClub[0]
         }
      }

      return res.status(200).json({
         userDetails: {
            userID: user._id,
            username: user.username,
            friends: user.friends,
            gameHistory: userGames,
            club: userClub,
            rating: user.rating,
         }
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
