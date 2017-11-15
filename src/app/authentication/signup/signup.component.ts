import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
<<<<<<< HEAD
import {RegistrationInfoModel} from '../../common/user-info.model';
=======
import {RegistrationInfoModel} from '../../common/registration-info.model';
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
import {ServerInteractService} from '../../common/serverInteract.service';
import {CustomValidators} from 'ng2-validation';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    @ViewChild('registerForm') registerForm: NgForm;
    signupForm: FormGroup;


    constructor(private serverInteract: ServerInteractService) {
    }

    ngOnInit() {
        const password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        const repeatPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.signupForm = new FormGroup({
                'firstname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
                'lastname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
                'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
                'username': new FormControl(null, [Validators.required, Validators.minLength(6),
                    Validators.maxLength(20)], [this.usernameDupCheck.bind(this)]),
                'password': password,
                'repeatPassword': repeatPassword,
                'ufid': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{8}')])
            }
        );
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

    onSubmit() {
<<<<<<< HEAD
        console.log(this.signupForm);

=======
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
        const regInfo = new RegistrationInfoModel(
            this.signupForm.value.firstname,
            this.signupForm.value.lastname,
            this.signupForm.value.username,
            this.signupForm.value.password,
            this.signupForm.value.email,
            this.signupForm.value.ufid
        );

<<<<<<< HEAD
        this.serverInteract.sendSignup(regInfo).subscribe(
=======
        this.serverInteract.postSignup(regInfo).subscribe(
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }


    usernameDupCheck(control: FormControl): Promise<any> | Observable<any> {
<<<<<<< HEAD
        return this.serverInteract.userExist(control.value).map(
=======
        return this.serverInteract.getUserExist(control.value).map(
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
            (response) => {
                const r = response.json();
                if (r.exist) {
                    return {'usernameExist': true};
                } else {
                    return;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // usernameDupCheck(control: FormControl): Promise<any> | Observable<any> {
    //     const promise = new Promise<any>((resolve, reject) => {
<<<<<<< HEAD
    //         this.serverInteract.userExist(control.value).subscribe(
=======
    //         this.serverInteract.getUserExist(control.value).subscribe(
>>>>>>> 6b01937a4481c3bafcb1f1b5ca9755dcf355460f
    //             (response) => {
    //                 const r = JSON.parse(response.text());
    //                 if (r.exist) {
    //                     resolve({'usernameExist': true});
    //                 } else {
    //                     resolve(null);
    //                 }
    //
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         );
    //
    //     });
    //     return promise;
    // }
}
