import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';

const appRoute: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
