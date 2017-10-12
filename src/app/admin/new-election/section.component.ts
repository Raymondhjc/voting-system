import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ballot-section',
    templateUrl: './section.component.html',
    styleUrls: ['./new-election.component.css']
})
export class sectionComponent implements OnInit {

    secondFormGroup: FormGroup;
    ngOnInit() {
        this.secondFormGroup = new FormGroup({
            'sectionName': new FormControl(null),
            'options': new FormControl(null),
        });
    }
}
