import mongoose,{Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   passwordHash: {
      type: String,
      required: true,
   },
   rating: {
      type: Number,
      default: 500,
   },
   club: {
      type: String,
      default: '',
      ref: 'Club'
   },
   friends: {
      type:
          [
             {
                type: Schema.Types.ObjectId,
                ref: "User"
             }
          ],
      default: [],
   },
   gameHistory: {
      type: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
         }
      ],
      default: []
   }
},{
   timestamps: true,
});

export default mongoose.model('User',UserSchema);
