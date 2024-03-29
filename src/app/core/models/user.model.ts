export interface User {
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

export interface UserSummary {
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

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  senderPseudo: string;
  receiverPseudo: string;
}

export interface FriendsAndRequests {
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

export interface UserToken {
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

export interface FailedAuthentication {
  attempts: number;
  resetsAt: number;
}

export interface SubscriptionPurchase {
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
