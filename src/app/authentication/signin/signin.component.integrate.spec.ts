import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SigninComponent} from './signin.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule, MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {ServerInteractService} from '../../common/serverInteract.service';
import {Observable} from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});

