import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
<<<<<<< HEAD
=======
import {UserStatusModel} from '../common/user-status.model';
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
    signInStatus: boolean;
    username: string;
    private subscription: Subscription;

    constructor(private authenService: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {

        this.username = this.authenService.getUsername();
        this.signInStatus = this.authenService.isSignedIn();

        this.subscription = this.authenService.usernameChanged.subscribe(
            (username: string) => {
                this.username = username;
                this.signInStatus = this.authenService.isSignedIn();
            }
        );
    }

    onHeaderSignIn() {
        this.authenService.onSignIn();
    }

    onHeaderSignOut() {
        this.authenService.onSignOut();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    toWelcome() {
        this.router.navigate(['/']);
    }
=======
  signInStatus: boolean;
  username: string;
  private subscription: Subscription;

  constructor(private authenService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {

    this.username = this.authenService.getUsername();
    this.signInStatus = this.authenService.isSignedIn();

    this.subscription = this.authenService.userStatusChanged.subscribe(
      (userStatus: UserStatusModel) => {
        if (userStatus == null) {
          this.username = '';
          this.signInStatus = false;
        } else {
          this.username = userStatus.username;
          this.signInStatus = true;
        }
      }
    );
  }

  onHeaderSignIn() {
    this.authenService.onSignIn();
  }

  onHeaderSignOut() {
    this.authenService.onSignOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toWelcome() {
    this.router.navigate(['/']);
  }
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
}
