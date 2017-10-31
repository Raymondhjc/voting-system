// TODO: Show last signed in date.

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnthenticationInfoModel} from '../../common/anthentication-info.model';
import {AuthenticationService} from '../authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ChangePasswordRequestModel} from '../../common/change-password-request.model';
import {ServerInteractService} from '../../common/serverInteract.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  username: string;
  signInStatus: boolean;
  private subscription: Subscription;
  changePassword: FormGroup;

  constructor(private authenService: AuthenticationService,
              private serverInteract: ServerInteractService) {
  }

  ngOnInit() {
    this.signInStatus = this.authenService.isSignedIn();
    this.username = this.authenService.getUsername();
    this.subscription = this.authenService.usernameChanged.subscribe(
      (username: string) => {
        this.username = username;
        this.signInStatus = this.authenService.isSignedIn();
      }
    );

    const password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const repeatPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
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

    this.serverInteract.sendChangePassword(changePasswordRequestBody).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
