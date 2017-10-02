import { Component, OnInit } from '@angular/core';


import { MatRadioModule} from '@angular/material';


@Component({
  selector: 'app-ballot-check',
  templateUrl: './ballot-check.component.html',
  styleUrls: ['./ballot-check.component.css']
})

export class BallotCheckComponent implements OnInit{
	ngOnInit() {  }
	theOne: string;

  candidates = [
    'Nancy',
    'Helen',
    'Daisy',
    'Bob',
  ];





}