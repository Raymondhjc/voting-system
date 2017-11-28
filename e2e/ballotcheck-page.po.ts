import {browser, by, element} from 'protractor';
import {SigninPage} from './signin-page.po';

export class BallotCheckPage {
  navigateToThePage() {
    let signinPage = new SigninPage();
    signinPage.signinAsUser();
    element(by.css('body > app-root > div > app-dashboard > div > div.lverg-right-column > button')).click();
    element(by.css('body > app-root > div > app-data-view > div > div.lverg-check-button > button')).click();
  }

  getParagraphText() {
    return element(by.css('body > app-root > div > app-ballot-check > div > h1')).getText();
  }

  getSubmitButton() {
    return element(by.css('body > app-root > div > app-ballot-check > div > div.check > form > button'));
  }


}



