// This is what be sent when change email is requested.

export class ChangeEmailRequestModel {
  public newEmail: string


  constructor(newEmail: string) {
    this.newEmail = newEmail;
  }
}
