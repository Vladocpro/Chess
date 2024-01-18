import User from "../../../models/User.js";
import FriendInvitation from "../../../models/FriendInvitation.js";

export const inviteFriend = async (req,res) => {
   try {
      const friendID = req.body.receiverID;
      const {userID } = req.user;

      // Check if send it to yourself
      if (userID === friendID) {
         return res
             .status(409)
             .send("Sorry. You cannot become friend with yourself");
      }

      // Check if user exists
      const targetUser = await User.findOne({
         _id: friendID,
      });

      if (!targetUser) {
         return res
             .status(404)
             .send(
                 `User has not been found.`
             );
      }

      // check if invitation is already sent
      const invitationAlreadyReceived = await FriendInvitation.findOne({
         $or: [
            {
               senderID: userID,
               receiverID: targetUser._id,
            },
            {
               receiverID: userID,
               senderID: targetUser._id,
            }
         ]
      });

      if (invitationAlreadyReceived) {
         return res.status(409).send("Invitation is already sent");
      }

      // check if the user which we would like to invite is already our friend
      const usersAlreadyFriends = targetUser.friends.find(
          (friendId) => friendId.toString() === userID.toString()
      );

      if (usersAlreadyFriends) {
         return res
             .status(409)
             .send("Friend already added. Please check friends list");
      }

      // create new invitation in database
      const newInvitation = await FriendInvitation.create({
         senderID: userID,
         receiverID: targetUser._id,
      });

      // if invitation has been successfully created we would like to update friends invitations if other user is online
      // send pending invitations update to specific user
      // friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

      return res.status(201).send("Friend invitation has been sent");

   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
