import {LandingPage} from './landing-page.po';


describe('lverg:Landing page', () => {
    let page: LandingPage;

    beforeEach(() => {
        page = new LandingPage();

    });

    it('lverg:should display welcome message', () => {
        page.navigateToThePage();
        expect(page.getParagraphText()).toEqual('Welcome page');
    });
});
