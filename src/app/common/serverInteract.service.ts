import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RegistrationInfoModel} from './user-info.model';

@Injectable()
export class ServerInteractService {
    serverURL = 'http://localhost:4400/';

    constructor(private http: Http) {
    }

    sendSignUp(regInfo: RegistrationInfoModel) {

        const body = JSON.stringify(regInfo);
        console.log(body);
        return this.http.post(this.serverURL + 'signup.json', body);
    }
}
