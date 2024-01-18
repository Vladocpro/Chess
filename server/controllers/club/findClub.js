import Club from "../../models/Club.js";

export const findClub = async (req,res) => {
   try {
      const regex = new RegExp(req.params.clubname, 'i');
      const clubs = await Club.aggregate([
         {
            $match: {
               clubname: regex
            }
         },
         {
            $project: {
               _id: 1,
               clubname: 1,
               createdAt: 1,
               membersCount: { $size: '$members' }
               // Include other fields you need
            }
         },
         {
            $limit: 5
         }
      ]);
      return res.status(200).json({
         clubs
      });
   } catch (err) {
      return res.status(500).send(err);
   }
};
