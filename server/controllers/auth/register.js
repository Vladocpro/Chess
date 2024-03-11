import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
   try {
      const {username,email,password} = req.body;

      // check if user exists
      const usernameExists = await User.exists({username});
      if (usernameExists) {
         return res.status(409).send({data: {message: "Username already in use."}});
      }

      const emailExists = await User.exists({email});
      if (emailExists) {
         return res.status(409).send({data: {message: "Email already in use."}});
      }

      // encrypt password
      const encryptedPassword = await bcrypt.hash(password,10);

      // create user document and save in database
      const user = await User.create({
         username,
         email,
         passwordHash: encryptedPassword,
      });

      // create JWT token
      const token = jwt.sign(
          {
             userID: user._id,
             username,
             email,
          },
          process.env.TOKEN_KEY,
          {
             expiresIn: "7d",
          }
      );

      return res.status(200).json({
         token: token,
         userDetails: {
            club: user.club,
            friends: user.friends,
            rating: user.rating,
            userID: user._id,
            username: user.username,
            gameHistory: user.gameHistory
         }
      })
   } catch (err) {
      return res.status(500).send(err);
   }
};
