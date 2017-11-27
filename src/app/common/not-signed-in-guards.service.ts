// If not signed in, several component is not able to access.
// Guard is used in router.

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotSignedInGuardsService implements CanActivate, CanActivateChild {

  constructor(private authenService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenService.isSignedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.authenService.onSignIn();
      return false;
    }

    // There is no need to check with server for page guard

    // return this.authenService.isAuthenticated().then(
    //   (authenticated: boolean) => {
    //     if (authenticated) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/']);
    //       this.authenService.onSignIn();
    //       // console.log('executed!');
    //     }
    //   }
    // );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
