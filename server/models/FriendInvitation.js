import mongoose from "mongoose";

const FriendInvitationSchema = new mongoose.Schema({
   senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
});

export default mongoose.model('FriendInvitation', FriendInvitationSchema);
