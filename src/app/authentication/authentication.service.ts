///<reference path="../../../node_modules/@angular/router/src/router.d.ts"/>
import {MatDialog, MatSnackBar} from '@angular/material';
import {SigninComponent} from './signin/signin.component';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import {ServerInteractService} from '../common/serverInteract.service';
import {UserStatusModel} from '../common/user-status.model';

// AuthenticationService class holds user Information.
// It initiate sign in and sign out process.
// It also keep track of whether the user is logged in.


@Injectable()
export class AuthenticationService {
  get userStatus(): UserStatusModel {
    return this._userStatus;
  }

  private _userStatus: UserStatusModel;

  userStatusChanged = new Subject<UserStatusModel>();

  constructor(public dialog: MatDialog,
              private router: Router,
              public snackBar: MatSnackBar,
              private serverInteract: ServerInteractService) {
    this._userStatus = null;
  }

  getUsername() {
    if (this._userStatus == null) {
      return '';
    } else {
      return this._userStatus.username;
    }
  }

  isSignedIn() {
    return this._userStatus != null;
  }

  onSignIn(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        result.subscribe(
          (response) => {
            // After Signin, Server return JWT.
            const r = JSON.parse(response.text());
            this.serverInteract.token = r.JWT;

            // Another request send for get user information.
            this.serverInteract.getWhoAmI().subscribe(
              (whoami) => {
                const info = JSON.parse(whoami.text());
                // user name is no longer null, it indicate user signed in.
                this._userStatus = new UserStatusModel(info.FirstName, info.LastName, info.Username, info.Email, info.Ufid, 'user');
                this.userStatusChanged.next(this._userStatus);
                this.router.navigate(['/user-dashboard']);
              },
              (error) => {
                console.log(error);
              }
            );
            // TODO
            // localStorage.setItem('currentUser', response.text());
            // console.log(localStorage.getItem('currentUser'));
          },
          (error) => {
            const r = JSON.parse(error.text());
            this.snackBar.open(r.message, 'close', {duration: 2000});
            this.onSignIn();
          }
        );
      }
    });
  }

  onSignOut(): void {
    this._userStatus = null;
    this.userStatusChanged.next(this._userStatus);
    this.router.navigate(['/welcome']);
  }

  // isAuthenticated() {
  //     const promise = new Promise(
  //         (resolve, reject) => {
  //             // setTimeout(() => {
  //             //   resolve(this.signedIn);
  //             // }, 800);
  //             resolve(this.signedIn);
  //         }
  //     );
  //     return promise;
  // }

}
