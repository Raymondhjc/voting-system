import {TestBed, async} from '@angular/core/testing';
import {AdminComponent} from './admin.component';
import {AdminService} from './admin.service';
import {AdminModule} from './admin.module';

describe('AdminComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AdminModule
            ],
            declarations: [],
            providers: [
                AdminService
            ]
        }).compileComponents();
    }));
    // it('should create the admin table app', async(() => {
    //     const fixture = TestBed.createComponent(AdminComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app).toBeTruthy();
    // }));
    // it(`should import the data from admin component service`, async(() => {
    //     const fixture = TestBed.createComponent(AdminComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     const adminService = fixture.debugElement.injector.get(AdminService);
    //     fixture.detectChanges();
    //     expect(adminService.data).toEqual(app.elecTable.rawData);
    // }));
});
