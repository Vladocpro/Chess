import GameInvitation from "../../models/GameInvitation.js";

export const getGameInvitations = async (req,res) => {
   try {
      let invitations = await GameInvitation.find({receiverID: req.user.userID}).populate({path: "senderID", select: ['-friends', '-gameHistory', '-passwordHash', '-updatedAt',  '-__v']});
      const convertedInvitations = invitations.map((invitation) => {
         return {
            invitationID: invitation._id,
            sender: invitation.senderID,
            playerColor: invitation.senderColor === 'white' ? 'black' : 'white',
            gameDuration: invitation.gameDuration,
            gameIncrement: invitation.gameIncrement,
         }
      })
      return res.status(200).json({
         convertedInvitations
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
