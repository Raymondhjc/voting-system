import {MatDialog, MatSnackBar} from '@angular/material';
import {SigninComponent} from './signin/signin.component';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {isUndefined} from 'util';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
    private username = 'Guest';
    usernameChanged = new Subject<string>();
    private signedIn = false;

    constructor(public dialog: MatDialog,
                private router: Router,
                public snackBar: MatSnackBar) {
    }

    getUsername() {
        return this.username;
    }

    isSignedIn() {
        return this.signedIn;
    }

    onSignIn(): void {
        const dialogRef = this.dialog.open(SigninComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!isUndefined(result)) {
                result.subscribe(
                    (response) => {
                        const r = JSON.parse(response.text());
                        this.username = r.Username;
                        localStorage.setItem('currentUser', response.text());
                        console.log(localStorage.getItem('currentUser'));
                        this.signedIn = true;
                        this.usernameChanged.next(this.username);
                        this.router.navigate(['/user-dashboard']);
                    },
                    (error) => {
                        console.log(error);
                        this.onSignIn();
                        this.snackBar.open('Signin Faliure!', 'close', {duration: 2000});
                    }
                );
            }
        });
    }

    onSignOut(): void {
        this.username = 'Guest';
        this.signedIn = false;
        this.usernameChanged.next(this.username);
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
