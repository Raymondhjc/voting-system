import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AnthenticationInfoModel} from '../../common/anthentication-info.model';
import {ServerInteractService} from '../../common/serverInteract.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
    authenInfo: AnthenticationInfoModel = new AnthenticationInfoModel('', '');
    signinForm: FormGroup;


    constructor(public dialogRef: MatDialogRef<SigninComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public serverInteract: ServerInteractService) {
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.signinForm = new FormGroup({
                'username': new FormControl(null, [Validators.required]),
                'password': new FormControl(null, [Validators.required]),
            }
        );
    }

    ngOnDestroy() {

    }

}
