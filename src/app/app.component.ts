import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Voting System';

  ngOnInit() {
    // TODO: check signInStatus from server here!!! Otherwise, if you refresh browser, then signInStatus will loss.
  }
}
