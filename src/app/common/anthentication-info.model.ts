// This is what be sent when sign in.

export class AnthenticationInfoModel {
  public username: string;
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

}
