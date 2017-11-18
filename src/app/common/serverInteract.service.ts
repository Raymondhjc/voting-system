import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';

// Template for requests.
import {RegistrationInfoModel} from './registration-info.model';
import {AnthenticationInfoModel} from './anthentication-info.model';
import {ChangePasswordRequestModel} from './change-password-request.model';
import {ChangeEmailRequestModel} from './change-email-request.model';

// ServerInteractService should be the only place use the server API.
// Easier for management.

@Injectable()
export class ServerInteractService {
  // Json Web Token for session management.
  // This is originally set to null.
  private _token: string = null;

  // Setter of JWT.
  // No need for getter because there is the only place to use JWT.
  set token(value: string) {
    this._token = value;
  }

  // Test server URL. (which is a local server.)
  // Concatenate request url at the end of this URL.
  serverURL = 'http://localhost:4500/';

  constructor(private http: Http) {
  }

  // This request create a new user on database.
  // It also provide user information.
  postSignup(regInfo: RegistrationInfoModel) {
    const body = JSON.stringify(regInfo);
    return this.http.post(this.serverURL + 'signup', body);
  }

  // This request provide user credential, and get back a JWT.
  postSignin(signinInfo: AnthenticationInfoModel) {
    const body = JSON.stringify(signinInfo);
    return this.http.post(this.serverURL + 'signin', body);
  }

  // This request test whether a specific username is occupied.
  getUserExist(user: string) {
    const s = 'exists/' + user;
    return this.http.get(this.serverURL + s, '');
  }

  // This request changes user password.
  postChangePassword(request: ChangePasswordRequestModel) {
    const body = JSON.stringify(request);
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic ' + this._token);
    const headers = new Headers({'content-type': 'text/plain'});
    headers.append('Authorization', 'Basic ' + this._token);
    return this.http.post(this.serverURL + 'changePassword', body, {headers: headers});
  }

  postChangeEmail(request: ChangeEmailRequestModel) {
    const body = JSON.stringify(request);
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic ' + this._token);
    const headers = new Headers({'content-type': 'text/plain'});
    headers.append('Authorization', 'Basic ' + this._token);
    return this.http.post(this.serverURL + 'changeEmail', body, {headers: headers});
  }

  // This request get current user information from server.
  getWhoAmI() {
    const headers = new Headers({'content-type': 'text/plain'});
    headers.append('Authorization', 'Basic ' + this._token);
    return this.http.get(this.serverURL + 'whoami', {headers: headers});
  }

}
