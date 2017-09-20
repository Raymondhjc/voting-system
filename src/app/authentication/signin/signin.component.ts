import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {AnthenticationInfoModel} from '../../common/anthentication-info.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authenInfo: AnthenticationInfoModel = new AnthenticationInfoModel('', '');


  constructor(public dialogRef: MdDialogRef<SigninComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
