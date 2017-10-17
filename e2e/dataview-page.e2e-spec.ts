import {DataViewPage} from './dataview-page.po';
import {browser, by, element} from 'protractor';


describe('cheng: data-view page', () => {
    let page: DataViewPage;

    beforeEach(() => {
        page = new DataViewPage();

    });

    it('should display the title of the election', () => {
        page.navigateToThePage();
        expect(page.getParagraphText()).toEqual('All the Positions');
    });

    it('should display President button', () => {
        page.navigateToThePage();
        const PreButton = page.getPreButton();
        expect(PreButton).toBeTruthy();
        PreButton.click();

    });
    it('should display VicePresident button', () => {
        page.navigateToThePage();
        const VpreButton = page.getVpreButton();
        expect(VpreButton).toBeTruthy();
        VpreButton.click();
    });
    it('should display Governor button', () => {
        page.navigateToThePage();
        const GovrButton = page.getGovrButton();
        expect(GovrButton).toBeTruthy();
        GovrButton.click();
    });
    xit('should display total number button', () => {
        page.navigateToThePage();
        const TotalButton = page.getTotalButton();
        expect(TotalButton).toBeTruthy();
        TotalButton.click();
    });
    xit('should display forsure ballots button', () => {
        page.navigateToThePage();
        const ForsureButton = page.getForsureButton();
        expect(ForsureButton).toBeTruthy();
        ForsureButton.click();
    });
    xit('should display uncertain ballots button', () => {
        page.navigateToThePage();
        const UncertainButton = page.getUncertainButton();
        expect(UncertainButton).toBeTruthy();
        UncertainButton.click();
    });
    it('should display check ballots button & change to ballot-check page', () => {
        page.navigateToThePage();
        const CheckButton = page.getCheckButton();
        expect(CheckButton).toBeTruthy();
        CheckButton.click();
        expect(browser.getCurrentUrl()).toContain('/ballot-check');

    });


});