import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {MatTableModule, MatButtonModule, MatListModule, MatTabsModule} from '@angular/material';
import {DataViewComponent} from './data-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('Cheng:DataViewComponent', () => {
    let component: DataViewComponent;
    let fixture: ComponentFixture<DataViewComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatButtonModule,
                MatListModule,
                MatTabsModule,
                BrowserAnimationsModule
            ],
            declarations: [DataViewComponent], // declare the test component
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