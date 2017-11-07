import { browser, by, element} from 'protractor';

export class ScannerPage {
    navigateTo() {
        return browser.get('/scanner');
    }

    getHeadTest1() {
        return element(by.css( 'app-scanner-page h1')).getText();
    }

    getHeadTest2() {
        return element(by.css( 'app-scanner-page  h2')).getText();
    }

    getPlaceHolderHint() {
        return element(by.css( '#placeHolderHint')).getText();
    }

    getSearchInputButton() {
        return element(by.cssContainingText('button','Search'));
    }

    getResetInputButton() {
        return element(by.cssContainingText('button','Reset'));
    }
   
}