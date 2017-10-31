export class ChangePasswordRequestModel {
  public password: string;
  public NewPassword: string;

  constructor(previousPassword: string, NewPassword: string) {
    this.password = previousPassword;
    this.NewPassword = NewPassword;
  }

}
