import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SignedInAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authenService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenService.isSignedIn()) {
      return true;
    } else {
      this.router.navigate(['/user-dashboard']);
      // TODO: give information say "You are ready signed in!"
      return false;
    }
    // There is no need to check with server for page guard
    // return this.authenService.isAuthenticated().then(
    //   (authenticated: boolean) => {
    //     if (!authenticated) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/user-dashboard']);
    //     }
    //   }
    // );

  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
