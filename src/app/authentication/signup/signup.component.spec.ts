import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {MdToolbarModule} from '@angular/material';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ServerInteractService} from '../../common/serverInteract.service';
import {HttpModule, ResponseOptions, XHRBackend} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {MockBackend} from '@angular/http/testing';

class ServerInteractServiceStub {
    private subject = new Subject();
    notExist = {exist: false};
    exist = {exist: true};

    emitNotExist() {
        const response = new Response(new ResponseOptions({
            body: JSON.stringify(this.notExist)
        }));
        this.subject.next(response);
    }

    emitExist() {
        const response = new Response(new ResponseOptions({
            body: JSON.stringify(this.exist)
        }));
        this.subject.next(response);
    }

    userExist(s: string): Observable<Response> {

        const response = new Response(new ResponseOptions({
            body: JSON.stringify(this.notExist)
        }));
        this.subject.next(response);

        return this.subject.asObservable();
    }
}


describe('lverg:SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MdToolbarModule,
                ReactiveFormsModule,
                HttpModule],
            providers: [
                {provide: ServerInteractService, useClass: ServerInteractServiceStub},
                {provide: XHRBackend, useClass: MockBackend}
            ],
            declarations: [SignupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
        component.signupForm.setValue({
            'firstname': 'YOULYU',
            'lastname': 'Zhang',
            'email': 'lvergergsk@outlook.com',
            'username': 'lvergergsk',
            'password': 'thisIsAPassword',
            'repeatPassword': 'thisIsAPassword',
            'ufid': '12345678'
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component.signupForm).toBeTruthy();
        expect(component).toBeTruthy();
    });

    it('should be valid if all field is properly filled', async(() => {
        inject([XHRBackend], (mockBackend) => {
            fixture.detectChanges();

            const mockResponse = {
                exist: false
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            fixture.whenStable().then(() => {
                expect(component.signupForm.valid).toBe(true);
            });
        });
    }));

    it('should return null if username is valid', () => {
        inject([XHRBackend], (mockBackend) => {
            const interact = TestBed.get(ServerInteractService);
            const username = new FormControl();

            const valid = component.usernameDupCheck(username);

            interact.emitNotExist();
            expect(valid).toBeNull();

            interact.emitExist();
            expect(valid).not.toBeNull();
        });
    });

    it('should be invalid if first name is empty', () => {
        component.signupForm.patchValue({
            'firstname': ''
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if first name is too long', () => {
        component.signupForm.patchValue({
            'firstname': 'this it tooooooooooooooooooooooooooooooooooo long'
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if first name is empty', () => {
        component.signupForm.patchValue({
            'lastname': ''
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if last name is too long', () => {
        component.signupForm.patchValue({
            'lastname': 'this it tooooooooooooooooooooooooooooooooooo long'
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if email is invalid', () => {
        component.signupForm.patchValue({
            'email': 'abc'
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if password is too short', () => {
        component.signupForm.patchValue({
            'password': 'abc',
            'repeatPassword': 'abc'
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if repeat password is different', () => {
        component.signupForm.patchValue({
            'password': 'abc',
            'repeatPassword': 'def'
        });
        expect(component.signupForm.valid).toBe(false);
    });

    it('should be invalid if ufid is invalid', () => {
        component.signupForm.patchValue({
            'ufid': '123'
        });
        expect(component.signupForm.valid).toBe(false);
    });
});


