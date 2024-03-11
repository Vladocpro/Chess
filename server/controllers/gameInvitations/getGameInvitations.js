import GameInvitation from "../../models/GameInvitation.js";

export const getGameInvitations = async (req,res) => {
   try {
      let sentInvitations = await GameInvitation.find({senderID: req.user.userID}).populate({path: "receiverID", select: ['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v']}).limit(4);
      let receivedInvitations = await GameInvitation.find({receiverID: req.user.userID}).populate({path: "senderID", select: ['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v']}).limit(4);

      const convertedSentInvitations = sentInvitations.map((invitation) => {
         return {
            invitationID: invitation._id,
            receiver: invitation.receiverID,
            playerColor: invitation.senderColor,
            gameDuration: invitation.gameDuration,
            gameIncrement: invitation.gameIncrement,
         }
      })
      const convertedReceivedInvitations = receivedInvitations.map((invitation) => {
         return {
            invitationID: invitation._id,
            sender: invitation.senderID,
            playerColor: invitation.senderColor === 'white' ? 'black' : 'white',
            gameDuration: invitation.gameDuration,
            gameIncrement: invitation.gameIncrement,
         }
      })
      return res.status(200).json({
         sentInvitations: convertedSentInvitations,
         receivedInvitations: convertedReceivedInvitations
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
