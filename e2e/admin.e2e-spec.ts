import { AdminPage } from './admin.po';

describe('voting-system App', () => {
  let page: AdminPage;

  beforeEach(() => {
    page = new AdminPage();
  });

  it('should enable next step when correctly input election name', () => {
    page.navigateTo();
    const firstForm = page.getFirstForm();
    expect(firstForm.getAttribute('ng-valid')).toBe(false);
    page.getElectionNameInput().sendKeys('test-election-name');
    page.selectStartDateCalendar().click();
    page.getstartDate().click();
    page.selectEndDateCalendar().click();
    page.getendDate().click();
    expect(firstForm.getAttribute('ng-valid')).toBe(true);
  });
});
