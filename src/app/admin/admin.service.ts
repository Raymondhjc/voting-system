import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// for table
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ElectionDetails, Question, Option} from './election-details';
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
                list.push(new ElectionDetails(
                    line.ElectionID,
                    line.ElectionName,
                    line.StartDate,
                    line.endDate,
                    line.Count,
                    line.Status,
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
        let ele = new ElectionDetails(
            "",
            form.meta.electionName,
            this.getDate(form.meta.startDate),
            this.getDate(form.meta.endDate),
            form.meta.count,
            "open",
            "111111",
            "",
            "",
            this.getContent(form.content.sections),
            true
        )
        console.log(ele);
        const body = JSON.stringify(ele);
        const headers = new Headers({ 'content-type': 'text/plain' });
        headers.append('Authorization', 'Basic ' + this.sis.token);
        this.http.post(this.serverURL + 'addElection', body, { headers: headers }).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    getDate(date): string {
        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        return month + '/' + day + '/' + year;
    }

    getContent(questions: Array<any>): Array<Question>{
        let json = new Array<Question>();
        for(let q of questions){
            let newS = new Question();
            newS.questionID = "";
            newS.questionName = q.sectionName;
            newS.choiceType = q.choiceType;
            newS.options = new Array<Option>();
            for (let o of q.options) {
              let newO = new Option();
              newO.optionID = "";
              newO.label = o;
              newO.count = 0;
              newS.options.push(newO);
            }
            json.push(newS)
        }
        return json;
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
