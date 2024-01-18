import Club from "../../models/Club.js";

export const getPopularClubs = async (req,res) => {
   try {
      const clubs = await Club.aggregate([
         {
            $project: {
               _id: 1,
               clubname: 1,
               createdAt: 1,
               membersCount: { $size: '$members' }
            }
         },
         {
            $sort: { membersCount: -1 }
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
