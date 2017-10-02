import { Component, OnInit } from '@angular/core';


import { MatRadioModule} from '@angular/material';


@Component({
  selector: 'app-ballot-check',
  templateUrl: './ballot-check.component.html',
  styleUrls: ['./ballot-check.component.css']
})

export class BallotCheckComponent implements OnInit{
	ngOnInit() {  }
	theOneP: string;
	theOneV: string;
	theOneG: string;

  candidatesP = [
    'Nancy',
    'Helen',
    'Daisy',
    
	  ];
	  candidatesV = [
    'Neux',
    'Serra',
    'Thomas',
    
  ];
  candidatesG = [
    'Charles',
    'Leiserson',
    'Ronald',
    
  ];




}