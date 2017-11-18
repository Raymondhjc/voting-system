import {AdminPage} from './admin.po';
import {browser} from 'protractor';

describe('hjc-voting-system App', () => {
  let page: AdminPage;

  beforeEach(() => {
    page = new AdminPage();
  });

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
    page.startDateCalendar().click();
    page.getstartDate().click();
    browser.sleep(1000);

    page.endDateCalendar().click();
    page.getendDate().click();
    browser.sleep(1000);
    expect(firstForm.getAttribute('class')).toContain('ng-valid');
  });

  it('should block invalid input of second form', () => {
    page.navigateTo();
    const firstForm = page.getSecondForm();
    expect(firstForm.getAttribute('class')).toContain('ng-invalid');
  });

  it('should generate a new election after valid inputs', () => {
    page.navigateTo();
    // valid inputs of the first form
    const firstForm = page.getFirstForm();
    page.getElectionNameInput().sendKeys('test election name');
    page.startDateCalendar().click();
    page.getstartDate().click();
    browser.sleep(500);
    page.endDateCalendar().click();
    page.getendDate().click();
    browser.sleep(500);

    // navigate to the second step
    page.stepperButton(1).click();
    browser.sleep(1000);
    /**
     * start configure the second step
     * add first section
     */
    page.expansionPanel().click();
    page.optionType(1).click();
    browser.sleep(500);
    page.addSectionButton().click();
    page.sectionName(1).sendKeys('1.New Section 1');
    page.addOptionButton(1).click();
    page.optionLabel(1, 1).sendKeys('Option_1_of_Section_1');

    page.addOptionButton(1).click();
    page.optionLabel(1, 2).sendKeys('Option_2_of_Section_1');
    browser.sleep(500);

    // add another section, multichoice
    page.expansionPanel().click();
    page.optionType(2).click();
    browser.sleep(500);
    page.addSectionButton().click();
    page.sectionName(2).sendKeys('2.Sample Section Name');
    page.addOptionButton(2).click();
    page.optionLabel(2, 1).sendKeys('Sample option 1');

    page.addOptionButton(2).click();
    page.optionLabel(2, 2).sendKeys('Sample option 2');
    browser.sleep(2000);

    // navigate to the third step
    page.stepperButton(2).click();
    browser.sleep(8000);
  });
});
