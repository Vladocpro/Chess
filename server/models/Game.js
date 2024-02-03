import mongoose from "mongoose";

const userType = {
   creator: Boolean,
   outcome: String,
   userID: mongoose.Schema.Types.ObjectId,
   username: String,
   color: String,
   startTurnDate: Date,
   timeLeft: Number
}

const GameSchema = new mongoose.Schema({
   user1: userType,
   user2: userType,
   pgn: String,
   durationType: String,
   duration: Number,
   totalMoves: Number,
   increment: Number,
   isFinished: Boolean
},{
   timestamps: true,
});


export default mongoose.model('Game', GameSchema);
