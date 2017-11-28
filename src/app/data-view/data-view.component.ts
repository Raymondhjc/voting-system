import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatSelectModule, MatTableModule, MatButtonModule, MatListModule, MatTabsModule } from '@angular/material';
import { candidatesP, candidatesVP, candidatesGR, questions} from '../ballot-check/mock-votesdata';
import { Candidate} from '../ballot-check/candidate';
import {DataViewService} from '../common/data-view.service';



@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  constructor(private dvService: DataViewService) {
  }

  ngOnInit() {
  }
    questions = questions;
    selected = " ";

  displayedColumns = ['id', 'name', 'votes', 'rate'];
  dataSource = new DataSample();
  dataShow = new Array<Candidate>();

  SelectData1() {
    this.dataSource = new DataSample();
    this.dataShow = candidatesP;
    this.onChangeData();
  }

  SelectData2() {
    this.dataSource = new DataSampleVP();
    this.dataShow = candidatesVP;
    this.onChangeData();
  }

  SelectData3() {
    this.dataSource = new DataSampleGr();
    this.dataShow = candidatesGR;
    this.onChangeData();
  }

  onChangeData() {
    this.dvService.resetPieChartData();
    for (var i = 0; i < this.dataShow.length; i++) {
      const option = this.dataShow[i];
      this.dvService.addPieChartData(option.name, option.countsTotal);
    }
    this.dvService.updateChart();
  }

}


export class DataSample extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<Candidate[]> {
    return Observable.of(candidatesP);
  }

  disconnect() {
  }
}

export class DataSampleVP extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<Candidate[]> {
    return Observable.of(candidatesVP);
  }

  disconnect() {
  }
}

export class DataSampleGr extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<Candidate[]> {
    return Observable.of(candidatesGR);
  }

  disconnect() {
  }


}


