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

      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
