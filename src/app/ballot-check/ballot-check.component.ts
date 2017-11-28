import {Component, OnInit} from '@angular/core';
import {MatRadioModule} from '@angular/material';
import {DataSubmit} from './DataSubmit';
import {candidatesP, candidatesVP, candidatesGR, questions} from './mock-votesdata';
import {FormsModule} from '@angular/forms';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ballotcheckService} from './ballot-check.service';
import {Http} from '@angular/http';


@Component({
    selector: 'app-ballot-check',
    templateUrl: './ballot-check.component.html',
    styleUrls: ['./ballot-check.component.css']
})

export class BallotCheckComponent implements OnInit {
constructor(private service: ballotcheckService,
            private http : Http) {
    }

    // going to be submitted
    // dataBallot = new DataSubmit('',['','','']);
    // not submitted
    questions = questions;
    ballotID = this.service.BallotID;
    dataChange : FormGroup;
    cds1 = candidatesP;
    cds2 = candidatesVP;
    cds3 = candidatesGR;

    result1: string;
    result2: string;
    result3: string;
    resultFnl: string[];
    submitted = false;

    ngOnInit() {
            const resultdata1 = new FormControl('');
            const resultdata2 = new FormControl('');
            const resultdata3 = new FormControl('');
            this.dataChange = new FormGroup({
                 'ElectionID': new FormControl(null),
                 'BallotID': new FormControl(),
                 'resultdata1': new FormControl(null),
                 'resultdata2': new FormControl(null),
                 'resultdata3': new FormControl(null),

                });
             this.resultFnl = [];

    }
    // change the status
    onSubmit() { // this.submitted = true;

        this.resultFnl.push(this.result1);
        this.resultFnl.push(this.result2);
        this.resultFnl.push(this.result3);
        candidatesP[0].countsSound++;
        candidatesP[0].countsUnsure--;
        candidatesVP[0].countsSound++;
        candidatesVP[0].countsUnsure--;
        candidatesGR[0].countsSound++;
        candidatesGR[0].countsUnsure--;
        
       const dataBack = new DataSubmit(this.ballotID,1, this.resultFnl);
       const body = JSON.stringify(dataBack);

       //const body1 = JSON.stringify( );
       this.service.postBallotCheck(dataBack);
       //this.http.post('http://localhost:4500/ballotcheck', "11");





        this.resultFnl= [];
        this.result1 = '';
        this.result2 = '';
        this.result3 = '';
        this.submitted = true;

        //(<HTMLFormElement>document.getElementById('changePasswordForm')).reset();
    }

    // new a dataBallot to submit
    /*newData(){
      this.dataBallot = new DataSubmit('',['','','']);
    }
    */
    // model = new DataSubmit('A150',['a','b','c']);


}
