// This component is to visualize one question as a pie chart.

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {Color} from 'ng2-charts';
import {DataViewService} from '../common/data-view.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-graphical-data-representation',
  templateUrl: './graphical-data-representation.component.html',
  styleUrls: ['./graphical-data-representation.component.css']
})
export class GraphicalDataRepresentationComponent implements OnInit {
  visualize: FormGroup;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private subscription: Subscription;

  constructor(private dvService: DataViewService) {
  }

  // When initialize, initialize the formgroup.
  ngOnInit() {
    this.visualize = new FormGroup({
        'questionNumber': new FormControl(null,
          [Validators.min(0),
            Validators.required,
            Validators.max(this.getTotalNumberOfQuestions())]),
      }
    );
    this.subscription = this.dvService.pieChartDataChanged.subscribe(
      (pieChart) => {
        this.pieChartLabels = pieChart.label;
        this.pieChartData = pieChart.data;
        this.chart.chart.config.data.labels = this.pieChartLabels;
      }
    );

  }


  // These fields is used to hold chart properties.
  public pieChartType: string = 'pie';
  private pieChart: { label: string[], data: number[] } = this.getPieChart(1);
  public pieChartLabels: string[] = this.pieChart.label;
  public pieChartData: number[] = this.pieChart.data;
  palette: Array<Color> = [{
    backgroundColor: ['#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A'
      , '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C']
  }];

  // This function is used to update the pie chart.
  onClickGet() {
    this.pieChart = this.getPieChart(this.visualize.value.questionNumber);
    this.pieChartLabels = this.pieChart.label;
    this.pieChartData = this.pieChart.data;
    this.chart.chart.config.data.labels = this.pieChartLabels;
  }

  // Execute when pie chart is clicked.
  public chartClicked(e: any): void {
    // console.log(e);
  }

  // Execute when pie chart is hovered.
  public chartHovered(e: any): void {
    // console.log(e);
  }

  // This method is a mock API for get total number of questions in a single election.
  getTotalNumberOfQuestions(): number {
    return 10;
  }


  // This method is a mock API for getting data
  getPieChart(questionNumber: number): { label: string[], data: number[] } {
    // index should be used to specify to decide the result of which question should be returned
    // console.log('returning data of question number ' + questionNumber);
    const numOfData: number = Math.floor(Math.random() * 5) + 2;
    let label: string[] = [];
    let data: number[] = [];
    for (let i: number = 0; i < numOfData; ++i) {
      label.push('Choice' + i.toString());
      data.push(Math.floor(Math.random() * 501));
    }
    return {label: label, data: data};
  }

}
