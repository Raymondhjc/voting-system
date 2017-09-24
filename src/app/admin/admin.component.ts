
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
//for tables
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
  chartTitle: string = 'Current Elections';

  constructor(private adminService: AdminService) {

  }
  displayedColumns = ['id', 'name', 'count'];
  elecTable: elecTableDataSource | null;
  
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.elecTable = new elecTableDataSource(this.adminService, this.paginator, this.sort);
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
  constructor(private adminService: AdminService, private _paginator: MdPaginator, private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.adminService.dataChange,
      this._paginator.page,
      this._sort.mdSortChange
    ];
    return Observable.merge(...displayDataChanges)
      .map(() => {
        const rawData = this.adminService.data.slice();
        const sortedData = this.getSortedData(rawData);
        // Grab the page's slice of data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return sortedData.splice(startIndex, this._paginator.pageSize);
      });
  }

  disconnect() { }

  //data sorting
  getSortedData(data:any[]): any[] {
    //const data = this.adminService.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'count': [propertyA, propertyB] = [a.count, b.count]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

}

