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
    getUserDashboardUsername() {
        return element(by.css('body > app-root > div > app-dashboard > div > div.lverg-left-column > mat-toolbar > div > mat-toolbar-row > b'));
    }

    getCancelButton() {
        return element(by.css('#cdk-overlay-0 > mat-dialog-container > app-signin > form > ' +
            'div > button.cancelButton.mat-raised-button.mat-warn'));
    }

  signinAsUser(){
    this.navigateToThePage();
    const signinButton = this.getSigninButton();
    browser.sleep(500)
    this.getUsernameInput().sendKeys('testUsername');
    browser.sleep(200)
    this.getPasswordInput().sendKeys('testPassword');
    signinButton.click();
    browser.sleep(1000)
  }

  signinAsAdmin(){
    this.navigateToThePage();
    const signinButton = this.getSigninButton();
    browser.sleep(500)
    this.getUsernameInput().sendKeys('admin');
    browser.sleep(200)
    this.getPasswordInput().sendKeys('testPassword');
    signinButton.click();
    browser.sleep(1000)
  }
}
