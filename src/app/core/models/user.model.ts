export class User {
  id: string;
  pseudo: string;
  email: string;
  admin: boolean;
  purchaseToken: string;
  subscription: boolean;
  subscriptionExpiryAt: number;
  friends: Friend[];
  createdAt: number;
  lastLoginAt: number;
  enabled: boolean;
  failedAuthentication: FailedAuthentication;
}

export class UserSummary {
  id: string;
  pseudo: string;
  email: string;
  admin: boolean;
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
  id: string;
  senderId: string;
  receiverId: string;
  senderPseudo: string;
  receiverPseudo: string;
}

export class FriendsAndRequests {
  friends: Friend[];
  receivedFriendRequests: FriendRequest[];
  sentFriendRequests: FriendRequest[];
}

export class EmailCredentials {
  userEmail: string;
  userPassword: string;

  constructor(userEmail: string, userPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}

export class UserToken {
  user: UserSummary;
  token: string;
  tokenExpiry: number;
}

export class UserPasswordUpdate {
  currentPassword: string;
  newPassword: string;

  constructor(currentPassword: string, newPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}

export class FailedAuthentication {
  attempts: number;
  resetsAt: number;
}

export class SubscriptionPurchase {
  acknowledgementState: number;
  autoRenewing: boolean;
  countryCode: string;
  expiryTimeMillis: number;
  kind: string;
  orderId: string;
  paymentState: number;
  priceAmountMicros: number;
  priceCurrencyCode: string;
  startTimeMillis: number;
}
