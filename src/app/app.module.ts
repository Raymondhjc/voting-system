import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {HeaderComponent} from './header/header.component'
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdExpansionModule, MdGridListModule, MdInputModule, MdMenuModule,
  MdSidenavModule, MdToolbarModule, MdCardModule,MdTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AppRoutingModule} from './app-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
//data-view
import {DataViewComponent} from './data-view/data-view.component'

import {NotSignedInGuardsService} from './common/not-signed-in-guards.service';
import {SignedInAuthGuardService} from './common/signed-in-auth-guard.service';

//data-table



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    WelcomePageComponent,
    DataViewComponent,//data-view
   
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
    MdCardModule,
    MdTableModule
  ],
  providers: [AuthenticationService, NotSignedInGuardsService, SignedInAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
