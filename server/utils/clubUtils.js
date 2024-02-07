import Club from "../models/Club.js";
import mongoose from "mongoose";

export const getClubByID = async (paramID) => {
   try {
      console.log(paramID)
      const club = await Club.aggregate([
         {
            $match: {
               _id: new mongoose.Types.ObjectId(paramID)
            }
         },
         {
            $lookup: {
               from: 'users',
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
               membersCount: {$size: '$members'},
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

      console.log(club)

      if (club.length > 0) {
         return club[0]
      }
      return {
         isError: true,
         status: 404,
         message: 'Club does not exist!'
      }
   } catch (err) {
      return Promise.reject({status: 500,message: err})
   }
}


