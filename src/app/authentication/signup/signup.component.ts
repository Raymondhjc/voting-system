import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import {RegistrationInfoModel} from '../../common/registration-info.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regInfo: RegistrationInfoModel = new RegistrationInfoModel('', '');


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

  }
}
