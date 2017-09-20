import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

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

}
