import User from "../../models/User.js";
import GameInvitation from "../../models/GameInvitation.js";

export const inviteGame = async (req,res) => {
   try {
      console.log(req.body)

      const {userID } = req.user;

      const opponentID = req.body.receiverID;

      // Check if user exists
      const targetUser = await User.findOne({
         _id: opponentID,
      });

      if (!targetUser) {
         return res
             .status(404)
             .send(
                 `User has not been found.`
             );
      }

      // Check if send it to yourself
      if (userID === opponentID) {
         return res
             .status(409)
             .send("Sorry. You cannot become friend with yourself");
      }

      // check if invitation is already sent
      const invitationAlreadyReceived = await GameInvitation.findOne({
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

      // create new invitation in database
      let newInvitation = await GameInvitation.create({
         senderID: userID,
         senderColor: req.body.senderColor,
         receiverID: targetUser._id,
         gameDuration: req.body.gameDuration,
         gameIncrement: req.body.gameIncrement,
         durationType: req.body.durationType
      });

      let receiver = await User.findById(newInvitation.receiverID).select(['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v'])

      // if invitation has been successfully created we would like to update friends invitations if other user is online
      // send pending invitations update to specific user
      // friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

      return res.status(201).json({
         invitationID: newInvitation._id,
         senderID: newInvitation.senderID,
         receiver: receiver,
         senderColor: newInvitation.senderColor,
         receiverID: newInvitation.receiverID,
         gameDuration: newInvitation.gameDuration,
         gameIncrement: newInvitation.gameIncrement,
         durationType: newInvitation.durationType
      });

   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
