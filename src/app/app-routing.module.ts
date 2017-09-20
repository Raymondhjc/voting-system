import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AuthGuardService} from './common/auth-guards.service';
import {InverseAuthGuardService} from './common/inverse-auth-guard.service';

const appRoute: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {
    path: 'user-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService]
  },
  {path: 'signup', component: SignupComponent, canActivate: [InverseAuthGuardService]},
  {path: 'signin', component: SigninComponent, canActivate: [InverseAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
