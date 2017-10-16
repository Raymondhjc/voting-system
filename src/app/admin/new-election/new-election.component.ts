import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.css']
})
export class newElectionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  choiceType: number = 1;
  addFinished = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      'electionName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required, )
    }, this.isDateValid);
    this.secondFormGroup = new FormGroup({
      'sections': new FormArray([], this.isSecondFormValid)
    });
  }
  onAddSection() {
    this.addFinished = false;
    const options = new FormArray([]);
    (<FormArray>this.secondFormGroup.get('sections')).push(new FormGroup({
      'sectionName': new FormControl(null, Validators.required),
      'options': options
    }));
  }
  onDeleteSection(index: number) {
    (<FormArray>this.secondFormGroup.get('sections')).removeAt(index);
  }

  onAddOption(index: number) {
    const control = new FormControl(null, Validators.required);
    const sections = (<FormArray>this.secondFormGroup.get('sections'));
    (<FormArray>sections.controls[index].get('options')).push(control);
  }
  onDeleteOption(sectionIndex: number, optionIndex: number) {
    const sections = (<FormArray>this.secondFormGroup.get('sections'));
    (<FormArray>sections.controls[sectionIndex].get('options')).removeAt(optionIndex);
  }

  onSubmit(): void {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

  isDateValid(control: AbstractControl) {
    if (control.get('startDate').value != null && control.get('endDate').value != null) {
      let sDate = control.get('startDate').value,
        eDate = control.get('endDate').value,
        sDay = sDate.getDate(),
        sMonth = sDate.getMonth() + 1,
        sYear = sDate.getFullYear(),
        eDay = eDate.getDate(),
        eMonth = eDate.getMonth() + 1,
        eYear = eDate.getFullYear();

      if (sYear == eYear) {
        console.log(sMonth + "/" + sDay + "/" + sYear);
        if (sMonth == eMonth) {
          if (sDay <= eDay) {
            return null;
          }
        } else if (sMonth < eMonth) {
          return null;
        }
      } else if (sYear < eYear) {
        return null;
      }
    }
    return { invalidForm: true };
  }
  isSecondFormValid(control: AbstractControl) {
    if ((<FormArray>control).length > 0) {
      if ((<FormArray>(<FormArray>control).controls[0].get('options')).length > 0) {
        return null;
      }
      return { invalidForm: true };
    }

    return { invalidForm: true };
  }

}