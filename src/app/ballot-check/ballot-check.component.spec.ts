import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {MatRadioModule} from '@angular/material';
import {BallotCheckComponent} from './ballot-check.component';
import {FormsModule} from '@angular/forms';
import {candidatesP, candidatesVP, candidatesGR} from './mock-votesdata';

describe('Cheng:BallotCheckComponent', () => {
    let component: BallotCheckComponent;
    let fixture: ComponentFixture<BallotCheckComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatRadioModule,
                FormsModule
            ],
            declarations: [BallotCheckComponent], // declare the test component
        })
            .compileComponents();  // compile template and css
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BallotCheckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
    // it('submitted should be false', () => {
    //     expect(component.submitted).toBe(false);
    // });
    // it('submitted should be true if it is clicked', () => {
    //     component.onSubmit();
    //     expect(component.submitted).toBe(true);
    // });
    // it('should receive data from server', () => {
    //
    //     expect(component.cds1).toBe(candidatesP);
    //     expect(component.cds2).toBe(candidatesVP);
    //     expect(component.cds3).toBe(candidatesGR);
    // });


});
