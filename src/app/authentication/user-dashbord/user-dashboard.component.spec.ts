import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './user-dashboard.component';
<<<<<<< HEAD
import {MatToolbarModule, MatExpansionModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
=======
import {MatToolbarModule, MatExpansionModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
<<<<<<< HEAD

class AuthenticationServiceStub {
    usernameChanged: Observable<any> = Observable.empty();

    isSignedIn() {
        return true;
    }

    getUsername() {
        return 'testUsername';
    }
=======
import {ServerInteractService} from '../../common/serverInteract.service';
import {UserStatusModel} from '../../common/user-status.model';

class AuthenticationServiceStub {
  userStatusChanged: Observable<any> = Observable.empty();
  userStatus: UserStatusModel = new UserStatusModel('testFirstname', 'testLastname', 'testUsername', 'test@email.com', '12345678', 'user');

  isSignedIn() {
    return true;
  }

  getUsername() {
    return 'testUsername';
  }

}

class ServerInteractServiceStub {

>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
}


describe('lverg:DashboardComponent', () => {
<<<<<<< HEAD
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatToolbarModule,
                MatExpansionModule,
                FormsModule,
                BrowserAnimationsModule],
            declarations: [DashboardComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
=======
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule],
      declarations: [DashboardComponent],
      providers: [
        {provide: AuthenticationService, useClass: AuthenticationServiceStub},
        {provide: ServerInteractService, useClass: ServerInteractServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
});
