import {browser, by, element} from 'protractor';
import {LandingPage} from './landing-page.po';

export class SigninPage {
    private landingpage = new LandingPage();

    navigateToThePage() {
        this.landingpage.navigateToThePage();
        this.landingpage.getSigninButton().click();
    }

    getSigninDialog() {
        return element(by.css('md-dialog-container'));
    }

    getUsernameInput() {
        return element(by.css('#md-input-0'));
    }

    getPasswordInput() {
        return element(by.css('#md-input-1'));
    }

    getSigninButton() {
        return element(by.css('#cdk-overlay-0 > md-dialog-container > app-signin > form > ' +
            'div > button.signinButton.mat-raised-button.mat-primary'));
    }

    getCancelButton() {
        return element(by.css('#cdk-overlay-0 > md-dialog-container > app-signin > form > ' +
            'div > button.cancelButton.mat-raised-button.mat-warn'));
    }
}
