import {browser, By, element, protractor} from 'protractor';
import {SigninPage} from './signin-page.po';


describe('lverg:Signin page', () => {
    let page: SigninPage;

    beforeEach(() => {
        page = new SigninPage();

    });

    it('lverg:should popup a signin dialog', () => {
        page.navigateToThePage();
        const dialog = page.getSigninDialog();
        expect(dialog).toBeTruthy();
    });

    it('lverg:should display username input', () => {
        page.navigateToThePage();
        const usernameInput = page.getUsernameInput();
        expect(usernameInput).toBeTruthy();
    });

    it('lverg:should display password input', () => {
        page.navigateToThePage();
        const passwordInput = page.getPasswordInput();
        expect(passwordInput).toBeTruthy();
    });

    it('lverg:should have signin button', () => {
        page.navigateToThePage();
        const signinButton = page.getSigninButton();
        expect(signinButton).toBeTruthy();
    });

    it('lverg:should have cancel button', () => {
        page.navigateToThePage();
        const cancelButton = page.getCancelButton();
        expect(cancelButton).toBeTruthy();
    });

    it('lverg:should enable signin button after filled out username and password', () => {
        page.navigateToThePage();
        const signinButton = page.getSigninButton();

        expect(signinButton.isEnabled()).toBe(false);
        page.getUsernameInput().sendKeys('testUsername');
        page.getPasswordInput().sendKeys('testPassword');
        expect(signinButton.isEnabled()).toBe(true);
    });

});
