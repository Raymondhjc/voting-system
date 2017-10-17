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


    selectStartDateCalendar() {
        return element(by.css('#startDateToggle > button'));
    }
    selectEndDateCalendar() {
        return element(by.css('#endDateToggle > button'));
    }
    getstartDate() {
        return element(by.css('td:aria-label(October 1, 2017)'));
    }
    getendDate() {
        return element(by.css('td:aria-label(October 2, 2017)'));
    }
}
