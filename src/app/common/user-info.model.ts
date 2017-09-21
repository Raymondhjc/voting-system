export class RegistrationInfoModel {
  public username: string;
  public password: string;
  public email = '';
  public UFID = '';

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;

    // more
  }
}
