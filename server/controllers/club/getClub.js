import Club from "../../models/Club.js";
import mongoose from "mongoose";

export const getClub = async (req,res) => {
   try {
      const club = await Club.aggregate([
         {
            $match: {
               _id: new mongoose.Types.ObjectId(req.params.id)
            }
         },
         {
            $lookup: {
               from: 'users', // Assuming the collection name is 'users'
               localField: 'members',
               foreignField: '_id',
               as: 'members'
            }
         },

         {
            $project: {
               _id: 1,
               clubname: 1,
               description: 1,
               createdAt: 1,
               membersCount: { $size: '$members' },
               members: {
                  $map: {
                     input: '$members',
                     as: 'member',
                     in: {
                        _id: '$$member._id',
                        username: '$$member.username',
                        email: '$$member.email',
                        rating: '$$member.rating',
                     }
                  }
               }
            }
         }

      ]);
      return res.status(200).json({
         club: club[0]
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
