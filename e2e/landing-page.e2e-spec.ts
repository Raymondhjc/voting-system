import {LandingPage} from './landing-page.po';
import {browser, by, element} from 'protractor';


describe('lverg:Landing page', () => {
    let page: LandingPage;

    beforeEach(() => {
        page = new LandingPage();

    });

    it('lverg:should display welcome message', () => {
        page.navigateToThePage();
        expect(page.getParagraphText()).toEqual('Welcome page');
    });

    it('lverg:should display logo button', () => {
        page.navigateToThePage();
        const logoButton = page.getLogoButton();
        expect(logoButton).toBeTruthy();
        expect(logoButton.getText()).toEqual('Voting System');
    });

    it('lverg:should display sign in button', () => {
        page.navigateToThePage();
        const signinButton = page.getSigninButton();
        expect(signinButton).toBeTruthy();
        expect(signinButton.getText()).toEqual('Sign in');
        const dialog = element(by.css('mat-dialog-container'));
        expect(dialog).toBeTruthy();
    });

    it('lverg:should display register button which direct to register', () => {
        page.navigateToThePage();
        const registerButton = page.getRegisterButton();
        expect(registerButton).toBeTruthy();
        expect(registerButton.getText()).toEqual('Register');
        registerButton.click();
        expect(browser.getCurrentUrl()).toContain('/signup');
    });
});
