import { ScannerPage} from './scanner-page.po';

describe('Tg-scanner-page',() =>{
    let page: ScannerPage;

    beforeEach(() => {
        page = new ScannerPage();
    });

    it('should display Start counting for your new vote!',() => {
        page.navigateTo();
        expect(page.getHeadTest1()).toEqual('Start counting for your new vote!');
    });

    it('should display Find the larger view of the Image you want',() => {
        page.navigateTo();
        expect(page.getHeadTest2()).toEqual('Find the larger view of the Image you want');
    });
    
    it('Name of Image you want a large view',() => {
        page.navigateTo();
        expect(page.getPlaceHolderHint()).toEqual('Name of Image you want a large view');
    });
   
    
    //browser.ignoreSynchronization = true;
})