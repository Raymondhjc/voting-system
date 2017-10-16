import { Component, OnInit } from '@angular/core';
import { MatRadioModule} from '@angular/material';
import { DataSubmit } from './DataSubmit';
import { candidatesP,candidatesVP,candidatesGR} from'./mock-votesdata';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ballot-check',
  templateUrl: './ballot-check.component.html',
  styleUrls: ['./ballot-check.component.css']
})

export class BallotCheckComponent implements OnInit{
	ngOnInit() {}
	//going to be submitted
  //dataBallot = new DataSubmit('',['','','']);
  // not submitted
  cds1 =candidatesP;
  cds2 =candidatesVP;
  cds3 =candidatesGR;
  
  result1:string;
  result2:string;
  result3:string;
  resultFnl :string[]=['','','']; 
  submitted =false;


  // change the status
  onSubmit(){ //this.submitted = true;
    this.resultFnl[0]=this.result1;
    this.resultFnl[1]=this.result2;
    this.resultFnl[2]=this.result3;
    let dataBack = new DataSubmit('nameofPicture',this.resultFnl);
    this.result1 = '';
    this.result2 = '';
    this.result3 = '';
    this.submitted =true;
    



  }
  //new a dataBallot to submit
  /*newData(){
    this.dataBallot = new DataSubmit('',['','','']);
  }
  */
  //model = new DataSubmit('A150',['a','b','c']);

  



}