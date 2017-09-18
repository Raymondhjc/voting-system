import {AuthenInfo} from './authenInfo.model';
import {MdDialog} from '@angular/material';
import {SigninComponent} from './signin/signin.component';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {isUndefined} from 'util';

@Injectable()
export class AuthenticationService {
  authenInfoChanged = new Subject<AuthenInfo>();
  private authenInfo = new AuthenInfo('Guest', '');
  private signInStatus = false;

  constructor(public dialog: MdDialog) {
  }

  getUsername() {
    return this.authenInfo.username;
  }

  getPassword() {
    return this.authenInfo.password;
  }

  isSignedIn() {
    return this.signInStatus;
  }

  onSignIn(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!isUndefined(result)) {
        this.authenInfo = result;
        this.signInStatus = true;
      }
      this.authenInfoChanged.next(this.authenInfo);
    });
  }

  onSignOut(): void {
    this.authenInfo.username = 'Guest';
    this.authenInfo.password = '';
    this.signInStatus = false;
    this.authenInfoChanged.next(this.authenInfo);
  }

}
