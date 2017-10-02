import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

/** For the Admin Module */
import {AdminModule} from './admin/admin.module'

import {HeaderComponent} from './header/header.component';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdInputModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
  MdTabsModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AppRoutingModule} from './app-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import {DataViewComponent} from './data-view/data-view.component';
import {ScannerPageComponent} from './scanner-page/scanner-page.component';
import {NotSignedInGuardsService} from './common/not-signed-in-guards.service';
import {SignedInAuthGuardService} from './common/signed-in-auth-guard.service';
import {EqualValidatorDirective} from './common/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    WelcomePageComponent,
    DataViewComponent,
    ScannerPageComponent,
    EqualValidatorDirective
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
    MdTabsModule,
    /** Admin module */
    AdminModule
  ],
  providers: [AuthenticationService, NotSignedInGuardsService, SignedInAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
