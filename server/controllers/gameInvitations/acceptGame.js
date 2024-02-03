import GameInvitation from "../../models/GameInvitation.js";
import User from "../../models/User.js";
import Game from "../../models/Game.js";

export const acceptGame = async (req,res) => {
   try {



      const invitation = await GameInvitation.findById(req.body.invitationID);

      if (!invitation) {
         return res.status(401).send("Invitation does not exist");
      }


      const sender = await User.findById(invitation.senderID);

      let receiver

      if(invitation.receiverID !== null && invitation.receiverID !== undefined) {
         receiver = await User.findById(invitation.receiverID);
      } else {
         receiver = await User.findById(req.user.userID);
      }


      const gameStartDate = new Date(Date.now() + 2000).toISOString();

      let user1Color;
      let user2Color;

      switch (invitation.senderColor) {
         case 'random': {
            user1Color = Math.random() < 0.5 ? 'black' : 'white';
            user2Color = user1Color === 'black' ? 'white' : 'black';
            break;
         }
         case 'white': {
            user1Color = 'white';
            user2Color = 'black';
            break;
         }
         case 'black': {
            user1Color =   'black';
            user2Color =  'white';
            break;
         }
         default: {
            break;
         }
      }


      const newGame = await Game.create({
         user1: {
            creator: true,
            outcome: 'going',
            userID: sender._id,
            username: sender.username,
            color: user1Color,
            startTurnDate: gameStartDate,
            timeLeft: invitation.gameDuration
         },
         user2: {
            creator: false,
            outcome: 'going',
            userID: receiver._id,
            username: receiver.username,
            color: user2Color,
            startTurnDate: gameStartDate,
            timeLeft: invitation.gameDuration
         },
         pgn: '',
         durationType: invitation.durationType,
         duration: invitation.gameDuration,
         totalMoves: 0,
         increment: invitation.gameIncrement,
         isFinished: false
      })



      // add game to history of both users
      sender.gameHistory = [...sender.gameHistory, newGame._id];
      receiver.gameHistory = [...receiver.gameHistory, newGame._id];

      await sender.save();
      await receiver.save();



      // delete invitation
      await GameInvitation.findByIdAndDelete(req.body.invitationID);

      return res.status(200).json({
         gameID: newGame._id,
         message: "Game successfully created"
      });
   } catch (err) {
      console.log(err)
      return res.status(500).send(err);
   }
};
