import { AdminPage } from './admin.po';
import { browser } from 'protractor'

fdescribe('hjc-voting-system App', () => {
  let page: AdminPage;

  beforeEach(() => {
    page = new AdminPage();
  });

  // it('should nav to add election',()=>{
  //   page.navigateTo();
  //   page.getAddElectionNavBtu().click();
  //   expect(page.getFirstForm()).toBeTruthy();
  // });

  it('should have the first form', () => {
    page.navigateTo();
    const firstForm = page.getFirstForm();
    expect(firstForm).toBeTruthy();
  });

  it('should block invalid input of first form', () => {
    page.navigateTo();
    const firstForm = page.getFirstForm();
    expect(firstForm.getAttribute('class')).toContain('ng-invalid');
    page.getElectionNameInput().sendKeys('test election name');
    page.selectStartDateCalendar().click();
    page.getstartDate().click();
    browser.sleep(1000);

    page.selectEndDateCalendar().click();
    page.getendDate().click();
    browser.sleep(1000);
    expect(firstForm.getAttribute('class')).toContain('ng-valid');
  });
  
  it('should block invalid input of second form', () => {
    page.navigateTo();
    const firstForm = page.getSecondForm();
    expect(firstForm.getAttribute('class')).toContain('ng-invalid');
  });
});
