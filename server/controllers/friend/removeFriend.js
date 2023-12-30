import FriendInvitation from "../../models/FriendInvitation.js";
import User from "../../models/User.js";

export const removeFriend = async (req,res) => {
   try {

      const user = await User.findById(req.user.userID);
      user.friends = user.friends.filter((friend) => friend._id !== req.user.userID);

      const friend = await User.findById(req.body.friendID);
      friend.friends = friend.friends.filter((friend) => friend._id !== req.body.friendID);

      await user.save();
      await friend.save();

      return res.status(200).send("Friend successfully removed");
   } catch (err) {
      return res.status(500).send(err);
   }
};
