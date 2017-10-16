import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';

import { ElectionForm } from './election-form'
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
  electionStartDate: string;
  electionEndDate: string;

  constructor() { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      'electionName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required, )
    }, this.isDateValid);
    this.secondFormGroup = new FormGroup({
      'sections': new FormArray([], this.isSecondFormValid)
    });
    this.firstFormGroup.get('startDate').valueChanges.subscribe((date) => {
      let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
      this.electionStartDate = day + '/' + month + '/' + year;
    });
    this.firstFormGroup.get('endDate').valueChanges.subscribe((date) => {
      let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
      this.electionEndDate = day + '/' + month + '/' + year;
    });

  }
  onAddSection() {
    this.addFinished = false;
    const options = new FormArray([]);
    (<FormArray>this.secondFormGroup.get('sections')).push(new FormGroup({
      'sectionName': new FormControl(null, Validators.required),
      'choiceType': new FormControl(this.choiceType),
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

  isDateValid(control: AbstractControl) {
    console.log();
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
      let _iF = false;
      for (let i = 0; <FormArray>(<FormArray>control).controls[i] != undefined; i++) {
        if ((<FormArray>(<FormArray>control).controls[i].get('options')).length == 0) {
          _iF = true;
          break;
        }
      }
      return _iF == true ? { invalidForm: true } : null;
    }

    return { invalidForm: true };
  }

  // onCreateForm(): void {
  //   let form = new ElectionForm,
  //   fg = this.firstFormGroup.value,
  //   sg = this.secondFormGroup.value;
  //   form.name = fg.electionName;
  //   form.startDate = fg.startDate;
  //   form.endDate = fg.endDate;
  //   for(let s in fg){
  //     let section = new Section;
  //     section.choiceType = (<any>s).choiceType;
  //     section.sectionName = (<any>s).sectionName;
  //     section.options = (<any>s).sectionName;
  //     form.sections.push(section);
  //   }
  //   form.sections = this.firstFormGroup.value.electionName;
  //   form.name = this.firstFormGroup.value.electionName;
  //   form.name = this.firstFormGroup.value.electionName;

  //   console.log(this.firstFormGroup.value);
  //   console.log(this.secondFormGroup.value);
  // }
}