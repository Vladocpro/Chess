import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req,res) => {
   try {
      console.log("getUser event came");
      const user = await User.findById(req.user.userID);

      return res.status(200).json({
         userDetails: {
            userID: user._id,
            username: user.username,
            friends: user.friends,
            club: user.club,
            rating: user.rating,
         }
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
