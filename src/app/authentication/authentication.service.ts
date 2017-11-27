// This component keep track of sign in status, sign in,
// sign out, and give information to all other component about
// user information.

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
// It also keep track of whether the user is logged in and user's information.
@Injectable()
export class AuthenticationService {

  // This getter may return null if user is not logged in.
  // Developer can either use this getter to test log in status,
  // or use isSignedIn() method to test it.
  get userStatus(): UserStatusModel {
    return this._userStatus;
  }

  // This variable hold user status.
  // If this variable is null, it means the user is not logged in.
  private _userStatus: UserStatusModel;

  // The developer of other component may want to subscribe this subject
  // if they need access of user information.
  // This subject emit value with type of UserStatusModel.
  userStatusChanged = new Subject<UserStatusModel>();

  // The constructor.
  constructor(public dialog: MatDialog,
              private router: Router,
              public snackBar: MatSnackBar,
              private serverInteract: ServerInteractService) {
    this._userStatus = null;
  }

  // This method send whoami request to update the user status variable "userStatus".
  // This method can be called after the userStatus may change.
  // This will emit a new subscription value of userStatusChanged subject.
  updateUserStatus() {
    this.serverInteract.getWhoAmI().subscribe(
      (whoami) => {
        const info = JSON.parse(whoami.text());
        // user name is no longer null, it indicate user signed in.
        this._userStatus = new UserStatusModel(info.FirstName, info.LastName, info.Username, info.Email, info.Ufid, info.Role);
        this.userStatusChanged.next(this._userStatus);
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  // This getter return current username if user is logged in.
  // If user is not logged in, it will return empty string "".
  getUsername() {
    if (this._userStatus == null) {
      return '';
    } else {
      return this._userStatus.username;
    }
  }

  getRole() {
    if (this._userStatus == null) {
      return '';
    } else {
      return this._userStatus.role;
    }
  }

  // This method will return true if user is logged in.
  // It will return false if user is not logged in.
  isSignedIn() {
    return this._userStatus != null;
  }

  // This method is invoked after user insert his/her credential.
  // It will initiate sign in process.
  // If credential is correct, it will navigate to user dashboard.
  // If credential is wrong, it will show error message, and popup sign in window again.
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
            localStorage.setItem('jwt', r.JWT);
            this.updateUserStatus();
          },
          (error) => {
            const r = JSON.parse(error.text());
            this.snackBar.open(r.message, 'close', {duration: 2000});
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

}
