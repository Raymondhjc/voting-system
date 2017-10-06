import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdTableModule, MdButtonModule, MdListModule, MatTabsModule } from '@angular/material';
import { candidatesP, candidatesVP, candidatesGr} from '../ballot-check/mock-votesdata';
import { Candidate} from '../ballot-check/candidate';



@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   displayedColumns = ['id', 'name', 'votes', 'rate'];
    dataSource = new DataSample();

    SelectData1(){
        this.dataSource = new DataSample();
    	    }
    SelectData2(){
        this.dataSource = new DataSampleVP();
          }
    SelectData3(){
        this.dataSource = new DataSampleGr();
          }

}


export class DataSample extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  		
  connect(): Observable<Candidate[]> {
    return Observable.of(candidatesP);
  }

  disconnect() {}
}
export class DataSampleVP extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
      
  connect(): Observable<Candidate[]> {
    return Observable.of(candidatesVP);
  }

  disconnect() {}
}
export class DataSampleGr extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
      
  connect(): Observable<Candidate[]> {
    return Observable.of(candidatesGr);
  }

  disconnect() {}
}


