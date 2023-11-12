import mongoose,{Schema} from "mongoose";

const ClubSchema = new mongoose.Schema({
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

export default mongoose.model('Club', ClubSchema);
