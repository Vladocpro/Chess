import FriendInvitation from "../../../models/FriendInvitation.js";

export const getUserInvitations = async (req,res) => {
   try {
      let invitations = await FriendInvitation.find({receiverID: req.user.userID}).populate({
         path: "senderID",
         select: ['-friends','-gameHistory','-passwordHash','-updatedAt','-__v']
      });
      const convertedInvitations = invitations.map((invitation) => {
         return {
            _id: invitation._id,
            sender: invitation.senderID,
            senderID: invitation.senderID._id,
            receiverID: invitation.receiverID,
         }
      })
      return res.status(200).json({
         convertedInvitations
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
