import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RegistrationInfoModel} from './user-info.model';
import {AnthenticationInfoModel} from './anthentication-info.model';

@Injectable()
export class ServerInteractService {
    serverURL = 'http://localhost:4400/';

    constructor(private http: Http) {
    }

    sendSignup(regInfo: RegistrationInfoModel) {

        const body = JSON.stringify(regInfo);
        console.log(body);
        return this.http.post(this.serverURL + 'signup', body);
    }

    sendSignin(signinInfo: AnthenticationInfoModel) {

        const body = JSON.stringify(signinInfo);
        console.log(body);
        return this.http.post(this.serverURL + 'signin', body);
    }
}
