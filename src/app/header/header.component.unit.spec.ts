import {AuthenticationService} from '../authentication/authentication.service';
import {HeaderComponent} from './header.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {Router} from '@angular/router';
<<<<<<< HEAD

describe('lverg:HeaderComponent', () => {
    let authenService: AuthenticationService;
    let component: HeaderComponent;
    beforeEach(() => {
        authenService = new AuthenticationService(null, null, null);
        component = new HeaderComponent(authenService, null);
    });

    it('Should never have null username', () => {
        const username = 'username';
        spyOn(authenService, 'getUsername').and.callFake(() => {
            return username;
        });
        spyOn(authenService, 'isSignedIn').and.callFake(() => {
            return false;
        });
        spyOn(authenService, 'usernameChanged')
            .and.returnValue(Observable.from([username]));

        component.ngOnInit();

        expect(component.username).toBe(username);
        expect(component.signInStatus).toBe(false);
    });
=======
import {UserStatusModel} from '../common/user-status.model';

describe('lverg:HeaderComponent', () => {
  let authenService: AuthenticationService;
  let component: HeaderComponent;
  beforeEach(() => {
    authenService = new AuthenticationService(null, null, null, null);
    component = new HeaderComponent(authenService, null);
  });

  it('Should never have null username', () => {
    const username = 'username';
    const userStatus = new UserStatusModel('testFirstname', 'testLastname', 'testUsername', 'test@email.com', '12345678', 'user')

    spyOn(authenService, 'getUsername').and.callFake(() => {
      return username;
    });
    spyOn(authenService, 'isSignedIn').and.callFake(() => {
      return false;
    });
    spyOn(authenService, 'userStatusChanged')
      .and.returnValue(Observable.from([userStatus]));

    component.ngOnInit();

    expect(component.username).toBe(username);
    expect(component.signInStatus).toBe(false);
  });
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f

});
