import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { newElectionComponent } from './new-election/new-election.component'

import {
    MdInputModule,
    MdSortModule,
    MdButtonModule,
    MdCardModule,
    MdPaginatorModule,
    MdTableModule,
    MdTabsModule,
    MdStepperModule,
    MdNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatExpansionModule,
    MdRadioModule
} from '@angular/material';

@NgModule({
    declarations: [
        AdminComponent,
        newElectionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MdInputModule,
        MdButtonModule,
        MdCardModule,
        /** Election table modules */
        MdTabsModule,
        MdTableModule,
        MdSortModule,
        MdTabsModule,
        MdPaginatorModule,
        /** Create new election modules */
        MdStepperModule,
        ReactiveFormsModule,
        MdNativeDateModule,
        MatDatepickerModule,
        MatListModule,
        MatExpansionModule,
        MdRadioModule
        
    ],
    exports:[
        AdminComponent,
        /** Election table modules */
        MdTableModule,
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule {
}

