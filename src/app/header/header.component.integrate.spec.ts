import {HeaderComponent} from './header.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MdMenuModule} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subject} from 'rxjs/Subject';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

class AuthenticationServiceStub {
    set loginStatus(value: boolean) {
        this._loginStatus = value;
    }

    private _loginStatus = false;
    private subject = new Subject();


    getUsername() {
        return 'gotUsername';
    }

    pushUsername(value: string) {
        this.subject.next(value);
    }

    isSignedIn() {
        return this._loginStatus;
    }

    get usernameChanged() {
        return this.subject.asObservable();
    }
}


describe('lverg:HeaderComponent', () => {

    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MdMenuModule,
                RouterTestingModule],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceStub}
            ],
            declarations: [HeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show logo and click will redirect to welcome page', () => {
        const authenService = TestBed.get(AuthenticationService);
        authenService.loginStatus = false;
        fixture.detectChanges();

        const router = TestBed.get(Router);
        const spy = spyOn(router, 'navigate');

        const button = fixture.debugElement.query(By.css('.lverg-logo'));
        expect(button).toBeTruthy();

        button.triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledWith(['/']);
    });

    it('should display signin button if not logged in', () => {
        const authenService = TestBed.get(AuthenticationService);
        authenService.loginStatus = false;
        fixture.detectChanges();

        const de = fixture.debugElement.query(By.css('.lverg-signin'));
        expect(de).toBeTruthy();
        const el: HTMLElement = de.nativeElement;
        expect(el.innerText).toContain('Sign in');
    });

    it('should display register button if not logged in', () => {
        const authenService = TestBed.get(AuthenticationService);
        authenService.loginStatus = false;
        fixture.detectChanges();

        const de = fixture.debugElement.query(By.css('.lverg-signup'));
        expect(de).toBeTruthy();
        const el: HTMLElement = de.nativeElement;
        expect(el.innerText).toContain('Register');
    });

    it('should display correct name after logged in', () => {
        const authenService = TestBed.get(AuthenticationService);
        authenService.loginStatus = true;
        fixture.detectChanges();
        authenService.pushUsername('username');
        fixture.detectChanges();

        expect(component.signInStatus).toBe(true);
        const de = fixture.debugElement.query(By.css('.lverg-username'));
        expect(de).toBeTruthy();
        const el: HTMLElement = de.nativeElement;

        expect(el.innerText).toContain('username');
    });
});
