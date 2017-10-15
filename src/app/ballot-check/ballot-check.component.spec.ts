import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BallotCheckComponent } from './ballot-check.component';


describe('BallotCheckComponent', () => {
		let component: BallotCheckComponent;
  let fixture: ComponentFixture<BallotCheckComponent>;
  

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ BallotCheckComponent ], // declare the test component
  })
  .compileComponents();  // compile template and css
}));
  beforeEach(() => {
    fixture = TestBed.createComponent(BallotCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('submitted should be false',() =>{
     expect(this.submitted).toBe(false);
    });
  it('submitted should be true if it is clicked',() =>{ 
      this.onSubmit();
     expect(this.submitted).toBe(true);
    });
  it('should receive data from server',() =>{ 
      
     expect(this.cds1.valid).toBe(true);
     expect(this.cds2.valid).toBe(true);
     expect(this.cds3.valid).toBe(true);
    });
  


});