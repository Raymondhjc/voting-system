import { browser, by, element } from 'protractor';

export class AdminPage {
    navigateTo() {
        return browser.get('/admin/new-election');
    }
    getAddElectionNavBtu() {
        return element(by.css('lverg-sidenav button:nth-child(2)'))
    }
    getFirstForm() {
        return element(by.css('#firstFormGroup'));
    }

    getElectionNameInput() {
        return element(by.css('input[formControlName="electionName"]'));
    }

    getSecondForm() {
        return element(by.css('#secondFormGroup'));
    }


    startDateCalendar() {
        return element(by.css('#startDateToggle'));
    }
    endDateCalendar() {
        return element(by.css('#endDateToggle'));
    }
    getstartDate() {
        return element(by.css('td:nth-child(3)'));
    }
    getendDate() {
        return element(by.css('td:nth-child(5)'));
    }

    backDrop() {
        return element(by.css('.cdk-overlay-backdrop'));
    }

    stepperButton(index) {
        return element(by.css('.stepper-button:nth-child(' + index + ')'));
    }
    expansionPanel() {
        return element(by.css('mat-expansion-panel-header'));
    }
    optionType(type) {
        return element(by.css('mat-expansion-panel mat-radio-button:nth-child(' + type + ')'));
    }
    addSectionButton() {
        return element(by.css('mat-expansion-panel button'));;
    }
    sectionName(index) {
        return element(by.css('.section-card:nth-child(' + index + ') #sectionName'));;
    }
    addOptionButton(index) {
        return element(by.css('.section-card:nth-child(' + index + ') #addOptionBtn'));;
    }
    optionLabel(index, optionIndex) {
        return element(by.css('.section-card:nth-child(' + index + ') .option-label-container:nth-child(' + optionIndex + ') input'));;
    }
}
