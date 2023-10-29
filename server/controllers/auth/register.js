import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      console.log("user register request came");
      // check if user exists
      const userExists = await User.exists({ email });


      if (userExists) {
         return res.status(409).send({data: {message: "E-mail already in use."}});
      }

      // encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);

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
             expiresIn: "3d",
          }
      );

      res.status(201).json({data: {
            userDetails: {
               id: user._id,
               email: user.email,
               token: token,
               username: user.username,
            },
         }
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
