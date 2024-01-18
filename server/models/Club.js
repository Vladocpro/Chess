import mongoose,{Schema} from "mongoose";

const ClubSchema = new mongoose.Schema({
   clubname: {
      type: String,
      required: true,
      unique: true,
   },
   description: String,
   creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   members: {
      type:
          [
             {
                type: Schema.Types.ObjectId,
                ref: "User"
             }
          ],
      default: [],
   }
},{
   timestamps: true,
});

export default mongoose.model('Club',ClubSchema);
