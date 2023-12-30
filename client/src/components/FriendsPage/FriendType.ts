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
