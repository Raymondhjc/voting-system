export class AnthenticationInfoModel {
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  set password(value: string) {
    this._password = value;
  }

  get password(): string {
    return this._password;
  }

  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }


}
