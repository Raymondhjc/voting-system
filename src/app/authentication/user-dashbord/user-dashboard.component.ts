// TODO: Show last signed in date.

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnthenticationInfoModel} from '../../common/anthentication-info.model';
import {AuthenticationService} from '../authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  signInStatus: boolean;
  authenInfo: AnthenticationInfoModel;
  private subscription: Subscription;

  constructor(private authenService: AuthenticationService) {
  }

  ngOnInit() {
    this.signInStatus = this.authenService.isSignedIn();
    this.authenInfo = new AnthenticationInfoModel(this.authenService.getUsername(), this.authenService.getPassword());
    this.subscription = this.authenService.authenInfoChanged.subscribe(
      (authenInfo: AnthenticationInfoModel) => {
        this.authenInfo = authenInfo;
        this.signInStatus = this.authenService.isSignedIn();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
