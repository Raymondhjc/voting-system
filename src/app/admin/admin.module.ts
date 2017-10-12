import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { newElectionComponent } from './new-election/new-election.component';
import { sectionComponent } from './new-election/section.component';

import {
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule
} from '@angular/material';

@NgModule({
    declarations: [
        AdminComponent,
        newElectionComponent,
        sectionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
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
        MatRadioModule
        
    ],
    exports:[
        AdminComponent,
        /** Election table modules */
        MatTableModule,
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule {
}

