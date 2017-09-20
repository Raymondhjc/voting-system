export class RegistrationInfoModel {
  public username;
  public password;
  public confirmPassword;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;

    // more
  }
}
