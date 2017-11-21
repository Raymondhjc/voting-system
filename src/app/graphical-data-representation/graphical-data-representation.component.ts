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

  datasets = [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3]
    }
  ];

  labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

}
