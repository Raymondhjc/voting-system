import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.css']
})
export class newElectionComponent implements OnInit {
  //isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //startDate = new Date(2017, 1, 1);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      checkEmpty: ['', Validators.required],
      checkDate: ['', Validators.compose(
        [Validators.required,
        ]
      )]
    });
    this.secondFormGroup = this._formBuilder.group({
      'sections': new FormArray([]),
    });
  }
  onAddSection() {
    (<FormArray>this.secondFormGroup.get('sections')).push(
      new FormGroup({
        'sectionName': new FormControl("NAME", Validators.required),
        'options': new FormArray([]),
      })
    );
  }
  onAddOption(index: number) {
    const control = new FormControl("option", Validators.required);
    (<FormArray>this.secondFormGroup.get([index,'options'])).push(control);
  }

}