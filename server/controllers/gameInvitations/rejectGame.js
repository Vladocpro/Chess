import GameInvitation from "../../models/GameInvitation.js";

export const rejectGame = async (req,res) => {
   try {

      // remove that invitation from friend invitations collection
      const invitationExists = await GameInvitation.exists({ _id: req.body.invitationID });
      if(!invitationExists) {
         return res.status(404).send("Invitation does not exist")
      }

      await GameInvitation.findByIdAndDelete(req.body.invitationID);

      return res.status(200).json({
         invitationID: req.body.invitationID,
         message: "Invitation successfully rejected"
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
