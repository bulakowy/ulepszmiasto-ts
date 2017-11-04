import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../issue.model';

@Component({
  selector: 'app-issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.css']
})
export class IssueStatusComponent implements OnInit {

  @Input() issue: Issue;
  status: string;
  statusPL: string;
  statusDate: any;

  constructor() {
  }

  ngOnInit() {
    this.status = this.issue.statuses[this.issue.statuses.length - 1].status;
    this.statusDate = this.issue.statuses[this.issue.statuses.length - 1].createdDate;

    switch (this.status) {
      case 'NEW':
        this.statusPL = 'Otwarty';
        break;
      case 'CLOSED':
        this.statusPL = 'Zamknięty';
        break;
    }
  }

}
