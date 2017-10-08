import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    signInStatus: boolean;
    username: string;
    private subscription: Subscription;

    constructor(private authenService: AuthenticationService) {
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
}
