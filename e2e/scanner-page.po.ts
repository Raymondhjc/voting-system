import { browser, by, element} from 'protractor';

export class ScannerPage {
    navigateTo() {
        return browser.get('/scanner');
    }

    getHeadTest1() {
        return element(by.css( 'app-scanner-page h1')).getText();
    }

    getSearchInputButton() {
        return element(by.cssContainingText('button','Search'));
    }

    getResetInputButton() {
        return element(by.css('#resetButton1'));
    }

    getCountHeader() {
        return element(by.css('#matCardTitle1')).getText();
    }

    getImageName() {
        return element(by.id('matCardTitle2')).getText();
    }

    getPlaceholder() {
        return element(by.css('#placeholder'));
    }
   
    getLargeImage() {
        return element(by.css('#mat-card-image'));
    }

    getNextPageButton() {
        return element(by.cssContainingText('button','Next'));
    }

    getPreviousPageButton() {
        return element(by.cssContainingText('button','Previous'));
    }

    getCountNumber(){
        return element(by.css('#count')).getText();
    }

    getResetCountButton(){
        return element(by.css('#resetButton2'));
    }
}