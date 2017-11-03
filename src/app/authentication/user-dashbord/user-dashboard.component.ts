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
import {ChangeEmailRequestModel} from '../../common/change-email-request.model';

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
  changeEmail: FormGroup;

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

    this.changeEmail = new FormGroup({
      'newEmail': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangePasswordSubmit() {
    // Create request body.
    const changePasswordRequestBody = new ChangePasswordRequestModel(
      this.changePassword.value.previousPassword,
      this.changePassword.value.newPassword,
    );

    // Sending the request
    this.serverInteract.postChangePassword(changePasswordRequestBody).subscribe(
      () => {
        // If success, tell user the password is modified.
        this.snackBar.open('You have modified your password.', 'close', {duration: 4000});
        // Reset the form.
        (<HTMLFormElement>document.getElementById('changePasswordForm')).reset();
      },
      (error) => {
        // If error occur, show the error.
        const r = JSON.parse(error.text());
        this.snackBar.open(r.message, 'close', {duration: 4000});
      }
    );
  }

  onChangeEmail() {
    const changeEmailRequestBody = new ChangeEmailRequestModel(
      this.changeEmail.value.newEmail
    );

    // Sending the request
    this.serverInteract.postChangeEmail(changeEmailRequestBody).subscribe(
      () => {
        // If success, tell user the email is modified.
        this.snackBar.open('You have modified your email.', 'close', {duration: 4000});
        // Reset the form.
        (<HTMLFormElement>document.getElementById('changeEmail')).reset();
        this.authenService.updateUserStatus();
      },
      (error) => {
        // If error occur, show the error.
        const r = JSON.parse(error.text());
        this.snackBar.open(r.message, 'close', {duration: 4000});
      }
    );
  }

}
