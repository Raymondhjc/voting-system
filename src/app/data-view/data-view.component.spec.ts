import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { DataViewComponent } from './data-view.component';


describe('DataViewComponent', () => {
		let component: DataViewComponent;
  let fixture: ComponentFixture<DataViewComponent>;
  

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ DataViewComponent ], // declare the test component
  })
  .compileComponents();  // compile template and css
}));
  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});