import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-graphical-data-representation',
  templateUrl: './graphical-data-representation.component.html',
  styleUrls: ['./graphical-data-representation.component.css']
})
export class GraphicalDataRepresentationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  type = 'line';
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

}
