import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('AdminComponent', () => {
  let comp: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent
      ],
    }).compileComponents();
  }));
  fixture = TestBed.createComponent(AdminComponent);
  comp = fixture.componentInstance;

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AdminComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AdminComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
