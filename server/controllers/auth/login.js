import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Club from "../../models/Club.js";
import mongoose from "mongoose";
import Game from "../../models/Game.js";
import {getUserGames} from "../../utils/userUtils.js";

export const login = async (req,res) => {
   try {
      const {email,password} = req.body;

      const user = await User.findOne({email}).populate({
         path: "friends",
         select: ['-friends','-gameHistory','-passwordHash','-updatedAt','-__v']
      });


      if (user && (await bcrypt.compare(password,user.passwordHash))) {

         const userGames = await getUserGames(user.gameHistory)

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


         // send new token
         const token = jwt.sign(
             {
                userID: user._id,
                username: user.username,
                email: user.email,
             },
             process.env.TOKEN_KEY,
             {
                expiresIn: "7d",
             }
         );


         return res.status(200).json({
            token: token,
            userDetails: {
               club: userClub,
               friends: user.friends,
               rating: user.rating,
               userID: user._id,
               username: user.username,
               gameHistory: userGames,
            }
         });
      }

      return res.status(400).send("Invalid credentials. Please try again");
   } catch (err) {
      return res.status(500).send(err);
   }
};
