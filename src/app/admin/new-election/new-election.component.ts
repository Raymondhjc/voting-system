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
    this.secondFormGroup = new FormGroup({
      'sections': new FormArray([]),
    });
  }
  // onAddSection(optionCount: number) {
  //   const options = new FormArray([]);
  //   for (let i = 0; i < optionCount; i++) {
  //     options.push(new FormControl(null, Validators.required));
  //   }
  //   (<FormArray>this.secondFormGroup.get('sections')).push(new FormGroup({
  //     'sectionName': new FormControl("NAME", Validators.required),
  //     'options': options
  //   }));

  // }
  onAddSection() {
    const options = new FormArray([]);
    (<FormArray>this.secondFormGroup.get('sections')).push(new FormGroup({
      'sectionName': new FormControl(null, Validators.required),
      'options': options
    }));

  }

  onAddOption(index: number) {
    const control = new FormControl("option", Validators.required);
    const sections = (<FormArray>this.secondFormGroup.get('sections'));
    (<FormArray>sections.controls[index].get('options')).push(control);
  }

  onSubmit(): void {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}