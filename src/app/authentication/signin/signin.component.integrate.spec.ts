import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SigninComponent} from './signin.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule, MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {ServerInteractService} from '../../common/serverInteract.service';
import {Observable} from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

class ServerInteractServiceStub {
    response = new Observable<Response>();

    sendSignin() {
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
                BrowserAnimationsModule],
            declarations: [SigninComponent],
            providers: [
                {provide: MD_DIALOG_DATA, useValue: {}},
                {provide: MdDialogRef, useValue: {}},
                {provide: ServerInteractService, useClass: ServerInteractServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    xit('should not able to submit if username is not filled', () => {
        fixture.detectChanges();

        const signinForm = fixture.debugElement.query(By.css('.signinForm')).nativeElement;
        const username = fixture.debugElement.query(By.css('.username')).nativeElement;
        const password = fixture.debugElement.query(By.css('.password')).nativeElement;
        const signinButton = fixture.debugElement.query(By.css('.signinButton')).nativeElement;

        expect(signinForm).toBeTruthy();
        expect(signinForm.valid).toBeTruthy();
        username.value = 'testUsername';
        password.value = 'testPassword';
        username.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        fixture.detectChanges();


        // expect(signinButton.disabled).toBe('true');


    });


});

