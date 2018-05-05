export class UserId {
  socialId: string;
  provider: string;

  constructor(socialId: string, provider: string) {
    this.socialId = socialId;
    this.provider = provider;
  }
}
