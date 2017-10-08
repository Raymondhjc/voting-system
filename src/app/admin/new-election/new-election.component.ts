import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * @title Stepper overview
 */
@Component({
    selector: 'new-election',
    templateUrl: './new-election.component.html',
    styleUrls: ['./new-election.component.css']
})
export class newElectionComponent {
  //isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  startDate = new Date(2017, 1, 1);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      checkEmpty: ['', Validators.required],
      checkDate:['',Validators.compose(
        [Validators.required,
        ]
      )]
    });
    this.secondFormGroup = this._formBuilder.group({
      checkEmpty: ['', Validators.required]
    });
  }

}