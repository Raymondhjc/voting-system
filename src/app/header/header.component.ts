// The header.

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UserStatusModel} from '../common/user-status.model';
import {SigninComponent} from '../authentication/signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  signInStatus: boolean;
  username: string;
  private subscription: Subscription;

  constructor(private authenService: AuthenticationService,
              private router: Router) {
  }

  // When initialize, It request username and signin status from authentication service.
  // If user is not signed in, username will be empty string.
  ngOnInit() {

    // this.authenService.user
    this.username = this.authenService.getUsername();
    this.signInStatus = this.authenService.isSignedIn();

    // By subscribe the userStatusChanged, this component is able to know whenever user status is changed.
    this.subscription = this.authenService.userStatusChanged.subscribe(
      (userStatus: UserStatusModel) => {
        // Need to check whether userStatus is null.
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

  // When sign in button on header is clicked, this will execute.
  onHeaderSignIn() {
    this.authenService.onSignIn();
  }

  // When sign out button on header is clicked, this will execute.
  onHeaderSignOut() {
    this.authenService.onSignOut();
  }

  // Need to unsubscribe to prevent leak.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Redirect to welcome page.
  toWelcome() {
    this.router.navigate(['/']);
  }
}
