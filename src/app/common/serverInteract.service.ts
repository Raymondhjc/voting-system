import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RegistrationInfoModel} from './user-info.model';
import {AnthenticationInfoModel} from './anthentication-info.model';

@Injectable()
export class ServerInteractService {
    serverURL = 'http://localhost:4500/';

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
}
