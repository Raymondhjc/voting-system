import { Injectable } from '@angular/core';

// for table
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ElectionDetails } from './election-details';
import { Http, Headers } from '@angular/http';

import { ServerInteractService } from '../common/serverInteract.service'


@Injectable()
export class AdminService {
    serverURL = 'http://localhost:4500/';
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ElectionDetails[]> = new BehaviorSubject<ElectionDetails[]>([]);

    fetchData() {
        const headers = new Headers({ 'content-type': 'text/plain' });
        headers.append('Authorization', 'Basic ' + this.sis.token);
        this.http.get(this.serverURL + '/getElectionList', { headers: headers }).subscribe(data => {
            // Read the result field from the JSON response.
            const electionList = JSON.parse(data.text());
            var list = new Array<ElectionDetails>();
            for (let line of electionList) {
                let status: string;
                if (line.Status == 1) {
                    status = "open"
                } else {
                    status = "closed"
                }
                list.push(new ElectionDetails(
                    line.ElectionID,
                    line.ElectionName,
                    line.StartDate,
                    line.endDate,
                    line.Count,
                    status,
                    line.Admin,
                    line.Inspector,
                    line.Scanner,
                    line.Questions));
            }
            this.dataChange.next(list);
        });
    }

    get data(): ElectionDetails[] {
        // first handle the fetched data
        // then output the processed data
        return this.dataChange.value;
    }

    submitForm(form): void {
        console.log(form.value);
        const body = JSON.stringify(form);
        this.http.post(this.serverURL + 'signup', body).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    constructor(private http: Http, private sis: ServerInteractService) {
        this.fetchData();
    }
}

// export class NewElectionService {
//     serverURL = 'http://localhost:4500/';
//     submitForm(form): void {
//         console.log(form.value);
//         const body = JSON.stringify(form);
//         this.http.post(this.serverURL + 'signup', body);
//         this.serverInteract.postSignup(form).subscribe(
//             (response) => console.log(response),
//             (error) => console.log(error)
//         );
//     }

//     constructor(private http: Http, private sis: ServerInteractService) {
//     }

// }
