import { Injectable } from '@angular/core';

//for table
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ElectionDetails } from './election-details'
import { electionList } from './mock-elections'
import { ElectionForm } from './new-election/election-form'

@Injectable()
export class AdminService {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ElectionDetails[]> = new BehaviorSubject<ElectionDetails[]>([]);

    fetchData() {
        this.dataChange.next(electionList);
    }

    get data(): ElectionDetails[] {
        //first handle the fetched data
        //then output the processed data
        return this.dataChange.value;
    }
    constructor() {
        this.fetchData();
    }
}
export class NewElectionService {

    constructor() {
    }

}
