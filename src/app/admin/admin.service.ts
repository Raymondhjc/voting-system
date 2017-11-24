import { Injectable } from '@angular/core';

// for table
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ElectionDetails } from './election-details';
import { electionList } from './mock-elections';
import { Http, Headers } from '@angular/http';

import { ServerInteractService } from '../common/serverInteract.service'


@Injectable()
export class AdminService {
    serverURL = 'http://localhost:4500/';
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ElectionDetails[]> = new BehaviorSubject<ElectionDetails[]>([]);

    fetchData() {
        const headers = new Headers({'content-type': 'text/plain'});
        headers.append('Authorization', 'Basic ' + this.sis.token);
        this.http.get(this.serverURL + '/getElectionList', {headers: headers}).subscribe(data => {
            // Read the result field from the JSON response.
            this.dataChange.next(data[0]['admin']);
        });
        //this.dataChange.next(electionList);
    }

    get data(): ElectionDetails[] {
        // first handle the fetched data
        // then output the processed data
        return this.dataChange.value;
    }

    constructor(private http: Http, private sis: ServerInteractService) {
        this.fetchData();
    }
}

export class NewElectionService {
    submitForm(form): void {
        console.log(form.value);
    }

    constructor() {
    }

}
