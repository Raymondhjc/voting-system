import { browser, by, element } from 'protractor';
import { SigninPage } from './signin-page.po'

export class AdminPage {
    navigateTo() {
        let signinPage = new SigninPage();
        signinPage.signinAsAdmin();
        element(by.css('body > app-root > div > app-dashboard > div > div.lverg-right-column > button:nth-child(2)')).click();
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

    getCountInput() {
        return element(by.css('input[formControlName="count"]'));
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
    submitButton(){
        return element(by.css('#submitBtn'));
    }
    navigateToTable() {
        return browser.get('/admin');
    }

    // // for sign in
    // getSigninDialogButton() {
    //     return element(by.css('.lverg-header button:nth-child(3)'));
    // }

    // getUsernameInput() {
    //     //return element(by.css('#cdk-overlay-1 > mat-dialog-container > app-signin > form > p > mat-form-fiel > #mat-input-0'));
    //     return element(by.css('.username'))
    // }

    // getPasswordInput() {
    //     //return element(by.css('#cdk-overlay-1 > mat-dialog-container > app-signin > form > p > mat-form-fiel > #mat-input-1'));
    //     return element(by.css('.password'))
    // }

    // getSigninButton() {
    //     return element(by.css('.signinButton'));
    // }

}
