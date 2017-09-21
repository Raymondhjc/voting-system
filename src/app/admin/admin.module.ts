import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    RouterModule
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AppModule { }
