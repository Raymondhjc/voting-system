// This component is in charge of signup function.
// Including building form, check validity of information and generate data to send.

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {RegistrationInfoModel} from '../../common/registration-info.model';
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

  // When initilize, the form group is initialized.
  ngOnInit() {
    // Password input and repeat password input must be same.
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

  // When clear is clicked.
  onClearClick() {

  }

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
  //     return confirm('Do you want to discard the changes?');
  //   } else {
  //     return true;
  //   }
  // }

  // When submit is clicked, regInfo is built by information from form.
  // Then use server interact component to interact with backend.
  onSubmit() {
    const regInfo = new RegistrationInfoModel(
      this.signupForm.value.firstname,
      this.signupForm.value.lastname,
      this.signupForm.value.username,
      this.signupForm.value.password,
      this.signupForm.value.email,
      this.signupForm.value.ufid
    );

    // Sending request.
    this.serverInteract.postSignup(regInfo).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }


  // When username field is filled, it request backend to check whether the username is used.
  usernameDupCheck(control: FormControl): Promise<any> | Observable<any> {
    return this.serverInteract.getUserExist(control.value).map(
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
}
