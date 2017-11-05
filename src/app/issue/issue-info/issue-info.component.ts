import { Component } from '@angular/core';
import { IssueRestService } from '../issue.service.rest';

@Component({
  selector: 'app-issue-info',
  templateUrl: './issue-info.component.html',
  styleUrls: ['./issue-info.component.css']
})
export class IssueInfoComponent {

  get msg() {
    return this.issueService.msg;
  }

  constructor(private issueService: IssueRestService) {
  }

}
