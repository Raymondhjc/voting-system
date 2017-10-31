import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RegistrationInfoModel} from './user-info.model';
import {AnthenticationInfoModel} from './anthentication-info.model';
import {ChangePasswordRequestModel} from './change-password-request.model';
import {Headers} from '@angular/http';

@Injectable()
export class ServerInteractService {
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  serverURL = 'http://localhost:4500/';
  private _token: string = null;
  // Postman
  // serverURL = 'http://localhost:5555/';

  constructor(private http: Http) {
  }

  sendSignup(regInfo: RegistrationInfoModel) {

    const body = JSON.stringify(regInfo);
    return this.http.post(this.serverURL + 'signup', body);
  }

  sendSignin(signinInfo: AnthenticationInfoModel) {

    const body = JSON.stringify(signinInfo);
    return this.http.post(this.serverURL + 'signin', body);
  }

  userExist(user: string) {

    const s = 'exists/' + user;
    return this.http.get(this.serverURL + s, '');
  }

  sendChangePassword(request: ChangePasswordRequestModel) {
    const body = JSON.stringify(request);
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic ' + this._token);
    const headers = new Headers({'content-type': 'text/plain'});
    headers.append('Authorization', 'Basic ' + this._token);
    return this.http.post(this.serverURL + 'changePassword', body, {headers: headers});
  }
}
