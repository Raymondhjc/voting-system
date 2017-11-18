import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UserStatusModel} from '../common/user-status.model';

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
}
