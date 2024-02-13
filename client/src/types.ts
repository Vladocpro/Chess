export interface UserFriend {
   _id: string,
   username: string,
   email: string,
   rating: number,
   club: string,
   createdAt: Date | string,
}

export interface IProfileUser {
   userID: string,
   username: string,
   friends: string[],
   gameHistory: IGame[],
   rating: number,
   club: string,
   createdAt: Date | string,
}

export interface FriendInvitation {
   _id: string,
   sender: UserFriend,
   senderID: string,
   receiverID: string,
}

export interface UserClub {
   _id: string;
   clubname: string;
   createdAt: Date,
   membersCount: number
}

export interface IClub {
   _id: string,
   clubname: string,
   description: string,
   creator: UserFriend,
   members: UserFriend[],
   membersCount: number,
   createdAt: Date,
}

export interface IGameInvitation {
   invitationID: string;
   sender?: UserFriend;
   receiver?: UserFriend;
   playerColor: string;
   gameDuration: number;
   gameIncrement: number;
   durationType: string;
}

interface IGameUser {
   creator: boolean;
   outcome: string;
   userID: string;
   username: string;
   rating: number;
   color: string;
   startTurnDate: Date;
   timeLeft: number;
}

export interface IGame {
   user1: IGameUser;
   user2: IGameUser;
   _id: string;
   pgn: string;
   durationType: string;
   duration: number;
   totalMoves: number;
   increment: number;
   isFinished: boolean;
   createdAt: Date;
}


