export class UserSummary {
  id:     string;
  pseudo: string;
  email:  string;
}

export class Friend {
  id: string;
  pseudo: string;

  constructor(id: string, pseudo: string) {
    this.id = id;
    this.pseudo = pseudo;
  }
}

export class FriendRequest {
  id:             string;
  senderId:       string;
  receiverId:     string;
  senderPseudo:   string;
  receiverPseudo: string;
}

export class FriendsAndRequests {
  friends:                Friend[];
  receivedFriendRequests: FriendRequest[];
  sentFriendRequest:      FriendRequest[];
}


export class EmailCredentials {
  userEmail:    string;
  userPassword: string;

  constructor(userEmail: string, userPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}

export class UserToken {
  user:  UserSummary;
  token: string;

  constructor(user: UserSummary, token: string) {
    this.user = user;
    this.token = token;
  }
}

export class UserPasswordUpdate {
  currentPassword: string;
  newPassword:     string;

  constructor(currentPassword: string, newPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}
