import { Injectable } from '@angular/core';

import { electionDetails } from './election-details'
import { electionList } from './mock-elections'

@Injectable()
export class AdminService {
    getElectionDetails(): electionDetails[]{
        //first handle the fetched data, then output the processed data, now nothing handled
        return electionList;
    }
}