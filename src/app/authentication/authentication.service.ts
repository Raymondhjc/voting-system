import {AuthenInfo} from '../common/authenInfo.model';
import {MdDialog} from '@angular/material';
import {SigninComponent} from './signin/signin.component';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {isUndefined} from 'util';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  authenInfoChanged = new Subject<AuthenInfo>();
  private authenInfo = new AuthenInfo('Guest', '');
  private signedIn = false;

  constructor(public dialog: MdDialog,
              private router: Router) {
  }

  getUsername() {
    return this.authenInfo.username;
  }

  getPassword() {
    return this.authenInfo.password;
  }

  isSignedIn() {
    return this.signedIn;
  }

  onSignIn(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (!isUndefined(result)) {
        this.authenInfo = result;
        this.signedIn = true;
        this.router.navigate(['/user-dashboard']);
      }
      this.authenInfoChanged.next(this.authenInfo);
    });
  }

  onSignOut(): void {
    this.authenInfo.username = 'Guest';
    this.authenInfo.password = '';
    this.signedIn = false;
    this.authenInfoChanged.next(this.authenInfo);
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        // setTimeout(() => {
        //   resolve(this.signedIn);
        // }, 800);
        resolve(this.signedIn);
      }
    );
    return promise;
  }

}
