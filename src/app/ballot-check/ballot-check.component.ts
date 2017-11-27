import {Component, OnInit} from '@angular/core';
import {MatRadioModule} from '@angular/material';
import {DataSubmit} from './DataSubmit';
import {candidatesP, candidatesVP, candidatesGR} from './mock-votesdata';
import {FormsModule} from '@angular/forms';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-ballot-check',
    templateUrl: './ballot-check.component.html',
    styleUrls: ['./ballot-check.component.css']
})

export class BallotCheckComponent implements OnInit {


    // going to be submitted
    // dataBallot = new DataSubmit('',['','','']);
    // not submitted
    dataChange : FormGroup;
    cds1 = candidatesP;
    cds2 = candidatesVP;
    cds3 = candidatesGR;

    result1: string;
    result2: string;
    result3: string;
    resultFnl: string[] = ['', '', ''];
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

    }

    // change the status
    onSubmit() { // this.submitted = true;
        this.resultFnl[0] = this.result1;
        this.resultFnl[1] = this.result2;
        this.resultFnl[2] = this.result3;
        const dataBack = new DataSubmit('nameofPicture', this.resultFnl);
        this.result1 = '';
        this.result2 = '';
        this.result3 = '';
        this.submitted = true;


    }

    // new a dataBallot to submit
    /*newData(){
      this.dataBallot = new DataSubmit('',['','','']);
    }
    */
    // model = new DataSubmit('A150',['a','b','c']);


}
