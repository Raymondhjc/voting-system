import { TestBed, async } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { newElectionComponent } from './new-election/new-election.component';
import { sectionComponent } from './new-election/section.component';
//
import {
  MatInputModule,
  MatSortModule,
  MatButtonModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatListModule,
  MatExpansionModule,
  MatRadioModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AdminComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        /** Election table modules */
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatPaginatorModule,
        /** Create new election modules */
        MatStepperModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatListModule,
        MatExpansionModule,
        MatRadioModule
        
    ],
      declarations: [
        AdminComponent,
        newElectionComponent,
        sectionComponent
      ],
      providers: [
        AdminService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AdminComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should use the data from admin component service`, async(() => {
    const fixture = TestBed.createComponent(AdminComponent);
    const app = fixture.debugElement.componentInstance;
    let adminService = fixture.debugElement.injector.get(AdminService);
    fixture.detectChanges();
    expect(adminService.data).toEqual(app.elecTable.rawData);
  }));
});
