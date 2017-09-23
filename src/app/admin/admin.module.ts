import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AdminComponent,
    RouterModule
  ],
  imports: [
    BrowserModule,
    Observable,
    BehaviorSubject
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AppModule { }
