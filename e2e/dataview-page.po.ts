import {browser, by, element} from 'protractor';
import {SigninPage} from './signin-page.po';

export class DataViewPage {
    navigateToThePage() {
      let signinPage = new SigninPage();
      signinPage.signinAsUser();
      element(by.css('body > app-root > div > app-dashboard > div > div.lverg-right-column > button')).click();
    }
    getParagraphText() {
        return element(by.css('app-data-view h1')).getText();
    }
    getPreButton() {
        return element(by.css('.button-column button:nth-child(1)'));
    }

    getVpreButton() {
        return element(by.css('.button-column button:nth-child(2)'));
    }

    getGovrButton() {
        return element(by.css('.button-column button:nth-child(3)'));
    }
    getTotalButton() {
        return element(by.css('mat-tab-group mat-tab:nth-child(1)'));
    }

    getForsureButton() {
        return element(by.css('mat-tab-group mat-tab:nth-child(2)'));
    }

    getUncertainButton() {
        return element(by.css('mat-tab-group mat-tab:nth-child(3)'));
    }
    getCheckButton() {
        return element(by.css('.check-button'));
    }


}
