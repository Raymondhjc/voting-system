import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SigninComponent} from './signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {ServerInteractService} from '../../common/serverInteract.service';
import {Observable} from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

class ServerInteractServiceStub {
    response = new Observable<Response>();

  postSignin() {
        return this.response;
    }

}

describe('lverg:SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule,
                MatInputModule,
                MatDialogModule,
                ReactiveFormsModule,
                BrowserAnimationsModule],
            declarations: [SigninComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                {provide: ServerInteractService, useClass: ServerInteractServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should be valid if username and password are properly filled.', () => {

        component.signinForm.setValue({
            'username': 'theusername',
            'password': 'thepassword'
        });

        expect(component.signinForm.valid).toBe(true);
    });

    it('should be invalid if username is not filled', () => {

        component.signinForm.patchValue({
            'password': 'thepassword'
        });

        expect(component.signinForm.valid).toBe(false);
    });

    it('should be invalid if password is not filled', () => {

        component.signinForm.patchValue({
            'username': 'theusername',
        });

        expect(component.signinForm.valid).toBe(false);
    });

});

