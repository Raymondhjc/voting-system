import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

class PieChartData {
  constructor(label: string[], data: number[]) {
    this.label = label;
    this.data = data;
  }

  label: string[];
  data: number[];
}

@Injectable()
export class DataViewService {
  private _pieChartData: PieChartData = new PieChartData([], []);
  pieChartDataChanged = new Subject<PieChartData>();


  get pieChartData(): PieChartData {
    return {label: this._pieChartData.label, data: this._pieChartData.data};
  }

  addPieChartData(label: string, data: number) {
    this._pieChartData.label.push(label);
    this._pieChartData.data.push(data);
  }

  resetPieChartData() {
    this._pieChartData = new PieChartData([], []);
  }

  updateChart() {
    this.pieChartDataChanged.next(this.pieChartData);
  }

}
