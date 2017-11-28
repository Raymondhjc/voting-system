export class DataSubmit {
    BallotID: number;
    ElectionID: number;
    Results: string[];

    constructor(ballot, election, results) {
    	this.BallotID = ballot;
    	this.ElectionID = election;
    	this.Results = results;

    }
}
