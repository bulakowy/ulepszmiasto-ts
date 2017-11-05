import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Issue } from '../issue.model';
import { IssueRestService } from '../issue.service.rest';

@Injectable()
export class NewIssueService {

  issue: Issue = new Issue();
  images = [];
  submitted = '';

  constructor(private issueService: IssueRestService) {
    this.issueService.newIssueAdded.subscribe(
      (issue) => {
        this.reset();
      }
    );
  }

  reset() {
    this.issue = new Issue();
    this.images = [];
    this.submitted = '';
  }
}
