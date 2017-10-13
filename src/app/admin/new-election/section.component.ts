import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'ballot-section',
    templateUrl: './section.component.html',
    styleUrls: ['./new-election.component.css']
})
export class sectionComponent implements OnInit {

    secondFormGroup: FormGroup;
    ngOnInit() {
        this.secondFormGroup = new FormGroup({
            'sectionName': new FormControl(null, Validators.required),
            'options': new FormArray([]),
        });
    }
    onAddOption(){
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.secondFormGroup.get('options')).push(control);
    }
}
