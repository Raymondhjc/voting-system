import {browser, by, element} from 'protractor';

export class BallotCheckPage {
    navigateToThePage() {
        return browser.get('/ballot-check');
    }
    getParagraphText() {
        return element(by.css('app-ballot-check h1')).getText();
    }
    getSubmitButton() {
        return element(by.css('.submit'));
    }


    }
    


