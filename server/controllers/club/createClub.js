import Club from "../../models/Club.js";

export const createClub = async (req,res) => {
   try {
      const clubExists = await Club.findOne({clubname: req.body.clubname})
      if(clubExists) {
         return res
             .status(409)
             .send("Club with that name already exists!")
      }

      const club = await Club.create({
         clubname: req.body.clubname,
         description: req.body.description,
         creator: req.user.userID
      });
      return res.status(200).json({
         club
      });
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
