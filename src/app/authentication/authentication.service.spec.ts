import {AuthenticationService} from './authentication.service';


describe('AuthenticationService', () => {
    let authenService: AuthenticationService;
    beforeEach(() => {
        authenService = new AuthenticationService(null, null, null);
    });
    it('should initialize correctly', () => {

        expect(authenService.getUsername()).toBe('Guest');
        expect(authenService.isSignedIn()).toBe(false);
    });
});
