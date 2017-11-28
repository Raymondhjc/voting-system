// service
//
import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {DataSubmit} from './DataSubmit';
@Injectable()
export class ballotcheckService implements OnInit{
	  constructor(private http: Http) {
  }
	//questions string[]
	//optionsdata 
	ngOnInit(): void {	}
	BallotID : number = 102 ;
	serverURL = 'http://localhost:4500/';
  postBallotCheck(ballotInfo: DataSubmit) {
    const body = JSON.stringify(ballotInfo);
    console.log(body);
    console.log(ballotInfo);
    this.http.post(this.serverURL + "ballotcheck", body).subscribe(
    	(result)=>{console.log(result)},
    	(error)=>{console.log(error)}
    )
  }



}