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
        return element(by.css('#startDateToggle'));
    }
    selectEndDateCalendar() {
        return element(by.css('#endDateToggle'));
    }
    getstartDate() {
        return element(by.css('td:nth-child(5)'));
    }
    getendDate() {
        return element(by.css('td:last-child'));
    }

    backDrop(){
        return element(by.css('.cdk-overlay-backdrop'));
    }
}
