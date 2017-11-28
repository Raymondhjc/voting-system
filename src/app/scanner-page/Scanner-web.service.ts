import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ScannerDownloadService {
    serverURL = 'http://localhost:4500/';
    constructor(private http:Http) {}

     // Create the header for http request
    getHeader(): RequestOptions {
        let headers: Headers = new Headers();
        headers.append('pictureInfor', 'pictureaddress');
        return new RequestOptions({ headers: headers });
    }

    getPictureInfo() {
        let options: RequestOptions = this.getHeader();
        return this.http.get(this.serverURL + `/download`);
    }

    /*
    getPictureInfor(pictureaddress): Observable<string>{
        let options: RequestOptions = this.getHeader();
        return this.http.post(`${this.serverURL}/signup`,pictureaddress, options)
        .map(res => res.json())
        .do(res => {
            if(res.token) {
                console.log(res);
            }
        })
        .catch(this.handleError);
    }

    */
    private handleError(err){
        let errMessage: string;
        
        if (err instanceof Response){
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText || ''} ${error}`;

        } else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
    }
  
}