import { Component } from '@angular/core';
import { MdButtonModule } from '@angular/material';

import { electionDetails } from '../election-details'
import { AdminService } from './admin.service'

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})

export class AdminComponent {
  chartTitle: string = 'Current elections';

  constructor(private adminService: AdminService){}
  electionList: electionDetails[] = this.adminService.getElectionDetails();
  // getElectionDetails(): void{
  //   this.electionList = this.adminService.getElectionDetails();
  // }

  electionDetails: electionDetails;

  //see election details
  onSelect(selectedElection: electionDetails): void {
    this.electionDetails = selectedElection;
  }
}
