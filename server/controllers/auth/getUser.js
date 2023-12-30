import User from "../../models/User.js";

export const getUser = async (req,res) => {
   try {
      const user = await User.findById(req.user.userID).populate({path: "friends", select: ['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v']});
     console.log(user)
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
