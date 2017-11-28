import { ServerInteractService } from '../common/serverInteract.service';
import { ScannerDownloadService } from './Scanner-web.service';
import {async, ComponentFixture,inject, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {ScannerPageComponent} from './scanner-page.component';
import {MatCardModule} from '@angular/material';
import {MatMenuModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

class ScannerDownloadServiceStub{

}

class ServerInteractServiceStub{

}


describe('TG:ScannerPageComponent', () => {
    let component: ScannerPageComponent;
    let fixture: ComponentFixture<ScannerPageComponent>;
    // let comp: ScannerPageComponent;
    // let de: DebugElement;
    // let el: HTMLElement;
    // let elb: HTMLButtonElement;
    // let eli: HTMLInputElement;
    // let de2: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatMenuModule,
                MatTableModule
            ],
            // providers:[ScannerDownloadService],
            // providers:[{provide: ScannerDownloadService, useClass: ScannerDownloadServiceStub}],
            providers:[{provide: ServerInteractService, useClass: ServerInteractServiceStub}],
            declarations: [ScannerPageComponent]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScannerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // comp = fixture.componentInstance; // ScannerPageComponent test instance

    });

    it('should create', () => {
        const service=TestBed.get(ScannerDownloadService);
        // expect(component).toBeTruthy();
    });

    // testing search part
//     xit('should display original head', () => {
//         de = fixture.debugElement.query(By.css('h1'));
//         // query for the head id = "start" by CSS element selector
//         el = de.nativeElement;
//         fixture.detectChanges();
//         expect(el.textContent).toContain('Search Images');
//     });


//     xit('should be able search button at begin', () => {
//         de = fixture.debugElement.query(By.css('#searchButton'));
//         elb = de.nativeElement;
//         expect(elb).toBeTruthy('search button is able');
//     });

//     xit('should be able reset button at begin', () => {
//         de = fixture.debugElement.query(By.css('#resetButton1'));
//         elb = de.nativeElement;
//         expect(elb).toBeTruthy('reset button is able');
//     });


//     // testing image display part
//     xit('should display CardTitle', () => {
//         de = fixture.debugElement.query(By.css('#matCardTitle2'));
//         el = de.nativeElement;
//         fixture.detectChanges();
//         expect(el.textContent).toContain('Voting Type: food');
//     });


//     xit('should disable previousPage button at begin', () => {
//         de = fixture.debugElement.query(By.css('#previousButton'));
//         elb = de.nativeElement;
//         expect(elb.disabled).toBeTruthy('previousPage button is disabled');

//     });

//     xit('should be able nextPage button at begin', () => {
//         de = fixture.debugElement.query(By.css('#nextButton'));
//         elb = de.nativeElement;
//         expect(elb).toBeTruthy('nextPage button is able');
//     });

//     xit('nextButton should be disabled when reach the last image', () =>{
//         de = fixture.debugElement.query(By.css('#nextButton'));
//         elb = de.nativeElement;
    
//         de2 = fixture.debugElement.query(By.css('#count'));
//         el = de2.nativeElement;
    
//         // get the number of images
//         let imageCount = parseInt(el.textContent, 10);
    
//         // simulate click of next page button multiple times
//         for(var i = 0; i < imageCount; i++) {
//           de.triggerEventHandler('click', null);
//         }
    
//         // when it reaches the last image, it should disable the nextButton
//         expect(elb.disabled ).toBeTruthy("nextPage button is disabled");
    
//       })

//     // testing leftside bar


//     // testing count part
//     xit('should display CardTitle', () => {
//         de = fixture.debugElement.query(By.css('#matCardTitle1'));
//         el = de.nativeElement;
//         fixture.detectChanges();
//         expect(el.textContent).toContain('Counting the total number');
//     });

//     xit('should be able count button at begin', () => {
//         de = fixture.debugElement.query(By.css('#countButton'));
//         elb = de.nativeElement;
//         expect(elb).toBeTruthy('count button is able');
//     });

//    /* it('should be able cancel button at begin', () => {
//         de = fixture.debugElement.query(By.css('#cancelButton'));
//         elb = de.nativeElement;
//         expect(elb).toBeTruthy('cancel button is able');
//     }); */

//     // testing navbar
//     xit('should be able selectType button at begin', () => {
//         de = fixture.debugElement.query(By.css('#votingType'));
//         elb = de.nativeElement;
//         expect(elb).toBeTruthy('votingType button is able');
//     });


});
