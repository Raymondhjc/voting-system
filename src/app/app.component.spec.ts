import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MdMenuModule, MdSidenavModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from './authentication/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

class AuthenticationServiceStub {
}


describe('lverg:AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent
            ],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceStub}
            ],
            imports: [
                MdSidenavModule,
                RouterTestingModule,
                MdMenuModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'Voting System'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Voting System');
    }));
});
