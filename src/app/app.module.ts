import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {HeaderComponent} from './header/header.component'
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdGridListModule, MdInputModule, MdMenuModule,
  MdToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdGridListModule,
    MdToolbarModule,
    MdInputModule,
    MdDialogModule
  ],
  providers: [],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
