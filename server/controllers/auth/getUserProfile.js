import User from "../../models/User.js";
import Club from "../../models/Club.js";
import mongoose from "mongoose";
import {getUserGames} from "../../utils/userUtils.js";

export const getUserProfile = async (req,res) => {
   try {

      const user = await User.findById(req.params.id)
          .populate({path: "gameHistory",select: ['-passwordHash','-updatedAt','-__v']});

      const userGames = await getUserGames(user.gameHistory)

      let userClub;
      if (user.club !== '') {
         userClub = await Club.findById(user.club).select('clubname')
      }


      return res.status(200).json({
         userDetails: {
            userID: user._id,
            username: user.username,
            friends: user.friends,
            gameHistory: userGames,
            club: userClub?.clubname,
            rating: user.rating,
            createdAt: user.createdAt
         }
      });
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
