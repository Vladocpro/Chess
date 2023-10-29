import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
   try {
      console.log("login event came");
      const { email, password } = req.body;

      const user = await User.findOne({email});

      if (user && (await bcrypt.compare(password, user.passwordHash))) {
         // send new token
         const token = jwt.sign(
             {
                userID: user._id,
                username : user.username,
                email: user.email,
             },
             process.env.TOKEN_KEY,
             {
                expiresIn: "3d",
             }
         );

         return res.status(200).json({data: {
               userDetails: {
                  id: user._id,
                  email: user.email,
                  token: token,
                  username: user.username,
               },
            }
         });
      }

      return res.status(400).send("Invalid credentials. Please try again");
   } catch (err) {
      return res.status(500).send(err);
   }
};
