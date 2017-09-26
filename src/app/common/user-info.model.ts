export class RegistrationInfoModel {
  set ufid(value: string) {
    this._ufid = value;
  }
  set email(value: string) {
    this._email = value;
  }
  set password(value: string) {
    this._password = value;
  }
  set username(value: string) {
    this._username = value;
  }
  set lastName(value: string) {
    this._lastName = value;
  }
  set firstName(value: string) {
    this._firstName = value;
  }
  private _firstName: string;
  private _lastName: string;
  private _username: string;
  private _password: string;
  private _email: string;
  private _ufid: string;


}
