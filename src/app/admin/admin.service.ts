import { Injectable } from '@angular/core';

import { electionDetails } from '../election-details'
import { electionList } from '../mock-elections'

@Injectable()
export class AdminService {
    getElectionDetails(): electionDetails[]{
        return electionList;
    }
}