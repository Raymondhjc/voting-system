import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {AuthenInfo} from '../authentication/authenInfo.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signInStatus: boolean;
  authenInfo: AuthenInfo;
  private subscription: Subscription;

  constructor(private authenService: AuthenticationService) {
  }

  ngOnInit() {
    this.subscription = this.authenService.authenInfoChanged.subscribe(
      (authenInfo: AuthenInfo) => {
        this.authenInfo = authenInfo;
        this.signInStatus = this.authenService.isSignedIn();
      }
    );
  }

  onHeaderSignIn() {
    this.authenService.onSignIn();
  }
}
