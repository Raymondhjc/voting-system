import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './user-dashboard.component';
import {MatToolbarModule, MatExpansionModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

class AuthenticationServiceStub {
    usernameChanged: Observable<any> = Observable.empty();

    isSignedIn() {
        return true;
    }

    getUsername() {
        return 'testUsername';
    }
}


describe('lverg:DashboardComponent', () => {
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
});
