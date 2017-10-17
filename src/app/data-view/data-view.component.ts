import { Component, OnInit } from '@angular/core';
//material

import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { MatTableModule, MatButtonModule, MatListModule } from '@angular/material';
@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   displayedColumns = ['position', 'name', 'votes', 'rate'];
    dataSource = new DataSample();

    SelectData1(){
    	datatmp = data1;
    }

}


export interface Element {
  name: string;
  position: number;
  votes: number;
  rate: string;
}



const data: Element[] = [
 
];

const data1: Element[] = [
  {position: 1, name: 'Nancy', votes: 10079, rate: ' 6.3%'},
  {position: 2, name: 'Helen', votes: 40026, rate: '25.3%'},
  {position: 3, name: 'Dasiy', votes: 6941, rate: ' 4.4%'},
  {position: 4, name: 'Bob', votes: 90122, rate: '57.%'},
  {position: 5, name: 'Jackie', votes: 10811, rate: ' 6.8%'},
];
const data2: Element[] = [
  {position: 1, name: 'Carbon', votes: 120107, rate: '5%'},
  {position: 2, name: 'Nitrogen', votes: 140067, rate: '5%'},
  {position: 3, name: 'Oxygen', votes: 159994, rate:'5%'},
  {position: 4, name: 'Fluorine', votes: 189984, rate: '5%'},
  {position: 5, name: 'Neon', votes: 201797, rate: '5%'},
];
const data3: Element[] = [
  {position: 1, name: 'Sodium', votes: 229897, rate: '5%'},
  {position: 2, name: 'Magnesium', votes: 24305, rate: '5%'},
  {position: 3, name: 'Aluminum', votes: 269815, rate: '5%'},
  {position: 4, name: 'Silicon', votes: 280855, rate: '5%'},
  {position: 5, name: 'Phosphorus', votes: 309738, rate: '5%'},
];
const data4: Element[] = [
  {position: 1, name: 'Sulfur', votes: 32065, rate: '5%'},
  {position: 2, name: 'Chlorine', votes: 35453, rate: '5%'},
  {position: 3, name: 'Argon', votes: 39948, rate: '5%'},
  {position: 4, name: 'Potassium', votes: 390983, rate: '5%'},
  {position: 5, name: 'Calcium', votes: 40078, rate: '5%'},
];
var datatmp = data1;
export class DataSample extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  		
  connect(): Observable<Element[]> {
    return Observable.of(datatmp);
  }

  disconnect() {}
}


