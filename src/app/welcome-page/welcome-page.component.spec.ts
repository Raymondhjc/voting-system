import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomePageComponent} from './welcome-page.component';
import {MatCardModule} from '@angular/material';

describe('lverg:WelcomePageComponent', () => {
    let component: WelcomePageComponent;
    let fixture: ComponentFixture<WelcomePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule],
            declarations: [WelcomePageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });


});
