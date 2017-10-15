import {browser, by, element} from 'protractor';

export class LandingPage {
    navigateToThePage() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }

    getLogoButton() {
        return element(by.css('.lverg-header button:nth-child(1)'));
    }

    getSigninButton() {
        return element(by.css('.lverg-header button:nth-child(3)'));
    }

    getRegisterButton() {
        return element(by.css('.lverg-header button:nth-child(4)'));
    }


}
