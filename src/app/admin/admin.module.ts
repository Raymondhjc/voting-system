import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { newElectionComponent } from './new-election/new-election.component';
// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

import {
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    MatGridListModule
} from '@angular/material';

@NgModule({
    declarations: [
        AdminComponent,
        newElectionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        /** Election table modules */
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatPaginatorModule,
        /** Create new election modules */
        MatStepperModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatListModule,
        MatExpansionModule,
        MatRadioModule,
        MatGridListModule,
        //http module
        HttpClientModule,
    ],
    exports: [
        AdminComponent,
        /** Election table modules */
        MatTableModule,
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule {
}

