import {AuthenticationService} from './authentication.service';


describe('lverg:AuthenticationService', () => {
<<<<<<< HEAD
    let authenService: AuthenticationService;
    beforeEach(() => {
        authenService = new AuthenticationService(null, null, null);
    });
    it('should initialize correctly', () => {
=======
  let authenService: AuthenticationService;
  beforeEach(() => {
    authenService = new AuthenticationService(null, null, null, null);
  });
  it('should initialize correctly', () => {
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f

    expect(authenService.getUsername()).toBe('');
    expect(authenService.isSignedIn()).toBe(false);
  });
});
