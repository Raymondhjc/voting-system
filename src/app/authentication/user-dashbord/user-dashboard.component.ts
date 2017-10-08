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
    username: string;
    signInStatus: boolean;
    private subscription: Subscription;

    constructor(private authenService: AuthenticationService) {
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
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
