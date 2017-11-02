// TODO: Show last signed in date.

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnthenticationInfoModel} from '../../common/anthentication-info.model';
import {AuthenticationService} from '../authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ChangePasswordRequestModel} from '../../common/change-password-request.model';
import {ServerInteractService} from '../../common/serverInteract.service';
import {MatSnackBar} from '@angular/material';
import {UserStatusModel} from '../../common/user-status.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userStatus: UserStatusModel;

  signInStatus: boolean;
  private subscription: Subscription;
  changePassword: FormGroup;

  constructor(private authenService: AuthenticationService,
              private serverInteract: ServerInteractService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.signInStatus = this.authenService.isSignedIn();
    this.userStatus = this.authenService.userStatus;
    this.subscription = this.authenService.userStatusChanged.subscribe(
      (userStatus: UserStatusModel) => {
        this.userStatus = userStatus;
      }
    );

    const password = new FormControl(null, [Validators.required, Validators.minLength(6)]);
    const repeatPassword = new FormControl(null, [Validators.required, CustomValidators.equalTo(password)]);
    this.changePassword = new FormGroup({
        'previousPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'newPassword': password,
        'repeatNewPassword': repeatPassword,
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangePasswordSubmit() {
    const changePasswordRequestBody = new ChangePasswordRequestModel(
      this.changePassword.value.previousPassword,
      this.changePassword.value.newPassword,
    );

    this.serverInteract.postChangePassword(changePasswordRequestBody).subscribe(
      () => {
        this.snackBar.open('You have modified your password.', 'close', {duration: 4000});
        (<HTMLFormElement>document.getElementById('changePasswordForm')).reset();
      },
      (error) => {
        const r = JSON.parse(error.text());
        this.snackBar.open(r.message, 'close', {duration: 4000});
      }
    );
  }
}
