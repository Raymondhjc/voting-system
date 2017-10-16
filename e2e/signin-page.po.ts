import {browser, by, element} from 'protractor';
import {LandingPage} from './landing-page.po';

export class SigninPage {
    private landingpage = new LandingPage();

    navigateToThePage() {
        this.landingpage.navigateToThePage();
        this.landingpage.getSigninButton().click();
    }

    getSigninDialog() {
        return element(by.css('mat-dialog-container'));
    }

    getUsernameInput() {
        return element(by.css('#mat-input-0'));
    }

    getPasswordInput() {
        return element(by.css('#mat-input-1'));
    }

    getSigninButton() {
        return element(by.css('#cdk-overlay-0 > mat-dialog-container > app-signin > form > ' +
            'div > button.signinButton.mat-raised-button.mat-primary'));
    }

    getCancelButton() {
        return element(by.css('#cdk-overlay-0 > mat-dialog-container > app-signin > form > ' +
            'div > button.cancelButton.mat-raised-button.mat-warn'));
    }
}
