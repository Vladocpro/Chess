import mongoose,{Schema} from "mongoose";

const ClubSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: {
      type: String,
      required: true,
      unique: true,
   },
   totalRating: {
      type: Number,
   },
   users: {
      type:
          [
             {
                type: Schema.Types.ObjectId,
                ref: "User"
             }
          ],
      default: [],
   },
},{
   timestamps: true,
});

export default mongoose.model('Club',ClubSchema);
