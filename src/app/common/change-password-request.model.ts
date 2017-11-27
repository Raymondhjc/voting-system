// This is what be sent when change password is requested.

export class ChangePasswordRequestModel {
  public password: string;
  public newPassword: string;

  constructor(previousPassword: string, newPassword: string) {
    this.password = previousPassword;
    this.newPassword = newPassword;
  }

}
