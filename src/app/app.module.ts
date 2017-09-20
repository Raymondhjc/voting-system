import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {HeaderComponent} from './header/header.component'
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdExpansionModule, MdGridListModule, MdInputModule, MdMenuModule,
  MdSidenavModule, MdToolbarModule, MdCardModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AppRoutingModule} from './app-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import {AuthGuardService} from './common/auth-guards.service';
import {InverseAuthGuardService} from './common/inverse-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdGridListModule,
    MdToolbarModule,
    MdInputModule,
    MdDialogModule,
    MdExpansionModule,
    MdSidenavModule,
    MdCardModule
  ],
  providers: [AuthenticationService, AuthGuardService, InverseAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
