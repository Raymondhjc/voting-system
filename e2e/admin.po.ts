import { browser, by, element } from 'protractor';

export class AdminPage {
    navigateTo() {
        return browser.get('/admin');
    }
    getFirstForm(){
        return element(by.css('#first-form-group'));
    }
    getElectionNameInput() {
        return element(by.css('input:formControlName(electionName)'));
    }


    selectStartDateCalendar(){
        return element(by.css('mat-datepicker-toggle:for(startDate)'));
    }
    selectEndDateCalendar(){
        return element(by.css('mat-datepicker-toggle:for(endDate)'));
    }
    getstartDate() {
        return element(by.css('td:aria-label(October 1, 2017)'));
    }
    getendDate() {
        return element(by.css('td:aria-label(October 2, 2017)'));
    }
}
