import mongoose from "mongoose";

const GameInvitationSchema = new mongoose.Schema({
   senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   senderColor: String,
   receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   gameDuration: {
      type: Number,
      required: true,
   },
   gameIncrement: {
      type: Number,
      required: true,
   },
   durationType: String
});

export default mongoose.model('GameInvitation', GameInvitationSchema);
