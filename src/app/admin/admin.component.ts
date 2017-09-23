// import { Component, OnInit } from '@angular/core';
// import { MdButtonModule } from '@angular/material';

import { electionDetails } from './election-details'
import { AdminService } from './admin.service'

import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/Collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdPaginator, MdSort } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
declare let d3: any;

@Component({
  selector: 'admin-app',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})

// export class AdminComponent implements OnInit {
//   chartTitle: string = 'Current elections';

//   constructor(private adminService: AdminService) {

//   }
//   AllElectionList: electionDetails[] = this.adminService.getElectionDetails();


//   //see election details
//   // onSelect(selectedElection: electionDetails): void {
//   //   this.electionDetails = selectedElection;
//   // }

//   ngOnInit() {
//     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//     //Add 'implements OnInit' to the class.

//   }

// }

export class AdminComponent implements OnInit {
  
    //displayedColumns = ['shiftDate', 'swipeIn', 'swipeOut', 'duration', 'status'];
    displayedColumns = ['id', 'name', 'count', ];
    exampleDatabase = new ExampleDatabase();
    dataSource: ExampleDataSource | null;
  
    @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild(MdSort) sort: MdSort;
  
    ngOnInit() {
      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    }
  }
  // export interface attendanceData {
  //   shiftDate: string;
  //   swipeIn: string;
  //   swipeOut: string;
  //   duration: string;
  //   status: string;
  // }
  
  
  /** An example database that the data source uses to retrieve data for the table. */
  export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<electionDetails[]> = new BehaviorSubject<electionDetails[]>([]);
    get data(): electionDetails[] {
  
      let data = [
        { id: 'A123', name: 'Student Association President', count: 150},
        { id: 'A124', name: 'Friday Activity location selection', count: 120 },
        { id: 'A125', name: 'Department Vice President', count: 233 },
        { id: 'A128', name: 'Survey 1', count: 230 }
      ];
  
      return data;
    }
  
    constructor() {
  
      this.dataChange.next(this.data);
    }
  
  }
  
  export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
  
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator, private _sort: MdSort) {
      super();
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<electionDetails[]> {
      // const displayDataChanges = [
      //   this._exampleDatabase.dataChange,
      //   this._paginator.page,
      //   this._sort.mdSortChange
      // ];
  
      // return Observable.merge(...displayDataChanges).map(() => {
      //   // const data = this._exampleDatabase.data.slice();
      //   const data = this.getSortedData();
      //   // Grab the page's slice of data.
      //   const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      //   return data.splice(startIndex, this._paginator.pageSize);
      // });
      return this._exampleDatabase.dataChange;
    }
  
    disconnect() { }
  
    // getSortedData(): electionDetails[] {
    //   const data = this._exampleDatabase.data.slice();
    //   if (!this._sort.active || this._sort.direction == '') { return data; }
  
    //   return data.sort((a, b) => {
    //     let propertyA: number | string = '';
    //     let propertyB: number | string = '';
  
    //     switch (this._sort.active) {
    //       case 'shiftDate': [propertyA, propertyB] = [a.shiftDate, b.shiftDate]; break;
    //       case 'swipeIn': [propertyA, propertyB] = [a.swipeIn, b.swipeIn]; break;
    //       case 'swipeOut': [propertyA, propertyB] = [a.swipeOut, b.swipeOut]; break;
    //       case 'duration': [propertyA, propertyB] = [a.duration, b.duration]; break;
    //     }
  
    //     let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    //     let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
    //     return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    //   });
    // }
  }