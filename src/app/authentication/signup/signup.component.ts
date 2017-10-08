import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegistrationInfoModel} from '../../common/user-info.model';
import {ServerInteractService} from '../../common/serverInteract.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    @ViewChild('registerForm') registerForm: NgForm;
    regInfo: RegistrationInfoModel = new RegistrationInfoModel();


    constructor(private serverInteract: ServerInteractService) {
    }

    ngOnInit() {
    }

    onClearClick() {

    }

    // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    //   if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
    //     return confirm('Do you want to discard the changes?');
    //   } else {
    //     return true;
    //   }
    // }

    onRegiserSubmit(form: NgForm) {
        this.regInfo = this.registerForm.value;

        // check validity;

        // send to server;
        this.serverInteract.sendSignup(this.regInfo).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );

    }
}
