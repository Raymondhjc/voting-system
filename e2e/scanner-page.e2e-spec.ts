import { ScannerPage} from './scanner-page.po';

describe('Tg-scanner-page',() =>{
    let page: ScannerPage;

    beforeEach(() => {
        page = new ScannerPage();
    });

    it('should display Search Images',() => {
        page.navigateTo();
        expect(page.getHeadTest1()).toEqual('Search Images');
    });

    it('should display Counting the total number',() => {
        page.navigateTo();
        expect(page.getCountHeader()).toEqual('Counting the total number');
    });

    it('should display votingImage1',() => {
        page.navigateTo();
        expect(page.getImageName()).toEqual('votingImage1');
    });

    it('should only get Image2',() => {
        page.navigateTo();
        expect(page.getImageName()).toBe('votingImage1');

        //search iamge2
        let search = page.getPlaceholder();
        search.sendKeys('2');
        page.getSearchInputButton().click();

        //name of the image displays in the ImageView card
        expect(page.getImageName()).toEqual('votingImage2');

        //no other result will be found
        page.getNextPageButton().click();
        expect(page.getImageName()).toEqual('votingImage2');
        page.getPreviousPageButton().click();
        expect(page.getImageName()).toEqual('votingImage2');

    });

    it('should display the votingImage1,2,3 in the image display card',() => {
        page.navigateTo();
        expect(page.getImageName()).toBe('votingImage1');

        //search i
        let search = page.getPlaceholder();
        search.sendKeys('i');
        page.getSearchInputButton().click();

        //name of the image displays in the ImageView card
        expect(page.getImageName()).toEqual('votingImage1');

        //no other result will be found
        page.getNextPageButton().click();
        expect(page.getImageName()).toEqual('votingImage2');
        page.getNextPageButton().click();
        expect(page.getImageName()).toEqual('votingImage3');
        page.getPreviousPageButton().click();
        expect(page.getImageName()).toEqual('votingImage2');

        //reset input
        page.getResetInputButton().click();
        expect(page.getImageName()).toEqual('votingImage1');

    });

    it('should display count number',() => {
        page.navigateTo();
        expect(page.getCountNumber()).toEqual('3');
        //reset count
        page.getResetCountButton().click();
        expect(page.getCountNumber()).toEqual('0');
    });

})
