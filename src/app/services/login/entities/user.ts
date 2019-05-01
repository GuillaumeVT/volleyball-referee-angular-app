export class SocialUser {
  provider: string;
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  authToken: string;
  idToken: string; // Reference https://developers.google.com/identity/sign-in/web/backend-auth

  /**
   * Contains the entire object returned from the Facebook API based on the fields you requested.
   * Only available for the Facebook provider.
   * Refer to the Graph API for details: https://developers.facebook.com/docs/graph-api
   */
  facebook?: any;

}
