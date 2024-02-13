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

      const receiver = await User.findById(invitation.receiverID)


      const gameStartDate = new Date(Date.now() + 2000).toISOString();
      let newGame;
      if (invitation.senderColor === 'white') {
         newGame = await Game.create({
            user1: {
               creator: true,
               outcome: 'going',
               userID: sender._id,
               username: sender.username,
               rating: sender.rating,
               color: 'white',
               startTurnDate: gameStartDate,
               timeLeft: invitation.gameDuration
            },
            user2: {
               creator: false,
               outcome: 'going',
               userID: receiver._id,
               username: receiver.username,
               rating: receiver.rating,
               color: 'black',
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
      } else {
         newGame = await Game.create({
            user1: {
               creator: false,
               outcome: 'going',
               userID: receiver._id,
               username: receiver.username,
               rating: receiver.rating,
               color: 'white',
               startTurnDate: gameStartDate,
               timeLeft: invitation.gameDuration
            },
            user2: {
               creator: true,
               outcome: 'going',
               userID: sender._id,
               username: sender.username,
               rating: sender.rating,
               color: 'black',
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
      }


      // add game to history of both users
      sender.gameHistory = [...sender.gameHistory,newGame._id];
      receiver.gameHistory = [...receiver.gameHistory,newGame._id];

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
