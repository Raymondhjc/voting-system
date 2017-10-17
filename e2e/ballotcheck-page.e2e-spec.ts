import {BallotCheckPage} from './ballotcheck-page.po';
import {browser, by, element} from 'protractor';

describe('cheng: ballot-check page', () => {
    let page: BallotCheckPage;

    beforeEach(() => {
        page = new BallotCheckPage();

    });

    it('should display the title of the election', () => {
        page.navigateToThePage();
        expect(page.getParagraphText()).toEqual('ballot-check');
    });

    it('should display Submit button', () => {
        page.navigateToThePage();
        const SubButton = page.getSubmitButton();
        expect(SubButton).toBeTruthy();
        SubButton.click();

    });

});