import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {MdToolbarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {ServerInteractService} from '../../common/serverInteract.service';
import {HttpModule} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

class UserExistResponse {
    constructor(exist: boolean) {
        this.exist = exist;
    }

    exist: boolean;
}

class ServerInteractServiceStub {
    private subject = new Subject();

    itExist = new UserExistResponse(true);
    itNotExist = new UserExistResponse(false);

    push(value) {
        console.log(JSON.stringify(this.itNotExist));
        const response = new Response(JSON.stringify(this.itNotExist));

        console.log(response.json());

        this.subject.next(response);
    }

    userExist(): Observable<Response> {
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
                {provide: ServerInteractService, useClass: ServerInteractServiceStub}
            ],
            declarations: [SignupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
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

    });

    it('should create', () => {
        expect(component.signupForm).toBeTruthy();
        expect(component).toBeTruthy();
    });

    it('should be valid if all field is properly filled', () => {
        const serverInteract = TestBed.get(ServerInteractService);
        serverInteract.push(`{"exist":false}`);
        expect(component.signupForm.get('firstname').valid).toBe(true);
        expect(component.signupForm.get('lastname').valid).toBe(true);
        expect(component.signupForm.get('email').valid).toBe(true);
        expect(component.signupForm.get('password').valid).toBe(true);
        expect(component.signupForm.get('repeatPassword').valid).toBe(true);
        expect(component.signupForm.get('ufid').valid).toBe(true);
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


