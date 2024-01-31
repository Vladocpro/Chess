export interface UserFriend {
   _id: string,
   username: string,
   email: string,
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


