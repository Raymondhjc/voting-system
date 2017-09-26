import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegistrationInfoModel} from '../../common/user-info.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;
  regInfo: RegistrationInfoModel = new RegistrationInfoModel();


  constructor() {
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
    this.regInfo.firstName = this.registerForm.value.firstName;
    this.regInfo.lastName = this.registerForm.value.lastName;
    this.regInfo.username = this.registerForm.value.username;
    this.regInfo.password = this.registerForm.value.password;
    this.regInfo.email = this.registerForm.value.email;
    this.regInfo.ufid = this.registerForm.value.ufid;

    // check validity;

    // send to server;
  }
}
