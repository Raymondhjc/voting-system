import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {AuthenInfo} from '../authenInfo.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authenInfo: AuthenInfo = new AuthenInfo('', '');


  constructor(public dialogRef: MdDialogRef<SigninComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
