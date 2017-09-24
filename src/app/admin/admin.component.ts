
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
//for tables
import {MdPaginator} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

//services needed
import { AdminService } from './admin.service'

@Component({
  selector: 'admin-app',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})

export class AdminComponent implements OnInit {
  chartTitle: string = 'Current elections';

  constructor(private adminService: AdminService) {

  }
  displayedColumns = ['id', 'name', 'count'];
  //elecTable = new elecTableDataSource(this.adminService);
  elecTable: elecTableDataSource | null;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  //see election details
  // onSelect(selectedElection: electionDetails): void {
  //   this.electionDetails = selectedElection;
  // }

  ngOnInit() {
    this.elecTable = new elecTableDataSource(this.adminService, this.paginator);
  }

}

// export class elecTableDataSource extends DataSource<any> {
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   constructor(private adminService: AdminService) {
//     super();
//   }
//   AllElectionList = this.adminService.getElectionDetails();
  
//   connect(): Observable<any> {
//     return Observable.of(this.AllElectionList);
//   }

//   disconnect() { }
// }

export class elecTableDataSource extends DataSource<any> {
  constructor(private adminService: AdminService, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.adminService.dataChange,
      this._paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.adminService.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}

