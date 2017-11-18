import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {ScannerPageComponent} from './scanner-page.component';
import {MatCardModule} from '@angular/material';
import {MatMenuModule} from '@angular/material';

describe('TG:ScannerPageComponent', () => {
    let component: ScannerPageComponent;
    let fixture: ComponentFixture<ScannerPageComponent>;
    let comp: ScannerPageComponent;
    let de: DebugElement;
    let el: HTMLElement;
    let elb: HTMLButtonElement;
    let eli: HTMLInputElement;
    let de2:      DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatMenuModule,
                MatMenuModule
            ],
            declarations: [ScannerPageComponent]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScannerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        comp = fixture.componentInstance; // ScannerPageComponent test instance

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // testing head
    it('should display original head', () => {
        de = fixture.debugElement.query(By.css('#start'));
        // query for the head id = "start" by CSS element selector
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Start counting for your new vote!');
    });

    // testing image display part
    it('should display CardTitle', () => {
        de = fixture.debugElement.query(By.css('#matCardTitle2'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Voting Type: food');
    });

    /*it('should display CardsubTitle', () => {
        de = fixture.debugElement.query(By.css('#matCardsubTitle'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Name of image: Image1');
    });*/

    it('should disable previousPage button at begin', () => {
        de = fixture.debugElement.query(By.css('#previousButton'));
        elb = de.nativeElement;
        expect(elb.disabled).toBeTruthy('previousPage button is disabled');

    });

    it('should be able nextPage button at begin', () => {
        de = fixture.debugElement.query(By.css('#nextButton'));
        elb = de.nativeElement;
        expect(elb).toBeTruthy('nextPage button is able');
    });

    it('nextButton should be disabled when reach the last image', () =>{
        de = fixture.debugElement.query(By.css('#nextButton'));
        elb = de.nativeElement;
    
        de2 = fixture.debugElement.query(By.css('#count'));
        el = de2.nativeElement;
    
        // get the number of images
        let imageCount = parseInt(el.textContent, 10);
    
        // simulate click of next page button multiple times
        for(var i = 0; i < imageCount; i++) {
          de.triggerEventHandler('click', null);
        }
    
        // when it reaches the last image, it should disable the nextButton
        expect(elb.disabled ).toBeTruthy("nextPage button is disabled");
    
      })

    // testing leftside bar
    it('should display head2', () => {
        de = fixture.debugElement.query(By.css('h2'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Find the larger view of the Image you want');
    });

    /*it('should display input value', () => {
        de = fixture.debugElement.query(By.css('#placeholder'));
        eli = de.nativeElement;
        fixture.detectChanges();
        expect(eli.value).toEqual('Image1');
    });*/

    it('should be able search button at begin', () => {
        de = fixture.debugElement.query(By.css('#searchButton'));
        elb = de.nativeElement;
        expect(elb).toBeTruthy('search button is able');
    });

    // testing count part
    it('should display CardTitle', () => {
        de = fixture.debugElement.query(By.css('#matCardTitle1'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Counting the total number');
    });

    it('should be able count button at begin', () => {
        de = fixture.debugElement.query(By.css('#countButton'));
        elb = de.nativeElement;
        expect(elb).toBeTruthy('count button is able');
    });

   /* it('should be able cancel button at begin', () => {
        de = fixture.debugElement.query(By.css('#cancelButton'));
        elb = de.nativeElement;
        expect(elb).toBeTruthy('cancel button is able');
    }); */

    // testing navbar
    it('should be able selectType button at begin', () => {
        de = fixture.debugElement.query(By.css('#votingType'));
        elb = de.nativeElement;
        expect(elb).toBeTruthy('votingType button is able');
    });


});
