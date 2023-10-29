import mongoose from "mongoose";

const userType ={
   creator: Boolean,
   winner: Boolean,
   userID: mongoose.Schema.Types.ObjectId,
   username: String,
   color: Boolean,
}

const GameSchema = new mongoose.Schema({
   user1: userType,
   user2: userType,
   pgn: String,
   isFinished: Boolean
},{
   timestamps: true,
});



export default mongoose.model('Game', GameSchema);
