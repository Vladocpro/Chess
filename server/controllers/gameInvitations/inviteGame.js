import User from "../../models/User.js";
import GameInvitation from "../../models/GameInvitation.js";

export const inviteGame = async (req,res) => {
   try {
      const {userID } = req.user;

      const opponentID = req.body.receiverID;

      if(opponentID !== undefined && opponentID !== null) {

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
         const newInvitation = await GameInvitation.create({
            senderID: userID,
            senderColor: req.body.senderColor,
            receiverID: targetUser._id,
            gameDuration: req.body.gameDuration,
            gameIncrement: req.body.gameIncrement,
            durationType: req.body.durationType
         });

         return res.status(201).send("Game invitation has been sent");
      }

      // if invitation has been successfully created we would like to update friends invitations if other user is online
      // send pending invitations update to specific user
      // friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

      // create new invitation in database
      const newInvitation = await GameInvitation.create({
         senderID: userID,
         senderColor: req.body.senderColor,
         gameDuration: req.body.gameDuration,
         gameIncrement: req.body.gameIncrement,
         durationType: req.body.durationType
      });

      return res.status(201).send("Game invitation has been sent");

   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
