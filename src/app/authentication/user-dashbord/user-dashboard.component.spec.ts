import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './user-dashboard.component';
import {MatToolbarModule, MatExpansionModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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

}


describe('lverg:DashboardComponent', () => {
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
});
