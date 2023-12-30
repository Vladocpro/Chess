import User from "../../models/User.js";
import FriendInvitation from "../../models/FriendInvitation.js";

export const acceptFriend = async (req,res) => {
   try {

      const invitation = await FriendInvitation.findById(req.body.invitationID);

      if (!invitation) {
         return res.status(401).send("Invitation does not exist");
      }

      const { senderID, receiverID } = invitation;

      // add friends to both users
      const senderUser = await User.findById(senderID);
      senderUser.friends = [...senderUser.friends, receiverID];

      const receiverUser = await User.findById(receiverID);
      receiverUser.friends = [...receiverUser.friends, senderID];

      await senderUser.save();
      await receiverUser.save();

      // delete invitation
      await FriendInvitation.findByIdAndDelete(req.body.invitationID);


      return res.status(200).send("Friend successfully added");
   } catch (err) {
      return res.status(500).send(err);
   }
};
