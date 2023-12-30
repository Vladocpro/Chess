import FriendInvitation from "../../models/FriendInvitation.js";

export const rejectFriend = async (req,res) => {
   try {

      // remove that invitation from friend invitations collection
      const invitationExists = await FriendInvitation.exists({ _id: req.body.invitationID });
      if(!invitationExists) {
         return res.status(404).send("Invitation does not exist")
      }

      await FriendInvitation.findByIdAndDelete(req.body.invitationID);

      return res.status(200).send("Invitation successfully rejected");
   } catch (err) {
      return res.status(500).send(err);
   }
};
