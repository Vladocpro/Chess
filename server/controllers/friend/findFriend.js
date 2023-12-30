import User from "../../models/User.js";

export const findFriend = async (req,res) => {
   try {
      let user = await User.findById(req.user.userID).populate({path: "friends", select: ['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v']});
      let excludedIDs = []
      if(user.friends.length > 0) {
         user.friends = user.friends.filter((friend) => friend.username.includes(req.body.searchedName))
         excludedIDs = user.friends.map((friend) => friend._id)
      }
      // Exclude ids of your friends and yourself from the user search
      excludedIDs.push(req.body.userID)

      const regex = new RegExp(req.body.searchedName, 'i');
      const users = await User.find({username: regex, _id: { $nin: excludedIDs} }, {friends: 0, gameHistory: 0, passwordHash: 0, updatedAt: 0,  __v: 0}).limit(5);

      return res.status(200).json({
         friends: user.friends,
         users: users,
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
